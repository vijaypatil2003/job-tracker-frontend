import { toast } from "react-toastify";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getAllJobs, deleteJob } from "../../api/jobs.api";

// Status config
const STATUS_CONFIG = {
  "Applied":         { color: "#3B82F6", bg: "#EFF6FF" },
  "Interview":       { color: "#8B5CF6", bg: "#F5F3FF" },
  "Assignment":      { color: "#F59E0B", bg: "#FFFBEB" },
  "HR Round":        { color: "#EC4899", bg: "#FDF2F8" },
  "Technical Round": { color: "#6366F1", bg: "#EEF2FF" },
  "Offer Received":  { color: "#10B981", bg: "#ECFDF5" },
  "Selected":        { color: "#059669", bg: "#D1FAE5" },
  "Rejected":        { color: "#EF4444", bg: "#FEF2F2" },
  "Not Applied":     { color: "#94A3B8", bg: "#F8FAFC" },
};

const PRIORITY_CONFIG = {
  "Urgent": { color: "#EF4444", bg: "#FEF2F2" },
  "High":   { color: "#F59E0B", bg: "#FFFBEB" },
  "Medium": { color: "#3B82F6", bg: "#EFF6FF" },
  "Low":    { color: "#94A3B8", bg: "#F8FAFC" },
};

const STATUS_FILTERS = ["All", "Applied", "Interview", "Assignment", "HR Round", "Technical Round", "Offer Received", "Selected", "Rejected", "Not Applied"];
const PER_PAGE = 10;

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
}

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG["Not Applied"];
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium"
      style={{ color: config.color, backgroundColor: config.bg }}
    >
      {status}
    </span>
  );
}

function PriorityBadge({ priority }) {
  if (!priority) return null;
  const config = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG["Medium"];
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
      style={{ color: config.color, backgroundColor: config.bg }}
    >
      {priority}
    </span>
  );
}

function Avatar({ name }) {
  return (
    <div className="w-9 h-9 rounded-lg bg-[#EAF3F6] border border-[#E2E8F0] flex items-center justify-center text-[13px] font-semibold text-[#26A9C9] shrink-0">
      {name?.charAt(0)?.toUpperCase() || "?"}
    </div>
  );
}

function SkeletonRow() {
  return (
    <tr className="border-b border-[#F1F5F9]">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <td key={i} className="px-5 py-4">
          <div className="h-4 w-full animate-pulse rounded-lg bg-[#E2E8F0]" />
        </td>
      ))}
    </tr>
  );
}

function DeleteConfirmModal({ job, onConfirm, onCancel, isDeleting }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 w-full max-w-sm mx-4 shadow-xl">
        <h3 className="text-[15px] font-semibold text-[#0F172A] mb-1">Delete Application</h3>
        <p className="text-[13px] text-[#64748B] mb-5">
          Are you sure you want to delete <span className="font-medium text-[#0F172A]">{job?.jobRole}</span> at <span className="font-medium text-[#0F172A]">{job?.companyName}</span>? This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 h-[38px] bg-red-500 hover:bg-red-600 text-white text-[13px] font-medium rounded-lg transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Deleting...
              </>
            ) : "Delete"}
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

