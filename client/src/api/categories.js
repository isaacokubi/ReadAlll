import API from "./axios";

export const getCategories = async () => {
  const { data } = await API.get("/categories");
  return data;
};