export default function JobFormSection({ title, children }) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
      <h2 className="text-[14px] font-semibold text-[#0F172A] mb-4">{title}</h2>
      {children}
    </div>
  );
}