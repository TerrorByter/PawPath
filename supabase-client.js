// Supabase Client for Browser (CDN-based)
// Ensure the Supabase CDN script is loaded before this file in your HTML.
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

const SUPABASE_URL = 'https://xdgwcxbzvexswcrovjxw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkZ3djeGJ6dmV4c3djcm92anh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxNDQzNDMsImV4cCI6MjA4OTcyMDM0M30.dLMAvORcsCujcDnEq2qek4ZwaHvcENCC-5A1aliUp0k';

if (SUPABASE_URL === 'YOUR_SUPABASE_URL' || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
  console.warn('Supabase credentials not set in supabase-client.js');
}

const supabaseInstance = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export for use in other scripts
window.supabaseClient = supabaseInstance;
