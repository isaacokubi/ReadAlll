import API from "./axios";

// Dashboard stats
export const getStats = async () => {
  const { data } = await API.get("/admin/stats");
  return data;
};