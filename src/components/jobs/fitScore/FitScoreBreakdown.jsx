function BreakdownItem({ label, score, comment }) {
  const getColor = (s) => {
    if (s >= 75) return "#10B981";
    if (s >= 50) return "#26A9C9";
    if (s >= 30) return "#F59E0B";
    return "#EF4444";
  };

  const color = getColor(score);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-medium text-[#334155]">{label}</span>
        <span className="text-[12px] font-bold" style={{ color }}>
          {score}%
        </span>
      </div>
      <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
      {comment && <p className="text-[11.5px] text-[#64748B]">{comment}</p>}
    </div>
  );
}

export default function FitScoreBreakdown({ data }) {
  return (
    <div className="space-y-4">
      <BreakdownItem
        label="Education"
        score={data?.educationMatch?.score ?? 0}
        comment={data?.educationMatch?.comment}
      />
      <BreakdownItem
        label="Experience"
        score={data?.experienceMatch?.score ?? 0}
        comment={data?.experienceMatch?.comment}
      />
      <BreakdownItem
        label="Location"
        score={data?.locationMatch?.score ?? 0}
        comment={data?.locationMatch?.comment}
      />
    </div>
  );
}
