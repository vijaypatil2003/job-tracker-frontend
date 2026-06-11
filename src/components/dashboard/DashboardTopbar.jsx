import { useNavigate } from "react-router-dom";

export default function DashboardTopbar({ title, user }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-[#E2E8F0] px-6 py-3.5 flex items-center justify-between sticky top-0 z-10">
      <h1 className="text-[16px] font-semibold text-[#0F172A]">{title}</h1>
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/jobs/add")}
          className="hidden sm:flex items-center gap-1.5 px-4 h-[36px] bg-[#26A9C9] hover:bg-[#1F9DBD] text-white text-[13px] font-medium rounded-lg transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 2v12M2 8h12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Add Application
        </button>
        <button
          onClick={logout}
          className="text-[13px] text-[#64748B] hover:text-red-500 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
