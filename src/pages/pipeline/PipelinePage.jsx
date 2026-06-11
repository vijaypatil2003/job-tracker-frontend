// src/pages/pipeline/PipelinePage.jsx

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const STATUSES = [
  "Not Applied",
  "Applied",
  "Interview",
  "Assignment",
  "Technical Round",
  "HR Round",
  "Offer Received",
  "Selected",
  "Rejected",
  "Offer Declined",
];

const jobs = [
  {
    id: "1",
    companyName: "Google",
    jobRole: "Frontend Engineer",
    status: "Technical Round",
    priority: "High",
    lastActivity: "2 days ago",
    nextAction: "Prepare system design interview",
    isPinned: true,
    isBookmarked: true,
  },
  {
    id: "2",
    companyName: "Stripe",
    jobRole: "Software Engineer",
    status: "Interview",
    priority: "Urgent",
    lastActivity: "Today",
    nextAction: "Attend recruiter screening",
    isPinned: true,
    isBookmarked: false,
  },
  {
    id: "3",
    companyName: "Amazon",
    jobRole: "SDE I",
    status: "Applied",
    priority: "Medium",
    lastActivity: "4 days ago",
    nextAction: "Send follow-up",
    isPinned: false,
    isBookmarked: true,
  },
  {
    id: "4",
    companyName: "Vercel",
    jobRole: "Frontend Developer",
    status: "Offer Received",
    priority: "High",
    lastActivity: "Yesterday",
    nextAction: "Review compensation package",
    isPinned: true,
    isBookmarked: true,
  },
  {
    id: "5",
    companyName: "Notion",
    jobRole: "Product Engineer",
    status: "HR Round",
    priority: "High",
    lastActivity: "1 day ago",
    nextAction: "Prepare culture-fit discussion",
    isPinned: false,
    isBookmarked: false,
  },
  {
    id: "6",
    companyName: "Ramp",
    jobRole: "Full Stack Engineer",
    status: "Not Applied",
    priority: "Low",
    lastActivity: "6 days ago",
    nextAction: "Customize resume",
    isPinned: false,
    isBookmarked: true,
  },
  {
    id: "7",
    companyName: "Google",
    jobRole: "Frontend Engineer",
    status: "Technical Round",
    priority: "High",
    lastActivity: "2 days ago",
    nextAction: "Prepare system design interview",
    isPinned: true,
    isBookmarked: true,
  },
  {
    id: "8",
    companyName: "Ramp",
    jobRole: "Full Stack Engineer",
    status: "Not Applied",
    priority: "Low",
    lastActivity: "6 days ago",
    nextAction: "Customize resume",
    isPinned: false,
    isBookmarked: true,
  },
  {
    id: "6",
    companyName: "Ramp",
    jobRole: "Full Stack Engineer",
    status: "Not Applied",
    priority: "Low",
    lastActivity: "6 days ago",
    nextAction: "Customize resume",
    isPinned: false,
    isBookmarked: true,
  },
  {
    id: "6",
    companyName: "Ramp",
    jobRole: "Full Stack Engineer",
    status: "Offer Declined",
    priority: "Low",
    lastActivity: "6 days ago",
    nextAction: "Customize resume",
    isPinned: false,
    isBookmarked: true,
  },
  {
    id: "6",
    companyName: "Ramp",
    jobRole: "Full Stack Engineer",
    status: "Rejected",
    priority: "Low",
    lastActivity: "6 days ago",
    nextAction: "Customize resume",
    isPinned: false,
    isBookmarked: true,
  },
  {
    id: "6",
    companyName: "Ramp",
    jobRole: "Full Stack Engineer",
    status: "Selected",
    priority: "Low",
    lastActivity: "6 days ago",
    nextAction: "Customize resume",
    isPinned: false,
    isBookmarked: true,
  },
];

const priorityClasses = {
  Low: "bg-zinc-800 text-zinc-300",
  Medium: "bg-blue-500/10 text-blue-400",
  High: "bg-orange-500/10 text-orange-400",
  Urgent: "bg-red-500/10 text-red-400",
};

