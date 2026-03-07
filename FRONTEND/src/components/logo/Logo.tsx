import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 text-[18px] font-semibold tracking-tight"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        className="animate-spin-slow"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
        </defs>

        <circle cx="12" cy="3.5" r="1.9" fill="url(#logoGrad)" />
        <circle cx="19.5" cy="8" r="1.9" fill="url(#logoGrad)" />
        <circle cx="19.5" cy="16" r="1.9" fill="url(#logoGrad)" />
        <circle cx="12" cy="20.5" r="1.9" fill="url(#logoGrad)" />
        <circle cx="4.5" cy="16" r="1.9" fill="url(#logoGrad)" />
        <circle cx="4.5" cy="8" r="1.9" fill="url(#logoGrad)" />
      </svg>

      <span className="text-gray-900 dark:text-white">
        Event<span className="text-blue-600">Finder</span>
      </span>
    </Link>
  );
}
