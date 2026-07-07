const PRIORITY_CONFIG = {
  High: { color: "#EF4444", bg: "#FEF2F2" },
  Medium: { color: "#F59E0B", bg: "#FFFBEB" },
  Low: { color: "#94A3B8", bg: "#F8FAFC" },
};

const TYPE_CONFIG = {
  "follow-up": { color: "#26A9C9", bg: "#EAF3F6" },
  interview: { color: "#8B5CF6", bg: "#F5F3FF" },
  deadline: { color: "#EF4444", bg: "#FEF2F2" },
  task: { color: "#10B981", bg: "#ECFDF5" },
  general: { color: "#64748B", bg: "#F8FAFC" },
};

function formatDate(date) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isOverdue(date, isCompleted) {
  if (isCompleted) return false;
  return new Date(date) < new Date();
}

export default function ReminderCard({
  reminder,
  onComplete,
  onEdit,
  onDelete,
}) {
  const overdue = isOverdue(reminder.remindAt, reminder.isCompleted);
  const priorityConfig =
    PRIORITY_CONFIG[reminder.priority] || PRIORITY_CONFIG.Medium;
  const typeConfig = TYPE_CONFIG[reminder.type] || TYPE_CONFIG.general;

  return (
    <div
      className={`bg-white border rounded-xl p-4 transition-all ${
        reminder.isCompleted
          ? "border-[#E2E8F0] opacity-60"
          : overdue
            ? "border-red-200 bg-red-50/30"
            : "border-[#E2E8F0] hover:border-[#26A9C9]/30"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Complete checkbox */}
        <button
          onClick={() => onComplete(reminder._id)}
          disabled={reminder.isCompleted}
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
            reminder.isCompleted
              ? "bg-[#10B981] border-[#10B981]"
              : "border-[#CBD5E1] hover:border-[#26A9C9]"
          }`}
        >
          {reminder.isCompleted && (
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6.5L4.5 9L10 3.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p
                className={`text-[13px] font-semibold ${reminder.isCompleted ? "line-through text-[#94A3B8]" : "text-[#0F172A]"}`}
              >
                {reminder.title}
              </p>
              {reminder.description && (
                <p className="text-[12px] text-[#64748B] mt-0.5">
                  {reminder.description}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">
              {!reminder.isCompleted && (
                <button
                  onClick={() => onEdit(reminder)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[#64748B] hover:text-[#26A9C9] hover:bg-[#EAF3F6] transition-colors"
                >
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M11.5 2.5a1.414 1.414 0 012 2L5 13H3v-2L11.5 2.5z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
              <button
                onClick={() => onDelete(reminder._id)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#64748B] hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9a1 1 0 001 1h6a1 1 0 001-1l1-9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {/* Type badge */}
            <span
              className="text-[10px] font-medium px-2 py-0.5 rounded-full"
              style={{
                color: typeConfig.color,
                backgroundColor: typeConfig.bg,
              }}
            >
              {reminder.type}
            </span>

            {/* Priority badge */}
            <span
              className="text-[10px] font-medium px-2 py-0.5 rounded-full"
              style={{
                color: priorityConfig.color,
                backgroundColor: priorityConfig.bg,
              }}
            >
              {reminder.priority}
            </span>

            {/* Date */}
            <span
              className={`text-[11px] font-medium ${overdue ? "text-red-500" : "text-[#64748B]"}`}
            >
              {overdue && !reminder.isCompleted && "⚠ "}
              {formatDate(reminder.remindAt)}
            </span>

            {/* Linked job */}
            {reminder.job && (
              <span className="text-[11px] text-[#26A9C9]">
                {reminder.job.companyName} — {reminder.job.jobRole}
              </span>
            )}

            {/* Recurring */}
            {reminder.isRecurring && (
              <span className="text-[10px] text-[#94A3B8]">
                ↻ {reminder.recurrencePattern}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
