import { useEffect, useState, useMemo } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getReminders,
  createReminder,
  updateReminder,
  completeReminder,
  deleteReminder,
} from "../../api/reminders.api";
import ReminderCard from "../../components/reminders/ReminderCard";
import ReminderFilters from "../../components/reminders/ReminderFilters";
import ReminderModal from "../../components/reminders/ReminderModal";
import ReminderEmptyState from "../../components/reminders/ReminderEmptyState";
import { toast } from "react-toastify";

export default function RemindersPage() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeType, setActiveType] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      setLoading(true);
      const res = await getReminders();
      setReminders(res.data || []);
    } catch (err) {
      toast.error("Failed to load reminders.");
    } finally {
      setLoading(false);
    }
  };

  // Stats
  const stats = useMemo(() => {
    const now = new Date();
    return {
      total: reminders.length,
      pending: reminders.filter((r) => !r.isCompleted).length,
      overdue: reminders.filter(
        (r) => !r.isCompleted && new Date(r.remindAt) < now,
      ).length,
      completed: reminders.filter((r) => r.isCompleted).length,
    };
  }, [reminders]);

  // Filtered list
  const filtered = useMemo(() => {
    const now = new Date();
    let list = [...reminders];

    if (activeFilter === "Pending")
      list = list.filter((r) => !r.isCompleted && new Date(r.remindAt) >= now);
    if (activeFilter === "Overdue")
      list = list.filter((r) => !r.isCompleted && new Date(r.remindAt) < now);
    if (activeFilter === "Completed") list = list.filter((r) => r.isCompleted);
    if (activeType !== "all") list = list.filter((r) => r.type === activeType);

    return list.sort((a, b) => new Date(a.remindAt) - new Date(b.remindAt));
  }, [reminders, activeFilter, activeType]);

  const handleSave = async (data) => {
    setIsSaving(true);
    try {
      if (editingReminder?._id) {
        const res = await updateReminder(editingReminder._id, data);
        setReminders((prev) =>
          prev.map((r) => (r._id === editingReminder._id ? res.data : r)),
        );
        toast.success("Reminder updated.");
      } else {
        const res = await createReminder(data);
        setReminders((prev) => [res.data, ...prev]);
        toast.success("Reminder added.");
      }
      setModalOpen(false);
      setEditingReminder(null);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save reminder.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleComplete = async (id) => {
    try {
      const res = await completeReminder(id);
      setReminders((prev) => prev.map((r) => (r._id === id ? res.data : r)));
      toast.success("Reminder marked as complete.");
    } catch (err) {
      toast.error("Failed to complete reminder.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReminder(id);
      setReminders((prev) => prev.filter((r) => r._id !== id));
      toast.success("Reminder deleted.");
    } catch (err) {
      toast.error("Failed to delete reminder.");
    }
  };

  const handleEdit = (reminder) => {
    setEditingReminder(reminder);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingReminder(null);
    setModalOpen(true);
  };

  return (
    <DashboardLayout title="Reminders">
      <div className="max-w-4xl mx-auto space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-bold text-[#0F172A]">Reminders</h1>
            <p className="text-[13px] text-[#64748B] mt-0.5">
              Stay on top of follow-ups and interviews.
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 px-4 h-[38px] bg-[#26A9C9] hover:bg-[#1F9DBD] text-white text-[13px] font-medium rounded-lg transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 2v12M2 8h12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Add Reminder
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total", value: stats.total, color: "#26A9C9" },
            { label: "Pending", value: stats.pending, color: "#F59E0B" },
            { label: "Overdue", value: stats.overdue, color: "#EF4444" },
            { label: "Completed", value: stats.completed, color: "#10B981" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white border border-[#E2E8F0] rounded-xl p-4"
            >
              <p className="text-[12px] text-[#64748B]">{s.label}</p>
              <p
                className="text-[22px] font-bold mt-0.5"
                style={{ color: s.color }}
              >
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <ReminderFilters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          activeType={activeType}
          setActiveType={setActiveType}
        />

        {/* List */}
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border border-[#E2E8F0] rounded-xl p-4 h-[80px] animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white border border-[#E2E8F0] rounded-xl">
            <ReminderEmptyState onAdd={handleAdd} />
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((reminder) => (
              <ReminderCard
                key={reminder._id}
                reminder={reminder}
                onComplete={handleComplete}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <ReminderModal
          reminder={editingReminder}
          onSave={handleSave}
          onClose={() => {
            setModalOpen(false);
            setEditingReminder(null);
          }}
          isSaving={isSaving}
        />
      )}
    </DashboardLayout>
  );
}
