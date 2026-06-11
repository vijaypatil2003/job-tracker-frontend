export default function SkillsMatchCard({ skillsMatch }) {
  const { score, matched = [], missing = [] } = skillsMatch || {};

  return (
    <div className="space-y-3">
      {/* Matched */}
      <div>
        <p className="text-[12px] font-medium text-[#334155] mb-2 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0" />
          Matched Skills ({matched.length})
        </p>
        {matched.length === 0 ? (
          <p className="text-[12px] text-[#94A3B8]">
            No matching skills found.
          </p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {matched.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#ECFDF5] text-[#10B981] border border-[#10B981]/20"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Missing */}
      <div>
        <p className="text-[12px] font-medium text-[#334155] mb-2 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#EF4444] shrink-0" />
          Missing Skills ({missing.length})
        </p>
        {missing.length === 0 ? (
          <p className="text-[12px] text-[#94A3B8]">
            No missing skills. Great fit!
          </p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {missing.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#FEF2F2] text-[#EF4444] border border-[#EF4444]/20"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
