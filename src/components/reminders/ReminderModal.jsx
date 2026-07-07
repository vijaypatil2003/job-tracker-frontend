import { useEffect } from "react";
import { useForm } from "react-hook-form";

const TYPES = ["follow-up", "interview", "deadline", "task", "general"];
const PRIORITIES = ["Low", "Medium", "High"];
const RECURRENCE = ["daily", "weekly", "monthly"];

function formatDateTimeLocal(date) {
  if (!date) return "";
  const d = new Date(date);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function ReminderModal({ reminder, onSave, onClose, isSaving }) {
  const isEdit = !!reminder?._id;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      type: "general",
      priority: "Medium",
      remindAt: "",
      sendEmail: false,
      isRecurring: false,
      recurrencePattern: "weekly",
    },
  });

  const isRecurring = watch("isRecurring");

  useEffect(() => {
    if (reminder) {
      reset({
        title: reminder.title || "",
        description: reminder.description || "",
        type: reminder.type || "general",
        priority: reminder.priority || "Medium",
        remindAt: formatDateTimeLocal(reminder.remindAt),
        sendEmail: reminder.sendEmail || false,
        isRecurring: reminder.isRecurring || false,
        recurrencePattern: reminder.recurrencePattern || "weekly",
      });
    }
  }, [reminder]);

  const inputClass =
    "w-full h-[38px] px-3 text-sm text-[#1E293B] bg-white border border-[#CBD5E1] rounded-lg outline-none placeholder:text-[#94A3B8] focus:border-[#26A9C9] focus:ring-2 focus:ring-[#26A9C9]/15 transition-all";
  const selectClass =
    "w-full h-[38px] px-3 text-sm text-[#1E293B] bg-white border border-[#CBD5E1] rounded-lg outline-none focus:border-[#26A9C9] focus:ring-2 focus:ring-[#26A9C9]/15 transition-all";
  const labelClass = "block text-[12px] font-medium text-[#334155] mb-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="bg-white border border-[#E2E8F0] rounded-2xl w-full max-w-md shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#F1F5F9]">
          <h3 className="text-[15px] font-semibold text-[#0F172A]">
            {isEdit ? "Edit Reminder" : "Add Reminder"}
          </h3>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 2l12 12M14 2L2 14"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSave)} className="p-5 space-y-4">
          {/* Title */}
          <div>
            <label className={labelClass}>
              Title <span className="text-red-500">*</span>
            </label>
            <input
              className={inputClass}
              placeholder="e.g. Follow up with Google HR"
              {...register("title", { required: "Title is required." })}
            />
            {errors.title && (
              <p className="text-xs text-red-600 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              rows={2}
              className="w-full px-3 py-2 text-sm text-[#1E293B] bg-white border border-[#CBD5E1] rounded-lg outline-none placeholder:text-[#94A3B8] focus:border-[#26A9C9] focus:ring-2 focus:ring-[#26A9C9]/15 transition-all resize-none"
              placeholder="Optional notes..."
              {...register("description")}
            />
          </div>

          {/* Type + Priority */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Type</label>
              <select className={selectClass} {...register("type")}>
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Priority</label>
              <select className={selectClass} {...register("priority")}>
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Remind At */}
          <div>
            <label className={labelClass}>
              Remind At <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              className={inputClass}
              {...register("remindAt", { required: "Date is required." })}
            />
            {errors.remindAt && (
              <p className="text-xs text-red-600 mt-1">
                {errors.remindAt.message}
              </p>
            )}
          </div>

          {/* Toggles */}
          <div className="space-y-2.5">
            {/* Send Email */}
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded accent-[#26A9C9]"
                {...register("sendEmail")}
              />
              <span className="text-[13px] text-[#475569]">
                Send email reminder
              </span>
            </label>

            {/* Recurring */}
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded accent-[#26A9C9]"
                {...register("isRecurring")}
              />
              <span className="text-[13px] text-[#475569]">
                Recurring reminder
              </span>
            </label>

            {/* Recurrence pattern */}
            {isRecurring && (
              <div className="pl-6">
                <select
                  className={`${selectClass} w-auto`}
                  {...register("recurrencePattern")}
                >
                  {RECURRENCE.map((r) => (
                    <option key={r} value={r}>
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 h-[40px] bg-[#26A9C9] hover:bg-[#1F9DBD] text-white text-[13px] font-semibold rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isSaving ? (
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
                  Saving...
                </>
              ) : isEdit ? (
                "Save Changes"
              ) : (
                "Add Reminder"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 h-[40px] bg-white border border-[#E2E8F0] hover:border-[#94A3B8] text-[#475569] text-[13px] font-medium rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
