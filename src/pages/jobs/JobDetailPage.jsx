import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getSingleJob, deleteJob } from "../../api/jobs.api";
import { getFitScore } from "../../api/ai.api";

import DashboardLayout from "../../layouts/DashboardLayout";

import FitScoreButton from "../../components/jobs/fitScore/FitScoreButton";
import FitScorePanel from "../../components/jobs/fitScore/FitScorePanel";

import JobDetailHeader from "../../components/jobs/detail/JobDetailHeader";
import JobInfoCard from "../../components/jobs/detail/JobInfoCard";
import JobStatusUpdate from "../../components/jobs/detail/JobStatusUpdate";
import JobTimelineCard from "../../components/jobs/detail/JobTimelineCard";
import JobContactCard from "../../components/jobs/detail/JobContactCard";
import JobNotesCard from "../../components/jobs/detail/JobNotesCard";
import JobActivityLog from "../../components/jobs/detail/JobActivityLog";

function DeleteConfirmModal({ job, onConfirm, onCancel, isDeleting }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 w-full max-w-sm mx-4 shadow-xl">
        <h3 className="text-[15px] font-semibold text-[#0F172A] mb-1">
          Delete Application
        </h3>
        <p className="text-[13px] text-[#64748B] mb-5">
          Are you sure you want to delete{" "}
          <span className="font-medium text-[#0F172A]">{job?.jobRole}</span> at{" "}
          <span className="font-medium text-[#0F172A]">{job?.companyName}</span>
          ? This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 h-[38px] bg-red-500 hover:bg-red-600 text-white text-[13px] font-medium rounded-lg transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <svg
                  className="animate-spin size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
          <button
            onClick={onCancel}
            className="flex-1 h-[38px] bg-white border border-[#E2E8F0] hover:border-[#94A3B8] text-[#475569] text-[13px] font-medium rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [fitScore, setFitScore] = useState(null);
  const [fitScoreLoading, setFitScoreLoading] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const res = await getSingleJob(id);
      setJob(res.data);
    } catch (err) {
      setError("Failed to load application.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteJob(id);
      toast.success("Application deleted.");
      navigate("/jobs");
    } catch (err) {
      toast.error("Failed to delete. Try again.");
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFitScore = async () => {
    try {
      setFitScoreLoading(true);
      setFitScore(null);
      const res = await getFitScore(id);
      setFitScore(res.data);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to get fit score. Try again.",
      );
    } finally {
      setFitScoreLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Application Detail">
        <div className="flex items-center justify-center py-20">
          <svg
            className="animate-spin size-6 text-[#26A9C9]"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !job) {
    return (
      <DashboardLayout title="Application Detail">
        <div className="text-center py-20">
          <p className="text-[14px] text-red-600 mb-3">
            {error || "Application not found."}
          </p>
          <button
            onClick={() => navigate("/jobs")}
            className="px-4 h-[36px] bg-[#26A9C9] text-white text-[13px] rounded-lg hover:bg-[#1F9DBD]"
          >
            Back to Applications
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Application Detail">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Back button */}
        <button
          onClick={() => navigate("/jobs")}
          className="flex items-center gap-1.5 text-[13px] text-[#64748B] hover:text-[#26A9C9] transition-colors"
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 3L5 8l5 5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Applications
        </button>

        {/* Header */}
        <JobDetailHeader job={job} onDelete={() => setShowDelete(true)} />

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left — 2/3 */}
          <div className="lg:col-span-2 space-y-4">
            <JobInfoCard job={job} />
            {/* Fit Score Button */}
            <FitScoreButton
              onClick={handleFitScore}
              loading={fitScoreLoading}
              hasDescription={!!job?.jobDescription}
            />

            {/* Fit Score Panel */}
            {fitScore && (
              <FitScorePanel
                data={fitScore}
                onClose={() => setFitScore(null)}
              />
            )}
            <JobNotesCard job={job} />
            <JobActivityLog activityLog={job?.activityLog} />
          </div>

          {/* Right — 1/3 */}
          <div className="space-y-4">
            <JobStatusUpdate
              job={job}
              onUpdated={(updated) => setJob(updated)}
            />
            <JobTimelineCard job={job} />
            <JobContactCard job={job} />
          </div>
        </div>
      </div>

      {/* Delete modal */}
      {showDelete && (
        <DeleteConfirmModal
          job={job}
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
          isDeleting={isDeleting}
        />
      )}
    </DashboardLayout>
  );
}
