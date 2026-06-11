import ScoreRing from "./ScoreRing";
import SkillsMatchCard from "./SkillsMatchCard";
import FitScoreBreakdown from "./FitScoreBreakdown";
import FitSuggestions from "./FitSuggestions";

export default function FitScorePanel({ data, onClose }) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#EAF3F6] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#26A9C9" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
          <h3 className="text-[14px] font-semibold text-[#0F172A]">Job Fit Score</h3>
        </div>
        <button
          onClick={onClose}
          className="text-[#94A3B8] hover:text-[#475569] transition-colors"
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Overall score + breakdown rings */}
      <div className="flex items-center justify-around py-2">
        <ScoreRing score={data?.overallScore ?? 0} size={90} label="Overall" />
        <ScoreRing score={data?.skillsMatch?.score ?? 0} size={70} label="Skills" />
        <ScoreRing score={data?.educationMatch?.score ?? 0} size={70} label="Education" />
        <ScoreRing score={data?.experienceMatch?.score ?? 0} size={70} label="Experience" />
      </div>

      {/* Divider */}
      <div className="border-t border-[#F1F5F9]" />

      {/* Skills */}
      <SkillsMatchCard skillsMatch={data?.skillsMatch} />

      {/* Divider */}
      <div className="border-t border-[#F1F5F9]" />

      {/* Breakdown bars */}
      <FitScoreBreakdown data={data} />

      {/* Divider */}
      <div className="border-t border-[#F1F5F9]" />

      {/* Suggestions */}
      <FitSuggestions suggestions={data?.suggestions} />
    </div>
  );
}