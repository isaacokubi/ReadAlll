import { useEffect, useState } from "react";
import { getBooks, searchBooks } from "../../api/books";
import { getCategories } from "../../api/categories";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  const fetchBooks = async () => {
    const data = await getBooks();
    setBooks(data);
  };

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleSearch = async () => {
    const data = await searchBooks(keyword, category);
    setBooks(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Books
      </h1>

      {/* Search */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search books..."
          className="border p-2 w-1/2"
          onChange={(e) =>
            setKeyword(e.target.value)
          }
        />

        <select
          className="border p-2"
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option
              key={cat._id}
              value={cat._id}
            >
              {cat.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4"
        >
          Search
        </button>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books.map((book) => (
          <div
            key={book._id}
            className="border p-4 rounded"
          >
            <img
              src={`http://localhost:5000/uploads/${book.image}`}
              className="h-40 w-full object-cover"
            />

            <h3 className="font-bold mt-2">
              {book.title}
            </h3>

            <p>${book.price}</p>

            <Link
              to={`/books/${book._id}`}
              className="text-blue-500"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;