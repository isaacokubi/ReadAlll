import { useEffect, useState } from "react";
import { getMyOrders } from "../../api/orders";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getMyOrders();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border p-4 mb-2"
          >
            <p>
              <strong>Status:</strong>{" "}
              {order.status}
            </p>

            <p>
              <strong>Total:</strong> $
              {order.totalPrice}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(
                order.createdAt
              ).toLocaleDateString()}
            </p>

            <Link
              to={`/orders/${order._id}`}
              className="text-blue-500"
            >
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;