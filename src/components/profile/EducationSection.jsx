import SectionCard from "./SectionCard";
import { ProfileFormField, ProfileInput } from "./ProfileFormField";

const EMPTY = { degree: "", institution: "", startYear: "", endYear: "" };

export default function EducationSection({ education, setEducation }) {
  const update = (index, field, value) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    setEducation(updated);
  };

  const add = () => setEducation([...education, { ...EMPTY }]);
  const remove = (index) =>
    setEducation(education.filter((_, i) => i !== index));

  return (
    <SectionCard title="Education" description="Your academic background.">
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div
            key={index}
            className="border border-[#E2E8F0] rounded-xl p-4 relative"
          >
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-3 right-3 text-[#94A3B8] hover:text-red-500 transition-colors"
              aria-label="Remove education"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 2l12 12M14 2L2 14"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-6">
              <ProfileFormField label="Degree">
                <ProfileInput
                  value={edu.degree}
                  onChange={(e) => update(index, "degree", e.target.value)}
                  placeholder="B.Tech Computer Science"
                />
              </ProfileFormField>

              <ProfileFormField label="Institution">
                <ProfileInput
                  value={edu.institution}
                  onChange={(e) => update(index, "institution", e.target.value)}
                  placeholder="University of Pune"
                />
              </ProfileFormField>

              <ProfileFormField label="Start Year">
                <ProfileInput
                  value={edu.startYear}
                  onChange={(e) => update(index, "startYear", e.target.value)}
                  placeholder="2019"
                  type="number"
                />
              </ProfileFormField>

              <ProfileFormField label="End Year">
                <ProfileInput
                  value={edu.endYear}
                  onChange={(e) => update(index, "endYear", e.target.value)}
                  placeholder="2023"
                  type="number"
                />
              </ProfileFormField>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={add}
          className="w-full h-[38px] border border-dashed border-[#CBD5E1] hover:border-[#26A9C9] text-[#64748B] hover:text-[#26A9C9] text-sm rounded-lg transition-colors flex items-center justify-center gap-1.5"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 2v12M2 8h12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Add Education
        </button>
      </div>
    </SectionCard>
  );
}
