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
      const { data, error: supabaseError } = await supabase
        .from('waitlist_signups')
        .insert([{
          email
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
      return { success: true }
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
