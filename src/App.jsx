import { useState, useEffect } from 'react'
import { useWaitlistSignup } from './hooks/useSupabase'

function App() {
  const [email, setEmail] = useState('')
  const [globalSubmitted, setGlobalSubmitted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const { signup, loading, error, success, reset } = useWaitlistSignup()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (globalSubmitted) {
      return
    }

    if (!validateEmail(email)) {
      return
    }

    const result = await signup(email)

    if (result.success) {
      setGlobalSubmitted(true)
      setEmail('')
    }
  }

  return (
    <>
      {/* Header */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          <a href="#" className="logo">
            <img src="/assets/Logo.png" alt="Monelo" className="logo-image" />
            Monelo
          </a>
          <a href="#waitlist" className="header-cta">Join Waitlist</a>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="founding-member-badge animate-fade-in-up delay-1">
              <span className="badge-icon">⭐</span>
              Limited Founding Member Spots Remaining
            </div>

            <h1 className="animate-fade-in-up delay-2">
              Master your money without the <span>math.</span>
            </h1>

            <p className="hero-subtitle animate-fade-in-up delay-3">
              Monelo turns mindless spending into mindful saving. Join the waitlist today—the first 200 members get Monelo free for life.
            </p>

            {!globalSubmitted ? (
              <>
                <form className="hero-form animate-fade-in-up delay-4" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    className="hero-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    className={`hero-button ${loading ? 'button-loading' : ''}`}
                    disabled={loading}
                  >
                    {loading ? 'Joining...' : 'Join Waitlist'}
                  </button>
                </form>
                {error && (
                  <div className="form-error animate-fade-in" role="alert">
                    {error}
                  </div>
                )}
                <p className="hero-note animate-fade-in-up delay-5">
                  Private by design. No spam, ever.
                </p>
              </>
            ) : (
              <div className="form-success-container animate-fade-in">
                <div className="form-success">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <div>
                    <h3>Welcome to the founding 200!</h3>
                    <p>We will email you before launching.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pain/Solution */}
      <section className="pain-solution">
        <div className="container">
          <h2>Stop losing money on autopilot</h2>
          <div className="solution-grid">
            <div className="solution-card">
              <div className="solution-icon">🧠</div>
              <h3>End mindless spending</h3>
              <p>Manual entry creates awareness that automatic apps can't.</p>
            </div>
            <div className="solution-card">
              <div className="solution-icon">💰</div>
              <h3>Find your hidden leaks</h3>
              <p>Most people can't account for 20% of their spending. We fix that.</p>
            </div>
            <div className="solution-card">
              <div className="solution-icon">⚡</div>
              <h3>3-second ritual</h3>
              <p>Log purchases in seconds. No friction, just awareness.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Peek
      <section className="peek">
        <div className="container">
          <h2>See it in action</h2>
          <div className="peek-visual">
            <video
              src="/assets/monelo.mp4"
              className="app-screenshot"
              controls
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </section> */}

      {/* The Incentive */}
      <section className="incentive">
        <div className="container">
          <div className="incentive-box">
            <h2>Why join the founding 200?</h2>
            <ul className="benefits-list">
              <li>
                <span className="benefit-icon">🎁</span>
                <div>
                  <strong>Free for life</strong>
                  <p>Never pay a subscription fee. Ever.</p>
                </div>
              </li>
              <li>
                <span className="benefit-icon">🗣️</span>
                <div>
                  <strong>Shape the product</strong>
                  <p>Your feedback directly influences features.</p>
                </div>
              </li>
              <li>
                <span className="benefit-icon">👥</span>
                <div>
                  <strong>Founding member badge</strong>
                  <p>Exclusive recognition in the app.</p>
                </div>
              </li>
            </ul>
            <p className="incentive-why">
              Why? We want 200 power users to help shape the future of Monelo.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" id="waitlist">
        <div className="container">
          <div className="cta-box">
            <div className="cta-content">
              <div className="founding-member-badge">
                <span className="badge-icon">⭐</span>
                Limited Founding Member Spots Remaining
              </div>
              <h2>Claim your founding member spot</h2>
              <p className="cta-subtitle">
                Be first in line when we launch. The first 200 members get Monelo free for life.
              </p>

              {!globalSubmitted ? (
                <>
                  <form className="cta-form" onSubmit={handleSubmit}>
                    <input
                      type="email"
                      className="cta-input"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                    <button
                      type="submit"
                      className={`cta-button ${loading ? 'button-loading' : ''}`}
                      disabled={loading}
                    >
                      {loading ? 'Joining...' : 'Join Waitlist'}
                    </button>
                  </form>
                  {error && (
                    <div className="form-error" role="alert" style={{ marginTop: '1rem' }}>
                      {error}
                    </div>
                  )}
                  <p className="cta-note">Private by design. No spam, ever.</p>
                </>
              ) : (
                <div className="form-success-container">
                  <div className="form-success" style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <div>
                      <h3>Welcome to the founding 200!</h3>
                      <p>We will email you before launching.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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

export default App
