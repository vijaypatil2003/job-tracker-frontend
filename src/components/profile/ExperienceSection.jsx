import SectionCard from "./SectionCard";
import {
  ProfileFormField,
  ProfileInput,
  ProfileTextarea,
} from "./ProfileFormField";

const EMPTY = { title: "", company: "", duration: "", description: "" };

export default function ExperienceSection({ experience, setExperience }) {
  const update = (index, field, value) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [field]: value };
    setExperience(updated);
  };

  const add = () => setExperience([...experience, { ...EMPTY }]);
  const remove = (index) =>
    setExperience(experience.filter((_, i) => i !== index));

  return (
    <SectionCard
      title="Work Experience"
      description="Your professional history."
    >
      <div className="space-y-4">
        {experience.map((exp, index) => (
          <div
            key={index}
            className="border border-[#E2E8F0] rounded-xl p-4 relative"
          >
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-3 right-3 text-[#94A3B8] hover:text-red-500 transition-colors"
              aria-label="Remove experience"
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
              <ProfileFormField label="Job Title">
                <ProfileInput
                  value={exp.title}
                  onChange={(e) => update(index, "title", e.target.value)}
                  placeholder="Frontend Engineer"
                />
              </ProfileFormField>

              <ProfileFormField label="Company">
                <ProfileInput
                  value={exp.company}
                  onChange={(e) => update(index, "company", e.target.value)}
                  placeholder="Acme Inc."
                />
              </ProfileFormField>

              <ProfileFormField label="Duration" className="sm:col-span-2">
                <ProfileInput
                  value={exp.duration}
                  onChange={(e) => update(index, "duration", e.target.value)}
                  placeholder="Jan 2022 – Dec 2023"
                />
              </ProfileFormField>

              <div className="sm:col-span-2">
                <ProfileFormField label="Description">
                  <ProfileTextarea
                    rows={3}
                    value={exp.description}
                    onChange={(e) =>
                      update(index, "description", e.target.value)
                    }
                    placeholder="Key responsibilities and achievements..."
                  />
                </ProfileFormField>
              </div>
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
          Add Experience
        </button>
      </div>
    </SectionCard>
  );
}
