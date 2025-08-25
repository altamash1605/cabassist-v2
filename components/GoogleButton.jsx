export default function GoogleButton({ onClick, label = "Continue with Google", accent = "indigo" }) {
  const ring = accent === "fuchsia" ? "focus-visible:ring-fuchsia-500/40" : "focus-visible:ring-indigo-500/40";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-800 bg-white/90 px-4 py-2.5 text-sm font-medium text-neutral-900 transition hover:bg-white focus:outline-none ${ring} active:scale-[0.99]`}
    >
      <svg width="18" height="18" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M255.68 133.5c0-11.1-.9-19.2-2.9-27.6H130.6v50.1h71.8c-1.4 12.4-9.3 31-26.7 43.5l-.2 1.6 38.8 30 2.7.3c24.9-22.9 39.6-56.6 39.6-98.9" fill="#4285F4"/>
        <path d="M130.6 261.1c36 0 66.2-11.9 88.3-32.4l-42.1-32.6c-11.3 8.1-26.6 13.8-46.2 13.8-35.4 0-65.4-23.4-76.1-55.8l-1.6.1-41.2 31.9-.5 1.5c21.7 43.2 66.3 73.5 119.4 73.5" fill="#34A853"/>
        <path d="M54.5 154.1c-2.8-8.4-4.5-17.3-4.5-26.6s1.6-18.2 4.4-26.6l-.1-1.8L12.3 66.7l-1.3.6C3.8 83.2 0 101.3 0 120.9c0 19.7 3.8 37.8 11 53.7l43.5-33.5" fill="#FBBC05"/>
        <path d="M130.6 50.5c25.1 0 42 10.8 51.7 19.8l37.7-36.8C196.7 12.2 166.6 0 130.6 0 77.5 0 32.9 30.3 11.2 73.4l43.3 33.5c10.8-32.5 40.8-56.4 76.1-56.4" fill="#EA4335"/>
      </svg>
      <span>{label}</span>
    </button>
  );
}
