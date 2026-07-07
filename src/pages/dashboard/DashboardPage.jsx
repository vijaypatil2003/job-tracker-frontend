import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardTopbar from "../../components/dashboard/DashboardTopbar";
import StatsCard from "../../components/dashboard/StatsCard";
import StatusBreakdown from "../../components/dashboard/StatusBreakdown";
import DailyGoalCard from "../../components/dashboard/DailyGoalCard";
import MonthlyChart from "../../components/dashboard/MonthlyChart";
import ActivityFeed from "../../components/dashboard/ActivityFeed";
import FollowUpAlert from "../../components/dashboard/FollowUpAlert";

const BASE = import.meta.env.VITE_API_URL;
function authHeaders() {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [overview, setOverview] = useState(null);
  const [monthly, setMonthly] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    setError("");
    try {
      const [overviewRes, monthlyRes, activityRes] = await Promise.all([
        axios.get(`${BASE}/analytics/overview`, authHeaders()),
        axios.get(`${BASE}/analytics/monthly`, authHeaders()),
        axios.get(`${BASE}/analytics/activity?limit=10`, authHeaders()),
      ]);

      setOverview(overviewRes.data.data);
      setMonthly(monthlyRes.data.data);
      setActivity(activityRes.data.data);

      // Profile fetch isolated — a missing profile should NOT break the dashboard
      try {
        const profileRes = await axios.get(`${BASE}/profile`, authHeaders());
        setUser(profileRes.data.data);
      } catch (profileErr) {
        setUser(null);
      }
    } catch (err) {
      if (err?.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        setError("Failed to load dashboard.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EAF3F6] flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#64748B]">
          <svg
            className="animate-spin size-5 text-[#26A9C9]"
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
          <span className="text-[14px]">Loading dashboard…</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#EAF3F6] flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-[14px] text-red-600">{error}</p>
          <button
            onClick={fetchAll}
            className="px-4 py-2 bg-[#26A9C9] text-white text-sm rounded-lg hover:bg-[#1F9DBD]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#EAF3F6] font-sans">
      {/* Sidebar */}
      <DashboardSidebar
        user={user}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <DashboardTopbar
          title="Dashboard"
          user={user}
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="flex-1 px-4 sm:px-6 py-6 space-y-5 max-w-6xl w-full mx-auto">
          {/* Follow-up alerts */}
          <FollowUpAlert
            overdue={overview?.overdueFollowUps}
            upcoming={overview?.upcomingFollowUps}
          />

          {/* Top stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              label="Total Applied"
              value={overview?.total ?? 0}
              sub="all time"
              color="#26A9C9"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              }
            />
            <StatsCard
              label="Applied Today"
              value={overview?.todayApplied ?? 0}
              sub={`goal: ${overview?.dailyGoal ?? 0}`}
              color="#10B981"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              }
            />
            <StatsCard
              label="Success Rate"
              value={`${overview?.successRate ?? 0}%`}
              sub="selected / total"
              color="#8B5CF6"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              }
            />
            <StatsCard
              label="Interview Rate"
              value={`${overview?.interviewConversionRate ?? 0}%`}
              sub="interviews / applied"
              color="#F59E0B"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              }
            />
          </div>

          {/* Middle row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2">
              <StatusBreakdown byStatus={overview?.byStatus} />
            </div>
            <div>
              <DailyGoalCard
                dailyGoal={overview?.dailyGoal ?? 5}
                dailyProgress={overview?.dailyProgress ?? 0}
                todayApplied={overview?.todayApplied ?? 0}
                currentStreak={overview?.currentStreak ?? 0}
                longestStreak={overview?.longestStreak ?? 0}
              />
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2">
              <MonthlyChart data={monthly} />
            </div>
            <div>
              <ActivityFeed activities={activity} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import DashboardLayout from "../../layouts/DashboardLayout";
// import { getDashboardStats } from "../../api/analytics.api";

// import {
//   Briefcase,
//   CalendarDays,
//   CheckCircle2,
//   XCircle,
//   Clock,
//   BellRing,
//   ArrowUpRight,
//   MoreHorizontal,
//   Plus,
// } from "lucide-react";

// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

// import { useNavigate } from "react-router-dom";

// const monthlyData = [
//   { name: "Jan", applications: 12 },
//   { name: "Feb", applications: 19 },
//   { name: "Mar", applications: 15 },
//   { name: "Apr", applications: 28 },
//   { name: "May", applications: 42 },
//   { name: "Jun", applications: 35 },
// ];

// const pipelineData = [
//   { name: "Technical Round", value: 8, color: "#3b82f6" },
//   { name: "HR Round", value: 5, color: "#8b5cf6" },
//   { name: "Assignment", value: 9, color: "#06b6d4" },
// ];

// const recentActivity = [];

// const upcomingReminders = [];

// export default function DashboardPage() {
//   const navigate = useNavigate();

//   const [stats, setStats] = useState([]);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const response = await getDashboardStats();

//         console.log(response);

//         setStats(response.data.data || []);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   return (
//     <DashboardLayout>
//       <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">
//         {/* HEADER */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-semibold text-slate-100 tracking-tight">
//               Dashboard
//             </h1>

//             <p className="text-slate-400 mt-1">
//               Here is what's happening with your job search today.
//             </p>
//           </div>

//           <button
//             onClick={() => navigate("/jobs/new")}
//             className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium shadow-sm shadow-indigo-500/20"
//           >
//             <Plus className="w-4 h-4" />
//             Add New Job
//           </button>
//         </div>

//         {/* STATS */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {stats.map((item) => (
//             <div
//               key={item.label}
//               className="bg-[#12141A] border border-slate-800/60 rounded-2xl p-5"
//             >
//               <h3 className="text-slate-400 text-sm">{item.label}</h3>

//               <p className="text-3xl font-bold text-white mt-2">{item.value}</p>
//             </div>
//           ))}
//         </div>

//         {/* CHARTS */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* AREA CHART */}
//           <div className="lg:col-span-2 bg-[#12141A] border border-slate-800/60 rounded-2xl p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-lg font-semibold text-slate-100">
//                 Application Activity
//               </h2>

//               <button className="text-slate-400 hover:text-slate-200">
//                 <MoreHorizontal className="w-5 h-5" />
//               </button>
//             </div>

//             <div className="h-[300px] w-full">
//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart data={monthlyData}>
//                   <defs>
//                     <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />

//                       <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
//                     </linearGradient>
//                   </defs>

//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     stroke="#1e293b"
//                     vertical={false}
//                   />

//                   <XAxis dataKey="name" stroke="#64748b" fontSize={12} />

//                   <YAxis stroke="#64748b" fontSize={12} />

//                   <Tooltip />

//                   <Area
//                     type="monotone"
//                     dataKey="applications"
//                     stroke="#6366f1"
//                     fillOpacity={1}
//                     fill="url(#colorApps)"
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* PIE CHART */}
//           <div className="bg-[#12141A] border border-slate-800/60 rounded-2xl p-6">
//             <h2 className="text-lg font-semibold text-slate-100 mb-4">
//               Active Pipeline
//             </h2>

//             <div className="h-[300px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={pipelineData}
//                     dataKey="value"
//                     innerRadius={70}
//                     outerRadius={90}
//                   >
//                     {pipelineData.map((entry, index) => (
//                       <Cell key={index} fill={entry.color} />
//                     ))}
//                   </Pie>

//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>

//         {/* RECENT ACTIVITY */}
//         <div className="bg-[#12141A] border border-slate-800/60 rounded-2xl p-6">
//           <h2 className="text-lg font-semibold text-slate-100 mb-6">
//             Recent Activity
//           </h2>

//           {recentActivity.length === 0 ? (
//             <p className="text-slate-400">No recent activity</p>
//           ) : (
//             recentActivity.map((activity) => (
//               <div key={activity.id}>{activity.action}</div>
//             ))
//           )}
//         </div>

//         {/* REMINDERS */}
//         <div className="bg-[#12141A] border border-slate-800/60 rounded-2xl p-6">
//           <h2 className="text-lg font-semibold text-slate-100 mb-6">
//             Upcoming Reminders
//           </h2>

//           {upcomingReminders.length === 0 ? (
//             <p className="text-slate-400">No reminders</p>
//           ) : (
//             upcomingReminders.map((reminder) => (
//               <div key={reminder.id}>{reminder.title}</div>
//             ))
//           )}
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }

// // import DashboardLayout from '../../layouts/DashboardLayout'

// // const stats = [
// //   { label: 'Applications', value: 128 },
// //   { label: 'Interviews', value: 22 },
// //   { label: 'Selected', value: 4 },
// //   { label: 'Rejected', value: 37 },
// // ]

// // export default function DashboardPage() {
// //   return (
// //     <DashboardLayout>
// //       <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5'>
// //         {stats.map((item) => (
// //           <div key={item.label} className='glass rounded-2xl p-6'>
// //             <h3 className='text-slate-400'>{item.label}</h3>
// //             <p className='text-4xl font-bold mt-3'>{item.value}</p>
// //           </div>
// //         ))}
// //       </div>

// //       <div className='glass mt-6 p-6 rounded-2xl'>
// //         <h2 className='text-2xl font-semibold mb-4'>Recent Activity</h2>
// //         <div className='space-y-3'>
// //           <div>Applied at OpenAI</div>
// //           <div>Interview scheduled at Stripe</div>
// //           <div>Follow-up reminder added</div>
// //         </div>
// //       </div>
// //     </DashboardLayout>
// //   )
// // }
