import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Use placeholder values if environment variables are not set (for development/testing)
const defaultUrl = 'https://placeholder.supabase.co'
const defaultKey = 'placeholder-key'

export const supabase = createClient(
  supabaseUrl || defaultUrl,
  supabaseAnonKey || defaultKey
)
