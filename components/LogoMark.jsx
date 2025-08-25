export default function LogoMark({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="axg" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#d946ef" />
        </linearGradient>
      </defs>
      {/* Stylized “A” mark */}
      <path d="M6 24L16 6l10 18" fill="none" stroke="url(#axg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 18h12" fill="none" stroke="url(#axg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
