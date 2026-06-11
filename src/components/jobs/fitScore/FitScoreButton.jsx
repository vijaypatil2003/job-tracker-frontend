export default function FitScoreButton({ onClick, loading, hasDescription }) {
  if (!hasDescription) {
    return (
      <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-4">
        <p className="text-[12.5px] text-[#92400E]">
          <span className="font-semibold">Fit Score unavailable.</span> Add a
          job description to this application first.
        </p>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full h-[40px] flex items-center justify-center gap-2 bg-[#EAF3F6] hover:bg-[#26A9C9] text-[#26A9C9] hover:text-white border border-[#26A9C9]/30 hover:border-[#26A9C9] text-[13px] font-medium rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Analyzing...
        </>
      ) : (
        <>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          Check Fit Score
        </>
      )}
    </button>
  );
}
