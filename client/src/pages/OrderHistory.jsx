import { useState, useEffect } from "react";
import axios from "axios";

function OrderHistory() {
  const [email, setOrderEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [orderDate, setOrderDate] = useState("");
  const [orderTime, setOrderTime] = useState("");
  const [viewDetails, setViewDetails] = useState(false);
  const [vietReceipt, setViewReceipt] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const orderListStyle = "text-[#05204A] font-bold";
  const otherElementsStyle = "text-[#05204A] font-semibold";

  // Fetch order history when the email changes
  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`history/get/${email}`);
        const data = response.data;
        setOrders(data.data.result);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    if (email) {
      fetchOrderHistory();
    } else {
      // Clear orders if the email is empty
      setOrders([]);
    }
  }, [email]);
  // Fetch order receipt given order date, time, and use the same email
  // Fetch order receipt given order date, time, and use the same email
  // Fetch order receipt given order date, time, and use the same email
  const handleButtonClick = (buttonName) => {
    if (buttonName === "View Receipt"){
      setViewReceipt(true);
    } else{
      setViewReceipt(false);
    }
  };

  return (
    <div className="w-[90%] p-10 mt-8 flex">
      <div className="w-1/2">
        <h1 className={orderListStyle + " text-4xl mb-4"}>Order History</h1>
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
                <p className={otherElementsStyle}>Order Time: {order.ordertime}</p>
                <p className={otherElementsStyle}>- - - - - - - - - - - - - - - - - </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-1/2">
      <h1 className={orderListStyle + " text-4xl mb-4"}> Order Details</h1>
      <input
        type="text"
        placeholder="Enter Order Date"
        value={orderDate}
        onChange={(e) => setOrderDate(e.target.value)}
        className="p-2 rounded border border-[#05204A] text-[#05204A] font-semibold mb-2" // Added margin-bottom
      />

      <input
        type="text"
        placeholder="Enter Order Time"
        value={orderTime}
        onChange={(e) => setOrderTime(e.target.value)}
        className="p-2 rounded border border-[#05204A] text-[#05204A] font-semibold mb-2"
      />
      <div className="mb-4">
        <button className="text-[#05204A] font-semibold border border-[#05204A] rounded p-2 mr-2" onClick={() => handleButtonClick("View Receipt")}> 
          View Receipt
        </button>
        <button className="text-[#05204A] font-semibold border border-[#05204A] rounded p-2 mr-2" onClick={() => handleButtonClick("View Receipt")}>
          Restaurant Payments
        </button>
        <button className="text-[#05204A] font-semibold border border-[#05204A] rounded p-2" onClick={() => handleButtonClick("View Receipt")}> 
          Payment Quantity
        </button>
      </div>
    </div>
  </div>
  );
}

export default OrderHistory;