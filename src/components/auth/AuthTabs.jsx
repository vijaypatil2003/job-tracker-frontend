export default function AuthTabs({ tab, setTab }) {
  return (
    <div className="relative flex bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl p-1 mb-7">
      {/* Animated sliding indicator */}
      <div
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-white border border-[#E2E8F0] shadow-sm transition-transform duration-300 ease-out ${
          tab === "signup" ? "translate-x-[calc(100%+8px)]" : "translate-x-0"
        }`}
      />
      <button
        onClick={() => setTab("login")}
        className={`relative z-10 flex-1 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
          tab === "login"
            ? "text-[#1E293B]"
            : "text-[#94A3B8] hover:text-[#475569]"
        }`}
      >
        Sign in
      </button>
      <button
        onClick={() => setTab("signup")}
        className={`relative z-10 flex-1 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
          tab === "signup"
            ? "text-[#1E293B]"
            : "text-[#94A3B8] hover:text-[#475569]"
        }`}
      >
        Create account
      </button>
    </div>
  );
}
