import API from "./axios";

export const createBook = async (formData) => {
  const { data } = await API.post("/books", formData);
  return data;
};

export const updateBook = async (id, formData) => {
  const { data } = await API.put(`/books/${id}`, formData);
  return data;
};

export const deleteBook = async (id) => {
  const { data } = await API.delete(`/books/${id}`);
  return data;
};