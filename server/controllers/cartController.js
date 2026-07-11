import Cart from "../models/Cart.js";
import Book from "../models/Book.js";

// Add To Cart
export const addToCart = async (req, res) => {
  try {
    const { bookId, quantity } = req.body;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    let cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) =>
        item.book.toString() === bookId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity +=
        quantity || 1;
    } else {
      cart.items.push({
        book: bookId,
        quantity: quantity || 1,
      });
    }

    cart.totalPrice = await calculateTotal(
      cart.items
    );

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.book");

    if (!cart) {
      return res.json({
        items: [],
        totalPrice: 0,
      });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Quantity
export const updateCartItem = async (
  req,
  res
) => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) =>
        item.book.toString() === req.params.bookId
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    item.quantity = quantity;

    cart.totalPrice = await calculateTotal(
      cart.items
    );

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Remove Item
export const removeCartItem = async (
  req,
  res
) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) =>
        item.book.toString() !==
        req.params.bookId
    );

    cart.totalPrice = await calculateTotal(
      cart.items
    );

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Helper Function
const calculateTotal = async (items) => {
  let total = 0;

  for (const item of items) {
    const book = await Book.findById(
      item.book
    );

    total += book.price * item.quantity;
  }

  return total;
};