export default function PipelinePage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.companyName.toLowerCase().includes(search.toLowerCase()) ||
        job.jobRole.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || job.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || job.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [search, statusFilter, priorityFilter]);

  const activeCount = filteredJobs.filter(
    (job) => !["Selected", "Rejected", "Offer Declined"].includes(job.status),
  ).length;

  const interviewCount = filteredJobs.filter((job) =>
    ["Interview", "Technical Round", "HR Round"].includes(job.status),
  ).length;

  const offerCount = filteredJobs.filter(
    (job) => job.status === "Offer Received",
  ).length;

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <div className="mx-auto max-w-[1800px] px-6 py-8">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Pipeline</h1>
            <p className="mt-2 text-sm text-zinc-400">
              Track opportunity progress and focus on the next action.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="Search opportunities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-sm outline-none placeholder:text-zinc-500 focus:border-zinc-700"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-11 rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-sm outline-none"
            >
              <option>All</option>
              {STATUSES.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="h-11 rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-sm outline-none"
            >
              <option>All</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>

            <button className="h-11 rounded-xl bg-white px-5 text-sm font-medium text-black transition hover:opacity-90">
              + New Opportunity
            </button>
          </div>
        </div>

        {/* Overview */}
        <div className="mt-8 flex flex-wrap gap-3">
          <OverviewItem label="Active Opportunities" value={activeCount} />
          <OverviewItem label="Interviews In Progress" value={interviewCount} />
          <OverviewItem label="Offers Received" value={offerCount} />
        </div>

        {/* Pipeline */}
        <div className="mt-8 overflow-x-auto pb-4">
          <div className="flex min-w-max gap-5">
            {STATUSES.map((status) => {
              const columnJobs = filteredJobs.filter(
                (job) => job.status === status,
              );

              return (
                <div key={status} className="w-[320px] flex-shrink-0">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-zinc-200">
                      {status}
                    </h3>

                    <span className="rounded-full bg-zinc-800 px-2 py-1 text-xs text-zinc-400">
                      {columnJobs.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {columnJobs.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-zinc-800 p-6 text-center text-sm text-zinc-500">
                        No opportunities
                      </div>
                    ) : (
                      columnJobs.map((job) => (
                        <OpportunityCard
                          key={job.id}
                          job={job}
                          onClick={() => navigate(`/jobs/${job.id}`)}
                        />
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewItem({ label, value }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 px-5 py-4">
      <p className="text-xs uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}

function OpportunityCard({ job, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-left transition-all hover:border-zinc-700 hover:bg-zinc-800/60"
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <h4 className="truncate text-sm font-medium text-white">
            {job.companyName}
          </h4>

          <p className="truncate text-xs text-zinc-400">{job.jobRole}</p>
        </div>

        <div className="ml-2 flex gap-1">
          {job.isPinned && <span>📌</span>}
          {job.isBookmarked && <span>⭐</span>}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
        <span>{job.priority}</span>
        <span>{job.lastActivity}</span>
      </div>
    </button>
  );
}

// -----------------------------------------------------------below one is detailed one -----------------------------------------------------------
// function OpportunityCard({ job, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-left transition-all hover:border-zinc-700 hover:bg-zinc-800/60"
//     >
//       <div className="flex items-start justify-between">
//         <div>
//           <h4 className="font-semibold text-white">{job.companyName}</h4>

//           <p className="mt-1 text-sm text-zinc-400">{job.jobRole}</p>
//         </div>

//         <div className="flex gap-2">
//           {job.isPinned && <span>📌</span>}
//           {job.isBookmarked && <span>⭐</span>}
//         </div>
//       </div>

//       <div className="mt-4">
//         <span
//           className={`rounded-full px-2.5 py-1 text-xs font-medium ${
//             priorityClasses[job.priority]
//           }`}
//         >
//           {job.priority} Priority
//         </span>
//       </div>

//       <div className="mt-4 border-t border-zinc-800 pt-4">
//         <p className="text-xs uppercase tracking-wide text-zinc-500">
//           Next Action
//         </p>

//         <p className="mt-1 text-sm text-zinc-200">{job.nextAction}</p>
//       </div>

//       <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
//         <span>Last Activity</span>
//         <span>{job.lastActivity}</span>
//       </div>
//     </button>
//   );
// }
