import API from "./axios";

export const getReminders = async (params = {}) => {
  const response = await API.get("/reminders", { params });
  return response.data;
};

export const getUpcomingReminders = async () => {
  const response = await API.get("/reminders/upcoming");
  return response.data;
};

export const createReminder = async (data) => {
  const response = await API.post("/reminders", data);
  return response.data;
};

export const updateReminder = async (id, data) => {
  const response = await API.put(`/reminders/${id}`, data);
  return response.data;
};

export const completeReminder = async (id) => {
  const response = await API.put(`/reminders/${id}/complete`);
  return response.data;
};

export const deleteReminder = async (id) => {
  const response = await API.delete(`/reminders/${id}`);
  return response.data;
};
