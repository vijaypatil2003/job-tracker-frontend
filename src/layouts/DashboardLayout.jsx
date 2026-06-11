import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardTopbar from "../components/dashboard/DashboardTopbar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardLayout({ children, title = "Dashboard" }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.data);
      } catch (err) {
        console.error("Failed to load user", err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#EAF3F6] font-sans">
      <DashboardSidebar user={user} />
      <div className="flex-1 min-w-0 flex flex-col">
        <DashboardTopbar title={title} user={user} />
        <div className="flex-1 px-4 sm:px-6 py-6">{children}</div>
      </div>
    </div>
  );
}
