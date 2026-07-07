import { useState } from "react";
import { updateJob } from "../../api/jobs.api";
import { toast } from "react-toastify";

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

const STATUSES = Object.keys(STATUS_CONFIG);

export default function InlineStatusSelect({ job, onUpdated }) {
  const [saving, setSaving] = useState(false);
  const config = STATUS_CONFIG[job.status] || STATUS_CONFIG["Not Applied"];

  const handleChange = async (e) => {
    const newStatus = e.target.value;
    if (newStatus === job.status) return;

    setSaving(true);
    try {
      const res = await updateJob(job._id, { status: newStatus });
      onUpdated(res.data);
      toast.success(`Status updated to "${newStatus}"`);
    } catch (err) {
      toast.error("Failed to update status.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <select
      value={job.status}
      onChange={handleChange}
      disabled={saving}
      className="text-[11px] font-medium px-2.5 py-1 rounded-full border-0 outline-none cursor-pointer disabled:opacity-60 disabled:cursor-wait"
      style={{ color: config.color, backgroundColor: config.bg }}
    >
      {STATUSES.map((s) => (
        <option
          key={s}
          value={s}
          style={{ color: "#0F172A", backgroundColor: "#fff" }}
        >
          {s}
        </option>
      ))}
    </select>
  );
}
