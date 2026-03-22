const { createClient } = require('@supabase/supabase-js');

// --- CONFIGURATION ---
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// --- HARDCODED PET DATA (From original app.js) ---
const pets = [
  {
    id: 'buddy', name: 'Buddy', breed: 'Golden Retriever', type: 'dog', size: 'large',
    age: '2 years', weight: '28 kg', gender: 'Male', img: 'assets/buddy.jpg',
    status: 'Available', vaccinated: 'Yes', neutered: 'Yes',
    tags: ['Friendly', 'Active', 'Good with kids', 'House-trained'],
    tempTags: ['Gentle', 'Playful', 'Loyal'],
    desc: 'A gentle and loving companion who enjoys outdoor walks and cuddles. Great with kids and other pets. Buddy is housebroken and responds well to basic commands. He loves playing fetch and swimming.',
    urgent: false,
    energy: 'medium', apartment_friendly: false,
    good_with_kids: true, shedding: 'high', alone_tolerance: 'medium'
  },
  {
    id: 'luna', name: 'Luna', breed: 'Tabby Cat', type: 'cat', size: 'small',
    age: '1 year', weight: '3.2 kg', gender: 'Female', img: 'assets/luna.jpg',
    status: 'Available', vaccinated: 'Yes', neutered: 'Yes',
    tags: ['Calm', 'Indoor', 'Good with adults'],
    tempTags: ['Curious', 'Independent', 'Affectionate'],
    desc: 'Luna is a curious and playful tabby who loves sunny window spots and interactive toys. She is gentle, quiet and low-maintenance — perfect for apartment living.',
    urgent: false,
    energy: 'low', apartment_friendly: true,
    good_with_kids: false, shedding: 'low', alone_tolerance: 'high'
  },
  {
    id: 'max', name: 'Max', breed: 'Black Labrador', type: 'dog', size: 'large',
    age: '3 years', weight: '32 kg', gender: 'Male', img: 'assets/max.jpg',
    status: 'Urgent', vaccinated: 'Yes', neutered: 'Yes',
    tags: ['Energetic', 'Loyal', 'Needs space'],
    tempTags: ['Brave', 'Playful', 'Protective'],
    desc: 'Max is a healthy, energetic Labrador who needs an active family with a yard. He is fully trained and loves to swim. Currently in urgent need of a home.',
    urgent: true,
    energy: 'high', apartment_friendly: false,
    good_with_kids: true, shedding: 'medium', alone_tolerance: 'low'
  },
  {
    id: 'bella', name: 'Bella', breed: 'Persian Cat', type: 'cat', size: 'small',
    age: '4 years', weight: '4 kg', gender: 'Female', img: 'assets/bella.jpg',
    status: 'Available', vaccinated: 'Yes', neutered: 'Yes',
    tags: ['Calm', 'Fluffy', 'Indoor'],
    tempTags: ['Regal', 'Gentle', 'Quiet'],
    desc: 'Bella is a gorgeous white Persian with piercing blue eyes. She loves quiet homes and will reward you with head-bumps and purrs. Requires regular grooming.',
    urgent: false,
    energy: 'low', apartment_friendly: true,
    good_with_kids: false, shedding: 'medium', alone_tolerance: 'high'
  },
  {
    id: 'charlie', name: 'Charlie', breed: 'Beagle', type: 'dog', size: 'medium',
    age: '1.5 years', weight: '12 kg', gender: 'Male', img: 'assets/charlie.jpg',
    status: 'Available', vaccinated: 'Yes', neutered: 'No',
    tags: ['Scent hound', 'Playful', 'Family pet'],
    tempTags: ['Sociable', 'Happy-go-lucky', 'Inquisitive'],
    desc: 'Charlie is a joyful Beagle with a wonderful personality. He gets along with everyone — kids, dogs and cats. He thrives with regular walks and playtime.',
    urgent: false,
    energy: 'medium', apartment_friendly: true,
    good_with_kids: true, shedding: 'low', alone_tolerance: 'medium'
  },
  {
    id: 'daisy', name: 'Daisy', breed: 'Pembroke Welsh Corgi', type: 'dog', size: 'small',
    age: '1 year', weight: '10 kg', gender: 'Female', img: 'assets/daisy.jpg',
    status: 'Available', vaccinated: 'Yes', neutered: 'Yes',
    tags: ['Friendly', 'Low-set', 'Outgoing'],
    tempTags: ['Spirited', 'Alert', 'Affectionate'],
    desc: 'Daisy is a spiritful Corgi who loves attention and short walks. She is very affectionate and gets along well with children. Perfect for a loving family home.',
    urgent: false,
    energy: 'low', apartment_friendly: true,
    good_with_kids: true, shedding: 'medium', alone_tolerance: 'high'
  },
  {
    id: 'milo', name: 'Milo', breed: 'Orange Tabby', type: 'cat', size: 'small',
    age: '2 years', weight: '4.5 kg', gender: 'Male', img: 'assets/milo.jpg',
    status: 'Available', vaccinated: 'Yes', neutered: 'Yes',
    tags: ['Relaxed', 'Mellow', 'Chatty'],
    tempTags: ['Vibrant', 'Social', 'Sweet'],
    desc: 'Milo is a classic orange tabby with a heart of gold. He loves human company and will follow you around the house for some head scratches.',
    urgent: false,
    energy: 'medium', apartment_friendly: true,
    good_with_kids: false, shedding: 'medium', alone_tolerance: 'high'
  },
  {
    id: 'cooper', name: 'Cooper', breed: 'Border Collie', type: 'dog', size: 'large',
    age: '2.5 years', weight: '20 kg', gender: 'Male', img: 'assets/cooper.jpg',
    status: 'Available', vaccinated: 'Yes', neutered: 'Yes',
    tags: ['Intelligent', 'Athletic', 'Focused'],
    tempTags: ['Workaholic', 'Eager', 'Protective'],
    desc: 'Cooper is a highly intelligent Border Collie who needs a job to do. Ideal for an active owner who loves training and outdoor activities.',
    urgent: false,
    energy: 'high', apartment_friendly: false,
    good_with_kids: true, shedding: 'high', alone_tolerance: 'low'
  },
  {
    id: 'coco', name: 'Coco', breed: 'Siamese', type: 'cat', size: 'small',
    age: '3 years', weight: '3.5 kg', gender: 'Female', img: 'assets/coco.jpg',
    status: 'Available', vaccinated: 'Yes', neutered: 'Yes',
    tags: ['Elegant', 'Vocal', 'Attached'],
    tempTags: ['Smart', 'Demanding', 'Loyal'],
    desc: 'Coco is a beautiful Siamese who loves to be the center of attention. She is very vocal and will let you know when she wants playtime or treats.',
    urgent: false,
    energy: 'low', apartment_friendly: true,
    good_with_kids: false, shedding: 'low', alone_tolerance: 'high'
  },
  {
    id: 'oliver', name: 'Oliver', breed: 'French Bulldog', type: 'dog', size: 'small',
    age: '4 years', weight: '11 kg', gender: 'Male', img: 'assets/oliver.jpg',
    status: 'Available', vaccinated: 'Yes', neutered: 'Yes',
    tags: ['Low-energy', 'Playful', 'Stubborn'],
    tempTags: ['Comedic', 'Chill', 'Lovable'],
    desc: 'Oliver is a typical Frenchie who loves napping as much as he loves short play sessions. He is great with kids and very low maintenance.',
    urgent: false,
    energy: 'low', apartment_friendly: true,
    good_with_kids: true, shedding: 'low', alone_tolerance: 'medium'
  },
  {
    id: 'simba', name: 'Simba', breed: 'Ginger Maine Coon Mix', type: 'cat', size: 'medium',
    age: '5 years', weight: '6.5 kg', gender: 'Male', img: 'assets/simba.jpg',
    status: 'Available', vaccinated: 'Yes', neutered: 'Yes',
    tags: ['Floppy', 'Big', 'Gentle giant'],
    tempTags: ['Magnificent', 'Fluffy', 'Kind'],
    desc: 'Simba is a large, fluffy ginger cat who is a true gentle giant. He loves lounging in the sun and is surprisingly active for his size.',
    urgent: false,
    energy: 'high', apartment_friendly: true,
    good_with_kids: true, shedding: 'medium', alone_tolerance: 'medium'
  },
  {
    id: 'bailey', name: 'Bailey', breed: 'Cocker Spaniel', type: 'dog', size: 'medium',
    age: '2 years', weight: '13 kg', gender: 'Female', img: 'assets/bailey.jpg',
    status: 'Available', vaccinated: 'Yes', neutered: 'Yes',
    tags: ['Gentle', 'Happy', 'Good ears'],
    tempTags: ['Cheerful', 'Gentle', 'Sensitive'],
    desc: 'Bailey is a sweet and happy Cocker Spaniel who loves everyone she meets. She thrives on companionship and gentle walks.',
    urgent: false,
    energy: 'medium', apartment_friendly: true,
    good_with_kids: true, shedding: 'high', alone_tolerance: 'medium'
  },
  {
    id: 'nala', name: 'Nala', breed: 'Calico', type: 'cat', size: 'small',
    age: '1.5 years', weight: '3.8 kg', gender: 'Female', img: 'assets/nala.jpg',
    status: 'Available', vaccinated: 'Yes', neutered: 'Yes',
    tags: ['Striking', 'Independent', 'Quiet'],
    tempTags: ['Reserved', 'Graceful', 'Observant'],
    desc: 'Nala is a beautiful calico cat who enjoys watching the world from a high bookshelf. She is independent but appreciates a good scratching session.',
    urgent: false,
    energy: 'low', apartment_friendly: true,
    good_with_kids: false, shedding: 'medium', alone_tolerance: 'high'
  },
  {
    id: 'teddy', name: 'Teddy', breed: 'Toy Poodle', type: 'dog', size: 'small',
    age: '3 years', weight: '4.5 kg', gender: 'Male', img: 'assets/teddy.jpg',
    status: 'Urgent', vaccinated: 'Yes', neutered: 'Yes',
    tags: ['Hypoallergenic', 'Clever', 'Portable'],
    tempTags: ['Bouncy', 'Bright', 'Charming'],
    desc: 'Teddy is a charming little poodle who is always ready for a walk. He is very clever and learns tricks quickly. Currently in urgent need of rehoming.',
    urgent: true,
    energy: 'medium', apartment_friendly: true,
    good_with_kids: true, shedding: 'low', alone_tolerance: 'high'
  },
  {
    id: 'cleo', name: 'Cleo', breed: 'Abyssinian', type: 'cat', size: 'small',
    age: '2 years', weight: '3 kg', gender: 'Female', img: 'assets/cleo.jpg',
    status: 'Available', vaccinated: 'Yes', neutered: 'Yes',
    tags: ['Sleek', 'Active', 'Inquisitive'],
    tempTags: ['Acrobatic', 'Intelligent', 'Curious'],
    desc: 'Cleo is a sleek and active Abyssinian who loves to climb and explore. She is very intelligent and needs interactive toys to keep her busy.',
    urgent: false,
    energy: 'high', apartment_friendly: true,
    good_with_kids: false, shedding: 'low', alone_tolerance: 'medium'
  },
  {
    id: 'kopi', name: 'Kopi', breed: 'Singapore Special', type: 'dog', size: 'medium',
    age: '2 years', weight: '18 kg', gender: 'Male', img: 'assets/kopi.jpg',
    status: 'Available', vaccinated: 'Yes', neutered: 'Yes',
    tags: ['Street-smart', 'Loyal', 'Energetic'],
    tempTags: ['Brave', 'Alert', 'Affectionate'],
    desc: 'Kopi is a classic Singapore Special—intelligent, resilient, and incredibly loyal. He loves long walks and will be your best friend for life.',
    urgent: false,
    energy: 'high', apartment_friendly: true,
    good_with_kids: true, shedding: 'medium', alone_tolerance: 'medium'
  },
  {
    id: 'mochi', name: 'Mochi', breed: 'Local Kitten', type: 'cat', size: 'small',
    age: '4 months', weight: '1.5 kg', gender: 'Female', img: 'assets/mochi.jpg',
    status: 'Available', vaccinated: 'Yes', neutered: 'No',
    tags: ['Playful', 'Tiny', 'Curious'],
    tempTags: ['Energetic', 'Sweet', 'Social'],
    desc: 'Mochi is a bundle of joy! This tiny kitten loves chasing yarn and climbing everything she can find. She will need a family that can keep up with her energy.',
    urgent: false,
    energy: 'high', apartment_friendly: true,
    good_with_kids: true, shedding: 'low', alone_tolerance: 'low'
  },
  {
    id: 'hoppy', name: 'Hoppy', breed: 'Mixed Breed Rabbit', type: 'rabbit', size: 'small',
    age: '1 year', weight: '2 kg', gender: 'Male', img: 'assets/hoppy.jpg',
    status: 'Available', vaccinated: 'Yes', neutered: 'Yes',
    tags: ['Gentle', 'Loves hay', 'Shy'],
    tempTags: ['Quiet', 'Observant', 'Sweet'],
    desc: 'Hoppy is a gentle rabbit who enjoys a quiet environment and plenty of fresh hay. He can be a bit shy at first but warms up with gentle handling.',
    urgent: false,
    energy: 'low', apartment_friendly: true,
    good_with_kids: true, shedding: 'medium', alone_tolerance: 'medium'
  },
  {
    id: 'bao', name: 'Bao', breed: 'Smooth-haired Guinea Pig', type: 'guinea_pig', size: 'small',
    age: '8 months', weight: '0.9 kg', gender: 'Male', img: 'assets/bao.jpg',
    status: 'Available', vaccinated: 'No', neutered: 'No',
    tags: ['Social', 'Loves greens', 'Vocal'],
    tempTags: ['Hungry', 'Cheerful', 'Talkative'],
    desc: 'Bao is a very social guinea pig who will squeak loudly whenever he hears the fridge open! He loves his leafy greens and enjoys being around people.',
    urgent: false,
    energy: 'medium', apartment_friendly: true,
    good_with_kids: true, shedding: 'low', alone_tolerance: 'low'
  },
  {
    id: 'rex_snr', name: 'Rex', breed: 'German Shepherd Mix', type: 'dog', size: 'large',
    age: '9 years', weight: '30 kg', gender: 'Male', img: 'assets/rex.jpg',
    status: 'Available', vaccinated: 'Yes', neutered: 'Yes',
    tags: ['Senior', 'Calm', 'Gentle giant'],
    tempTags: ['Wise', 'Steady', 'Loving'],
    desc: 'Rex is a mature gentleman who just wants a quiet spot to nap. He is very calm on the leash and loves gentle head scratches. Perfect for a relaxed household.',
    urgent: false,
    energy: 'low', apartment_friendly: false,
    good_with_kids: true, shedding: 'high', alone_tolerance: 'high'
  },
  {
    id: 'truffle', name: 'Truffle', breed: 'Long-haired Cross', type: 'cat', size: 'medium',
    age: '3 years', weight: '4.2 kg', gender: 'Female', img: 'assets/truffle.jpg',
    status: 'Available', vaccinated: 'Yes', neutered: 'Yes',
    tags: ['Regal', 'Cuddly', 'Needs grooming'],
    tempTags: ['Elegant', 'Soft', 'Affectionate'],
    desc: 'Truffle is a beautiful long-haired cat with a very affectionate personality. She loves being brushed and will reward you with constant purring.',
    urgent: false,
    energy: 'low', apartment_friendly: true,
    good_with_kids: false, shedding: 'high', alone_tolerance: 'medium'
  },
  {
    id: 'speedy', name: 'Speedy', breed: 'Dwarf Hamster', type: 'hamster', size: 'small',
    age: '6 months', weight: '0.05 kg', gender: 'Male', img: 'assets/speedy.jpg',
    status: 'Available', vaccinated: 'No', neutered: 'No',
    tags: ['Active', 'Nocturnal', 'Small'],
    tempTags: ['Fast', 'Busy', 'Cute'],
    desc: 'Speedy lives up to his name! He is incredibly active at night and loves running on his wheel or digging in his sand bath.',
    urgent: false,
    energy: 'high', apartment_friendly: true,
    good_with_kids: false, shedding: 'none', alone_tolerance: 'high'
  },
  {
    id: 'shelly', name: 'Shelly', breed: 'Red-eared Slider', type: 'terrapin', size: 'small',
    age: '5 years', weight: '0.5 kg', gender: 'Female', img: 'assets/shelly.jpg',
    status: 'Available', vaccinated: 'No', neutered: 'No',
    tags: ['Independent', 'Loves basking', 'Quiet'],
    tempTags: ['Sun-seeker', 'Low-maintenance', 'Steady'],
    desc: 'Shelly is a low-maintenance companion who enjoys basking under her heat lamp and swimming in her tank. She is very independent and quiet.',
    urgent: false,
    energy: 'low', apartment_friendly: true,
    good_with_kids: true, shedding: 'none', alone_tolerance: 'high'
  },
  {
    id: 'lola', name: 'Lola', breed: 'Singapore Special', type: 'dog', size: 'medium',
    age: '4 years', weight: '16 kg', gender: 'Female', img: 'assets/lola.jpg',
    status: 'Available', vaccinated: 'Yes', neutered: 'Yes',
    tags: ['Sensitive', 'Shy', 'Sweet nature'],
    tempTags: ['Patient', 'Quiet', 'Timid'],
    desc: 'Lola is a shy Singapore Special who needs a patient owner to help her come out of her shell. Once she trusts you, she is the sweetest dog you will ever meet.',
    urgent: false,
    energy: 'medium', apartment_friendly: true,
    good_with_kids: false, shedding: 'medium', alone_tolerance: 'medium'
  },
  {
    id: 'shadow', name: 'Shadow', breed: 'Local Tabby', type: 'cat', size: 'medium',
    age: '12 years', weight: '4.5 kg', gender: 'Male', img: 'assets/shadow.jpg',
    status: 'Available', vaccinated: 'Yes', neutered: 'Yes',
    tags: ['Senior', 'Wise', 'Quiet'],
    tempTags: ['Chill', 'Napper', 'Gentle'],
    desc: 'Shadow is a wise old tabby who has seen it all. He is very quiet and spends most of his day napping in the sun. He is perfect for someone looking for a low-energy companion.',
    urgent: false,
    energy: 'low', apartment_friendly: true,
    good_with_kids: true, shedding: 'medium', alone_tolerance: 'high'
  },
  {
    id: 'brownie', name: 'Brownie', breed: 'Singapore Special', type: 'dog', size: 'medium',
    age: '3 years', weight: '20 kg', gender: 'Male', img: 'assets/brownie.jpg',
    status: 'Available', vaccinated: 'Yes', neutered: 'Yes',
    tags: ['Energetic', 'Playful', 'Loves fetch'],
    tempTags: ['Sociable', 'Bouncy', 'Loyal'],
    desc: 'Brownie is an active Singapore Special who never tires of playing fetch. He is super sociable and gets along great with other dogs.',
    urgent: false,
    energy: 'high', apartment_friendly: true,
    good_with_kids: true, shedding: 'medium', alone_tolerance: 'medium'
  },
  {
    id: 'snowy', name: 'Snowy', breed: 'Local White Cat', type: 'cat', size: 'medium',
    age: '2 years', weight: '4 kg', gender: 'Female', img: 'assets/snowy.jpg',
    status: 'Available', vaccinated: 'Yes', neutered: 'Yes',
    tags: ['Calm', 'Indoor', 'Gentle'],
    tempTags: ['Quiet', 'Soft', 'Affectionate'],
    desc: 'Snowy is a beautiful all-white cat who loves nothing more than lounging in a sunny spot all day. She is very gentle and perfect for a quiet home.',
    urgent: false,
    energy: 'low', apartment_friendly: true,
    good_with_kids: true, shedding: 'medium', alone_tolerance: 'high'
  },
  {
    id: 'nibbles', name: 'Nibbles', breed: 'Netherland Dwarf Mix', type: 'rabbit', size: 'small',
    age: '1.5 years', weight: '1.2 kg', gender: 'Male', img: 'assets/nibbles.jpg',
    status: 'Available', vaccinated: 'Yes', neutered: 'Yes',
    tags: ['Tiny', 'Active', 'Loves hay'],
    tempTags: ['Fast', 'Cute', 'Spirited'],
    desc: 'Nibbles is a tiny bundle of energy! Despite his size, he has a big personality and loves exploring his surroundings. He is very fond of Timothy hay.',
    urgent: false,
    energy: 'medium', apartment_friendly: true,
    good_with_kids: true, shedding: 'low', alone_tolerance: 'medium'
  },
  {
    id: 'cookie', name: 'Cookie', breed: 'Rex Guinea Pig', type: 'guinea_pig', size: 'small',
    age: '1 year', weight: '1 kg', gender: 'Female', img: 'assets/cookie.jpg',
    status: 'Available', vaccinated: 'No', neutered: 'No',
    tags: ['Curly fur', 'Social', 'Vocal'],
    tempTags: ['Sweet', 'Chatty', 'Soft'],
    desc: 'Cookie has the softest curly fur you have ever felt. She is a very vocal girl who will wheek loudly the moment she hears vegetables being prepared!',
    urgent: false,
    energy: 'medium', apartment_friendly: true,
    good_with_kids: true, shedding: 'low', alone_tolerance: 'low'
  },
  {
    id: 'bear', name: 'Bear', breed: 'Chow Chow Mix', type: 'dog', size: 'large',
    age: '5 years', weight: '26 kg', gender: 'Male', img: 'assets/bear.jpg',
    status: 'Available', vaccinated: 'Yes', neutered: 'Yes',
    tags: ['Fluffy', 'Independent', 'Loyal'],
    tempTags: ['Stoic', 'Protective', 'Calm'],
    desc: 'Bear is a majestic Chow Chow mix with a thick, fluffy coat. He is somewhat independent but fiercely loyal to those he trusts. Best in an experienced home.',
    urgent: false,
    energy: 'low', apartment_friendly: false,
    good_with_kids: false, shedding: 'high', alone_tolerance: 'high'
  },
  {
    id: 'ginger_kit', name: 'Ginger', breed: 'Local Orange Tabby', type: 'cat', size: 'small',
    age: '5 months', weight: '1.8 kg', gender: 'Female', img: 'assets/ginger_kit.jpg',
    status: 'Available', vaccinated: 'Yes', neutered: 'No',
    tags: ['Mischievous', 'Climber', 'Kitten'],
    tempTags: ['Playful', 'Tiny', 'Brave'],
    desc: 'Ginger is a classic orange tabby kitten with a mischievous streak. She loves climbing to the highest point in the room to survey her kingdom.',
    urgent: false,
    energy: 'high', apartment_friendly: true,
    good_with_kids: true, shedding: 'medium', alone_tolerance: 'low'
  },
  {
    id: 'flash', name: 'Flash', breed: 'Roborovski Hamster', type: 'hamster', size: 'small',
    age: '4 months', weight: '0.03 kg', gender: 'Male', img: 'assets/flash.jpg',
    status: 'Available', vaccinated: 'No', neutered: 'No',
    tags: ['Fast', 'Small', 'Curious'],
    tempTags: ['Speedy', 'Active', 'Observant'],
    desc: 'Flash is a tiny Robo hamster known for his incredible speed. He is very active at night and is fascinating to watch as he scurries through tunnels.',
    urgent: false,
    energy: 'high', apartment_friendly: true,
    good_with_kids: false, shedding: 'none', alone_tolerance: 'high'
  },
  {
    id: 'tank', name: 'Tank', breed: 'Malayan Box Turtle', type: 'terrapin', size: 'small',
    age: '8 years', weight: '0.8 kg', gender: 'Male', img: 'assets/tank.jpg',
    status: 'Available', vaccinated: 'No', neutered: 'No',
    tags: ['Slow', 'Steady', 'Low-maintenance'],
    tempTags: ['Quiet', 'Hard-shell', 'Resilient'],
    desc: 'Tank is a Malayan Box Turtle who lives up to his name. He is very steady and quiet, spending his days between the water and his favorite basking spot.',
    urgent: false,
    energy: 'low', apartment_friendly: true,
    good_with_kids: true, shedding: 'none', alone_tolerance: 'high'
  },
  {
    id: 'pepper', name: 'Pepper', breed: 'Singapore Special Puppy', type: 'dog', size: 'small',
    age: '6 months', weight: '8 kg', gender: 'Female', img: 'assets/pepper_pup.jpg',
    status: 'Available', vaccinated: 'Yes', neutered: 'No',
    tags: ['Bouncy', 'Needs training', 'Affectionate'],
    tempTags: ['Sweet', 'Eager', 'Puppy'],
    desc: 'Pepper is a smart and bouncy puppy who is eager to learn. She needs a family that can provide consistent training and plenty of socialization.',
    urgent: false,
    energy: 'high', apartment_friendly: true,
    good_with_kids: true, shedding: 'medium', alone_tolerance: 'low'
  }
];

async function migrate() {
  console.log(`Starting migration of ${pets.length} pets...`);

  // Transform data to match SQL schema
  const transformedPets = pets.map(p => ({
    id: p.id,
    name: p.name,
    breed: p.breed,
    species: p.type, // Map 'type' to 'species'
    size: p.size,
    age: p.age,
    weight: p.weight,
    gender: p.gender,
    img: p.img,
    status: p.status,
    vaccinated: p.vaccinated,
    neutered: p.neutered,
    tags: p.tags,
    temp_tags: p.tempTags, // Map 'tempTags' to 'temp_tags'
    description: p.desc, // Map 'desc' to 'description'
    urgent: p.urgent || false,
    energy: p.energy,
    apartment_friendly: p.apartment_friendly,
    good_with_kids: p.good_with_kids,
    shedding: p.shedding,
    alone_tolerance: p.alone_tolerance
  }));

  const { data, error } = await supabase
    .from('pets')
    .upsert(transformedPets, { onConflict: 'id' });

  if (error) {
    console.error('Migration error:', error);
  } else {
    console.log('Migration successful!');
  }
}

migrate();
