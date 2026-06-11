const ACTION_COLORS = {
  "Status Changed": "#26A9C9",
  "Application Added": "#10B981",
  "Interview Scheduled": "#8B5CF6",
  "Note Added": "#F59E0B",
  "Follow Up": "#EC4899",
};

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

export default function ActivityFeed({ activities = [] }) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
      <h3 className="text-[14px] font-semibold text-[#0F172A] mb-4">
        Recent Activity
      </h3>

      {activities.length === 0 ? (
        <div className="py-8 text-center text-[13px] text-[#94A3B8]">
          No activity yet. Add your first application.
        </div>
      ) : (
        <ul className="space-y-3">
          {activities.map((log, i) => {
            const color = ACTION_COLORS[log.action] || "#64748B";
            return (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                  style={{ backgroundColor: color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-[#334155]">
                    <span className="font-medium">{log.action}</span>
                    {log.job?.companyName && (
                      <span className="text-[#64748B]">
                        {" "}
                        · {log.job.companyName}
                      </span>
                    )}
                    {log.job?.jobRole && (
                      <span className="text-[#94A3B8]">
                        {" "}
                        — {log.job.jobRole}
                      </span>
                    )}
                  </p>
                  {log.description && (
                    <p className="text-[12px] text-[#94A3B8] mt-0.5">
                      {log.description}
                    </p>
                  )}
                </div>
                <span className="text-[11px] text-[#94A3B8] shrink-0">
                  {timeAgo(log.createdAt)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
