import SectionCard from "./SectionCard";
import { ProfileFormField, ProfileInput } from "./ProfileFormField";

export default function BasicInfoSection({ register, errors }) {
  return (
    <SectionCard
      title="Basic Information"
      description="Your contact and professional details."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ProfileFormField label="Full Name" error={errors.name} required>
          <ProfileInput
            placeholder="Jane Smith"
            hasError={!!errors.name}
            {...register("name", { required: "Name is required." })}
          />
        </ProfileFormField>

        <ProfileFormField label="Email" error={errors.email} required>
          <ProfileInput
            type="email"
            placeholder="you@company.com"
            hasError={!!errors.email}
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email.",
              },
            })}
          />
        </ProfileFormField>

        <ProfileFormField label="Phone" error={errors.phone}>
          <ProfileInput
            type="tel"
            placeholder="+91 98765 43210"
            hasError={!!errors.phone}
            {...register("phone")}
          />
        </ProfileFormField>

        <ProfileFormField label="Location" error={errors.location}>
          <ProfileInput
            placeholder="Pune, Maharashtra"
            hasError={!!errors.location}
            {...register("location")}
          />
        </ProfileFormField>

        <ProfileFormField label="LinkedIn URL" error={errors.linkedin}>
          <ProfileInput
            placeholder="linkedin.com/in/yourname"
            hasError={!!errors.linkedin}
            {...register("linkedin")}
          />
        </ProfileFormField>

        <ProfileFormField label="GitHub URL" error={errors.github}>
          <ProfileInput
            placeholder="github.com/yourname"
            hasError={!!errors.github}
            {...register("github")}
          />
        </ProfileFormField>

        <ProfileFormField
          label="Portfolio URL"
          error={errors.portfolio}
          className="sm:col-span-2"
        >
          <ProfileInput
            placeholder="yourportfolio.com"
            hasError={!!errors.portfolio}
            {...register("portfolio")}
          />
        </ProfileFormField>
      </div>
    </SectionCard>
  );
}
