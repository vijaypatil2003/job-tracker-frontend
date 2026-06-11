import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandPanel from "../../components/auth/BrandPanel";
import AuthTabs from "../../components/auth/AuthTabs";
import LoginForm from "../../components/auth/LoginForm";
import SignupForm from "../../components/auth/SignupForm";

export default function AuthPage() {
  const [tab, setTab] = useState("login");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, []);

  return (
    <div className="flex min-h-screen bg-[#EAF3F6] font-sans">
      {/* Left — Brand Panel */}
      <BrandPanel />

      {/* Right — Auth Panel */}
      <main className="flex flex-1 items-center justify-center px-6 py-12 min-h-screen">
        {/* Mobile logo */}
        <div className="w-full max-w-[460px]">
          <div className="flex lg:hidden items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-lg bg-[#26A9C9] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
                <rect x="4" y="4" width="10" height="10" rx="2" fill="white" />
                <rect
                  x="18"
                  y="4"
                  width="10"
                  height="10"
                  rx="2"
                  fill="white"
                  fillOpacity="0.6"
                />
                <rect
                  x="4"
                  y="18"
                  width="10"
                  height="10"
                  rx="2"
                  fill="white"
                  fillOpacity="0.6"
                />
                <rect
                  x="18"
                  y="18"
                  width="10"
                  height="10"
                  rx="2"
                  fill="white"
                  fillOpacity="0.3"
                />
              </svg>
            </div>
            <span className="text-[#1E293B] text-base font-semibold">Acme</span>
          </div>

          {/* Auth Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] px-8 py-8">
            {/* Card header */}
            <div className="mb-6">
              <h1 className="text-[22px] font-bold text-[#0F172A] tracking-tight">
                {tab === "login" ? "Welcome back" : "Create your account"}
              </h1>
              <p className="text-sm text-[#64748B] mt-1">
                {tab === "login"
                  ? "Sign in to continue to your workspace."
                  : "Get started free — no credit card required."}
              </p>
            </div>

            {/* Tabs */}
            <AuthTabs tab={tab} setTab={setTab} />

            {/* Sliding forms */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{
                  transform:
                    tab === "signup" ? "translateX(-100%)" : "translateX(0%)",
                }}
              >
                <div className="w-full shrink-0">
                  <LoginForm navigate={navigate} />
                </div>
                <div className="w-full shrink-0">
                  <SignupForm navigate={navigate} />
                </div>
              </div>
            </div>
          </div>

          {/* Terms footer */}
          <p className="text-center text-xs text-[#94A3B8] leading-relaxed mt-5">
            By continuing, you agree to our{" "}
            <a
              href="/terms"
              className="text-[#64748B] hover:text-[#26A9C9] underline underline-offset-2 transition-colors"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="text-[#64748B] hover:text-[#26A9C9] underline underline-offset-2 transition-colors"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
