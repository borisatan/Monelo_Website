import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // --- Parse IP ---
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      'unknown'

    // --- Parse body ---
    let body: { name?: unknown; email?: unknown; subject?: unknown; message?: unknown }
    try {
      body = await req.json()
    } catch {
      return json({ error: 'Invalid request body' }, 400)
    }

    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const subject = typeof body.subject === 'string' ? body.subject.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    // --- Server-side validation ---
    const errors: Record<string, string> = {}
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email || !emailRe.test(email)) {
      errors.email = 'Please enter a valid email address'
    }
    if (!subject || subject.length < 5 || subject.length > 150) {
      errors.subject = 'Subject must be between 5 and 150 characters'
    }
    if (!message || message.length < 20 || message.length > 2000) {
      errors.message = 'Message must be between 20 and 2000 characters'
    }

    if (Object.keys(errors).length > 0) {
      return json({ error: 'Validation failed', errors }, 400)
    }

    // --- Supabase client (service role for rate limit checks) ---
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    // --- IP rate limiting ---
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString()
    const { count } = await supabase
      .from('support_submissions')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', ip)
      .gte('created_at', windowStart)

    if (count !== null && count >= RATE_LIMIT_MAX) {
      return json(
        { error: 'Too many requests. Please try again later.' },
        429,
        { 'Retry-After': '3600' },
      )
    }

    // --- Log submission first (before sending email, so rate limit count is accurate for concurrent requests) ---
    await supabase.from('support_submissions').insert({
      email,
      subject,
      message,
      ip_address: ip,
    })

    // --- Send email via Resend ---
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: Deno.env.get('SUPPORT_EMAIL_FROM'),
        to: [Deno.env.get('SUPPORT_EMAIL_TO')],
        reply_to: email,
        subject: `[Monelo Support] ${subject}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563EB;">New Support Request</h2>
            <table style="width:100%; border-collapse: collapse;">
              <tr><td style="padding: 6px 0; color: #6B7280; width: 80px;">From</td>
                  <td style="padding: 6px 0;">${escapeHtml(email)}</td></tr>
              <tr><td style="padding: 6px 0; color: #6B7280;">Subject</td>
                  <td style="padding: 6px 0;">${escapeHtml(subject)}</td></tr>
            </table>
            <hr style="border: 1px solid #E5E7EB; margin: 16px 0;">
            <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</p>
            <hr style="border: 1px solid #E5E7EB; margin: 16px 0;">
            <p style="color: #9CA3AF; font-size: 12px;">
              Sent from trymonelo.app/support &nbsp;|&nbsp; IP: ${escapeHtml(ip)}
            </p>
          </div>
        `,
      }),
    })

    if (!resendRes.ok) {
      const resendErr = await resendRes.text()
      console.error('Resend error:', resendErr)
      throw new Error('Failed to send email')
    }

    return json({ success: true }, 200)
  } catch (err) {
    console.error('send-support-email error:', err)
    return json({ error: 'Internal server error' }, 500)
  }
})

// --- Helpers ---
function json(
  body: unknown,
  status = 200,
  extra: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json', ...extra },
  })
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
