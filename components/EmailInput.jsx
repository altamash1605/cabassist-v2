export default function EmailInput({ id, value, onChange, placeholder = "you@example.com" }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-neutral-300">Email</label>
      <div className="relative">
        {/* icon slot */}
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M4 4h16v16H4z" strokeWidth="1.5" opacity="0"></path>
          <path d="M4 8l8 5 8-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <rect x="4" y="4" width="16" height="16" rx="2" ry="2" strokeWidth="1.5"></rect>
        </svg>
        <input
          id={id}
          type="email"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-neutral-800 bg-neutral-900/80 pl-11 pr-3 py-2.5 text-sm text-neutral-200 placeholder-neutral-500 outline-none ring-0 transition focus:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        />
      </div>
    </div>
  );
}
