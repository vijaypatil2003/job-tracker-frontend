import { Routes, Route } from "react-router-dom";
import AuthPage from "../pages/auth/AuthPage";
import CompleteProfilePage from "../pages/profile/CompleteProfilePage";
import ProfileViewPage from "../pages/profile/ProfileViewPage";
import EditProfilePage from "../pages/profile/EditProfilePage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import AddJobOptionsPage from "../pages/jobs/AddJobOptionsPage";
import QuickAddJobPage from "../pages/jobs/QuickAddJobPage";
import DetailedAddJobPage from "../pages/jobs/DetailedAddJobPage";
import JobsPage from "../pages/jobs/JobsPage";
import ProtectedRoute from "./ProtectedRoute";
import JobDetailPage from "../pages/jobs/JobDetailPage";
import EditJobPage from "../pages/jobs/EditJobPage";
import NotFoundPage from "../pages/NotFoundPage";
import RemindersPage from "../pages/reminders/RemindersPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<AuthPage />} />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route path="/complete-profile" element={<CompleteProfilePage />} />
        <Route path="/profile" element={<ProfileViewPage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/add" element={<AddJobOptionsPage />} />
        <Route path="/jobs/quick-add" element={<QuickAddJobPage />} />
        <Route path="/jobs/detailed-add" element={<DetailedAddJobPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route path="/jobs/:id/edit" element={<EditJobPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/reminders" element={<RemindersPage />} />
      </Route>
    </Routes>
  );
}

// import { Routes, Route } from "react-router-dom";
// import CareerOSHome from "../pages/home/Home";
// import OpportunityWorkspace from "../pages/workSpace/Opportunityworkspace";
// import PipelinePage from "../pages/pipeline/PipelinePage";

// // import Home from '@/pages/home'
// import AuthPage from "../pages/auth/AuthPage";
// // import LoginPage from "../pages/auth/LoginPage";
// import RegisterPage from "../pages/auth/RegisterPage";
// import CompleteProfilePage from "../pages/profile/CompleteProfilePage";
// import DashboardPage from "../pages/dashboard/DashboardPage";
// import JobsPage from "../pages/jobs/JobsPage";
// import ProtectedRoute from "./ProtectedRoute";
// import AddJobOptionsPage from "../pages/jobs/AddJobOptionsPage";
// import QuickAddJobPage from "../pages/jobs/QuickAddJobPage";
// import AddJobPage from "../pages/jobs/AddJobPage";
// import DetailedAddJobPage from "../pages/jobs/DetailedAddJobPage";

// export default function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<AuthPage />} />
//       {/* <Route path="/logins" element={<LoginPage />} /> */}
//       <Route path="/register" element={<RegisterPage />} />

//       <Route element={<ProtectedRoute />}>
//         <Route path="/complete-profile" element={<CompleteProfilePage />} />
//         <Route path="/dashboard" element={<DashboardPage />} />
//         <Route path="/jobs/add" element={<AddJobOptionsPage />} />
//         <Route path="/jobs/quick-add" element={<QuickAddJobPage />} />
//         <Route path="/jobs/detailed-add" element={<DetailedAddJobPage />} />
//         <Route path="/home" element={<CareerOSHome />} />
//         <Route path="/work-space" element={<OpportunityWorkspace />} />
//         <Route path="/jobs" element={<JobsPage />} />
//         <Route path="/pipeline" element={<PipelinePage />} />
//         {/* <Route path="/jobs/add" element={<AddJobPage />} />{" "} */}
//       </Route>
//     </Routes>
//   );
// }
