export default function AppStoreBadge({ size = 'large' }) {
  const height = size === 'large' ? 60 : 40
  return (
    <img
      src={`${import.meta.env.BASE_URL}assets/app-store-badge.svg`}
      height={height}
      alt="Download on the App Store"
      className={`appstore-badge appstore-badge--${size}`}
    />
  )
}
