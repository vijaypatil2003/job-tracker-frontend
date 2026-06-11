export default function BrandPanel() {
  const features = [
    "Real-time collaboration across teams",
    "Role-based access control",
    "Audit logs & compliance ready",
  ];

  const stats = [
    { value: "50K+", label: "Teams onboarded" },
    { value: "99.9%", label: "Uptime SLA" },
    { value: "4.9★", label: "User rating" },
  ];

  return (
    <aside className="hidden lg:flex lg:w-[45%] shrink-0 bg-[#26A9C9] flex-col justify-between px-14 py-14 sticky top-0 h-screen overflow-hidden">
      {/* Background subtle pattern */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-24 -right-24 w-[380px] h-[380px] rounded-full bg-white/10" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-white/5" />
        <div className="absolute top-1/2 right-0 w-[200px] h-[200px] rounded-full bg-white/5" />
      </div>

      <div className="relative z-10 flex flex-col gap-12 h-full justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="4" width="10" height="10" rx="2" fill="white" />
              <rect
                x="18"
                y="4"
                width="10"
                height="10"
                rx="2"
                fill="white"
                fillOpacity="0.6"
              />
              <rect
                x="4"
                y="18"
                width="10"
                height="10"
                rx="2"
                fill="white"
                fillOpacity="0.6"
              />
              <rect
                x="18"
                y="18"
                width="10"
                height="10"
                rx="2"
                fill="white"
                fillOpacity="0.3"
              />
            </svg>
          </div>
          <span className="text-white text-[18px] font-semibold tracking-tight">
            Acme
          </span>
        </div>

        {/* Main copy */}
        <div className="space-y-4">
          <h2 className="text-white text-[30px] font-bold leading-snug tracking-tight">
            The platform your team actually ships with.
          </h2>
          <p className="text-white/70 text-[15px] leading-relaxed">
            Manage projects, track progress, and collaborate — all in one place.
            Built for teams that move fast.
          </p>
        </div>

        {/* Features */}
        <ul className="space-y-3.5">
          {features.map((f) => (
            <li
              key={f}
              className="flex items-center gap-3 text-white/85 text-[14px]"
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8.5L6.5 12L13 5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {f}
            </li>
          ))}
        </ul>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-2 border-t border-white/20">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-white text-[22px] font-bold tracking-tight">
                {s.value}
              </div>
              <div className="text-white/60 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Trust badge */}
        <div className="flex items-center gap-2 text-white/50 text-xs">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          SOC 2 Type II certified · GDPR compliant
        </div>
      </div>
    </aside>
  );
}
