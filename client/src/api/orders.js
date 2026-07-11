import API from "./axios";

// Create order
export const createOrder = async () => {
  const { data } = await API.post("/orders");
  return data;
};

// Get my orders
export const getMyOrders = async () => {
  const { data } = await API.get("/orders/my-orders");
  return data;
};