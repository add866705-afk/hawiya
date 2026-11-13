// Supabase integration seam.
// Install @supabase/supabase-js and create the client here when the project moves
// from the local demo adapter to a server-backed production application.
// Only the publishable/anon key belongs in the browser; never expose service_role keys.
export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
};
export const isSupabaseConfigured = Boolean(supabaseConfig.url && supabaseConfig.anonKey);