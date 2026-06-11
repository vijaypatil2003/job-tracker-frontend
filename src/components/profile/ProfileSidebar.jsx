import ProfileProgress from "./ProfileProgress";
import ResumeUpload from "./ResumeUpload";

export default function ProfileSidebar({ percentage, sections, onParsed }) {
  return (
    <aside className="hidden lg:flex lg:w-[280px] xl:w-[300px] shrink-0 flex-col gap-4 sticky top-6 self-start">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-1 mb-1">
        <div className="w-8 h-8 rounded-lg bg-[#26A9C9] flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
            <rect x="4" y="4" width="10" height="10" rx="2" fill="white" />
            <rect
              x="18"
              y="4"
              width="10"
              height="10"
              rx="2"
              fill="white"
              fillOpacity="0.6"
            />
            <rect
              x="4"
              y="18"
              width="10"
              height="10"
              rx="2"
              fill="white"
              fillOpacity="0.6"
            />
            <rect
              x="18"
              y="18"
              width="10"
              height="10"
              rx="2"
              fill="white"
              fillOpacity="0.3"
            />
          </svg>
        </div>
        <span className="text-[#0F172A] text-[15px] font-semibold">Acme</span>
      </div>

      <ProfileProgress percentage={percentage} sections={sections} />
      <ResumeUpload onParsed={onParsed} />

      {/* Tip */}
      <div className="bg-[#EAF3F6] border border-[#26A9C9]/20 rounded-xl p-4">
        <p className="text-[12.5px] text-[#475569] leading-relaxed">
          <span className="font-semibold text-[#26A9C9]">Tip:</span> A complete
          profile improves your job match score by up to{" "}
          <span className="font-semibold">3×</span>.
        </p>
      </div>
    </aside>
  );
}
