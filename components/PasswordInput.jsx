import { useState } from "react";

export default function PasswordInput({ id, value, onChange, placeholder = "••••••••" }) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-neutral-300">Password</label>
      <div className="relative">
        {/* lock icon */}
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="11" width="18" height="10" rx="2" ry="2" strokeWidth="1.5"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeWidth="1.5"></path>
        </svg>

        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-neutral-800 bg-neutral-900/80 pl-11 pr-10 py-2.5 text-sm text-neutral-200 placeholder-neutral-500 outline-none ring-0 transition focus:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        />

        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-200"
          onClick={() => setShow(s => !s)}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}
