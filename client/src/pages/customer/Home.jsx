import { useEffect, useState } from "react";
import { getBooks } from "../../api/books";
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getBooks();
      setBooks(data.slice(0, 6)); // featured
    };

    fetchBooks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Online Bookstore
      </h1>

      <h2 className="text-xl mb-3">
        Featured Books
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books.map((book) => (
          <div
            key={book._id}
            className="border p-4 rounded shadow"
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
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
