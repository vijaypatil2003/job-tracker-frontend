import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardLayout from "../../layouts/DashboardLayout";

const BASE = import.meta.env.VITE_API_URL;

function authHeaders() {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
}

// ── Sub components ────────────────────────────────────────────────

function ProfileHeader({ profile, completion }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-2xl bg-[#26A9C9] flex items-center justify-center text-white text-[24px] font-bold shrink-0">
            {profile?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <h1 className="text-[20px] font-bold text-[#0F172A]">
              {profile?.name || "—"}
            </h1>
            <p className="text-[14px] text-[#64748B] mt-0.5">
              {profile?.careerPreferences?.preferredRole || "No role set"}
            </p>
            {profile?.location && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 1.5C5.79 1.5 4 3.29 4 5.5c0 3.25 4 9 4 9s4-5.75 4-9c0-2.21-1.79-4-4-4z"
                    stroke="#64748B"
                    strokeWidth="1.25"
                  />
                  <circle
                    cx="8"
                    cy="5.5"
                    r="1.5"
                    stroke="#64748B"
                    strokeWidth="1.25"
                  />
                </svg>
                <span className="text-[13px] text-[#64748B]">
                  {profile.location}
                </span>
              </div>
            )}
            {/* Social links */}
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              {profile?.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-[12px] text-[#26A9C9] hover:underline"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  LinkedIn
                </a>
              )}
              {profile?.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-[12px] text-[#26A9C9] hover:underline"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  GitHub
                </a>
              )}
              {profile?.portfolio && (
                <a
                  href={profile.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-[12px] text-[#26A9C9] hover:underline"
                >
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-3M9 2h5v5M8 8l6-6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Portfolio
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right side — completion + edit */}
        <div className="flex flex-col items-end gap-3">
          <button
            onClick={() => navigate("/profile/edit")}
            className="flex items-center gap-1.5 px-4 h-[36px] bg-[#26A9C9] hover:bg-[#1F9DBD] text-white text-[13px] font-medium rounded-lg transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path
                d="M11.5 2.5a1.414 1.414 0 012 2L5 13H3v-2L11.5 2.5z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Edit Profile
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-[#64748B]">
              {completion}% complete
            </span>
            <div className="w-24 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#26A9C9] rounded-full transition-all duration-500"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
      <h3 className="text-[14px] font-semibold text-[#0F172A] mb-4">{title}</h3>
      {children}
    </div>
  );
}

function EmptyState({ message }) {
  return <p className="text-[13px] text-[#94A3B8] italic">{message}</p>;
}

function SummarySection({ summary }) {
  return (
    <SectionCard title="About">
      {summary ? (
        <p className="text-[13px] text-[#475569] leading-relaxed">{summary}</p>
      ) : (
        <EmptyState message="No summary added yet." />
      )}
    </SectionCard>
  );
}

function SkillsSection({ skills }) {
  return (
    <SectionCard title="Skills">
      {!skills?.length ? (
        <EmptyState message="No skills added yet." />
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#EAF3F6] text-[#26A9C9] border border-[#26A9C9]/20"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </SectionCard>
  );
}

function ExperienceSection({ experience }) {
  return (
    <SectionCard title="Work Experience">
      {!experience?.length ? (
        <EmptyState message="No experience added yet." />
      ) : (
        <div className="space-y-4">
          {experience.map((exp, i) => (
            <div
              key={i}
              className={`pb-4 ${i < experience.length - 1 ? "border-b border-[#F1F5F9]" : ""}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[13px] font-semibold text-[#0F172A]">
                    {exp.title || "—"}
                  </p>
                  <p className="text-[12px] text-[#64748B] mt-0.5">
                    {exp.company || "—"}
                  </p>
                </div>
                {exp.duration && (
                  <span className="text-[11px] text-[#94A3B8] shrink-0 bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-full">
                    {exp.duration}
                  </span>
                )}
              </div>
              {exp.description && (
                <p className="text-[12.5px] text-[#475569] mt-2 leading-relaxed">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}

function EducationSection({ education }) {
  return (
    <SectionCard title="Education">
      {!education?.length ? (
        <EmptyState message="No education added yet." />
      ) : (
        <div className="space-y-4">
          {education.map((edu, i) => (
            <div
              key={i}
              className={`pb-4 ${i < education.length - 1 ? "border-b border-[#F1F5F9]" : ""}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[13px] font-semibold text-[#0F172A]">
                    {edu.degree || "—"}
                  </p>
                  <p className="text-[12px] text-[#64748B] mt-0.5">
                    {edu.institution || "—"}
                  </p>
                </div>
                {(edu.startYear || edu.endYear) && (
                  <span className="text-[11px] text-[#94A3B8] shrink-0 bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-full">
                    {edu.startYear} — {edu.endYear}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}

function CareerPreferencesSection({ careerPreferences }) {
  const { preferredRole, preferredLocation, employmentTypes } =
    careerPreferences || {};

  return (
    <SectionCard title="Career Preferences">
      {!preferredRole && !preferredLocation && !employmentTypes?.length ? (
        <EmptyState message="No career preferences set." />
      ) : (
        <div className="space-y-3">
          {preferredRole && (
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-[#94A3B8] w-32 shrink-0">
                Preferred Role
              </span>
              <span className="text-[13px] font-medium text-[#334155]">
                {preferredRole}
              </span>
            </div>
          )}
          {preferredLocation && (
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-[#94A3B8] w-32 shrink-0">
                Preferred Location
              </span>
              <span className="text-[13px] font-medium text-[#334155]">
                {preferredLocation}
              </span>
            </div>
          )}
          {employmentTypes?.length > 0 && (
            <div className="flex items-start gap-2">
              <span className="text-[12px] text-[#94A3B8] w-32 shrink-0 mt-1">
                Employment Type
              </span>
              <div className="flex flex-wrap gap-1.5">
                {employmentTypes.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#EAF3F6] text-[#26A9C9] border border-[#26A9C9]/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </SectionCard>
  );
}

function ContactSection({ profile }) {
  return (
    <SectionCard title="Contact">
      <div className="space-y-3">
        {[
          { label: "Email", value: profile?.email },
          { label: "Phone", value: profile?.phone },
          { label: "Location", value: profile?.location },
        ].map(({ label, value }) =>
          value ? (
            <div key={label} className="flex items-center gap-2">
              <span className="text-[12px] text-[#94A3B8] w-20 shrink-0">
                {label}
              </span>
              <span className="text-[13px] font-medium text-[#334155]">
                {value}
              </span>
            </div>
          ) : null,
        )}
      </div>
    </SectionCard>
  );
}

// ── Main Page ─────────────────────────────────────────────────────

export default function ProfileViewPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE}/profile`, authHeaders());
        setProfile(res.data.data);
      } catch (err) {
        if (err?.response?.status === 404) {
          navigate("/complete-profile");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const completion = (() => {
    if (!profile) return 0;
    const checks = [
      !!(profile.name && profile.email),
      !!(profile.summary?.length > 20),
      !!(profile.skills?.length > 0),
      !!(profile.education?.length > 0),
      !!(profile.experience?.length > 0),
      !!profile.careerPreferences?.preferredRole,
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  })();

  if (loading) {
    return (
      <DashboardLayout title="Profile">
        <div className="flex items-center justify-center py-20">
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
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Profile">
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Header */}
        <ProfileHeader profile={profile} completion={completion} />

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left — 2/3 */}
          <div className="lg:col-span-2 space-y-4">
            <SummarySection summary={profile?.summary} />
            <ExperienceSection experience={profile?.experience} />
            <EducationSection education={profile?.education} />
          </div>

          {/* Right — 1/3 */}
          <div className="space-y-4">
            <SkillsSection skills={profile?.skills} />
            <CareerPreferencesSection
              careerPreferences={profile?.careerPreferences}
            />
            <ContactSection profile={profile} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
