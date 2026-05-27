const APP_STORE_URL = 'https://apps.apple.com/us/app/monora-budget-finance/id6761183669'

export default function AppStoreBadge({ size = 'large' }) {
  const scale = size === 'large' ? 1 : 0.67
  return (
    <div
      className={`appstore-badge appstore-badge--${size}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: Math.round(10 * scale),
        background: '#000',
        border: '1px solid #A6A6A6',
        borderRadius: 10 * scale,
        padding: `${Math.round(8 * scale)}px ${Math.round(16 * scale)}px`,
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      {/* Apple logo */}
      <svg
        width={Math.round(22 * scale)}
        height={Math.round(26 * scale)}
        viewBox="0 0 22 26"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M18.05 13.77c-.03-3.22 2.63-4.78 2.75-4.86-1.5-2.19-3.83-2.49-4.65-2.52-1.97-.2-3.85 1.17-4.85 1.17-1 0-2.53-1.15-4.17-1.11-2.13.03-4.1 1.24-5.2 3.14C-.28 13.43 1.37 19.14 3.53 22.27c1.06 1.53 2.31 3.24 3.96 3.18 1.59-.06 2.19-1.03 4.12-1.03 1.92 0 2.48 1.03 4.16.99 1.72-.03 2.8-1.55 3.85-3.09 1.22-1.77 1.72-3.48 1.74-3.57-.04-.01-3.33-1.28-3.36-5.07l.05.09z"/>
        <path d="M14.68 4.07c.88-1.06 1.47-2.54 1.31-4.01-1.27.05-2.8.84-3.71 1.9-.81.94-1.52 2.46-1.33 3.91 1.41.11 2.85-.72 3.73-1.8z"/>
      </svg>
      {/* Text */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <span style={{
          color: '#fff',
          fontSize: Math.round(9 * scale),
          fontFamily: '-apple-system, Helvetica Neue, sans-serif',
          letterSpacing: '0.04em',
        }}>
          Download on the
        </span>
        <span style={{
          color: '#fff',
          fontSize: Math.round(20 * scale),
          fontFamily: '-apple-system, Helvetica Neue, sans-serif',
          fontWeight: 600,
          letterSpacing: '-0.01em',
        }}>
          App Store
        </span>
      </div>
    </div>
  )
}

export { APP_STORE_URL }
