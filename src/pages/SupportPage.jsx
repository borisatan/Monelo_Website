import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSupportForm } from '../hooks/useSupportForm'

function SupportPage() {
  const [scrolled, setScrolled] = useState(false)
  const [fields, setFields] = useState({ email: '', subject: '', message: '' })
  const [fieldErrors, setFieldErrors] = useState({})

  const { submit, loading, success, error } = useSupportForm()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const validate = () => {
    const errors = {}
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!fields.email.trim() || !emailRe.test(fields.email.trim())) {
      errors.email = 'Please enter a valid email address'
    }

    if (!fields.subject.trim() || fields.subject.trim().length < 5) {
      errors.subject = 'Subject must be at least 5 characters'
    } else if (fields.subject.trim().length > 150) {
      errors.subject = 'Subject must be under 150 characters'
    }

    if (!fields.message.trim() || fields.message.trim().length < 20) {
      errors.message = 'Message must be at least 20 characters'
    } else if (fields.message.trim().length > 2000) {
      errors.message = 'Message must be under 2000 characters'
    }

    return errors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = validate()
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }
    await submit(fields)
  }

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          <Link to="/" className="logo">
            <img src="/assets/Logo.png" alt="Monelo" className="logo-image" />
            Monelo
          </Link>
          <Link to="/#waitlist" className="header-cta">Join Waitlist</Link>
        </div>
      </header>

      <main className="support-page">
        <div className="container">
          <div className="support-header animate-fade-in-up delay-1">
            <h1>Support</h1>
            <p>Having trouble or have a question? We're here to help.</p>
          </div>

          <div className="support-card animate-fade-in-up delay-2">
            {success ? (
              <div className="support-success">
                <div className="support-success-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h2>Message sent!</h2>
                <p>Thanks for reaching out. We'll get back to you as soon as possible.</p>
                <Link to="/" className="support-back-link">Back to home</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="support-field">
                  <label htmlFor="email" className="support-label">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`support-input ${fieldErrors.email ? 'support-input-error' : ''}`}
                    placeholder="you@example.com"
                    value={fields.email}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  {fieldErrors.email && <span className="support-field-error">{fieldErrors.email}</span>}
                </div>

                <div className="support-field">
                  <label htmlFor="subject" className="support-label">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    className={`support-input ${fieldErrors.subject ? 'support-input-error' : ''}`}
                    placeholder="What's this about?"
                    value={fields.subject}
                    onChange={handleChange}
                    disabled={loading}
                    maxLength={150}
                  />
                  {fieldErrors.subject && <span className="support-field-error">{fieldErrors.subject}</span>}
                </div>

                <div className="support-field">
                  <label htmlFor="message" className="support-label">
                    Message
                    <span className="support-char-count">{fields.message.length}/2000</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className={`support-textarea ${fieldErrors.message ? 'support-input-error' : ''}`}
                    placeholder="Describe your issue or question in detail..."
                    value={fields.message}
                    onChange={handleChange}
                    disabled={loading}
                    maxLength={2000}
                    rows={6}
                  />
                  {fieldErrors.message && <span className="support-field-error">{fieldErrors.message}</span>}
                </div>

                {error && (
                  <div className="form-error" role="alert">{error}</div>
                )}

                <button
                  type="submit"
                  className={`support-submit ${loading ? 'button-loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-logo">
            <img src="/assets/Logo.png" alt="Monelo" className="footer-logo-image" />
            Monelo
          </div>
          <p className="footer-text">
            © {new Date().getFullYear()} Monelo. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

export default SupportPage
