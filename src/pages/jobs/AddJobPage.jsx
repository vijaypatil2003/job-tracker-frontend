import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import DashboardLayout from "../../layouts/DashboardLayout";
import { createJob } from "../../api/jobs.api";
import {
  ArrowLeft,
  Building2,
  Briefcase,
  Link as LinkIcon,
  MapPin,
  DollarSign,
  Calendar,
  User,
  Mail,
  Save,
} from "lucide-react";

// --- ZOD VALIDATION SCHEMA ---
const jobSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  jobRole: z.string().min(2, "Job role is required"),
  jobUrl: z.string().url("Must be a valid URL").or(z.literal("")),
  location: z.string().optional(),
  jobType: z.enum([
    "Full-time",
    "Part-time",
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
  priority: z.enum(["High", "Medium", "Low"]),
  salary: z.string().optional(),
  expectedSalary: z.string().optional(),
  hrName: z.string().optional(),
  hrEmail: z.string().email("Invalid email").or(z.literal("")),
  appliedDate: z.string().optional(),
  notes: z.string().optional(),
});

export default function AddJobPage() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location.state:", location.state);
  const prefill = location.state?.prefill;

  // --- FORM SETUP ---
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
      jobType: "Full-time",
      jobUrl: "",
      hrEmail: "",
    },
  });

  useEffect(() => {
    console.log("prefill data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>:", prefill); // check this in console

    if (prefill) {
      reset({
        status: "Applied",
        priority: "Medium",
        jobType: "Full-time",
        companyName:
          prefill.companyName !== "Not Found" ? prefill.companyName : "",
        jobRole: prefill.jobRole !== "Not Found" ? prefill.jobRole : "",
        hrEmail: prefill.email !== "Not Found" ? prefill.email : "",
        phone: prefill.phone !== "Not Found" ? prefill.phone : "",
        location: prefill.location !== "Not Found" ? prefill.location : "",
        salary: prefill.salary !== "Not Found" ? prefill.salary : "",
        jobUrl: prefill.applyLink !== "Not Found" ? prefill.applyLink : "",
      });
    }
  }, [prefill]);

  // --- SUBMIT HANDLER ---
  const onSubmit = async (data) => {
    try {
      // TODO: Replace with React Query mutation / Axios POST request
      // console.log('Form Data Payload:', data);
      await createJob(data);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate back to jobs list on success
      navigate("/jobs");
    } catch (error) {
      console.error("Failed to add job", error);
    }
  };

  // --- REUSABLE INPUT COMPONENT ---
  const InputField = ({
    label,
    id,
    type = "text",
    icon: Icon,
    placeholder,
    registerName,
    error,
  }) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-300">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(registerName)}
          className={`w-full bg-[#12141A] border ${error ? "border-rose-500/50 focus:ring-rose-500" : "border-slate-800/80 focus:border-indigo-500 focus:ring-indigo-500"} text-slate-200 text-sm rounded-lg ${Icon ? "pl-10" : "pl-3"} pr-4 py-2.5 focus:outline-none focus:ring-1 transition placeholder:text-slate-600`}
        />
      </div>
      {error && (
        <span className="text-xs text-rose-400 mt-0.5">{error.message}</span>
      )}
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 bg-[#12141A] border border-slate-800 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-semibold text-slate-100 tracking-tight">
                Add New Job
              </h1>
              <p className="text-sm text-slate-400 mt-0.5">
                Enter the details of your job application.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* SECTION 1: Basic Information */}
          <div className="bg-[#12141A] border border-slate-800/60 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-medium text-slate-200 mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-400" /> Core Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Company Name *"
                id="companyName"
                icon={Building2}
                placeholder="e.g. OpenAI"
                registerName="companyName"
                error={errors.companyName}
              />
              <InputField
                label="Job Role *"
                id="jobRole"
                icon={Briefcase}
                placeholder="e.g. Frontend Engineer"
                registerName="jobRole"
                error={errors.jobRole}
              />
              <InputField
                label="Job Posting URL"
                id="jobUrl"
                icon={LinkIcon}
                placeholder="https://..."
                registerName="jobUrl"
                error={errors.jobUrl}
              />
              <InputField
                label="Location"
                id="location"
                icon={MapPin}
                placeholder="e.g. Remote, San Francisco"
                registerName="location"
                error={errors.location}
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300">
                  Status
                </label>
                <select
                  {...register("status")}
                  className="w-full bg-[#12141A] border border-slate-800/80 text-slate-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                >
                  <option value="Not Applied">Not Applied</option>
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Assignment">Assignment</option>
                  <option value="HR Round">HR Round</option>
                  <option value="Technical Round">Technical Round</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Offer Received">Offer Received</option>
                  <option value="Selected">Selected</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300">
                  Priority
                </label>
                <select
                  {...register("priority")}
                  className="w-full bg-[#12141A] border border-slate-800/80 text-slate-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 2: Salary & Timeline */}
          <div className="bg-[#12141A] border border-slate-800/60 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-medium text-slate-200 mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" /> Compensation &
              Timeline
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Offered/Listed Salary"
                id="salary"
                icon={DollarSign}
                placeholder="e.g. $120k - $140k"
                registerName="salary"
                error={errors.salary}
              />
              <InputField
                label="Expected Salary"
                id="expectedSalary"
                icon={DollarSign}
                placeholder="e.g. $130k"
                registerName="expectedSalary"
                error={errors.expectedSalary}
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300">
                  Job Type
                </label>
                <select
                  {...register("jobType")}
                  className="w-full bg-[#12141A] border border-slate-800/80 text-slate-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <InputField
                label="Date Applied"
                id="appliedDate"
                type="date"
                icon={Calendar}
                registerName="appliedDate"
                error={errors.appliedDate}
              />
            </div>
          </div>

          {/* SECTION 3: Contact & Notes */}
          <div className="bg-[#12141A] border border-slate-800/60 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-medium text-slate-200 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-cyan-400" /> Contact & Additional
              Notes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <InputField
                label="HR / Recruiter Name"
                id="hrName"
                icon={User}
                placeholder="e.g. Jane Doe"
                registerName="hrName"
                error={errors.hrName}
              />
              <InputField
                label="HR Email"
                id="hrEmail"
                type="email"
                icon={Mail}
                placeholder="jane@company.com"
                registerName="hrEmail"
                error={errors.hrEmail}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="notes"
                className="text-sm font-medium text-slate-300"
              >
                Personal Notes
              </label>
              <textarea
                id="notes"
                rows={4}
                placeholder="Add any context, research, or interview prep notes here..."
                {...register("notes")}
                className="w-full bg-[#12141A] border border-slate-800/80 text-slate-200 text-sm rounded-lg p-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition placeholder:text-slate-600 resize-y"
              ></textarea>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 bg-transparent border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800 transition text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed transition text-sm font-medium shadow-sm shadow-indigo-500/20"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSubmitting ? "Saving..." : "Save Application"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
