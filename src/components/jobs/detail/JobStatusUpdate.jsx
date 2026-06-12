import { toast } from "react-toastify";import { useState } from "react";
import { updateJob } from "../../../api/jobs.api";

const STATUSES = [
  "Not Applied",
  "Applied",
  "Interview",
  "Assignment",
  "HR Round",
  "Technical Round",
  "Rejected",
  "Offer Received",
  "Selected",
];

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

export default function JobStatusUpdate({ job, onUpdated }) {
  const [status, setStatus] = useState(job?.status || "Applied");
  const [saving, setSaving] = useState(false);
  const config = STATUS_CONFIG[status] || STATUS_CONFIG["Not Applied"];

  const handleUpdate = async (newStatus) => {
    if (newStatus === job?.status) return;
    setSaving(true);
    try {
      const updated = await updateJob(job._id, { status: newStatus });
      setStatus(newStatus);
      onUpdated?.(updated.data);
      toast.success(`Status updated to "${newStatus}"`);
    } catch (err) {
      toast.error("Failed to update status. Try again.");

      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
      <h3 className="text-[13px] font-semibold text-[#0F172A] mb-3">
        Update Status
      </h3>

      {/* Current status */}
      <div
        className="flex items-center justify-between px-3 py-2.5 rounded-lg mb-3"
        style={{ backgroundColor: config.bg }}
      >
        <span
          className="text-[12px] font-medium"
          style={{ color: config.color }}
        >
          Current: {status}
        </span>
        {saving && (
          <svg
            className="animate-spin size-3.5"
            style={{ color: config.color }}
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
        )}
      </div>

      {/* Status options */}
      <div className="space-y-1">
        {STATUSES.map((s) => {
          const c = STATUS_CONFIG[s] || STATUS_CONFIG["Not Applied"];
          const isActive = status === s;
          return (
            <button
              key={s}
              onClick={() => handleUpdate(s)}
              disabled={saving}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] font-medium transition-all text-left ${
                isActive ? "border" : "hover:bg-[#F8FAFC] text-[#475569]"
              }`}
              style={
                isActive
                  ? {
                      backgroundColor: c.bg,
                      color: c.color,
                      borderColor: `${c.color}30`,
                    }
                  : {}
              }
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: isActive ? c.color : "#CBD5E1" }}
              />
              {s}
              {isActive && (
                <svg
                  className="ml-auto"
                  width="13"
                  height="13"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3 8.5L6.5 12L13 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
