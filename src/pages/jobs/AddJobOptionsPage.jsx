import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardLayout from "../../layouts/DashboardLayout";

const BASE = import.meta.env.VITE_API_URL;

const EXTRACTED_FIELDS = [
  "Company Name",
  "Job Role",
  "Location",
  "HR Email",
  "Phone",
  "Salary",
  "Apply Link",
  "Experience",
];

export default function AddJobOptionsPage() {
  const navigate = useNavigate();
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const extractAndNavigate = async (route) => {
    if (!jd.trim()) {
      navigate(route);
      return;
    }
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${BASE}/ai/extract`,
        new URLSearchParams({ jobDescription: jd }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      navigate(route, {
        state: {
          prefill: {
            ...res.data.data,
            jobDescription: jd, // ← pass raw JD text
          },
        },
      });
    } catch (err) {
      setError("AI extraction failed. Opening form without prefill...");
      setTimeout(() => navigate(route), 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-7">
          <h1 className="text-[20px] font-bold text-[#0F172A]">
            Add Job Application
          </h1>
          <p className="text-[13px] text-[#64748B] mt-0.5">
            Paste a job description to auto-fill, or add manually.
          </p>
        </div>

        {/* JD Paste Box */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 mb-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[#0F172A]">
                  Paste Job Description
                </p>
                <p className="text-[12px] text-[#94A3B8]">
                  AI extracts details automatically
                </p>
              </div>
            </div>
            <span className="text-[11px] text-[#94A3B8] bg-[#F8FAFC] border border-[#E2E8F0] px-2.5 py-1 rounded-full">
              Optional
            </span>
          </div>

          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the full job description here — company name, role, location, salary, HR email and apply link will be extracted automatically..."
            rows={5}
            className="w-full px-3 py-2.5 text-sm text-[#1E293B] bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg outline-none placeholder:text-[#94A3B8] focus:border-[#26A9C9] focus:ring-2 focus:ring-[#26A9C9]/15 transition-all resize-none"
          />

          {/* Extracted fields tags */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {EXTRACTED_FIELDS.map((f) => (
              <span
                key={f}
                className="text-[11px] text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded-full border border-[#E2E8F0]"
              >
                {f}
              </span>
            ))}
          </div>

          {error && (
            <p className="text-xs text-red-600 mt-2.5 flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <circle
                  cx="8"
                  cy="8"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M8 5v3M8 10h.01"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              {error}
            </p>
          )}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Quick Add */}
          <div
            onClick={() => extractAndNavigate("/jobs/quick-add")}
            className="bg-white border border-[#E2E8F0] hover:border-[#26A9C9] rounded-xl p-5 cursor-pointer transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#ECFDF5] flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <span className="text-[10px] font-medium bg-[#ECFDF5] text-[#10B981] px-2 py-0.5 rounded-full border border-[#10B981]/20">
                Most used
              </span>
            </div>
            <h3 className="text-[14px] font-semibold text-[#0F172A] mb-1">
              Quick Add
            </h3>
            <p className="text-[12.5px] text-[#64748B] leading-relaxed mb-4">
              Minimal fields. Save jobs fast while actively applying.
            </p>
            <div className="flex items-center gap-1 text-[12.5px] font-medium text-[#10B981] group-hover:gap-2 transition-all">
              Open quick form
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Detailed Add */}
          <div
            onClick={() => extractAndNavigate("/jobs/detailed-add")}
            className="bg-white border border-[#E2E8F0] hover:border-[#26A9C9] rounded-xl p-5 cursor-pointer transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#EEF2FF] flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6366F1"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
            </div>
            <h3 className="text-[14px] font-semibold text-[#0F172A] mb-1">
              Detailed Add
            </h3>
            <p className="text-[12.5px] text-[#64748B] leading-relaxed mb-4">
              Full tracking — salary, priority, notes, timeline and more.
            </p>
            <div className="flex items-center gap-1 text-[12.5px] font-medium text-[#6366F1] group-hover:gap-2 transition-all">
              Open detailed form
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Extract button — full width below cards */}
        {jd.trim() && (
          <button
            onClick={() => extractAndNavigate("/jobs/detailed-add")}
            disabled={loading}
            className="w-full h-[44px] flex items-center justify-center gap-2 bg-[#26A9C9] hover:bg-[#1F9DBD] text-white text-[13px] font-semibold rounded-xl transition-colors disabled:opacity-60"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
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
                Extracting with AI...
              </>
            ) : (
              <>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                Extract with AI & Open Detailed Form
              </>
            )}
          </button>
        )}
      </div>
    </DashboardLayout>
  );
}

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import DashboardLayout from "../../layouts/DashboardLayout";
// import axios from "axios";

// const EXTRACTED_FIELDS = [
//   { icon: "ti-building", label: "Company name" },
//   { icon: "ti-mail", label: "HR email" },
//   { icon: "ti-phone", label: "Phone number" },
//   { icon: "ti-map-pin", label: "Job location" },
//   { icon: "ti-link", label: "Apply link" },
//   { icon: "ti-briefcase", label: "Job role" },
//   { icon: "ti-clock", label: "Experience needed" },
//   { icon: "ti-coin", label: "Salary range" },
// ];

// export default function AddJobOptionsPage() {
//   const navigate = useNavigate();
//   const [jd, setJd] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const extractAndNavigate = async (route) => {
//     if (!jd.trim()) {
//       navigate(route);
//       return;
//     }
//     try {
//       setLoading(true);
//       setError("");
//       const token = localStorage.getItem("token");
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/ai/extract`,
//         new URLSearchParams({ jobDescription: jd }),
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//         },
//       );
//       navigate(route, { state: { prefill: res.data.data } });
//     } catch (err) {
//       setError("AI extraction failed. Opening form without prefill...");
//       setTimeout(() => navigate(route), 1500);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleExtractOnly = async () => {
//     await extractAndNavigate("/jobs/add");
//   };

//   return (
//     <DashboardLayout>
//       <div className="max-w-3xl mx-auto px-4 py-10">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <span className="inline-flex items-center gap-2 text-xs text-slate-400 border border-slate-700 rounded-full px-3 py-1 mb-4">
//             <i className="ti ti-briefcase text-xs" />
//             Job Tracker Pro
//           </span>
//           <h1 className="text-3xl font-semibold text-white mb-2">
//             Add a job application
//           </h1>
//           <p className="text-slate-400 text-sm">
//             Paste a job description to auto-fill, or choose how to add manually.
//           </p>
//         </div>

//         {/* JD Box */}
//         <div className="bg-[#12141A] border border-slate-800 rounded-2xl p-5 mb-5">
//           <div className="flex items-center gap-3 mb-3">
//             <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
//               <i className="ti ti-sparkles text-amber-400 text-base" />
//             </div>
//             <div>
//               <p className="text-sm font-medium text-white">
//                 Paste job description
//               </p>
//             </div>
//             <span className="ml-auto text-xs text-slate-500">
//               Optional — AI extracts details automatically
//             </span>
//           </div>

//           <textarea
//             value={jd}
//             onChange={(e) => setJd(e.target.value)}
//             placeholder="Paste the full job description here — company name, email, phone, location, role, salary and apply link will be extracted automatically..."
//             rows={5}
//             className="w-full bg-[#0d0f14] border border-slate-700 rounded-xl p-3 text-sm text-slate-300 placeholder-slate-600 resize-none focus:outline-none focus:border-amber-500/50 transition"
//           />

//           <div className="flex items-center justify-between mt-3">
//             <div className="flex items-center gap-3 flex-wrap">
//               {["Company", "Email", "Phone", "Location", "Apply link"].map(
//                 (f) => (
//                   <span
//                     key={f}
//                     className="text-xs text-slate-500 flex items-center gap-1"
//                   >
//                     <i className="ti ti-check text-slate-600 text-xs" />
//                     {f}
//                   </span>
//                 ),
//               )}
//             </div>
//             <button
//               onClick={handleExtractOnly}
//               disabled={loading || !jd.trim()}
//               className="flex items-center gap-2 text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 px-4 py-1.5 rounded-full hover:bg-amber-500/20 transition disabled:opacity-40 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <>
//                   <i className="ti ti-loader-2 animate-spin text-xs" />{" "}
//                   Extracting...
//                 </>
//               ) : (
//                 <>
//                   <i className="ti ti-sparkles text-xs" /> Extract with AI
//                 </>
//               )}
//             </button>
//           </div>

//           {error && (
//             <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
//               <i className="ti ti-alert-circle text-xs" />
//               {error}
//             </p>
//           )}
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           {/* Quick Add */}
//           <div
//             onClick={() => extractAndNavigate("/jobs/quick-add")}
//             className="bg-[#12141A] border border-slate-800 rounded-2xl p-5 cursor-pointer hover:border-emerald-500/50 transition group relative"
//           >
//             <span className="absolute top-3 right-3 text-[10px] font-medium bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full">
//               Most used
//             </span>
//             <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
//               <i className="ti ti-bolt text-emerald-400 text-lg" />
//             </div>
//             <h3 className="text-sm font-medium text-white mb-1">Quick add</h3>
//             <p className="text-xs text-slate-500 mb-4 leading-relaxed">
//               Minimal fields. Save jobs fast while actively applying.
//             </p>
//             <div className="flex items-center gap-1 text-xs font-medium text-emerald-400">
//               Open quick form
//               <i className="ti ti-arrow-right text-xs group-hover:translate-x-0.5 transition" />
//             </div>
//           </div>

//           {/* Detailed Add */}
//           <div
//             onClick={() => extractAndNavigate("/jobs/add")}
//             className="bg-[#12141A] border border-slate-800 rounded-2xl p-5 cursor-pointer hover:border-indigo-500/50 transition group"
//           >
//             <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4">
//               <i className="ti ti-file-text text-indigo-400 text-lg" />
//             </div>
//             <h3 className="text-sm font-medium text-white mb-1">
//               Detailed add
//             </h3>
//             <p className="text-xs text-slate-500 mb-4 leading-relaxed">
//               Full tracking — salary, priority, notes, timeline and more.
//             </p>
//             <div className="flex items-center gap-1 text-xs font-medium text-indigo-400">
//               Open detailed form
//               <i className="ti ti-arrow-right text-xs group-hover:translate-x-0.5 transition" />
//             </div>
//           </div>

//           {/* AI Smart Fill */}
//           <div
//             onClick={() => (jd.trim() ? extractAndNavigate("/jobs/add") : null)}
//             className={`bg-[#12141A] border border-slate-800 rounded-2xl p-5 transition group relative ${jd.trim() ? "cursor-pointer hover:border-blue-500/50" : "opacity-50 cursor-not-allowed"}`}
//           >
//             <span className="absolute top-3 right-3 text-[10px] font-medium bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full">
//               AI powered
//             </span>
//             <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
//               <i className="ti ti-robot text-blue-400 text-lg" />
//             </div>
//             <h3 className="text-sm font-medium text-white mb-1">
//               AI smart fill
//             </h3>
//             <p className="text-xs text-slate-500 mb-4 leading-relaxed">
//               Paste JD above, then open any form pre-filled instantly.
//             </p>
//             <div className="flex items-center gap-1 text-xs font-medium text-blue-400">
//               {jd.trim() ? "Use AI + detailed form" : "Paste JD above first"}
//               <i className="ti ti-arrow-right text-xs group-hover:translate-x-0.5 transition" />
//             </div>
//           </div>
//         </div>

//         {/* What gets extracted */}
//         <p className="text-xs text-slate-600 text-center mb-3">
//           What gets extracted automatically
//         </p>
//         <div className="grid grid-cols-4 gap-2">
//           {EXTRACTED_FIELDS.map(({ icon, label }) => (
//             <div
//               key={label}
//               className="flex items-center gap-2 bg-[#12141A] border border-slate-800 rounded-xl px-3 py-2"
//             >
//               <i className={`ti ${icon} text-slate-500 text-sm`} />
//               <span className="text-xs text-slate-500">{label}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }

// import { useNavigate } from 'react-router-dom'
// import DashboardLayout from '../../layouts/DashboardLayout'
// import {
//   Zap,
//   FileText,
//   ArrowRight,
// } from 'lucide-react'

// export default function AddJobOptionsPage() {
//   const navigate = useNavigate()

//   return (
//     <DashboardLayout>
//       <div className='min-h-[80vh] flex items-center justify-center p-5'>

//         <div className='w-full max-w-4xl'>

//           <div className='text-center mb-10'>
//             <h1 className='text-4xl font-bold text-white'>
//               Add New Job
//             </h1>

//             <p className='text-slate-400 mt-3'>
//               Choose how you want to add your application
//             </p>
//           </div>

//           <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

//             {/* QUICK ADD */}
//             <div
//               onClick={() => navigate('/jobs/quick-add')}
//               className='bg-[#12141A] border border-slate-800 rounded-3xl p-8 cursor-pointer hover:border-cyan-500 transition group'
//             >
//               <div className='w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6'>
//                 <Zap className='w-7 h-7 text-cyan-400' />
//               </div>

//               <h2 className='text-2xl font-semibold text-white mb-3'>
//                 Quick Add
//               </h2>

//               <p className='text-slate-400 leading-relaxed mb-6'>
//                 Save jobs quickly while applying.
//                 Minimal fields for fast tracking.
//               </p>

//               <div className='flex items-center gap-2 text-cyan-400 font-medium'>
//                 Open Quick Form
//                 <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition' />
//               </div>
//             </div>

//             {/* DETAILED ADD */}
//             <div
//               onClick={() => navigate('/jobs/add')}
//               className='bg-[#12141A] border border-slate-800 rounded-3xl p-8 cursor-pointer hover:border-indigo-500 transition group'
//             >
//               <div className='w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6'>
//                 <FileText className='w-7 h-7 text-indigo-400' />
//               </div>

//               <h2 className='text-2xl font-semibold text-white mb-3'>
//                 Detailed Add
//               </h2>

//               <p className='text-slate-400 leading-relaxed mb-6'>
//                 Full application tracking with salary,
//                 notes, priority, timeline, and more.
//               </p>

//               <div className='flex items-center gap-2 text-indigo-400 font-medium'>
//                 Open Detailed Form
//                 <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition' />
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   )
// }
