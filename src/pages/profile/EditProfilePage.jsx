import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import ProfileSidebar from "../../components/profile/ProfileSidebar";
import BasicInfoSection from "../../components/profile/BasicInfoSection";
import SummarySection from "../../components/profile/SummarySection";
import SkillsSection from "../../components/profile/SkillsSection";
import EducationSection from "../../components/profile/EducationSection";
import ExperienceSection from "../../components/profile/ExperienceSection";
import CareerPreferencesSection from "../../components/profile/CareerPreferencesSection";

const BASE = import.meta.env.VITE_API_URL;

function authHeaders() {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
}

const SECTIONS = [
  { key: "basic", label: "Basic Info" },
  { key: "summary", label: "Summary" },
  { key: "skills", label: "Skills" },
  { key: "education", label: "Education" },
  { key: "experience", label: "Experience" },
  { key: "career", label: "Career Preferences" },
];

export default function EditProfilePage() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  // Completion sections
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

  // Fetch existing profile and prefill
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${BASE}/profile`, authHeaders());
        const profile = res.data.data;

        reset({
          name: profile.name || "",
          email: profile.email || "",
          phone: profile.phone || "",
          location: profile.location || "",
          linkedin: profile.linkedin || "",
          github: profile.github || "",
          portfolio: profile.portfolio || "",
          summary: profile.summary || "",
          preferredRole: profile.careerPreferences?.preferredRole || "",
          preferredLocation: profile.careerPreferences?.preferredLocation || "",
          employmentTypes: profile.careerPreferences?.employmentTypes || [],
        });

        setSkills(profile.skills || []);
        setEducation(profile.education || []);
        setExperience(profile.experience || []);
      } catch (err) {
        toast.error("Failed to load profile.");
        navigate("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Resume parse autofill
  const handleParsed = (data) => {
    setValue("name", data.name || "");
    setValue("email", data.email || "");
    setValue("phone", data.phone || "");
    setValue("location", data.location || "");
    setValue("summary", data.summary || "");
    if (data.skills?.length) setSkills(data.skills);
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
    try {
      await axios.put(
        `${BASE}/profile`,
        {
          ...formData,
          skills,
          education,
          experience,
        },
        authHeaders(),
      );
      toast.success("Profile updated.");
      navigate("/profile");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to update profile. Try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#EAF3F6] flex items-center justify-center">
        <svg
          className="animate-spin size-6 text-[#26A9C9]"
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EAF3F6] font-sans">
      {/* Top bar */}
      <header className="bg-white border-b border-[#E2E8F0] px-6 py-3.5 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate("/profile")}
            className="w-8 h-8 rounded-lg border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:border-[#94A3B8] transition-colors"
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
          <div className="flex items-center gap-2">
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
            <span className="text-[#0F172A] text-[14px] font-semibold">
              Acme
            </span>
          </div>
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
          <h1 className="text-[20px] font-bold text-[#0F172A]">Edit Profile</h1>
          <p className="text-[13px] text-[#64748B] mt-0.5">
            Keep your profile updated for accurate job fit scoring.
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

            {/* Action buttons */}
            <div className="flex items-center gap-3 pb-8">
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 sm:flex-none sm:px-8 h-[46px] bg-[#26A9C9] hover:bg-[#1F9DBD] text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                ) : (
                  "Save Changes"
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="flex-1 sm:flex-none sm:px-6 h-[46px] bg-white border border-[#CBD5E1] hover:border-[#94A3B8] text-[#475569] text-sm font-medium rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
