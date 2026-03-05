import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export const useWaitlistSignup = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const signup = async (email) => {
    setLoading(true)
    setError(null)

    try {
      // Generate unique referral code (first 8 chars of base64 email + 4 random chars)
      const referralCode = btoa(email).slice(0, 8).replace(/[^a-zA-Z0-9]/g, '') +
                          Math.random().toString(36).slice(2, 6).toUpperCase()

      const { data, error: supabaseError } = await supabase
        .from('waitlist_signups')
        .insert([{
          email,
          referral_code: referralCode
        }])
        .select()

      if (supabaseError) {
        // Handle duplicate email gracefully
        if (supabaseError.code === '23505') {
          throw new Error('You\'re already on the waitlist!')
        }
        throw supabaseError
      }

      setSuccess(true)
      return { success: true, referralCode: data[0].referral_code }
    } catch (err) {
      const errorMessage = err.message || 'Something went wrong. Please try again.'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const getWaitlistCount = async () => {
    try {
      const { data, error } = await supabase.rpc('get_waitlist_count')

      if (error) return null
      return data
    } catch (err) {
      return null
    }
  }

  const reset = () => {
    setError(null)
    setSuccess(false)
  }

  return { signup, getWaitlistCount, loading, error, success, reset }
}
