import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ProfileSidebar from "../../components/profile/ProfileSidebar";
import BasicInfoSection from "../../components/profile/BasicInfoSection";
import SummarySection from "../../components/profile/SummarySection";
import SkillsSection from "../../components/profile/SkillsSection";
import EducationSection from "../../components/profile/EducationSection";
import ExperienceSection from "../../components/profile/ExperienceSection";
import CareerPreferencesSection from "../../components/profile/CareerPreferencesSection";
import ResumeUpload from "../../components/profile/ResumeUpload";

const SECTIONS = [
  { key: "basic", label: "Basic Info" },
  { key: "summary", label: "Summary" },
  { key: "skills", label: "Skills" },
  { key: "education", label: "Education" },
  { key: "experience", label: "Experience" },
  { key: "career", label: "Career Preferences" },
];

export default function CompleteProfilePage() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.data) {
          navigate("/profile");
        }
      } catch (err) {
        if (err?.response?.status !== 404) {
          console.error(err);
        }
        // 404 = no profile yet = stay on page
      }
    };
    checkProfile();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      portfolio: "",
      summary: "",
      preferredRole: "",
      preferredLocation: "",
      employmentTypes: [],
    },
  });

  const watchedValues = watch();

  // Dynamic completion percentage
  const completionSections = [
    {
      label: "Basic Info",
      completed: !!(watchedValues.name && watchedValues.email),
    },
    { label: "Summary", completed: !!(watchedValues.summary?.length > 20) },
    { label: "Skills", completed: skills.length > 0 },
    { label: "Education", completed: education.length > 0 },
    { label: "Experience", completed: experience.length > 0 },
    { label: "Career Preferences", completed: !!watchedValues.preferredRole },
  ];

  const percentage = Math.round(
    (completionSections.filter((s) => s.completed).length /
      completionSections.length) *
      100,
  );

  // Auto-fill from resume parse
  const handleParsed = (data) => {
    // Basic info — use setValue individually
    setValue("name", data.name || "");
    setValue("email", data.email || "");
    setValue("phone", data.phone || "");
    setValue("location", data.location || "");
    setValue("summary", data.summary || "");

    // Skills
    if (data.skills?.length) setSkills(data.skills);

    // Education
    if (data.education?.length) {
      setEducation(
        data.education.map((e) => ({
          degree: e.degree || "",
          institution: e.institution || "",
          startYear: e.startYear || "",
          endYear: e.endYear || "",
        })),
      );
    }

    // Experience
    if (data.experience?.length) {
      setExperience(
        data.experience.map((e) => ({
          title: e.title || "",
          company: e.company || "",
          duration: e.duration || "",
          description: e.description || "",
        })),
      );
    }
  };

  const onSubmit = async (formData) => {
    setIsSaving(true);
    setSaveError("");
    try {
      const token = localStorage.getItem("token");
      const BASE = import.meta.env.VITE_API_URL;
      await axios.post(
        "http://localhost:5000/api/v1/profile",
        { ...formData, skills, education, experience },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Profile saved.");

      navigate("/dashboard");
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Failed to save profile. Try again.";

      setSaveError(
        err?.response?.data?.message || "Failed to save profile. Try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EAF3F6] font-sans">
      {/* Top bar */}
      <header className="bg-white border-b border-[#E2E8F0] px-6 py-3.5 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#26A9C9] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="4" width="10" height="10" rx="2" fill="white" />
              <rect
                x="18"
                y="4"
                width="10"
                height="10"
                rx="2"
                fill="white"
                fillOpacity="0.6"
              />
              <rect
                x="4"
                y="18"
                width="10"
                height="10"
                rx="2"
                fill="white"
                fillOpacity="0.6"
              />
              <rect
                x="18"
                y="18"
                width="10"
                height="10"
                rx="2"
                fill="white"
                fillOpacity="0.3"
              />
            </svg>
          </div>
          <span className="text-[#0F172A] text-[14px] font-semibold">Acme</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:block text-[13px] text-[#64748B]">
            Profile {percentage}% complete
          </span>
          <div className="w-24 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#26A9C9] rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-[20px] font-bold text-[#0F172A]">
            Complete your profile
          </h1>
          <p className="text-[13px] text-[#64748B] mt-0.5">
            Your profile powers job fit scoring — the more you fill in, the
            smarter your matches.
          </p>
        </div>

        <div className="flex gap-6 items-start">
          {/* Sidebar */}
          <ProfileSidebar
            percentage={percentage}
            sections={completionSections}
            onParsed={handleParsed}
          />

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex-1 min-w-0 space-y-4"
          >
            {/* Mobile resume upload */}
            <div className="lg:hidden">
              {/* <import_ResumeUpload onParsed={handleParsed} />
               */}
              <ResumeUpload onParsed={handleParsed} />
            </div>

            <BasicInfoSection register={register} errors={errors} />
            <SummarySection register={register} errors={errors} watch={watch} />
            <SkillsSection skills={skills} setSkills={setSkills} />
            <EducationSection
              education={education}
              setEducation={setEducation}
            />
            <ExperienceSection
              experience={experience}
              setExperience={setExperience}
            />
            <CareerPreferencesSection
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
            />

            {/* Save error */}
            {saveError && (
              <div
                role="alert"
                className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-[13px]"
              >
                <svg
                  className="shrink-0"
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <circle
                    cx="8"
                    cy="8"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8 5v3.5M8 11h.01"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                {saveError}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center gap-3 pb-8">
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 sm:flex-none sm:px-8 h-[46px] bg-[#26A9C9] hover:bg-[#1F9DBD] active:bg-[#1a8fab] text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                    Saving…
                  </>
                ) : (
                  "Save & Continue"
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 sm:flex-none sm:px-6 h-[46px] bg-white border border-[#CBD5E1] hover:border-[#94A3B8] text-[#475569] text-sm font-medium rounded-xl transition-colors"
              >
                Skip for now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
