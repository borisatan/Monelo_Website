import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AppStoreBadge, { APP_STORE_URL } from './components/AppStoreBadge'

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Header */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          <a href="/" className="logo">
            <img src={`${import.meta.env.BASE_URL}assets/Logo.png`} alt="Monora" className="logo-image" />
            Monora
          </a>
          <nav className="header-nav">
            <Link to="/support" className="header-nav-link">Support</Link>
            <a href={APP_STORE_URL} className="header-appstore-btn" target="_blank" rel="noopener noreferrer">
              <AppStoreBadge size="large" />
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container hero-layout">
          <div className="hero-text">
            <div className="eyebrow-badge animate-fade-in-up delay-1">
              <span className="eyebrow-dot" />
              Now available on the App Store
            </div>
            <h1 className="animate-fade-in-up delay-2">
              Finally know where your money <span>actually goes.</span>
            </h1>
            <p className="hero-subtitle animate-fade-in-up delay-3">
              Monora uses intentional manual logging to build real money
              awareness — without ever touching your bank account.
            </p>
            <div className="hero-cta-group animate-fade-in-up delay-4">
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
                <AppStoreBadge size="large" />
              </a>
              <p className="hero-reassurance">Free trial included. No bank login required.</p>
            </div>
          </div>
          <div className="hero-mockup animate-fade-in-up delay-3">
            <img
              src={`${import.meta.env.BASE_URL}assets/Dashboard.png`}
              alt="Monora dashboard"
              className="hero-screenshot"
            />
          </div>
        </div>
      </section>

      {/* Trust / Privacy */}
      <section className="trust-section">
        <div className="container trust-inner">
          <div className="section-label">The Private Way to Budget</div>
          <h2>No bank login.<br />No syncing. No exposure.</h2>
          <div className="trust-grid">
            <TrustItem
              icon={<LockIcon />}
              title="No linked accounts"
              body="Your bank stays out of it entirely. We never ask for credentials, ever."
            />
            <TrustItem
              icon={<ShieldIcon />}
              title="Your data stays private"
              body="Transactions live on your device. No third-party data sharing."
            />
            <TrustItem
              icon={<HandIcon />}
              title="You control everything"
              body="Delete your data anytime. You are always in full control."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-section">
        <div className="container">
          <div className="section-label">How it works</div>
          <h2>Two steps. Total clarity.</h2>
          <div className="steps-layout">
            <div className="step-card">
              <div className="step-number">01</div>
              <div className="step-text">
                <h3>Log a purchase in 3 seconds</h3>
                <p>Amount, category, done. No receipt scanning, no bank polling — just a quick intentional tap that builds real awareness.</p>
              </div>
              <div className="step-mockup">
                <img src={`${import.meta.env.BASE_URL}assets/AddTrans1.png`} alt="Log a transaction" className="step-screenshot" />
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">02</div>
              <div className="step-text">
                <h3>See where your money goes</h3>
                <p>Your spending, laid out clearly by category and budget. No more money fog — just the truth, presented simply.</p>
              </div>
              <div className="step-mockup">
                <img src={`${import.meta.env.BASE_URL}assets/Budget1.png`} alt="Budget overview screen" className="step-screenshot" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="section-label">Why Monora</div>
          <h2>Built for people who want to understand money, not just track it.</h2>
          <div className="features-grid">
            <FeatureCard
              icon={<BrainIcon />}
              title="Intentional awareness"
              body="Automatic syncing numbs you to your spending. Typing each purchase makes it real — that's the whole point."
              accent="blue"
            />
            <FeatureCard
              icon={<ShieldIcon />}
              title="Private by design"
              body="No bank access means no data breach risk, no OAuth scopes, no third-party exposure. Your finances stay yours."
              accent="teal"
            />
            <FeatureCard
              icon={<LightningIcon />}
              title="A habit that sticks"
              body="3 seconds per purchase. Small enough to stay consistent, powerful enough to change your relationship with money."
              accent="blue"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section">
        <div className="container">
          <div className="final-cta-box">
            <h2>Start your free trial</h2>
            <p className="final-cta-sub">
              See where your money goes — without handing over your bank login.
            </p>
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
              <AppStoreBadge size="large" />
            </a>
            <p className="final-cta-note">No bank login required. Cancel anytime.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-logo">
            <img src={`${import.meta.env.BASE_URL}assets/Logo.png`} alt="Monora" className="footer-logo-image" />
            Monora
          </div>
          <p className="footer-text">
            © {new Date().getFullYear()} Monora. All rights reserved.
            {' · '}
            <Link to="/support" className="footer-support-link">Support</Link>
            {' · '}
            <Link to="/privacy-policy" className="footer-support-link">Privacy Policy</Link>
            {' · '}
            <Link to="/terms-and-conditions" className="footer-support-link">Terms & Conditions</Link>
          </p>
        </div>
      </footer>
    </>
  )
}

function PhoneMockup({ src, alt }) {
  return (
    <div className="phone-frame" role="img" aria-label={alt}>
      <div className="phone-notch" />
      <img src={src} alt={alt} className="phone-screen" />
      <div className="phone-bar" />
    </div>
  )
}

function PhoneImageMockup({ src, alt }) {
  return (
    <div className="phone-frame">
      <div className="phone-notch" />
      <img
        src={src}
        alt={alt}
        className="phone-screen"
      />
      <div className="phone-bar" />
    </div>
  )
}

function TrustItem({ icon, title, body }) {
  return (
    <div className="trust-item">
      <div className="trust-icon">{icon}</div>
      <div>
        <h3 className="trust-title">{title}</h3>
        <p className="trust-body">{body}</p>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, body, accent }) {
  return (
    <div className={`feature-card feature-card--${accent}`}>
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-body">{body}</p>
    </div>
  )
}

function LockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  )
}

function HandIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/>
      <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/>
      <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/>
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
    </svg>
  )
}

function BrainIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
    </svg>
  )
}

function LightningIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  )
}

export default App
