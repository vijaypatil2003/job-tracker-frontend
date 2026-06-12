import { useState } from "react";
import { NavLink } from "react-router-dom";

const NAV = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    label: "Applications",
    path: "/jobs",
    icon: (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    label: "Reminders",
    path: "/reminders",
    icon: (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    ),
  },
  {
    label: "Profile",
    path: "/profile",
    icon: (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

function NavItems({ user, onNavigate }) {
  return (
    <>
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ label, path, icon }) => (
          <NavLink
            key={path}
            to={path}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors ${
                isActive
                  ? "bg-[#EAF3F6] text-[#26A9C9]"
                  : "text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
              }`
            }
          >
            {icon}
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-[#F1F5F9]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#26A9C9] flex items-center justify-center text-white text-[13px] font-semibold shrink-0">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-[#0F172A] truncate">
              {user?.name || "User"}
            </p>
            <p className="text-[11px] text-[#94A3B8] truncate">
              {user?.email || ""}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
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
      <span className="text-[#0F172A] text-[15px] font-semibold">Acme</span>
    </div>
  );
}

export default function DashboardSidebar({ user, mobileOpen, onMobileClose }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-[220px] xl:w-[240px] shrink-0 flex-col bg-white border-r border-[#E2E8F0] min-h-screen sticky top-0">
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-[#F1F5F9]">
          <Logo />
        </div>
        <NavItems user={user} onNavigate={() => {}} />
      </aside>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-[260px] bg-white border-r border-[#E2E8F0] flex flex-col transform transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-[#F1F5F9]">
          <Logo />
          <button
            onClick={onMobileClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 2l12 12M14 2L2 14"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <NavItems user={user} onNavigate={onMobileClose} />
      </div>
    </>
  );
}
