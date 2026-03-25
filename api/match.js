const { OpenAI } = require('openai');
const { createClient } = require('@supabase/supabase-js');

// --- Main Handler ---
module.exports = async function handler(req, res) {
    // 1. Setup CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    console.log('--- START DIAGNOSTIC MATCH ---');
    console.log('Node Version:', process.version);
    
    try {
        const { prompt } = req.body || {};
        const SUPABASE_URL = (process.env.SUPABASE_URL || '').trim().replace(/^["']|["']$/g, '');
        const SUPABASE_KEY = (process.env.SUPABASE_ANON_KEY || '').trim().replace(/^["']|["']$/g, '');
        const OPENAI_KEY = (process.env.OPENAI_API_KEY || '').trim().replace(/^["']|["']$/g, '');
        
        console.log('Prompt received:', prompt ? prompt.substring(0, 50) + '...' : 'NONE');

        // 2. Check Environment
        const envStatus = {
            has_openai_key: !!OPENAI_KEY,
            openai_key_prefix: OPENAI_KEY ? OPENAI_KEY.substring(0, 7) : 'N/A',
            has_supabase_url: !!SUPABASE_URL,
            has_supabase_key: !!SUPABASE_KEY,
            supabase_url_preview: SUPABASE_URL ? SUPABASE_URL.substring(0, 15) + '...' : 'N/A',
            base_url: process.env.OPENAI_BASE_URL || 'DEFAULT'
        };
        console.log('Environment Status:', JSON.stringify(envStatus));

        if (!OPENAI_KEY) throw new Error('MISSING_OPENAI_KEY');
        if (!SUPABASE_URL) throw new Error('MISSING_SUPABASE_URL');

        // 3. Initialize Clients
        console.log('Initializing clients with cleaned variables...');
        const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
        const openai = new OpenAI({
            apiKey: OPENAI_KEY,
            baseURL: process.env.OPENAI_BASE_URL || 'https://api.apiyi.com/v1'
        });

        // 4. Fetch Pets
        console.log('Fetching pets from Supabase...');
        const { data: dbPets, error: dbError } = await supabase.from('pets').select('*');
        if (dbError) {
            console.error('Supabase Error:', dbError);
            throw new Error(`SUPABASE_FETCH_FAILED: ${dbError.message}`);
        }
        console.log(`Fetched ${dbPets?.length || 0} pets.`);

        // 5. OpenAI Extraction
        console.log('Calling OpenAI GPT-4o-mini for extraction...');
        const extractRes = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0,
            response_format: { type: 'json_object' },
            messages: [
                { role: 'system', content: 'Extract pet preferences as JSON: { species, size, energy, apartment_friendly, good_with_kids, shedding, alone_tolerance }' },
                { role: 'user', content: prompt }
            ]
        });
        const prefs = JSON.parse(extractRes.choices[0].message.content);
        console.log('Preferences extracted:', JSON.stringify(prefs));

        // 6. Scoring
        console.log('Calling OpenAI GPT-4o-mini for scoring...');
        const scoreRes = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0.3,
            response_format: { type: 'json_object' },
            messages: [
                { role: 'system', content: 'Score matches (0-100). Return JSON { results: [{ id, compatibility_score, reason }] }' },
                { role: 'user', content: JSON.stringify({ prompt, candidates: dbPets.slice(0, 10) }) }
            ]
        });
        const scored = JSON.parse(scoreRes.choices[0].message.content);
        console.log('Scoring complete.');

        // 7. Final Response
        const results = (scored.results || []).map(r => {
            const pet = dbPets.find(p => p.id === r.id);
            if (!pet) return null;
            return {
                id: pet.id,
                name: pet.name,
                breed: pet.breed,
                compatibility_score: r.compatibility_score,
                reason: r.reason
            };
        }).filter(Boolean);

        console.log('--- END DIAGNOSTIC MATCH (SUCCESS) ---');
        return res.status(200).json({ results, preferences: prefs, debug: envStatus });

    } catch (err) {
        console.error('--- DIAGNOSTIC ERROR ---');
        console.error('Error Name:', err.name);
        console.error('Error Message:', err.message);
        console.error('Stack:', err.stack);
        
        return res.status(500).json({ 
            error: 'DIAGNOSTIC_FAILURE',
            message: err.message,
            stack: err.stack,
            env_hint: {
                has_openai: !!process.env.OPENAI_API_KEY,
                node_version: process.version
            }
        });
    }
};
