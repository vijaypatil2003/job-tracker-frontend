    export default function FollowUpAlert({ upcoming, overdue }) {
      if (!upcoming && !overdue) return null;

      return (
        <div className="space-y-2">
          {overdue > 0 && (
            <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="shrink-0"
              >
                <circle cx="8" cy="8" r="7" stroke="#EF4444" strokeWidth="1.5" />
                <path
                  d="M8 5v3.5M8 11h.01"
                  stroke="#EF4444"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <p className="text-[13px] text-red-700 flex-1">
                <span className="font-semibold">{overdue} overdue</span> follow-up
                {overdue > 1 ? "s" : ""} need attention.
              </p>
              <a
                href="/jobs?filter=overdue"
                className="text-[12px] text-red-600 font-medium hover:underline shrink-0"
              >
                View
              </a>
            </div>
          )}
          {upcoming > 0 && (
            <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="shrink-0"
              >
                <circle cx="8" cy="8" r="7" stroke="#F59E0B" strokeWidth="1.5" />
                <path
                  d="M8 5v3M8 10h.01"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <p className="text-[13px] text-amber-700 flex-1">
                <span className="font-semibold">
                  {upcoming} follow-up{upcoming > 1 ? "s" : ""}
                </span>{" "}
                due in the next 7 days.
              </p>
              <a
                href="/jobs?filter=upcoming"
                className="text-[12px] text-amber-600 font-medium hover:underline shrink-0"
              >
                View
              </a>
            </div>
          )}
        </div>
      );
    }
