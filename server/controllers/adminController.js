export const getDashboardStats = async (
  req,
  res
) => {
  try {
    const users = await User.countDocuments();
    const books = await Book.countDocuments();
    const orders = await Order.countDocuments();

    const pendingOrders =
      await Order.countDocuments({
        status: "Pending",
      });

    const deliveredOrders =
      await Order.countDocuments({
        status: "Delivered",
      });

    const revenueResult = await Order.aggregate([
      {
        $match: {
          status: {
            $ne: "Cancelled",
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    const revenue =
      revenueResult[0]?.totalRevenue || 0;

    res.json({
      users,
      books,
      orders,
      pendingOrders,
      deliveredOrders,
      revenue,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};