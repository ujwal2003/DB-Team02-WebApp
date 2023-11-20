import { useState, useEffect } from "react";
import axios from "axios";

function OrderHistory() {
  const [email, setOrderEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const orderListStyle = "text-[#05204A] font-bold";
  const otherElementsStyle = "text-[#05204A] font-semibold";

  // Fetch order history when the email changes
  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`history/get/${email}`);
        const data = response.data;
        setOrders(data);
      } catch (error) {
        console.error("Error fetching order history:", error);
        // Handle error as needed
      }
    };

    if (email) {
      fetchOrderHistory();
    } else {
      // Clear orders if the email is empty
      setOrders([]);
    }
  }, [email]);

  return (
    <div className="w-[90%] p-10 mt-8 flex">
      <div className="w-1/2">
        <h1 className={orderListStyle + " text-7xl mb-4"}>Order History</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Order Email"
            value={email}
            onChange={(e) => setOrderEmail(e.target.value)}
            className="p-2 rounded border border-[#05204A] text-[#05204A] font-semibold"
          />
        </div>
        <div className="mb-8">
          <ul>
            {orders.map((order) => (
              <li key={order.orderId}>
                <p className={otherElementsStyle}>Order Date: {order.orderdate}</p>
                <p className={otherElementsStyle}>Order Time: ${order.ordertime}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
