export default function StatsCard({ label, value, sub, color = "#26A9C9", icon }) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 flex items-start gap-4">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${color}15` }}
      >
        <span style={{ color }}>{icon}</span>
      </div>
      <div className="min-w-0">
        <p className="text-[13px] text-[#64748B]">{label}</p>
        <p className="text-[22px] font-bold text-[#0F172A] leading-tight">{value}</p>
        {sub && <p className="text-[12px] text-[#94A3B8] mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}