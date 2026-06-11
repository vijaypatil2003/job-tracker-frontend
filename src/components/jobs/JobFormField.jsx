import { forwardRef } from "react";

export function JobFormField({ label, error, required, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[13px] font-medium text-[#334155]">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-xs text-red-600">
          {error.message}
        </p>
      )}
    </div>
  );
}

export const JobInput = forwardRef(
  ({ hasError, className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full h-[40px] px-3 text-sm text-[#1E293B] bg-white border rounded-lg outline-none placeholder:text-[#94A3B8] transition-all
      ${
        hasError
          ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
          : "border-[#CBD5E1] hover:border-[#94A3B8] focus:border-[#26A9C9] focus:ring-2 focus:ring-[#26A9C9]/15"
      } ${className}`}
      {...props}
    />
  ),
);
JobInput.displayName = "JobInput";

export const JobSelect = forwardRef(
  ({ hasError, className = "", children, ...props }, ref) => (
    <select
      ref={ref}
      className={`w-full h-[40px] px-3 text-sm text-[#1E293B] bg-white border rounded-lg outline-none transition-all
      ${
        hasError
          ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
          : "border-[#CBD5E1] hover:border-[#94A3B8] focus:border-[#26A9C9] focus:ring-2 focus:ring-[#26A9C9]/15"
      } ${className}`}
      {...props}
    >
      {children}
    </select>
  ),
);
JobSelect.displayName = "JobSelect";

export const JobTextarea = forwardRef(
  ({ hasError, className = "", ...props }, ref) => (
    <textarea
      ref={ref}
      className={`w-full px-3 py-2.5 text-sm text-[#1E293B] bg-white border rounded-lg outline-none placeholder:text-[#94A3B8] transition-all resize-none
      ${
        hasError
          ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
          : "border-[#CBD5E1] hover:border-[#94A3B8] focus:border-[#26A9C9] focus:ring-2 focus:ring-[#26A9C9]/15"
      } ${className}`}
      {...props}
    />
  ),
);
JobTextarea.displayName = "JobTextarea";
