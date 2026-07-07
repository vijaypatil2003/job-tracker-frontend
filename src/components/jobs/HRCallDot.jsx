import { useState } from "react";
import { updateJob } from "../../api/jobs.api";
import { toast } from "react-toastify";

// HR Call Status dot — click to cycle through 4 states
// TODO: delete this comment when in production

const STATUS_CYCLE = [
  "not_called",
  "called",
  "responded_opening",
  "responded_no_opening",
];

const STATUS_CONFIG = {
  not_called: {
    color: "#EF4444", // Red — not called yet
    bg: "#FEF2F2",
    label: "Not Called",
    tooltip: "Haven't called HR yet",
  },
  called: {
    color: "#F59E0B", // Yellow — called, waiting
    bg: "#FFFBEB",
    label: "Called",
    tooltip: "Called HR — waiting for response",
  },
  responded_opening: {
    color: "#10B981", // Green — opening confirmed
    bg: "#ECFDF5",
    label: "Opening Confirmed",
    tooltip: "HR responded — opening confirmed",
  },
  responded_no_opening: {
    color: "#94A3B8", // Gray — no opening
    bg: "#F8FAFC",
    label: "No Opening",
    tooltip: "HR responded — no opening",
  },
};

export default function HRCallDot({ job, onUpdated }) {
  const [saving, setSaving] = useState(false);
  const current = job.hrCallStatus || "not_called";
  const config = STATUS_CONFIG[current];

  const handleClick = async (e) => {
    e.stopPropagation(); // prevent row navigation click

    const currentIndex = STATUS_CYCLE.indexOf(current);
    const nextStatus = STATUS_CYCLE[(currentIndex + 1) % STATUS_CYCLE.length];
    const nextConfig = STATUS_CONFIG[nextStatus];

    setSaving(true);
    try {
      const res = await updateJob(job._id, { hrCallStatus: nextStatus });
      onUpdated(res.data);
      toast.success(`HR call status: ${nextConfig.label}`);
    } catch (err) {
      toast.error("Failed to update HR call status.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={saving}
      title={config.tooltip}
      className="relative shrink-0 focus:outline-none disabled:cursor-wait"
      aria-label={config.tooltip}
    >
      {/* Dot */}
      <span
        className="block w-3 h-3 rounded-full border-2 border-white shadow-sm transition-colors duration-200"
        style={{ backgroundColor: config.color }}
      />
      {/* Saving pulse */}
      {saving && (
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-50"
          style={{ backgroundColor: config.color }}
        />
      )}
    </button>
  );
}
