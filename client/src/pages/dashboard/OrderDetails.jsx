
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await API.get(`/orders/${id}`);
      setOrder(data);
    };

    fetchOrder();
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Order Details
      </h1>

      <p>Status: {order.status}</p>
      <p>Total: ${order.totalPrice}</p>

      <h2 className="mt-4 font-bold">
        Items:
      </h2>

      {order.orderItems.map((item) => (
        <div key={item.book._id} className="border p-2 mt-2">
          <p>{item.book.title}</p>
          <p>Qty: {item.quantity}</p>
          <p>Price: ${item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderDetails;