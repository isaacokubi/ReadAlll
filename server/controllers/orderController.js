export const createOrder = async (
  req,
  res
) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.book");

    if (
      !cart ||
      cart.items.length === 0
    ) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // Check Stock Availability
    for (const item of cart.items) {
      const book = await Book.findById(
        item.book._id
      );

      if (
        !book ||
        book.stock < item.quantity
      ) {
        return res.status(400).json({
          message: `${item.book.title} is out of stock`,
        });
      }
    }

    // Create Order Items
    const orderItems = cart.items.map(
      (item) => ({
        book: item.book._id,
        quantity: item.quantity,
        price: item.book.price,
      })
    );

    // Create Order
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      totalPrice: cart.totalPrice,
    });

    // Reduce Stock
    for (const item of cart.items) {
      const book = await Book.findById(
        item.book._id
      );

      book.stock -= item.quantity;

      await book.save();
    }

    // Clear Cart
    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};