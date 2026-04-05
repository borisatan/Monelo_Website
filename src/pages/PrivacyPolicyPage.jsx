import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import privacyContent from '../../privacy-policy.md?raw'

function PrivacyPolicyPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

      <main className="legal-page">
        <div className="container">
          <div className="legal-content animate-fade-in-up delay-1">
            <ReactMarkdown>{privacyContent}</ReactMarkdown>
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

export default PrivacyPolicyPage
