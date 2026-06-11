import { useState } from "react";

export default function JobContactCard({ job }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    if (!job?.hrEmail) return;
    navigator.clipboard.writeText(job.hrEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!job?.hrName && !job?.hrEmail && !job?.phone) return null;

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
      <h3 className="text-[13px] font-semibold text-[#0F172A] mb-4">Contact</h3>
      <div className="space-y-3">
        {job?.hrName && (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#EAF3F6] flex items-center justify-center shrink-0">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path
                  d="M13 14v-1a4 4 0 00-4-4H7a4 4 0 00-4 4v1"
                  stroke="#26A9C9"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle
                  cx="8"
                  cy="5"
                  r="3"
                  stroke="#26A9C9"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <div>
              <p className="text-[11px] text-[#94A3B8]">HR / Recruiter</p>
              <p className="text-[13px] font-medium text-[#334155]">
                {job.hrName}
              </p>
            </div>
          </div>
        )}

        {job?.hrEmail && (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#EAF3F6] flex items-center justify-center shrink-0">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <rect
                  x="1"
                  y="3"
                  width="14"
                  height="10"
                  rx="1.5"
                  stroke="#26A9C9"
                  strokeWidth="1.5"
                />
                <path
                  d="M1 5l7 5 7-5"
                  stroke="#26A9C9"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-[#94A3B8]">Email</p>
              <p className="text-[13px] font-medium text-[#334155] truncate">
                {job.hrEmail}
              </p>
            </div>
            <button
              onClick={copyEmail}
              className="text-[11px] text-[#26A9C9] hover:text-[#1F9DBD] font-medium transition-colors shrink-0"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}

        {job?.phone && (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#EAF3F6] flex items-center justify-center shrink-0">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path
                  d="M14 10.5v2a1 1 0 01-1.1 1 13.5 13.5 0 01-5.9-2.1 13.5 13.5 0 01-4-4 13.5 13.5 0 01-2.1-5.9A1 1 0 013 1h2a1 1 0 011 .9c.1.8.3 1.6.6 2.3a1 1 0 01-.2 1L5.1 6.5a12 12 0 004 4l1.3-1.3a1 1 0 011-.2c.7.3 1.5.5 2.3.6a1 1 0 01.3 1z"
                  stroke="#26A9C9"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-[11px] text-[#94A3B8]">Phone</p>
              <p className="text-[13px] font-medium text-[#334155]">
                {job.phone}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
