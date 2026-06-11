export default function JobInfoCard({ job }) {
  const items = [
    {
      label: "Location",
      value: job?.location || "—",
      icon: (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 1.5C5.79 1.5 4 3.29 4 5.5c0 3.25 4 9 4 9s4-5.75 4-9c0-2.21-1.79-4-4-4z"
            stroke="#64748B"
            strokeWidth="1.25"
          />
          <circle cx="8" cy="5.5" r="1.5" stroke="#64748B" strokeWidth="1.25" />
        </svg>
      ),
    },
    {
      label: "Job Type",
      value: job?.jobType || "—",
      icon: (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <rect
            x="2"
            y="5"
            width="12"
            height="9"
            rx="1"
            stroke="#64748B"
            strokeWidth="1.25"
          />
          <path
            d="M5 5V4a3 3 0 016 0v1"
            stroke="#64748B"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Source",
      value: job?.source || "—",
      icon: (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke="#64748B" strokeWidth="1.25" />
          <path
            d="M8 2c0 0-3 2-3 6s3 6 3 6M8 2c0 0 3 2 3 6s-3 6-3 6M2 8h12"
            stroke="#64748B"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Listed Salary",
      value: job?.salary || "—",
      icon: (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke="#64748B" strokeWidth="1.25" />
          <path
            d="M8 5v6M6 6.5h3a1 1 0 010 2H7a1 1 0 000 2h3"
            stroke="#64748B"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Expected Salary",
      value: job?.expectedSalary || "—",
      icon: (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke="#64748B" strokeWidth="1.25" />
          <path
            d="M8 5v6M6 6.5h3a1 1 0 010 2H7a1 1 0 000 2h3"
            stroke="#64748B"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Days Since Applied",
      value:
        job?.daysSinceApplied != null ? `${job.daysSinceApplied} days` : "—",
      icon: (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke="#64748B" strokeWidth="1.25" />
          <path
            d="M8 5v3.5l2 1.5"
            stroke="#64748B"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
      <h3 className="text-[13px] font-semibold text-[#0F172A] mb-4">
        Job Information
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex items-center gap-1.5 mb-0.5">
              {item.icon}
              <p className="text-[11px] text-[#94A3B8] uppercase tracking-wide">
                {item.label}
              </p>
            </div>
            <p className="text-[13px] font-medium text-[#334155]">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
