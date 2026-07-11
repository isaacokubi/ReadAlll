import { useEffect, useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const { data } = await API.get("/orders");
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}/status`, {
        status,
      });

      toast.success("Updated");
      fetchOrders();
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Manage Orders
      </h1>

      {orders.map((order) => (
        <div key={order._id} className="border p-3 mt-2">
          <p>User: {order.user?.name}</p>
          <p>Total: ${order.totalPrice}</p>
          <p>Status: {order.status}</p>

          <select
            value={order.status}
            onChange={(e) =>
              updateStatus(order._id, e.target.value)
            }
          >
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default ManageOrders;