import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase env vars missing: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Netlify environment settings.')
}

// createClient throws when given empty strings, which crashes the app at module-load time
// (before React can mount) if env vars are absent from the Netlify build environment.
// Placeholder values allow the app to render; Supabase calls will fail gracefully at runtime.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
)
