import API from "./axios";

export const getDashboardStats = async () => {
  const response = await API.get("/analytics/overview");
  return response.data;
};

export const getMonthlyAnalytics = async () => {
  const response = await API.get("/analytics/monthly");
  return response.data;
};
