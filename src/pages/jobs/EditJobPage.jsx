import { toast } from "react-toastify";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getSingleJob, updateJob } from "../../api/jobs.api";
import JobFormSection from "../../components/jobs/JobFormSection";
import {
  JobFormField,
  JobInput,
  JobSelect,
  JobTextarea,
} from "../../components/jobs/JobFormField";

const jobSchema = z.object({
  companyName: z.string().min(2, "Company name is required."),
  jobRole: z.string().min(2, "Job role is required."),
  jobUrl: z.string().url("Must be a valid URL.").or(z.literal("")),
  location: z.string().optional(),
  jobType: z.enum([
    "Full-time",
    "Remote",
    "Hybrid",
    "Onsite",
    "Contract",
    "Freelance",
    "Internship",
  ]),
  status: z.enum([
    "Not Applied",
    "Applied",
    "Interview",
    "Assignment",
    "HR Round",
    "Technical Round",
    "Rejected",
    "Offer Received",
    "Selected",
  ]),
  priority: z.enum(["Low", "Medium", "High", "Urgent"]),
  source: z.enum([
    "LinkedIn",
    "Naukri",
    "Indeed",
    "Referral",
    "Company Website",
    "AngelList",
    "Glassdoor",
    "Other",
  ]),
  salary: z.string().optional(),
  expectedSalary: z.string().optional(),
  hrName: z.string().optional(),
  hrEmail: z.string().email("Invalid email.").or(z.literal("")),
  phone: z.string().optional(),
  appliedDate: z.string().optional(),
  followUpDate: z.string().optional(),
  interviewDate: z.string().optional(),
  notes: z.string().optional(),
  jobDescription: z.string().optional(),
});

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
const PRIORITIES = ["Low", "Medium", "High", "Urgent"];
const JOB_TYPES = [
  "Full-time",
  "Remote",
  "Hybrid",
  "Onsite",
  "Contract",
  "Freelance",
  "Internship",
];
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

function formatDateForInput(date) {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
}

export default function EditJobPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      status: "Applied",
      priority: "Medium",
      jobType: "Onsite",
      source: "Other",
      jobUrl: "",
      hrEmail: "",
    },
  });

  useEffect(() => {
    const fetchAndPrefill = async () => {
      try {
        const res = await getSingleJob(id);
        const job = res.data;
        reset({
          companyName: job.companyName || "",
          jobRole: job.jobRole || "",
          jobUrl: job.jobUrl || "",
          location: job.location || "",
          jobType: job.jobType || "Onsite",
          status: job.status || "Applied",
          priority: job.priority || "Medium",
          source: job.source || "Other",
          salary: job.salary || "",
          expectedSalary: job.expectedSalary || "",
          hrName: job.hrName || "",
          hrEmail: job.hrEmail || "",
          phone: job.phone || "",
          appliedDate: formatDateForInput(job.appliedDate),
          followUpDate: formatDateForInput(job.followUpDate),
          interviewDate: formatDateForInput(job.interviewDate),
          notes: job.notes || "",
          jobDescription: job.jobDescription || "",
        });
      } catch (err) {
        console.error("Failed to load job", err);
      }
    };
    fetchAndPrefill();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      await updateJob(id, data);
      toast.success("Application updated.");

      navigate(`/jobs/${id}`);
    } catch (err) {
      console.error("Failed to update job", err);
      toast.error(
        err?.response?.data?.message || "Failed to update. Try again.",
      );
    }
  };

  return (
    <DashboardLayout title="Edit Application">
      <div className="max-w-4xl mx-auto pb-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(`/jobs/${id}`)}
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
            <h1 className="text-[18px] font-bold text-[#0F172A]">
              Edit Application
            </h1>
            <p className="text-[12px] text-[#64748B]">
              Update your job application details.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
        >
          {/* Section 1 — Core */}
          <JobFormSection title="Core Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <JobFormField
                label="Company Name"
                error={errors.companyName}
                required
              >
                <JobInput
                  placeholder="OpenAI"
                  hasError={!!errors.companyName}
                  {...register("companyName")}
                />
              </JobFormField>

              <JobFormField label="Job Role" error={errors.jobRole} required>
                <JobInput
                  placeholder="Frontend Engineer"
                  hasError={!!errors.jobRole}
                  {...register("jobRole")}
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

              <JobFormField label="Status" error={errors.status}>
                <JobSelect {...register("status")}>
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </JobSelect>
              </JobFormField>

              <JobFormField label="Priority" error={errors.priority}>
                <JobSelect {...register("priority")}>
                  {PRIORITIES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </JobSelect>
              </JobFormField>

              <JobFormField label="Job Type" error={errors.jobType}>
                <JobSelect {...register("jobType")}>
                  {JOB_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
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
            </div>
          </JobFormSection>

          {/* Section 2 — Compensation & Timeline */}
          <JobFormSection title="Compensation & Timeline">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <JobFormField label="Listed Salary" error={errors.salary}>
                <JobInput
                  placeholder="₹8L – ₹12L"
                  hasError={!!errors.salary}
                  {...register("salary")}
                />
              </JobFormField>

              <JobFormField
                label="Expected Salary"
                error={errors.expectedSalary}
              >
                <JobInput
                  placeholder="₹10L"
                  hasError={!!errors.expectedSalary}
                  {...register("expectedSalary")}
                />
              </JobFormField>

              <JobFormField label="Applied Date" error={errors.appliedDate}>
                <JobInput
                  type="date"
                  hasError={!!errors.appliedDate}
                  {...register("appliedDate")}
                />
              </JobFormField>

              <JobFormField label="Follow Up Date" error={errors.followUpDate}>
                <JobInput
                  type="date"
                  hasError={!!errors.followUpDate}
                  {...register("followUpDate")}
                />
              </JobFormField>

              <JobFormField label="Interview Date" error={errors.interviewDate}>
                <JobInput
                  type="date"
                  hasError={!!errors.interviewDate}
                  {...register("interviewDate")}
                />
              </JobFormField>
            </div>
          </JobFormSection>

          {/* Section 3 — Contact */}
          <JobFormSection title="Contact Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <JobFormField label="HR Name" error={errors.hrName}>
                <JobInput
                  placeholder="Jane Doe"
                  hasError={!!errors.hrName}
                  {...register("hrName")}
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
            </div>
          </JobFormSection>

          {/* Section 4 — Notes */}
          <JobFormSection title="Notes & Description">
            <div className="space-y-4">
              <JobFormField
                label="Job Description"
                error={errors.jobDescription}
              >
                <JobTextarea
                  rows={4}
                  placeholder="Paste the job description here..."
                  hasError={!!errors.jobDescription}
                  {...register("jobDescription")}
                />
              </JobFormField>

              <JobFormField label="Personal Notes" error={errors.notes}>
                <JobTextarea
                  rows={3}
                  placeholder="Add context, research, or interview prep notes..."
                  hasError={!!errors.notes}
                  {...register("notes")}
                />
              </JobFormField>
            </div>
          </JobFormSection>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 sm:flex-none sm:px-8 h-[44px] bg-[#26A9C9] hover:bg-[#1F9DBD] text-white text-[13px] font-semibold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                "Save Changes"
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/jobs/${id}`)}
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
