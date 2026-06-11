import { useState } from "react";
import SectionCard from "./SectionCard";

export default function SkillsSection({ skills, setSkills }) {
  const [input, setInput] = useState("");

  const addSkill = () => {
    const trimmed = input.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
    }
    setInput("");
  };

  const removeSkill = (skill) => setSkills(skills.filter((s) => s !== skill));

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
    if (e.key === "Backspace" && !input && skills.length) {
      setSkills(skills.slice(0, -1));
    }
  };

  return (
    <SectionCard
      title="Skills"
      description="Add skills to match against job descriptions."
    >
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3 min-h-[32px]">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EAF3F6] border border-[#26A9C9]/30 text-[#26A9C9] text-xs font-medium rounded-full"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="text-[#26A9C9]/60 hover:text-[#26A9C9] transition-colors"
              aria-label={`Remove ${skill}`}
            >
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path
                  d="M1 1l10 10M11 1L1 11"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </span>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a skill and press Enter"
          className="flex-1 h-[40px] px-3 text-sm text-[#1E293B] bg-white border border-[#CBD5E1] rounded-lg outline-none placeholder:text-[#94A3B8] hover:border-[#94A3B8] focus:border-[#26A9C9] focus:ring-2 focus:ring-[#26A9C9]/15 transition-all"
        />
        <button
          type="button"
          onClick={addSkill}
          className="px-4 h-[40px] bg-[#26A9C9] hover:bg-[#1F9DBD] text-white text-sm font-medium rounded-lg transition-colors"
        >
          Add
        </button>
      </div>
    </SectionCard>
  );
}
