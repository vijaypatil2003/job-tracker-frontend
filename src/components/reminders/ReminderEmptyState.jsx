export default function ReminderEmptyState({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-2xl bg-[#EAF3F6] flex items-center justify-center mx-auto mb-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#26A9C9"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
      </div>
      <p className="text-[14px] font-semibold text-[#0F172A]">
        No reminders yet
      </p>
      <p className="text-[13px] text-[#94A3B8] mt-1">
        Add reminders to stay on top of follow-ups and interviews.
      </p>
      <button
        onClick={onAdd}
        className="mt-4 px-4 h-[36px] bg-[#26A9C9] hover:bg-[#1F9DBD] text-white text-[13px] font-medium rounded-lg transition-colors"
      >
        Add Reminder
      </button>
    </div>
  );
}
