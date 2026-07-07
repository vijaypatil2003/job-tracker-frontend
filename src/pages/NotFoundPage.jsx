import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#EAF3F6] flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 rounded-2xl bg-white border border-[#E2E8F0] flex items-center justify-center mx-auto mb-5">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#26A9C9"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
        <h1 className="text-[42px] font-bold text-[#0F172A] leading-none">
          404
        </h1>
        <p className="text-[15px] font-semibold text-[#334155] mt-3">
          Page not found
        </p>
        <p className="text-[13px] text-[#64748B] mt-1.5 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 px-5 h-[40px] bg-[#26A9C9] hover:bg-[#1F9DBD] text-white text-[13px] font-medium rounded-lg transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
