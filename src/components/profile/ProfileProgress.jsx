export default function ProfileProgress({ percentage, sections }) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[13px] font-semibold text-[#0F172A]">
          Profile Strength
        </span>
        <span className="text-[13px] font-bold text-[#26A9C9]">
          {percentage}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-[#EAF3F6] rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-[#26A9C9] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Section checklist */}
      <ul className="space-y-2">
        {sections.map((s) => (
          <li key={s.label} className="flex items-center gap-2.5">
            <span
              className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${s.completed ? "bg-[#26A9C9]" : "bg-[#E2E8F0]"}`}
            >
              {s.completed && (
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6.5L4.5 9L10 3.5"
                    stroke="white"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <span
              className={`text-[12.5px] ${s.completed ? "text-[#334155]" : "text-[#94A3B8]"}`}
            >
              {s.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
