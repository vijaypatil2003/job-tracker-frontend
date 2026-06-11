function timeAgo(date) {
  const diff = Date.now() - new Date(date);
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hrs < 24) return `${hrs}h ago`;
  return `${days}d ago`;
}

export default function JobActivityLog({ activityLog = [] }) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
      <h3 className="text-[13px] font-semibold text-[#0F172A] mb-4">
        Activity Log
      </h3>
      {activityLog.length === 0 ? (
        <p className="text-[12px] text-[#94A3B8] text-center py-4">
          No activity yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {activityLog.map((log, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#26A9C9] mt-1.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[12.5px] text-[#334155] font-medium">
                  {log.action}
                </p>
                {log.oldValue && log.newValue && (
                  <p className="text-[11px] text-[#94A3B8] mt-0.5">
                    {log.oldValue} → {log.newValue}
                  </p>
                )}
                {log.description && (
                  <p className="text-[11px] text-[#94A3B8] mt-0.5">
                    {log.description}
                  </p>
                )}
              </div>
              <span className="text-[11px] text-[#94A3B8] shrink-0">
                {timeAgo(log.createdAt)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
