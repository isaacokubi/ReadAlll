import { useEffect, useState } from "react";
import {
  getCart,
  updateCartItem,
  removeCartItem,
} from "../../api/cart";
import { createOrder } from "../../api/orders";
import { toast } from "react-toastify";

const Cart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const data = await getCart();
    setCart(data);
  };

  const handleUpdate = async (bookId, quantity) => {
    const updated = await updateCartItem(
      bookId,
      quantity
    );
    setCart(updated);
  };

  const handleRemove = async (bookId) => {
    const updated = await removeCartItem(bookId);
    setCart(updated);
  };

  const handleCheckout = async () => {
    try {
      await createOrder();

      toast.success("Order placed successfully");

      setCart({
        items: [],
        totalPrice: 0,
      });
    } catch (error) {
      toast.error("Checkout failed");
    }
  };

  if (!cart) return <p>Loading cart...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Shopping Cart
      </h1>

      {cart.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.items.map((item) => (
            <div
              key={item.book._id}
              className="flex justify-between items-center border p-3 mb-2"
            >
              <div>
                <h3 className="font-bold">
                  {item.book.title}
                </h3>

                <p>${item.book.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  className="border w-16 p-1"
                  onChange={(e) =>
                    handleUpdate(
                      item.book._id,
                      Number(e.target.value)
                    )
                  }
                />

                <button
                  onClick={() =>
                    handleRemove(item.book._id)
                  }
                  className="bg-red-500 text-white px-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-4 text-xl font-bold">
            Total: ${cart.totalPrice}
          </div>

          <button
            onClick={handleCheckout}
            className="bg-green-600 text-white px-4 py-2 mt-4"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;