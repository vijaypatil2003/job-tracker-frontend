import { useNavigate } from "react-router-dom";
import HRCallDot from "../HRCallDot";

const STATUS_CONFIG = {
  Applied: { color: "#3B82F6", bg: "#EFF6FF" },
  Interview: { color: "#8B5CF6", bg: "#F5F3FF" },
  Assignment: { color: "#F59E0B", bg: "#FFFBEB" },
  "HR Round": { color: "#EC4899", bg: "#FDF2F8" },
  "Technical Round": { color: "#6366F1", bg: "#EEF2FF" },
  "Offer Received": { color: "#10B981", bg: "#ECFDF5" },
  Selected: { color: "#059669", bg: "#D1FAE5" },
  Rejected: { color: "#EF4444", bg: "#FEF2F2" },
  "Not Applied": { color: "#94A3B8", bg: "#F8FAFC" },
};

const PRIORITY_CONFIG = {
  Urgent: { color: "#EF4444", bg: "#FEF2F2" },
  High: { color: "#F59E0B", bg: "#FFFBEB" },
  Medium: { color: "#3B82F6", bg: "#EFF6FF" },
  Low: { color: "#94A3B8", bg: "#F8FAFC" },
};

export default function JobDetailHeader({ job, onDelete }) {
  const navigate = useNavigate();
  const statusConfig =
    STATUS_CONFIG[job?.status] || STATUS_CONFIG["Not Applied"];
  const priorityConfig =
    PRIORITY_CONFIG[job?.priority] || PRIORITY_CONFIG["Medium"];

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          {/* Avatar */}
          <div className="relative inline-flex shrink-0">
            <div className="w-12 h-12 rounded-xl bg-[#EAF3F6] border border-[#E2E8F0] flex items-center justify-center text-[18px] font-bold text-[#26A9C9]">
              {job?.companyName?.charAt(0)?.toUpperCase() || "?"}
            </div>
            {/* HR Call status dot */}
            <div className="absolute -bottom-0.5 -right-0.5">
              <HRCallDot
                job={job}
                onUpdated={(updatedJob) => onUpdated?.(updatedJob)}
              />
            </div>
          </div>
          <div>
            <h1 className="text-[18px] font-bold text-[#0F172A]">
              {job?.jobRole || "—"}
            </h1>
            <p className="text-[14px] text-[#64748B] mt-0.5">
              {job?.companyName || "—"}
            </p>
            <div className="flex items-center gap-2 mt-2.5 flex-wrap">
              <span
                className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium"
                style={{
                  color: statusConfig.color,
                  backgroundColor: statusConfig.bg,
                }}
              >
                {job?.status}
              </span>
              {job?.priority && (
                <span
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium"
                  style={{
                    color: priorityConfig.color,
                    backgroundColor: priorityConfig.bg,
                  }}
                >
                  {job?.priority}
                </span>
              )}
              {job?.jobType && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#F1F5F9] text-[#475569]">
                  {job?.jobType}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {job?.jobUrl && (
            <a
              href={job.jobUrl}
              target="_blank"
              rel="noreferrer"
              className="h-[34px] px-3 flex items-center gap-1.5 bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#94A3B8] text-[#475569] text-[12px] font-medium rounded-lg transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-3M9 2h5v5M8 8l6-6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Job URL
            </a>
          )}
          <button
            onClick={() => navigate(`/jobs/${job?._id}/edit`)}
            className="h-[34px] px-3 flex items-center gap-1.5 bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#94A3B8] text-[#475569] text-[12px] font-medium rounded-lg transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path
                d="M11.5 2.5a1.414 1.414 0 012 2L5 13H3v-2L11.5 2.5z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Edit
          </button>
          <button
            onClick={onDelete}
            className="h-[34px] px-3 flex items-center gap-1.5 bg-red-50 border border-red-200 hover:bg-red-100 text-red-600 text-[12px] font-medium rounded-lg transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9a1 1 0 001 1h6a1 1 0 001-1l1-9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
