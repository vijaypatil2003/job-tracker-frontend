export default function JobNotesCard({ job }) {
  if (!job?.notes && !job?.jobDescription) return null;

  return (
    <div className="space-y-4">
      {job?.jobDescription && (
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
          <h3 className="text-[13px] font-semibold text-[#0F172A] mb-3">
            Job Description
          </h3>
          <p className="text-[13px] text-[#475569] leading-relaxed whitespace-pre-wrap">
            {job.jobDescription}
          </p>
        </div>
      )}
      {job?.notes && (
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
          <h3 className="text-[13px] font-semibold text-[#0F172A] mb-3">
            Personal Notes
          </h3>
          <p className="text-[13px] text-[#475569] leading-relaxed whitespace-pre-wrap">
            {job.notes}
          </p>
        </div>
      )}
    </div>
  );
}
