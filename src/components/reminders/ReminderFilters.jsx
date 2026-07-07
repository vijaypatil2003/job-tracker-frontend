const FILTERS = ["All", "Pending", "Overdue", "Completed"];
const TYPES = ["all", "follow-up", "interview", "deadline", "task", "general"];

export default function ReminderFilters({
  activeFilter,
  setActiveFilter,
  activeType,
  setActiveType,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Status filters */}
      <div className="flex items-center gap-1 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 h-[32px] rounded-lg text-[12px] font-medium transition-colors ${
              activeFilter === f
                ? "bg-[#26A9C9] text-white"
                : "bg-white border border-[#E2E8F0] text-[#475569] hover:border-[#94A3B8]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Type filter */}
      <select
        value={activeType}
        onChange={(e) => setActiveType(e.target.value)}
        className="h-[32px] px-3 text-[12px] text-[#475569] bg-white border border-[#E2E8F0] rounded-lg outline-none focus:border-[#26A9C9] transition-colors"
      >
        {TYPES.map((t) => (
          <option key={t} value={t}>
            {t === "all" ? "All Types" : t.charAt(0).toUpperCase() + t.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
