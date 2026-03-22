-- Create pets table
CREATE TABLE pets (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  breed TEXT,
  species TEXT, -- Unified field (previously type in app.js, species in match.js)
  size TEXT,
  age TEXT,
  weight TEXT,
  gender TEXT,
  img TEXT,
  status TEXT,
  vaccinated TEXT,
  neutered TEXT,
  tags TEXT[],
  temp_tags TEXT[], -- Renamed from tempTags for SQL convention
  description TEXT,
  urgent BOOLEAN DEFAULT FALSE,
  energy TEXT,
  apartment_friendly BOOLEAN DEFAULT TRUE,
  good_with_kids BOOLEAN DEFAULT TRUE,
  shedding TEXT,
  alone_tolerance TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create reports table (combined cruelty and lost/found for simplicity)
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL, -- 'cruelty', 'lost', 'found'
  address TEXT,
  description TEXT,
  incident_date DATE,
  incident_time TIME,
  animal_status TEXT,
  suspect_description TEXT,
  tags TEXT[],
  contact_number TEXT,
  pet_name TEXT,
  pet_species TEXT,
  pet_breed TEXT,
  media_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_profiles table
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Or link to auth.users if using Auth
  full_name TEXT,
  email TEXT,
  preferences JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create saved_pets junction table
CREATE TABLE saved_pets (
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  pet_id TEXT REFERENCES pets(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, pet_id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Row Level Security) - Basic open policy for prototype
-- (In production, you'd use more restrictive policies)
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON pets FOR SELECT USING (true);

ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert access" ON reports FOR INSERT WITH CHECK (true);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow individual read/write access" ON user_profiles
  FOR ALL USING (true); -- Relaxed for prototype; specify (auth.uid() = id) if using Auth

ALTER TABLE saved_pets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow individual read/write access" ON saved_pets
  FOR ALL USING (true);
