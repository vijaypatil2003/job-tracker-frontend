import { useState } from "react";
import SectionCard from "./SectionCard";
import { ProfileFormField, ProfileTextarea } from "./ProfileFormField";

const MAX = 500;

export default function SummarySection({ register, errors, watch }) {
  const value = watch("summary") || "";

  return (
    <SectionCard
      title="Professional Summary"
      description="A short pitch about yourself."
    >
      <ProfileFormField label="Summary" error={errors.summary}>
        <ProfileTextarea
          rows={4}
          maxLength={MAX}
          placeholder="Brief overview of your background, skills, and what you're looking for..."
          hasError={!!errors.summary}
          {...register("summary", {
            maxLength: { value: MAX, message: `Max ${MAX} characters.` },
          })}
        />
        <p
          className={`text-right text-xs mt-1 ${value.length >= MAX ? "text-red-500" : "text-[#94A3B8]"}`}
        >
          {value.length}/{MAX}
        </p>
      </ProfileFormField>
    </SectionCard>
  );
}
