const STATUS_CONFIG = [
  { key: "Applied",          color: "#3B82F6", bg: "#EFF6FF" },
  { key: "Interview",        color: "#8B5CF6", bg: "#F5F3FF" },
  { key: "Assignment",       color: "#F59E0B", bg: "#FFFBEB" },
  { key: "HR Round",         color: "#EC4899", bg: "#FDF2F8" },
  { key: "Technical Round",  color: "#6366F1", bg: "#EEF2FF" },
  { key: "Offer Received",   color: "#10B981", bg: "#ECFDF5" },
  { key: "Selected",         color: "#059669", bg: "#D1FAE5" },
  { key: "Rejected",         color: "#EF4444", bg: "#FEF2F2" },
  { key: "Not Applied",      color: "#94A3B8", bg: "#F8FAFC" },
];

export default function StatusBreakdown({ byStatus = {} }) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
      <h3 className="text-[14px] font-semibold text-[#0F172A] mb-4">Status Breakdown</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
        {STATUS_CONFIG.map(({ key, color, bg }) => (
          <div
            key={key}
            className="rounded-xl p-3 flex flex-col gap-1"
            style={{ backgroundColor: bg }}
          >
            <span className="text-[11px] font-medium" style={{ color }}>
              {key}
            </span>
            <span className="text-[20px] font-bold text-[#0F172A] leading-tight">
              {byStatus[key] ?? 0}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}