import API from "./axios";

// Get user profile
export const getUserProfile = async (id) => {
  const { data } = await API.get(`/users/${id}`);
  return data;
};

// Update user profile
export const updateUserProfile = async (id, payload) => {
  const { data } = await API.put(`/users/${id}`, payload);
  return data;
};


getMyOrders();