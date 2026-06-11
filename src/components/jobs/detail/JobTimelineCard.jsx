function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function isOverdue(date) {
  if (!date) return false;
  return new Date(date) < new Date();
}

export default function JobTimelineCard({ job }) {
  const items = [
    { label: "Applied Date", value: job?.appliedDate, overdue: false },
    {
      label: "Follow Up Date",
      value: job?.followUpDate,
      overdue: isOverdue(job?.followUpDate),
    },
    { label: "Interview Date", value: job?.interviewDate, overdue: false },
    {
      label: "Offer Deadline",
      value: job?.offerDeadline,
      overdue: isOverdue(job?.offerDeadline),
    },
  ];

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
      <h3 className="text-[13px] font-semibold text-[#0F172A] mb-4">
        Timeline
      </h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <span className="text-[12px] text-[#64748B]">{item.label}</span>
            <span
              className={`text-[12px] font-medium ${
                item.overdue && item.value ? "text-red-500" : "text-[#334155]"
              }`}
            >
              {formatDate(item.value)}
              {item.overdue && item.value && (
                <span className="ml-1.5 text-[10px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded-full">
                  Overdue
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
