const OpenAI = require('openai');
const { createClient } = require('@supabase/supabase-js');

// --- Supabase Config ---
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

// --- Helpers ---
function setCorsHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// Deterministic hard-filter using extracted preferences
function filterPets(pets, prefs) {
    return pets.filter(pet => {
        // Apartment: only exclude if user needs apartment-friendly AND pet is not
        if (prefs.apartment_friendly === true && !pet.apartment_friendly) return false;
        // Kids: only exclude if user has kids AND pet is not good with kids
        if (prefs.good_with_kids === true && !pet.good_with_kids) return false;
        return true;
    });
}

// --- Main Handler ---
module.exports = async function handler(req, res) {
    setCorsHeaders(res);

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt } = req.body || {};
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 5) {
        return res.status(400).json({ error: 'Please provide a prompt describing your ideal pet.' });
    }

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'OpenAI API key not configured.' });
    }

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: process.env.OPENAI_BASE_URL || 'https://api.apiyi.com/v1'
    });

    try {
        // 1. Fetch ALL pets from Supabase first
        const { data: dbPets, error: dbError } = await supabase
            .from('pets')
            .select('*');

        if (dbError) {
            console.error('Supabase fetch error:', dbError);
            return res.status(500).json({ error: 'Failed to fetch pet data from database.' });
        }

        // Map database fields to the format expected by the existing matching logic
        const PETS = dbPets.map(p => ({
            id: p.id,
            name: p.name,
            species: p.species,
            breed: p.breed,
            size: p.size,
            age: p.age,
            img: p.img,
            energy: p.energy,
            apartment_friendly: p.apartment_friendly,
            good_with_kids: p.good_with_kids,
            shedding: p.shedding,
            alone_tolerance: p.alone_tolerance,
            description: p.description
        }));

        // 2. Extract structured preferences
        const extractRes = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0,
            response_format: { type: 'json_object' },
            messages: [
                {
                    role: 'system',
                    content: `You are a pet adoption assistant. Extract structured preferences from the user's description.
Return ONLY valid JSON: { "species", "size", "energy", "apartment_friendly", "good_with_kids", "shedding", "alone_tolerance" }`
                },
                { role: 'user', content: prompt }
            ]
        });

        let prefs;
        try {
            prefs = JSON.parse(extractRes.choices[0].message.content);
        } catch {
            prefs = {};
        }

        // 3. Deterministic Filter
        let candidates = filterPets(PETS, prefs);
        if (candidates.length === 0) candidates = PETS;

        // 4. Compatibility Scoring
        const scoreRes = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0.3,
            response_format: { type: 'json_object' },
            messages: [
                {
                    role: 'system',
                    content: `Score each pet's compatibility (0-100) based on user prompt and candidates. Return JSON results array.`
                },
                {
                    role: 'user',
                    content: JSON.stringify({ prompt, prefs, candidates })
                }
            ]
        });

        let scored;
        try {
            scored = JSON.parse(scoreRes.choices[0].message.content);
        } catch {
            scored = { results: [] };
        }

        // 5. Attach full pet data to results
        const results = (scored.results || [])
            .map(r => {
                const pet = PETS.find(p => p.id === r.pet_id || p.id === r.id);
                if (!pet) return null;
                return {
                    id: pet.id,
                    name: pet.name,
                    breed: pet.breed,
                    age: pet.age,
                    img: pet.img,
                    compatibility_score: Math.round(r.compatibility_score || r.score || 0),
                    reason: r.reason
                };
            })
            .filter(Boolean)
            .slice(0, 5);

        return res.status(200).json({ results, preferences: prefs });

    } catch (err) {
        console.error('AI match error:', err);
        return res.status(500).json({ error: err.message });
    }
};
