import SectionCard from "./SectionCard";
import { ProfileFormField, ProfileInput } from "./ProfileFormField";

const EMPLOYMENT_TYPES = ["Full Time", "Internship", "Contract", "Remote"];

export default function CareerPreferencesSection({
  register,
  errors,
  watch,
  setValue,
}) {
  const selected = watch("employmentTypes") || [];

  const toggle = (type) => {
    if (selected.includes(type)) {
      setValue(
        "employmentTypes",
        selected.filter((t) => t !== type),
      );
    } else {
      setValue("employmentTypes", [...selected, type]);
    }
  };

  return (
    <SectionCard
      title="Career Preferences"
      description="Help us match you to the right opportunities."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ProfileFormField label="Preferred Role" error={errors.preferredRole}>
          <ProfileInput
            placeholder="Frontend Engineer"
            hasError={!!errors.preferredRole}
            {...register("preferredRole")}
          />
        </ProfileFormField>

        <ProfileFormField
          label="Preferred Location"
          error={errors.preferredLocation}
        >
          <ProfileInput
            placeholder="Mumbai, Remote"
            hasError={!!errors.preferredLocation}
            {...register("preferredLocation")}
          />
        </ProfileFormField>

        <div className="sm:col-span-2">
          <label className="block text-[13px] font-medium text-[#334155] mb-2">
            Employment Type
          </label>
          <div className="flex flex-wrap gap-2">
            {EMPLOYMENT_TYPES.map((type) => {
              const active = selected.includes(type);
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggle(type)}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-medium border transition-all ${
                    active
                      ? "bg-[#26A9C9] border-[#26A9C9] text-white"
                      : "bg-white border-[#CBD5E1] text-[#475569] hover:border-[#26A9C9] hover:text-[#26A9C9]"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
