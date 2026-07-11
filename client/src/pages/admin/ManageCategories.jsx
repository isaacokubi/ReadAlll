import { useEffect, useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const fetchCategories = async () => {
    const { data } = await API.get("/categories");
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const createCategory = async () => {
    try {
      await API.post("/categories", { name });
      toast.success("Category created");
      setName("");
      fetchCategories();
    } catch {
      toast.error("Failed to create");
    }
  };

  const deleteCategory = async (id) => {
    try {
      await API.delete(`/categories/${id}`);
      toast.success("Deleted");
      fetchCategories();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Manage Categories
      </h1>

      <div className="flex gap-2 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2"
          placeholder="New category"
        />

        <button
          onClick={createCategory}
          className="bg-green-500 text-white px-3"
        >
          Add
        </button>
      </div>

      <ul>
        {categories.map((cat) => (
          <li
            key={cat._id}
            className="flex justify-between border p-2"
          >
            {cat.name}

            <button
              onClick={() =>
                deleteCategory(cat._id)
              }
              className="bg-red-500 text-white px-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCategories;