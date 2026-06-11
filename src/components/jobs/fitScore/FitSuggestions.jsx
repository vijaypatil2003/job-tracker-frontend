export default function FitSuggestions({ suggestions = [] }) {
  if (!suggestions.length) return null;

  return (
    <div>
      <p className="text-[12px] font-semibold text-[#0F172A] mb-2.5">
        Improvement Suggestions
      </p>
      <ul className="space-y-2">
        {suggestions.map((s, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#EAF3F6] flex items-center justify-center shrink-0 mt-0.5">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 6.5L4.5 9L10 3.5"
                  stroke="#26A9C9"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p className="text-[12.5px] text-[#475569] leading-relaxed">{s}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