export default function JobsPage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortField, setSortField] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await getAllJobs();
      setJobs(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => ({
    total: jobs.length,
    applied: jobs.filter((j) => j.status === "Applied").length,
    inProcess: jobs.filter((j) => ["Interview", "HR Round", "Technical Round", "Assignment"].includes(j.status)).length,
    selected: jobs.filter((j) => j.status === "Selected").length,
    rejected: jobs.filter((j) => j.status === "Rejected").length,
  }), [jobs]);

  const filtered = useMemo(() => {
    let list = [...jobs];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((j) =>
        j.companyName?.toLowerCase().includes(q) ||
        j.jobRole?.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "All") list = list.filter((j) => j.status === statusFilter);
    list.sort((a, b) => {
      const av = a[sortField] || "";
      const bv = b[sortField] || "";
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [jobs, searchQuery, statusFilter, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleSort = (field) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("asc"); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await deleteJob(deleteTarget._id);
      setJobs((prev) => prev.filter((j) => j._id !== deleteTarget._id));
      setDeleteTarget(null);
          toast.success("Application deleted.");

    } catch (err) {
          toast.error("Failed to delete. Try again.");

      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return (
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="opacity-30">
        <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
    return sortDir === "asc" ? (
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
        <path d="M8 13V3M4 7l4-4 4 4" stroke="#26A9C9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ) : (
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
        <path d="M8 3v10M4 9l4 4 4-4" stroke="#26A9C9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  return (
    <DashboardLayout title="Applications">
      <div className="max-w-7xl mx-auto space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-bold text-[#0F172A]">Applications</h1>
            <p className="text-[13px] text-[#64748B] mt-0.5">Track and manage your job hunt pipeline.</p>
          </div>
          <button
            onClick={() => navigate("/jobs/add")}
            className="flex items-center gap-1.5 px-4 h-[38px] bg-[#26A9C9] hover:bg-[#1F9DBD] text-white text-[13px] font-medium rounded-lg transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v12M2 8h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Add Application
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: "Total", value: stats.total, color: "#26A9C9" },
            { label: "Applied", value: stats.applied, color: "#3B82F6" },
            { label: "In Process", value: stats.inProcess, color: "#8B5CF6" },
            { label: "Selected", value: stats.selected, color: "#10B981" },
            { label: "Rejected", value: stats.rejected, color: "#EF4444" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-[#E2E8F0] rounded-xl p-4">
              <p className="text-[12px] text-[#64748B]">{s.label}</p>
              <p className="text-[22px] font-bold mt-0.5" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Table card */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 border-b border-[#F1F5F9]">
            {/* Search */}
            <div className="relative w-full sm:max-w-[260px]">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="15" height="15" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="5" stroke="#94A3B8" strokeWidth="1.5" />
                <path d="M10 10l3.5 3.5" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                placeholder="Search company or role..."
                className="w-full h-[36px] pl-9 pr-3 text-sm text-[#1E293B] bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg outline-none placeholder:text-[#94A3B8] focus:border-[#26A9C9] focus:ring-2 focus:ring-[#26A9C9]/15 transition-all"
              />
            </div>

            {/* Status filters */}
            <div className="flex items-center gap-1 overflow-x-auto pb-0.5 sm:pb-0 flex-1">
              {["All", "Applied", "Interview", "HR Round", "Technical Round", "Selected", "Rejected"].map((s) => (
                <button
                  key={s}
                  onClick={() => { setStatusFilter(s); setPage(1); }}
                  className={`shrink-0 px-3 h-[32px] rounded-lg text-[12px] font-medium transition-colors ${
                    statusFilter === s
                      ? "bg-[#26A9C9] text-white"
                      : "bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] hover:border-[#94A3B8]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap text-left text-sm">
              <thead className="border-b border-[#F1F5F9] bg-[#F8FAFC]">
                <tr>
                  {[
                    { label: "Role / Company", field: "jobRole" },
                    { label: "Location", field: "location" },
                    { label: "Status", field: "status" },
                    { label: "Priority", field: "priority" },
                    { label: "Applied", field: "appliedDate" },
                    { label: "Source", field: "source" },
                  ].map(({ label, field }) => (
                    <th key={label} className="px-5 py-3 text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                      <button
                        onClick={() => toggleSort(field)}
                        className="flex items-center gap-1.5 hover:text-[#26A9C9] transition-colors"
                      >
                        {label}
                        <SortIcon field={field} />
                      </button>
                    </th>
                  ))}
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                ) : paginated.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-14 text-center">
                      <div className="w-12 h-12 rounded-xl bg-[#EAF3F6] flex items-center justify-center mx-auto mb-3">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#26A9C9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </div>
                      <p className="text-[14px] font-medium text-[#0F172A]">No applications found</p>
                      <p className="text-[13px] text-[#94A3B8] mt-1">
                        {searchQuery ? `No results for "${searchQuery}"` : "Start by adding your first job application."}
                      </p>
                      {!searchQuery && (
                        <button
                          onClick={() => navigate("/jobs/add")}
                          className="mt-4 px-4 h-[36px] bg-[#26A9C9] hover:bg-[#1F9DBD] text-white text-[13px] font-medium rounded-lg transition-colors inline-flex items-center gap-1.5"
                        >
                          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                            <path d="M8 2v12M2 8h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                          Add Application
                        </button>
                      )}
                    </td>
                  </tr>
                ) : (
                  paginated.map((job) => (
                    <tr
                      key={job._id}
                      onClick={() => navigate(`/jobs/${job._id}`)}
                      className="group cursor-pointer hover:bg-[#F8FAFC] transition-colors"
                    >
                      {/* Role + Company */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={job.companyName} />
                          <div>
                            <p className="text-[13px] font-semibold text-[#0F172A]">{job.jobRole || "—"}</p>
                            <p className="text-[12px] text-[#64748B]">{job.companyName || "—"}</p>
                          </div>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-[12px] text-[#64748B]">
                          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                            <path d="M8 1.5C5.79 1.5 4 3.29 4 5.5c0 3.25 4 9 4 9s4-5.75 4-9c0-2.21-1.79-4-4-4z" stroke="currentColor" strokeWidth="1.25" />
                            <circle cx="8" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1.25" />
                          </svg>
                          {job.location || "—"}
                        </div>
                        <div className="text-[11px] text-[#94A3B8] mt-0.5">{job.jobType || "—"}</div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <StatusBadge status={job.status} />
                      </td>

                      {/* Priority */}
                      <td className="px-5 py-4">
                        <PriorityBadge priority={job.priority} />
                      </td>

                      {/* Applied Date */}
                      <td className="px-5 py-4 text-[12px] text-[#64748B]">
                        {formatDate(job.appliedDate)}
                      </td>

                      {/* Source */}
                      <td className="px-5 py-4 text-[12px] text-[#64748B]">
                        {job.source || "—"}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {job.jobUrl && (
                      <a
  
    href={job.jobUrl}
    target="_blank"
    rel="noreferrer"
    onClick={(e) => e.stopPropagation()}
    className="w-7 h-7 rounded-lg flex items-center justify-center text-[#64748B] hover:text-[#26A9C9] hover:bg-[#EAF3F6] transition-colors"
    title="Open job URL"
  >
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M6 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-3M9 2h5v5M8 8l6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </a>
)}
                          <button
                            onClick={(e) => { e.stopPropagation(); setDeleteTarget(job); }}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#64748B] hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                              <path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9a1 1 0 001 1h6a1 1 0 001-1l1-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-4 border-t border-[#F1F5F9]">
              <span className="text-[12px] text-[#64748B]">
                Showing <span className="font-medium text-[#0F172A]">{(page - 1) * PER_PAGE + 1}</span> to <span className="font-medium text-[#0F172A]">{Math.min(page * PER_PAGE, filtered.length)}</span> of <span className="font-medium text-[#0F172A]">{filtered.length}</span>
              </span>
              <div className="flex gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-3 h-[32px] text-[12px] font-medium bg-white border border-[#E2E8F0] hover:border-[#94A3B8] text-[#475569] rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3 h-[32px] text-[12px] font-medium bg-white border border-[#E2E8F0] hover:border-[#94A3B8] text-[#475569] rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete modal */}
      {deleteTarget && (
        <DeleteConfirmModal
          job={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          isDeleting={isDeleting}
        />
      )}
    </DashboardLayout>
  );
}

// import React, { useState, useMemo, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { 
//   Search, Plus, Download, MoreVertical, ExternalLink, 
//   Mail, Phone, MapPin, Briefcase, ChevronUp, ChevronDown, 
//   Inbox, Loader2, CheckCircle2, XCircle, Clock, FileText
// } from "lucide-react";
// // Assuming you have this layout and API setup
// import DashboardLayout from "../../layouts/DashboardLayout";
// import { getAllJobs } from "../../api/jobs.api";

// // ─── DESIGN TOKENS & CONFIG ──────────────────────────────────────────────────
// const STATUS_CONFIG = {
//   "Applied": { color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20", icon: Clock },
//   "Interview": { color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20", icon: Inbox },
//   "Technical Round": { color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20", icon: FileText },
//   "HR Round": { color: "text-pink-400", bg: "bg-pink-400/10", border: "border-pink-400/20", icon: Phone },
//   "Selected": { color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20", icon: CheckCircle2 },
//   "Rejected": { color: "text-rose-400", bg: "bg-rose-400/10", border: "border-rose-400/20", icon: XCircle },
//   "Not Applied": { color: "text-zinc-400", bg: "bg-zinc-400/10", border: "border-zinc-400/20", icon: Clock },
// };

// // ─── COMPONENTS ──────────────────────────────────────────────────────────────
// const Avatar = ({ name }) => {
//   return (
//     <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-xs font-medium text-zinc-300">
//       {name?.charAt(0)?.toUpperCase() || "?"}
//     </div>
//   );
// };

// const StatusBadge = ({ status }) => {
//   const config = STATUS_CONFIG[status] || STATUS_CONFIG["Not Applied"];
//   const Icon = config.icon;
  
//   return (
//     <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium border ${config.bg} ${config.color} ${config.border}`}>
//       <Icon className="h-3 w-3" />
//       {status}
//     </div>
//   );
// };

// const StatCard = ({ label, value }) => (
//   <div className="flex flex-col justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:bg-zinc-900">
//     <span className="text-xs font-medium text-zinc-400">{label}</span>
//     <span className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50">{value}</span>
//   </div>
// );

// const SkeletonRow = () => (
//   <tr className="border-b border-zinc-800/50">
//     {[1, 2, 3, 4, 5, 6].map((i) => (
//       <td key={i} className="px-4 py-4">
//         <div className="h-4 w-full animate-pulse rounded bg-zinc-800/50" />
//       </td>
//     ))}
//   </tr>
// );

// // ─── MAIN PAGE ───────────────────────────────────────────────────────────────
// export default function JobsPage() {
//   const navigate = useNavigate();
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [sortField, setSortField] = useState("createdAt");
//   const [sortDir, setSortDir] = useState("desc");
//   const [page, setPage] = useState(1);
//   const PER_PAGE = 10;

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         setLoading(true);
//         const res = await getAllJobs();
//         setJobs(res.data || []);
//       } catch (e) {
//         console.error(e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   const stats = useMemo(() => ({
//     total: jobs.length,
//     applied: jobs.filter((j) => j.status === "Applied").length,
//     interview: jobs.filter((j) => ["Interview", "HR Round", "Technical Round"].includes(j.status)).length,
//     selected: jobs.filter((j) => j.status === "Selected").length,
//     rejected: jobs.filter((j) => j.status === "Rejected").length,
//   }), [jobs]);

//   const filtered = useMemo(() => {
//     let list = [...jobs];
//     if (searchQuery) {
//       const q = searchQuery.toLowerCase();
//       list = list.filter((j) =>
//         j.companyName?.toLowerCase().includes(q) ||
//         j.jobRole?.toLowerCase().includes(q)
//       );
//     }
//     if (statusFilter !== "All") list = list.filter((j) => j.status === statusFilter);
    
//     list.sort((a, b) => {
//       const av = a[sortField] || "";
//       const bv = b[sortField] || "";
//       const cmp = av < bv ? -1 : av > bv ? 1 : 0;
//       return sortDir === "asc" ? cmp : -cmp;
//     });
//     return list;
//   }, [jobs, searchQuery, statusFilter, sortField, sortDir]);

//   const totalPages = Math.ceil(filtered.length / PER_PAGE);
//   const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

//   const toggleSort = (field) => {
//     if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
//     else {
//       setSortField(field);
//       setSortDir("asc");
//     }
//   };

//   const formatDate = (d) => {
//     if (!d) return "—";
//     return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
//   };

//   return (
//     <DashboardLayout>
//       <div className="mx-auto w-full max-w-7xl px-4 py-8 text-zinc-50 sm:px-6 lg:px-8">
        
//         {/* Header Section */}
//         <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h1 className="text-2xl font-semibold tracking-tight text-white">Applications</h1>
//             <p className="mt-1 text-sm text-zinc-400">Track and manage your job hunt pipeline.</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <button className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-transparent px-4 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-zinc-950">
//               <Download className="h-4 w-4" />
//               Export
//             </button>
//             <button 
//               onClick={() => navigate("/jobs/new")}
//               className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-medium text-black transition-colors hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-950"
//             >
//               <Plus className="h-4 w-4" />
//               New Application
//             </button>
//           </div>
//         </header>

//         {/* Metrics Grid */}
//         <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-5">
//           <StatCard label="Total Applications" value={stats.total} />
//           <StatCard label="Applied" value={stats.applied} />
//           <StatCard label="In Process" value={stats.interview} />
//           <StatCard label="Offers" value={stats.selected} />
//           <StatCard label="Rejected" value={stats.rejected} />
//         </div>

//         {/* Controls / Toolbar */}
//         <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div className="relative w-full sm:max-w-xs">
//             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
//               placeholder="Search roles (e.g. MERN Developer)..."
//               className="h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900/50 pl-10 pr-4 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-700"
//             />
//           </div>
//           <div className="flex flex-wrap items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900/30 p-1">
//             {["All", "Applied", "Interview", "Technical Round", "Selected", "Rejected"].map((s) => (
//               <button
//                 key={s}
//                 onClick={() => { setStatusFilter(s); setPage(1); }}
//                 className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
//                   statusFilter === s 
//                     ? "bg-zinc-800 text-white shadow-sm" 
//                     : "text-zinc-400 hover:text-zinc-200"
//                 }`}
//               >
//                 {s}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Data Table */}
//         <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/20 backdrop-blur-sm">
//           <div className="overflow-x-auto">
//             <table className="w-full whitespace-nowrap text-left text-sm text-zinc-300">
//               <thead className="border-b border-zinc-800 bg-zinc-900/50 text-xs uppercase tracking-wider text-zinc-500">
//                 <tr>
//                   {[{ label: "Role", field: "jobRole" }, { label: "Contact", field: "hrEmail" }, { label: "Details", field: "location" }, { label: "Status", field: "status" }, { label: "Applied", field: "appliedDate" }].map(({ label, field }) => (
//                     <th key={label} className="px-6 py-4 font-medium">
//                       <button 
//                         onClick={() => toggleSort(field)}
//                         className="group flex items-center gap-1 hover:text-zinc-300"
//                       >
//                         {label}
//                         {sortField === field ? (
//                           sortDir === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
//                         ) : (
//                           <ChevronDown className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-50" />
//                         )}
//                       </button>
//                     </th>
//                   ))}
//                   <th className="px-6 py-4"></th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-zinc-800/50">
//                 {loading ? (
//                   Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
//                 ) : paginated.length === 0 ? (
//                   <tr>
//                     <td colSpan="6" className="px-6 py-12 text-center">
//                       <Inbox className="mx-auto h-8 w-8 text-zinc-600" />
//                       <h3 className="mt-4 text-sm font-medium text-zinc-300">No applications found</h3>
//                       <p className="mt-1 text-sm text-zinc-500">
//                         {searchQuery ? `No results for "${searchQuery}"` : "Get started by adding a new job application."}
//                       </p>
//                     </td>
//                   </tr>
//                 ) : (
//                   paginated.map((job) => (
//                     <tr 
//                       key={job._id}
//                       onClick={() => navigate(`/jobs/${job._id}`)}
//                       className="group cursor-pointer transition-colors hover:bg-zinc-800/40"
//                     >
//                       {/* Role & Company */}
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-3">
//                           <Avatar name={job.companyName} />
//                           <div>
//                             <div className="font-medium text-zinc-100">{job.jobRole || "—"}</div>
//                             <div className="text-xs text-zinc-500">{job.companyName || "—"}</div>
//                           </div>
//                         </div>
//                       </td>

//                       {/* Contact */}
//                       <td className="px-6 py-4">
//                         <div className="flex flex-col gap-1 text-xs">
//                           {job.hrEmail ? (
//                             <div className="flex items-center gap-1.5 text-zinc-400">
//                               <Mail className="h-3.5 w-3.5" />
//                               <span className="truncate max-w-[150px]">{job.hrEmail}</span>
//                             </div>
//                           ) : <span className="text-zinc-600">—</span>}
//                         </div>
//                       </td>

//                       {/* Details (Location/Type) */}
//                       <td className="px-6 py-4">
//                         <div className="flex flex-col gap-1 text-xs">
//                            <div className="flex items-center gap-1.5 text-zinc-400">
//                               <MapPin className="h-3.5 w-3.5" />
//                               {job.location || "Remote"}
//                            </div>
//                            <div className="flex items-center gap-1.5 text-zinc-500">
//                               <Briefcase className="h-3.5 w-3.5" />
//                               {job.jobType || "Full-time"}
//                            </div>
//                         </div>
//                       </td>

//                       {/* Status */}
//                       <td className="px-6 py-4">
//                         <StatusBadge status={job.status} />
//                       </td>

//                       {/* Applied Date */}
//                       <td className="px-6 py-4 text-sm text-zinc-400">
//                         {formatDate(job.appliedDate)}
//                       </td>

//                       {/* Actions */}
//                       <td className="px-6 py-4 text-right">
//                         <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
//                           {job.jobUrl && (
//                             <a 
//                               href={job.jobUrl} 
//                               target="_blank" 
//                               rel="noreferrer"
//                               onClick={(e) => e.stopPropagation()}
//                               className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-700 hover:text-white"
//                             >
//                               <ExternalLink className="h-4 w-4" />
//                             </a>
//                           )}
//                           <button 
//                             onClick={(e) => { e.stopPropagation(); /* handle context menu */ }}
//                             className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-700 hover:text-white"
//                           >
//                             <MoreVertical className="h-4 w-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex items-center justify-between border-t border-zinc-800 px-6 py-4 text-sm">
//               <span className="text-zinc-500">
//                 Showing <span className="font-medium text-zinc-300">{(page - 1) * PER_PAGE + 1}</span> to <span className="font-medium text-zinc-300">{Math.min(page * PER_PAGE, filtered.length)}</span> of <span className="font-medium text-zinc-300">{filtered.length}</span> results
//               </span>
//               <div className="flex gap-2">
//                 <button
//                   disabled={page <= 1}
//                   onClick={() => setPage(p => p - 1)}
//                   className="rounded-lg border border-zinc-700 px-3 py-1.5 text-zinc-300 transition-colors hover:bg-zinc-800 disabled:opacity-50 disabled:hover:bg-transparent"
//                 >
//                   Previous
//                 </button>
//                 <button
//                   disabled={page >= totalPages}
//                   onClick={() => setPage(p => p + 1)}
//                   className="rounded-lg border border-zinc-700 px-3 py-1.5 text-zinc-300 transition-colors hover:bg-zinc-800 disabled:opacity-50 disabled:hover:bg-transparent"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }

// import React, { useState, useMemo, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import DashboardLayout from "../../layouts/DashboardLayout";
// import { getAllJobs } from "../../api/jobs.api";

// // ─── STATUS CONFIG ────────────────────────────────────────────────────────────
// const STATUS_CONFIG = {
//   Applied: { color: "#6366f1", bg: "rgba(99,102,241,0.08)", dot: "#6366f1" },
//   Interview: { color: "#a855f7", bg: "rgba(168,85,247,0.08)", dot: "#a855f7" },
//   "Technical Round": {
//     color: "#06b6d4",
//     bg: "rgba(6,182,212,0.08)",
//     dot: "#06b6d4",
//   },
//   Assignment: { color: "#f59e0b", bg: "rgba(245,158,11,0.08)", dot: "#f59e0b" },
//   "HR Round": { color: "#ec4899", bg: "rgba(236,72,153,0.08)", dot: "#ec4899" },
//   Selected: { color: "#10b981", bg: "rgba(16,185,129,0.08)", dot: "#10b981" },
//   Rejected: { color: "#f43f5e", bg: "rgba(244,63,94,0.08)", dot: "#f43f5e" },
//   "Offer Received": {
//     color: "#14b8a6",
//     bg: "rgba(20,184,166,0.08)",
//     dot: "#14b8a6",
//   },
//   "Not Applied": {
//     color: "#64748b",
//     bg: "rgba(100,116,139,0.08)",
//     dot: "#64748b",
//   },
// };

// const PRIORITY_CONFIG = {
//   Urgent: { color: "#f43f5e", label: "Urgent" },
//   High: { color: "#f59e0b", label: "High" },
//   Medium: { color: "#6366f1", label: "Medium" },
//   Low: { color: "#64748b", label: "Low" },
// };

// const ALL_STATUSES = Object.keys(STATUS_CONFIG);

// // ─── AVATAR ───────────────────────────────────────────────────────────────────
// const Avatar = ({ name }) => {
//   const colors = [
//     "#6366f1",
//     "#a855f7",
//     "#06b6d4",
//     "#10b981",
//     "#f59e0b",
//     "#ec4899",
//     "#14b8a6",
//   ];
//   const color = colors[name?.charCodeAt(0) % colors.length] || "#6366f1";
//   return (
//     <div
//       style={{
//         width: 38,
//         height: 38,
//         borderRadius: 10,
//         background: `${color}18`,
//         border: `1px solid ${color}30`,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         fontSize: 14,
//         fontWeight: 600,
//         color,
//         flexShrink: 0,
//         fontFamily: "'DM Mono', monospace",
//       }}
//     >
//       {name?.charAt(0)?.toUpperCase() || "?"}
//     </div>
//   );
// };

// // ─── STATUS BADGE ─────────────────────────────────────────────────────────────
// const StatusBadge = ({ status }) => {
//   const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["Not Applied"];
//   return (
//     <span
//       style={{
//         display: "inline-flex",
//         alignItems: "center",
//         gap: 5,
//         padding: "4px 10px",
//         borderRadius: 999,
//         background: cfg.bg,
//         border: `1px solid ${cfg.color}30`,
//         fontSize: 11,
//         fontWeight: 500,
//         color: cfg.color,
//         whiteSpace: "nowrap",
//         letterSpacing: "0.02em",
//       }}
//     >
//       <span
//         style={{
//           width: 5,
//           height: 5,
//           borderRadius: "50%",
//           background: cfg.dot,
//           flexShrink: 0,
//         }}
//       />
//       {status}
//     </span>
//   );
// };

// // ─── PRIORITY DOT ─────────────────────────────────────────────────────────────
// const PriorityDot = ({ priority }) => {
//   const cfg = PRIORITY_CONFIG[priority];
//   if (!cfg) return null;
//   return (
//     <span
//       style={{
//         display: "inline-flex",
//         alignItems: "center",
//         gap: 4,
//         fontSize: 11,
//         color: cfg.color,
//         fontWeight: 500,
//       }}
//     >
//       <span
//         style={{
//           width: 6,
//           height: 6,
//           borderRadius: "50%",
//           background: cfg.color,
//         }}
//       />
//       {cfg.label}
//     </span>
//   );
// };

// // ─── SKELETON ROW ─────────────────────────────────────────────────────────────
// const SkeletonRow = () => (
//   <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
//     {[180, 160, 120, 100, 100].map((w, i) => (
//       <td key={i} style={{ padding: "16px 20px" }}>
//         <div
//           style={{
//             height: 12,
//             width: w,
//             borderRadius: 6,
//             background:
//               "linear-gradient(90deg, #1e2130 25%, #252840 50%, #1e2130 75%)",
//             backgroundSize: "200% 100%",
//             animation: "shimmer 1.5s infinite",
//           }}
//         />
//       </td>
//     ))}
//   </tr>
// );

// // ─── EMPTY STATE ──────────────────────────────────────────────────────────────
// const EmptyState = ({ query }) => (
//   <tr>
//     <td colSpan="6" style={{ padding: "64px 20px", textAlign: "center" }}>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: 12,
//         }}
//       >
//         <div
//           style={{
//             width: 52,
//             height: 52,
//             borderRadius: 16,
//             background: "rgba(99,102,241,0.08)",
//             border: "1px solid rgba(99,102,241,0.15)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: 22,
//           }}
//         >
//           {query ? "🔍" : "📋"}
//         </div>
//         <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>
//           {query ? `No results for "${query}"` : "No job applications yet"}
//         </p>
//         <p style={{ color: "#475569", fontSize: 12, margin: 0 }}>
//           {query
//             ? "Try a different search term"
//             : "Add your first application to get started"}
//         </p>
//       </div>
//     </td>
//   </tr>
// );

// // ─── STAT CARD ────────────────────────────────────────────────────────────────
// const StatCard = ({ label, value, color, icon }) => (
//   <div
//     style={{
//       background: "#0d0f18",
//       border: "1px solid rgba(255,255,255,0.06)",
//       borderRadius: 14,
//       padding: "16px 20px",
//       display: "flex",
//       alignItems: "center",
//       gap: 14,
//       flex: 1,
//       minWidth: 130,
//     }}
//   >
//     <div
//       style={{
//         width: 36,
//         height: 36,
//         borderRadius: 10,
//         background: `${color}12`,
//         border: `1px solid ${color}25`,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         fontSize: 16,
//       }}
//     >
//       {icon}
//     </div>
//     <div>
//       <p
//         style={{
//           fontSize: 20,
//           fontWeight: 600,
//           color: "#f1f5f9",
//           margin: 0,
//           lineHeight: 1,
//         }}
//       >
//         {value}
//       </p>
//       <p
//         style={{
//           fontSize: 11,
//           color: "#64748b",
//           margin: "4px 0 0",
//           fontWeight: 500,
//           letterSpacing: "0.03em",
//           textTransform: "uppercase",
//         }}
//       >
//         {label}
//       </p>
//     </div>
//   </div>
// );

// // ─── MAIN PAGE ────────────────────────────────────────────────────────────────
// export default function JobsPage() {
//   const navigate = useNavigate();
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [sortField, setSortField] = useState("createdAt");
//   const [sortDir, setSortDir] = useState("desc");
//   const [page, setPage] = useState(1);
//   const [hoveredRow, setHoveredRow] = useState(null);
//   const PER_PAGE = 10;

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         setLoading(true);
//         const res = await getAllJobs();
//         setJobs(res.data || []);
//       } catch (e) {
//         console.error(e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   const stats = useMemo(
//     () => ({
//       total: jobs.length,
//       applied: jobs.filter((j) => j.status === "Applied").length,
//       interview: jobs.filter((j) =>
//         ["Interview", "HR Round", "Technical Round"].includes(j.status),
//       ).length,
//       selected: jobs.filter((j) => j.status === "Selected").length,
//       rejected: jobs.filter((j) => j.status === "Rejected").length,
//     }),
//     [jobs],
//   );

//   const filtered = useMemo(() => {
//     let list = [...jobs];
//     if (searchQuery) {
//       const q = searchQuery.toLowerCase();
//       list = list.filter(
//         (j) =>
//           j.companyName?.toLowerCase().includes(q) ||
//           j.jobRole?.toLowerCase().includes(q) ||
//           j.location?.toLowerCase().includes(q) ||
//           j.hrEmail?.toLowerCase().includes(q),
//       );
//     }
//     if (statusFilter !== "All")
//       list = list.filter((j) => j.status === statusFilter);
//     list.sort((a, b) => {
//       const av = a[sortField] || "";
//       const bv = b[sortField] || "";
//       const cmp = av < bv ? -1 : av > bv ? 1 : 0;
//       return sortDir === "asc" ? cmp : -cmp;
//     });
//     return list;
//   }, [jobs, searchQuery, statusFilter, sortField, sortDir]);

//   const totalPages = Math.ceil(filtered.length / PER_PAGE);
//   const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

//   const toggleSort = (field) => {
//     if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
//     else {
//       setSortField(field);
//       setSortDir("asc");
//     }
//   };

//   const SortIcon = ({ field }) => (
//     <span
//       style={{
//         marginLeft: 4,
//         opacity: sortField === field ? 1 : 0.3,
//         fontSize: 10,
//       }}
//     >
//       {sortField === field ? (sortDir === "asc" ? "▲" : "▼") : "⇅"}
//     </span>
//   );

//   const formatDate = (d) => {
//     if (!d) return "—";
//     return new Date(d).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "2-digit",
//     });
//   };

//   return (
//     <DashboardLayout>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
//         @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
//         @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
//         .jobs-page * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
//         .jobs-page { animation: fadeUp 0.35s ease both; }
//         .th-btn { background: none; border: none; cursor: pointer; color: #64748b; font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; padding: 0; display: inline-flex; align-items: center; font-family: 'DM Sans', sans-serif; }
//         .th-btn:hover { color: #94a3b8; }
//         .filter-pill { padding: 6px 14px; border-radius: 999px; font-size: 12px; font-weight: 500; border: 1px solid rgba(255,255,255,0.06); background: transparent; color: #64748b; cursor: pointer; transition: all 0.15s; white-space: nowrap; }
//         .filter-pill:hover { color: #94a3b8; border-color: rgba(255,255,255,0.12); }
//         .filter-pill.active { background: rgba(99,102,241,0.12); border-color: rgba(99,102,241,0.3); color: #818cf8; }
//         .action-btn { width: 28px; height: 28px; border-radius: 8px; border: 1px solid transparent; background: transparent; color: #475569; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 14px; transition: all 0.15s; }
//         .action-btn:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.08); color: #94a3b8; }
//         .copy-btn { padding: 2px 6px; border-radius: 4px; border: none; background: transparent; color: #475569; cursor: pointer; font-size: 11px; transition: all 0.15s; }
//         .copy-btn:hover { color: #94a3b8; background: rgba(255,255,255,0.05); }
//         .pg-btn { padding: 6px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06); background: transparent; color: #64748b; cursor: pointer; font-size: 12px; transition: all 0.15s; font-family: 'DM Sans', sans-serif; }
//         .pg-btn:hover:not(:disabled) { background: rgba(255,255,255,0.05); color: #94a3b8; }
//         .pg-btn:disabled { opacity: 0.35; cursor: not-allowed; }
//         .pg-btn.active { background: rgba(99,102,241,0.15); border-color: rgba(99,102,241,0.3); color: #818cf8; }
//         .link-chip { display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: 6px; border: 1px solid rgba(6,182,212,0.2); background: rgba(6,182,212,0.06); color: #22d3ee; font-size: 11px; text-decoration: none; font-weight: 500; transition: all 0.15s; max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
//         .link-chip:hover { background: rgba(6,182,212,0.12); border-color: rgba(6,182,212,0.3); }
//         input[type=text]:focus { outline: none; }
//       `}</style>

//       <div className="jobs-page" style={{ padding: "0 0 40px" }}>
//         {/* ── HEADER ── */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "flex-start",
//             justifyContent: "space-between",
//             marginBottom: 28,
//             gap: 16,
//             flexWrap: "wrap",
//           }}
//         >
//           <div>
//             <h1
//               style={{
//                 fontSize: 24,
//                 fontWeight: 600,
//                 color: "#f1f5f9",
//                 margin: 0,
//                 letterSpacing: "-0.02em",
//               }}
//             >
//               Job Applications
//             </h1>
//             <p
//               style={{
//                 fontSize: 13,
//                 color: "#475569",
//                 margin: "5px 0 0",
//                 fontWeight: 400,
//               }}
//             >
//               {stats.total} total · {stats.applied} applied · {stats.interview}{" "}
//               in process
//             </p>
//           </div>
//           <div style={{ display: "flex", gap: 8 }}>
//             <button
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 7,
//                 padding: "9px 16px",
//                 borderRadius: 10,
//                 border: "1px solid rgba(255,255,255,0.07)",
//                 background: "#0d0f18",
//                 color: "#64748b",
//                 fontSize: 13,
//                 fontWeight: 500,
//                 cursor: "pointer",
//                 fontFamily: "'DM Sans', sans-serif",
//               }}
//             >
//               <span style={{ fontSize: 14 }}>↓</span> Export
//             </button>
//             <button
//               onClick={() => navigate("/jobs/new")}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 7,
//                 padding: "9px 20px",
//                 borderRadius: 10,
//                 background: "#6366f1",
//                 border: "1px solid rgba(99,102,241,0.5)",
//                 color: "#fff",
//                 fontSize: 13,
//                 fontWeight: 600,
//                 cursor: "pointer",
//                 letterSpacing: "0.01em",
//                 fontFamily: "'DM Sans', sans-serif",
//                 boxShadow: "0 0 20px rgba(99,102,241,0.25)",
//               }}
//             >
//               + Add Job
//             </button>
//           </div>
//         </div>

//         {/* ── STAT CARDS ── */}
//         <div
//           style={{
//             display: "flex",
//             gap: 10,
//             marginBottom: 24,
//             flexWrap: "wrap",
//           }}
//         >
//           <StatCard
//             label="Total"
//             value={stats.total}
//             color="#6366f1"
//             icon="📋"
//           />
//           <StatCard
//             label="Applied"
//             value={stats.applied}
//             color="#6366f1"
//             icon="📤"
//           />
//           <StatCard
//             label="In Process"
//             value={stats.interview}
//             color="#a855f7"
//             icon="🔄"
//           />
//           <StatCard
//             label="Selected"
//             value={stats.selected}
//             color="#10b981"
//             icon="✅"
//           />
//           <StatCard
//             label="Rejected"
//             value={stats.rejected}
//             color="#f43f5e"
//             icon="❌"
//           />
//         </div>

//         {/* ── FILTERS BAR ── */}
//         <div
//           style={{
//             background: "#0d0f18",
//             border: "1px solid rgba(255,255,255,0.06)",
//             borderRadius: 14,
//             padding: "14px 16px",
//             marginBottom: 12,
//             display: "flex",
//             alignItems: "center",
//             gap: 12,
//             flexWrap: "wrap",
//           }}
//         >
//           {/* Search */}
//           <div
//             style={{ position: "relative", flex: "1 1 220px", minWidth: 200 }}
//           >
//             <span
//               style={{
//                 position: "absolute",
//                 left: 10,
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 color: "#475569",
//                 fontSize: 14,
//               }}
//             >
//               🔍
//             </span>
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => {
//                 setSearchQuery(e.target.value);
//                 setPage(1);
//               }}
//               placeholder="Search company, role, location…"
//               style={{
//                 width: "100%",
//                 background: "#12141e",
//                 border: "1px solid rgba(255,255,255,0.06)",
//                 borderRadius: 9,
//                 padding: "8px 12px 8px 32px",
//                 color: "#e2e8f0",
//                 fontSize: 13,
//                 fontFamily: "'DM Sans', sans-serif",
//               }}
//             />
//           </div>

//           {/* Divider */}
//           <div
//             style={{
//               width: 1,
//               height: 24,
//               background: "rgba(255,255,255,0.06)",
//               flexShrink: 0,
//             }}
//           />

//           {/* Status pills */}
//           <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
//             {[
//               "All",
//               "Applied",
//               "Interview",
//               "Technical Round",
//               "Selected",
//               "Rejected",
//             ].map((s) => (
//               <button
//                 key={s}
//                 className={`filter-pill${statusFilter === s ? " active" : ""}`}
//                 onClick={() => {
//                   setStatusFilter(s);
//                   setPage(1);
//                 }}
//               >
//                 {s}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* ── TABLE ── */}
//         <div
//           style={{
//             background: "#0d0f18",
//             border: "1px solid rgba(255,255,255,0.06)",
//             borderRadius: 16,
//             overflow: "hidden",
//           }}
//         >
//           <div style={{ overflowX: "auto" }}>
//             <table
//               style={{
//                 width: "100%",
//                 borderCollapse: "collapse",
//                 minWidth: 800,
//               }}
//             >
//               <thead>
//                 <tr
//                   style={{
//                     borderBottom: "1px solid rgba(255,255,255,0.05)",
//                     background: "rgba(0,0,0,0.2)",
//                   }}
//                 >
//                   {[
//                     { label: "Company & Role", field: "companyName", w: "22%" },
//                     { label: "Contact", field: "hrEmail", w: "18%" },
//                     { label: "Location & Exp", field: "location", w: "15%" },
//                     { label: "Apply Link", field: "jobUrl", w: "13%" },
//                     { label: "Status", field: "status", w: "13%" },
//                     { label: "Applied", field: "appliedDate", w: "11%" },
//                     { label: "", field: null, w: "8%" },
//                   ].map(({ label, field, w }) => (
//                     <th
//                       key={label}
//                       style={{
//                         padding: "13px 20px",
//                         textAlign: "left",
//                         width: w,
//                       }}
//                     >
//                       {field ? (
//                         <button
//                           className="th-btn"
//                           onClick={() => toggleSort(field)}
//                         >
//                           {label}
//                           <SortIcon field={field} />
//                         </button>
//                       ) : null}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading ? (
//                   [1, 2, 3, 4, 5].map((i) => <SkeletonRow key={i} />)
//                 ) : paginated.length === 0 ? (
//                   <EmptyState query={searchQuery} />
//                 ) : (
//                   paginated.map((job, idx) => (
//                     <tr
//                       key={job._id || idx}
//                       onMouseEnter={() => setHoveredRow(idx)}
//                       onMouseLeave={() => setHoveredRow(null)}
//                       style={{
//                         borderBottom: "1px solid rgba(255,255,255,0.04)",
//                         background:
//                           hoveredRow === idx
//                             ? "rgba(99,102,241,0.03)"
//                             : "transparent",
//                         transition: "background 0.15s",
//                         cursor: "pointer",
//                       }}
//                       onClick={() => navigate(`/jobs/${job._id}`)}
//                     >
//                       {/* Company & Role */}
//                       <td style={{ padding: "14px 20px" }}>
//                         <div
//                           style={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: 11,
//                           }}
//                         >
//                           <Avatar name={job.companyName} />
//                           <div style={{ minWidth: 0 }}>
//                             <p
//                               style={{
//                                 fontSize: 13,
//                                 fontWeight: 600,
//                                 color: "#e2e8f0",
//                                 margin: 0,
//                                 whiteSpace: "nowrap",
//                                 overflow: "hidden",
//                                 textOverflow: "ellipsis",
//                                 maxWidth: 160,
//                               }}
//                             >
//                               {job.jobRole || "—"}
//                             </p>
//                             <p
//                               style={{
//                                 fontSize: 12,
//                                 color: "#64748b",
//                                 margin: "2px 0 0",
//                                 whiteSpace: "nowrap",
//                                 overflow: "hidden",
//                                 textOverflow: "ellipsis",
//                                 maxWidth: 160,
//                               }}
//                             >
//                               {job.companyName || "—"}
//                             </p>
//                             {job.priority && (
//                               <PriorityDot priority={job.priority} />
//                             )}
//                           </div>
//                         </div>
//                       </td>

//                       {/* Contact */}
//                       <td
//                         style={{ padding: "14px 20px" }}
//                         onClick={(e) => e.stopPropagation()}
//                       >
//                         <div
//                           style={{
//                             display: "flex",
//                             flexDirection: "column",
//                             gap: 5,
//                           }}
//                         >
//                           {job.hrEmail ? (
//                             <div
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: 4,
//                               }}
//                             >
//                               <a
//                                 href={`mailto:${job.hrEmail}`}
//                                 style={{
//                                   fontSize: 12,
//                                   color: "#94a3b8",
//                                   textDecoration: "none",
//                                   maxWidth: 140,
//                                   overflow: "hidden",
//                                   textOverflow: "ellipsis",
//                                   whiteSpace: "nowrap",
//                                 }}
//                                 title={job.hrEmail}
//                               >
//                                 ✉ {job.hrEmail}
//                               </a>
//                               <button
//                                 className="copy-btn"
//                                 onClick={() =>
//                                   navigator.clipboard.writeText(job.hrEmail)
//                                 }
//                                 title="Copy email"
//                               >
//                                 ⧉
//                               </button>
//                             </div>
//                           ) : (
//                             <span style={{ fontSize: 12, color: "#334155" }}>
//                               No email
//                             </span>
//                           )}
//                           {job.phone ? (
//                             <div
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: 4,
//                               }}
//                             >
//                               <a
//                                 href={`tel:${job.phone}`}
//                                 style={{
//                                   fontSize: 12,
//                                   color: "#94a3b8",
//                                   textDecoration: "none",
//                                 }}
//                               >
//                                 📞 {job.phone}
//                               </a>
//                               <button
//                                 className="copy-btn"
//                                 onClick={() =>
//                                   navigator.clipboard.writeText(job.phone)
//                                 }
//                                 title="Copy phone"
//                               >
//                                 ⧉
//                               </button>
//                             </div>
//                           ) : (
//                             <span style={{ fontSize: 12, color: "#334155" }}>
//                               No phone
//                             </span>
//                           )}
//                           {job.hrName && (
//                             <span style={{ fontSize: 11, color: "#475569" }}>
//                               {job.hrName}
//                             </span>
//                           )}
//                         </div>
//                       </td>

//                       {/* Location & Experience */}
//                       <td style={{ padding: "14px 20px" }}>
//                         <div
//                           style={{
//                             display: "flex",
//                             flexDirection: "column",
//                             gap: 5,
//                           }}
//                         >
//                           <span
//                             style={{
//                               fontSize: 12,
//                               color: "#94a3b8",
//                               display: "flex",
//                               alignItems: "center",
//                               gap: 4,
//                             }}
//                           >
//                             📍 {job.location || "—"}
//                           </span>
//                           <span
//                             style={{
//                               fontSize: 12,
//                               color: "#64748b",
//                               display: "flex",
//                               alignItems: "center",
//                               gap: 4,
//                             }}
//                           >
//                             💼 {job.jobType || "—"}
//                           </span>
//                           {job.salary && (
//                             <span style={{ fontSize: 11, color: "#475569" }}>
//                               💰 {job.salary}
//                             </span>
//                           )}
//                         </div>
//                       </td>

//                       {/* Apply Link */}
//                       <td
//                         style={{ padding: "14px 20px" }}
//                         onClick={(e) => e.stopPropagation()}
//                       >
//                         {job.jobUrl ? (
//                           <a
//                             href={job.jobUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="link-chip"
//                           >
//                             🔗 Apply
//                           </a>
//                         ) : (
//                           <span style={{ fontSize: 12, color: "#334155" }}>
//                             —
//                           </span>
//                         )}
//                       </td>

//                       {/* Status */}
//                       <td style={{ padding: "14px 20px" }}>
//                         <StatusBadge status={job.status || "Not Applied"} />
//                       </td>

//                       {/* Date Applied */}
//                       <td style={{ padding: "14px 20px" }}>
//                         <div
//                           style={{
//                             display: "flex",
//                             flexDirection: "column",
//                             gap: 3,
//                           }}
//                         >
//                           <span
//                             style={{
//                               fontSize: 12,
//                               color: "#94a3b8",
//                               fontFamily: "'DM Mono', monospace",
//                             }}
//                           >
//                             {formatDate(job.appliedDate)}
//                           </span>
//                           {job.followUpDate && (
//                             <span style={{ fontSize: 11, color: "#475569" }}>
//                               Follow: {formatDate(job.followUpDate)}
//                             </span>
//                           )}
//                         </div>
//                       </td>

//                       {/* Actions */}
//                       <td
//                         style={{ padding: "14px 20px" }}
//                         onClick={(e) => e.stopPropagation()}
//                       >
//                         <div
//                           style={{
//                             display: "flex",
//                             gap: 4,
//                             justifyContent: "flex-end",
//                           }}
//                         >
//                           <button
//                             className="action-btn"
//                             title="Edit"
//                             onClick={() => navigate(`/jobs/${job._id}/edit`)}
//                           >
//                             ✏
//                           </button>
//                           <button className="action-btn" title="More">
//                             ⋯
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* ── PAGINATION ── */}
//           <div
//             style={{
//               padding: "14px 20px",
//               borderTop: "1px solid rgba(255,255,255,0.05)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               background: "rgba(0,0,0,0.15)",
//               flexWrap: "wrap",
//               gap: 10,
//             }}
//           >
//             <span style={{ fontSize: 12, color: "#475569" }}>
//               Showing{" "}
//               <span style={{ color: "#94a3b8", fontWeight: 500 }}>
//                 {Math.min((page - 1) * PER_PAGE + 1, filtered.length)}
//               </span>
//               {" – "}
//               <span style={{ color: "#94a3b8", fontWeight: 500 }}>
//                 {Math.min(page * PER_PAGE, filtered.length)}
//               </span>
//               {" of "}
//               <span style={{ color: "#94a3b8", fontWeight: 500 }}>
//                 {filtered.length}
//               </span>{" "}
//               results
//             </span>
//             <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
//               <button
//                 className="pg-btn"
//                 disabled={page <= 1}
//                 onClick={() => setPage((p) => p - 1)}
//               >
//                 ← Prev
//               </button>
//               {Array.from(
//                 { length: Math.min(totalPages, 5) },
//                 (_, i) => i + 1,
//               ).map((p) => (
//                 <button
//                   key={p}
//                   className={`pg-btn${page === p ? " active" : ""}`}
//                   onClick={() => setPage(p)}
//                 >
//                   {p}
//                 </button>
//               ))}
//               {totalPages > 5 && (
//                 <span style={{ color: "#475569", fontSize: 12 }}>…</span>
//               )}
//               <button
//                 className="pg-btn"
//                 disabled={page >= totalPages}
//                 onClick={() => setPage((p) => p + 1)}
//               >
//                 Next →
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }
