import API from "./axios";

// Get all books
export const getBooks = async () => {
  const { data } = await API.get("/books");
  return data;
};

// Get single book
export const getBook = async (id) => {
  const { data } = await API.get(`/books/${id}`);
  return data;
};

// Search books
export const searchBooks = async (query, category) => {
  const { data } = await API.get(
    `/books/search?keyword=${query}&category=${category}`
  );
  return data;
};