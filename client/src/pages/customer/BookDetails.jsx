import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBook } from "../../api/books";
import { toast } from "react-toastify";
import { addToCart } from "../../api/cart";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBook(id);
        setBook(data);
      } catch (error) {
        toast.error("Failed to load book");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const addToCartHandler = async () => {
    try {
      await addToCart(id, 1);
      toast.success("Added to cart");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!book) return <p className="p-6">Book not found</p>;

  return (
    <div className="p-6 flex gap-6">
      <img
        src={`http://localhost:5000/uploads/${book.image}`}
        alt={book.title}
        className="h-80 w-60 object-cover"
      />

      <div>
        <h1 className="text-2xl font-bold">{book.title}</h1>

        <p className="text-gray-600">{book.author}</p>

        <p className="mt-2">{book.description}</p>

        <p className="font-bold mt-2">${book.price}</p>

        <button
          onClick={addToCartHandler}
          className="bg-green-500 text-white px-4 py-2 mt-4"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BookDetails;