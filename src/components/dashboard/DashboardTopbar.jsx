import { useNavigate } from "react-router-dom";

export default function DashboardTopbar({ title, user, onMenuClick }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-[#E2E8F0] px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] border border-[#E2E8F0] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M2 4h12M2 8h12M2 12h12"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <h1 className="text-[15px] font-semibold text-[#0F172A]">{title}</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => navigate("/jobs/add")}
          className="flex items-center gap-1.5 px-3 sm:px-4 h-[34px] bg-[#26A9C9] hover:bg-[#1F9DBD] text-white text-[12px] sm:text-[13px] font-medium rounded-lg transition-colors"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 2v12M2 8h12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="hidden sm:inline">Add Application</span>
          <span className="sm:hidden">Add</span>
        </button>
        <button
          onClick={logout}
          className="text-[12px] sm:text-[13px] text-[#64748B] hover:text-red-500 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
