import { useEffect, useState } from "react";
import API from "../../api/axios";
import { deleteBook } from "../../api/adminBooks";
import { toast } from "react-toastify";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const { data } = await API.get("/books");
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      toast.success("Book deleted");
      fetchBooks();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Manage Books
      </h1>

      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th>Title</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book._id} className="border-b">
              <td>{book.title}</td>
              <td>${book.price}</td>
              <td>{book.stock}</td>
              <td>
                <button
                  onClick={() =>
                    handleDelete(book._id)
                  }
                  className="bg-red-500 text-white px-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBooks;