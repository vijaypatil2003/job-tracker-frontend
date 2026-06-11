export default function SectionCard({ title, description, children }) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
      <div className="mb-4">
        <h2 className="text-[15px] font-semibold text-[#0F172A]">{title}</h2>
        {description && (
          <p className="text-[13px] text-[#64748B] mt-0.5">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}