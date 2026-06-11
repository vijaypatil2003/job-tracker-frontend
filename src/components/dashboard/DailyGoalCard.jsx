export default function DailyGoalCard({ dailyGoal, dailyProgress, todayApplied, currentStreak, longestStreak }) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 space-y-4">
      <h3 className="text-[14px] font-semibold text-[#0F172A]">Daily Goal</h3>

      {/* Progress */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[13px] text-[#64748B]">
            {todayApplied} of {dailyGoal} applications
          </span>
          <span className="text-[13px] font-semibold text-[#26A9C9]">{dailyProgress}%</span>
        </div>
        <div className="w-full h-2 bg-[#EAF3F6] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#26A9C9] rounded-full transition-all duration-500"
            style={{ width: `${dailyProgress}%` }}
          />
        </div>
      </div>

      {/* Streak */}
      <div className="flex items-center gap-4 pt-1 border-t border-[#F1F5F9]">
        <div>
          <p className="text-[11px] text-[#94A3B8] uppercase tracking-wide">Current Streak</p>
          <p className="text-[18px] font-bold text-[#0F172A]">
            {currentStreak}
            <span className="text-[13px] font-normal text-[#64748B] ml-1">days</span>
          </p>
        </div>
        <div className="w-px h-8 bg-[#E2E8F0]" />
        <div>
          <p className="text-[11px] text-[#94A3B8] uppercase tracking-wide">Longest</p>
          <p className="text-[18px] font-bold text-[#0F172A]">
            {longestStreak}
            <span className="text-[13px] font-normal text-[#64748B] ml-1">days</span>
          </p>
        </div>
        <div className="ml-auto text-2xl">🔥</div>
      </div>
    </div>
  );
}