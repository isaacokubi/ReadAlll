import API from "./axios";

// Get cart
export const getCart = async () => {
  const { data } = await API.get("/cart");
  return data;
};

// Add to cart
export const addToCart = async (bookId, quantity) => {
  const { data } = await API.post("/cart", {
    bookId,
    quantity,
  });

  return data;
};

// Update quantity
export const updateCartItem = async (bookId, quantity) => {
  const { data } = await API.put(`/cart/${bookId}`, {
    quantity,
  });

  return data;
};

// Remove item
export const removeCartItem = async (bookId) => {
  const { data } = await API.delete(`/cart/${bookId}`);
  return data;
};