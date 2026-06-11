import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { createJob } from "../../api/jobs.api";
import JobFormSection from "../../components/jobs/JobFormSection";
import {
  JobFormField,
  JobInput,
  JobSelect,
  JobTextarea,
} from "../../components/jobs/JobFormField";
import { toast } from "react-toastify";

const SOURCES = [
  "LinkedIn",
  "Naukri",
  "Indeed",
  "Referral",
  "Company Website",
  "AngelList",
  "Glassdoor",
  "Other",
];
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

export default function QuickAddJobPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const prefill = location.state?.prefill;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      status: "Applied",
      source: "Other",
    },
  });

  useEffect(() => {
    if (prefill) {
      reset({
        status: "Applied",
        source: "Other",
        companyName:
          prefill.companyName !== "Not Found" ? prefill.companyName : "",
        jobRole: prefill.jobRole !== "Not Found" ? prefill.jobRole : "",
        jobUrl: prefill.applyLink !== "Not Found" ? prefill.applyLink : "",
        hrEmail: prefill.email !== "Not Found" ? prefill.email : "",
        phone: prefill.phone !== "Not Found" ? prefill.phone : "",
        location: prefill.location !== "Not Found" ? prefill.location : "",
        jobDescription: prefill.jobDescription || "",
      });
    }
  }, [prefill]);

  const onSubmit = async (data) => {
    try {
      await createJob(data);
      toast.success("Application saved.");
      navigate("/jobs");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save. Try again.");

      console.error("Failed to add job", err);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-lg border border-[#E2E8F0] bg-white flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:border-[#94A3B8] transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 3L5 8l5 5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-[18px] font-bold text-[#0F172A]">Quick Add</h1>
            <p className="text-[12px] text-[#64748B]">
              Save applications fast while actively applying.
            </p>
          </div>
          {prefill && (
            <span className="ml-auto text-[11px] font-medium bg-[#EAF3F6] text-[#26A9C9] border border-[#26A9C9]/20 px-2.5 py-1 rounded-full">
              AI prefilled
            </span>
          )}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
        >
          <JobFormSection title="Job Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <JobFormField
                label="Company Name"
                error={errors.companyName}
                required
              >
                <JobInput
                  placeholder="OpenAI"
                  hasError={!!errors.companyName}
                  {...register("companyName", {
                    required: "Company name is required.",
                  })}
                />
              </JobFormField>

              <JobFormField label="Job Role" error={errors.jobRole} required>
                <JobInput
                  placeholder="Frontend Engineer"
                  hasError={!!errors.jobRole}
                  {...register("jobRole", {
                    required: "Job role is required.",
                  })}
                />
              </JobFormField>

              <JobFormField label="Job URL" error={errors.jobUrl}>
                <JobInput
                  placeholder="https://..."
                  hasError={!!errors.jobUrl}
                  {...register("jobUrl")}
                />
              </JobFormField>

              <JobFormField label="Location" error={errors.location}>
                <JobInput
                  placeholder="Pune, Remote"
                  hasError={!!errors.location}
                  {...register("location")}
                />
              </JobFormField>

              <JobFormField label="HR Email" error={errors.hrEmail}>
                <JobInput
                  type="email"
                  placeholder="hr@company.com"
                  hasError={!!errors.hrEmail}
                  {...register("hrEmail")}
                />
              </JobFormField>

              <JobFormField label="Phone" error={errors.phone}>
                <JobInput
                  placeholder="+91 98765 43210"
                  hasError={!!errors.phone}
                  {...register("phone")}
                />
              </JobFormField>

              <JobFormField label="Status" error={errors.status}>
                <JobSelect {...register("status")}>
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </JobSelect>
              </JobFormField>

              <JobFormField label="Source" error={errors.source}>
                <JobSelect {...register("source")}>
                  {SOURCES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </JobSelect>
              </JobFormField>

              <JobFormField
                label={
                  <span className="flex items-center gap-1.5">
                    Job Description
                    <span className="text-[11px] font-normal text-[#017896] bg-[#EAF3F6] px-2 py-0.5 rounded-full border border-[#26A9C9]/20">
                      Required for Fit Score
                    </span>
                  </span>
                }
                error={errors.jobDescription}
              >
                <JobTextarea
                  rows={3}
                  placeholder="Paste job description here — required for AI fit scoring..."
                  {...register("jobDescription")}
                />
              </JobFormField>
            </div>
          </JobFormSection>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-[44px] bg-[#26A9C9] hover:bg-[#1F9DBD] text-white text-[13px] font-semibold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
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
              ) : (
                "Save Application"
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 h-[44px] bg-white border border-[#E2E8F0] hover:border-[#94A3B8] text-[#475569] text-[13px] font-medium rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

// import React from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { createJob } from "../../api/jobs.api";
// import DashboardLayout from "../../layouts/DashboardLayout";
// import {
//   Building2,
//   Briefcase,
//   Link as LinkIcon,
//   Mail,
//   Phone,
//   MapPin,
//   Save,
// } from "lucide-react";

// export default function QuickAddJobPage() {
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       // console.log(data);
//       await createJob(data);

//       // axios post request here

//       navigate("/jobs");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const InputField = ({
//     label,
//     icon: Icon,
//     registerName,
//     placeholder,
//     type = "text",
//   }) => (
//     <div className="flex flex-col gap-2">
//       <label className="text-sm text-slate-300">{label}</label>

//       <div className="relative">
//         <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />

//         <input
//           type={type}
//           placeholder={placeholder}
//           {...register(registerName)}
//           className="w-full bg-[#12141A] border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
//         />
//       </div>
//     </div>
//   );

//   return (
//     <DashboardLayout>
//       <div className="max-w-2xl mx-auto pb-10">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-white">Quick Add Job</h1>

//           <p className="text-slate-400 mt-2">
//             Save applications quickly while applying.
//           </p>
//         </div>

//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="bg-[#12141A] border border-slate-800 rounded-3xl p-6 space-y-5"
//         >
//           <InputField
//             label="Company Name"
//             icon={Building2}
//             registerName="companyName"
//             placeholder="OpenAI"
//           />

//           <InputField
//             label="Job Role"
//             icon={Briefcase}
//             registerName="jobRole"
//             placeholder="Frontend Developer"
//           />

//           <InputField
//             label="Job Link"
//             icon={LinkIcon}
//             registerName="jobUrl"
//             placeholder="https://..."
//           />

//           <InputField
//             label="HR Email"
//             icon={Mail}
//             registerName="hrEmail"
//             placeholder="hr@company.com"
//             type="email"
//           />

//           <InputField
//             label="HR Phone"
//             icon={Phone}
//             registerName="phone"
//             placeholder="+91 9876543210"
//           />

//           <InputField
//             label="Company Address"
//             icon={MapPin}
//             registerName="address"
//             placeholder="Pune, Maharashtra"
//           />

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition"
//           >
//             <Save className="w-4 h-4" />

//             {isSubmitting ? "Saving..." : "Save Job"}
//           </button>
//         </form>
//       </div>
//     </DashboardLayout>
//   );
// }
