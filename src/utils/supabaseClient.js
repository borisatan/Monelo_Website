import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Use placeholder values if environment variables are not set (for development/testing)
const defaultUrl = 'https://placeholder.supabase.co'
const defaultKey = 'placeholder-key'

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your_supabase')) {
  console.warn('Supabase environment variables not configured. Using placeholder values. Email submissions will not work until you configure Supabase.')
}

export const supabase = createClient(
  supabaseUrl && !supabaseUrl.includes('your_supabase') ? supabaseUrl : defaultUrl,
  supabaseAnonKey && !supabaseAnonKey.includes('your_supabase') ? supabaseAnonKey : defaultKey
)
