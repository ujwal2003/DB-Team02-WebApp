import { useState, useEffect } from "react";
import axios from "axios";

function OrderHistory() {
  const [email, setOrderEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [orderDate, setOrderDate] = useState("");
  const [orderTime, setOrderTime] = useState("");
  const [viewReceipt, setViewReceipt] = useState(false);
  const [viewResPayment, setViewResPayment] = useState(false);
  const [viewCPayment, setViewCPayment] = useState(false);
  const [receiptInfo, setReceiptInfo] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const [showResPayment, setShowResPayment] = useState(false);
  const [showCPayment, setShowCPayment] = useState(false);

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

  // Fetch order receipt when the view receipt button is clicked
  useEffect(() => {
    const fetchOrderReceipt = async () => {
      try {
        if (viewReceipt && orderDate && orderTime && email) {
          const response = await axios.post("/history/receipt/", {
            email: email,
            orderdate: orderDate,
            ordertime: orderTime,
          });
          const receiptData = response.data.data;
          setReceiptInfo(`Order Date: ${receiptData.orderdate}, Order Time: ${receiptData.ordertime}`);
          setShowReceipt(true);
        }
      } catch (error) {
        console.error("Error fetching order receipt:", error);
        // Handle error as needed, e.g., display an error message
      }
    };

    fetchOrderReceipt();
  }, [viewReceipt, orderDate, orderTime, email]);

  const handleButtonClick = (buttonName) => {
    if (buttonName === "View Receipt" && orderDate && orderTime && email) {
      setViewReceipt(true);
      setViewResPayment(false);
      setViewCPayment(false);
    } else if (buttonName === "Payments to Restaurant" && orderDate && orderTime && email) {
      setViewResPayment(true);
      setViewReceipt(false);
      setViewCPayment(false);
    } else if (buttonName === "Customer Payment Quantity" && orderDate && orderTime && email) {
      setViewCPayment(true);
      setViewReceipt(false);
      setViewResPayment(false);
    } else {
      setViewReceipt(false);
      setViewResPayment(false);
      setViewCPayment(false);
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
          type="date" // Use type "date" for order date
          value={orderDate}
          onChange={(e) => setOrderDate(e.target.value)}
          className="p-2 rounded border border-[#05204A] text-[#05204A] font-semibold mb-2" // Added margin-bottom
        />
        <input
          type="time" // Keep type "text" for order time
          placeholder="Order Time (HH:mm:ss)"
          value={orderTime}
          onChange={(e) => setOrderTime(e.target.value)}
          className="p-2 rounded border border-[#05204A] text-[#05204A] font-semibold mb-2"
        />
        <div className="mb-4">
          <button
            className={`text-[#05204A] font-semibold border rounded p-2 mr-2 ${
              viewReceipt ? 'bg-green-500' : ''
            }`}
            onClick={() => handleButtonClick("View Receipt")}
          >
            View Receipt
          </button>
          <button
            className={`text-[#05204A] font-semibold border rounded p-2 mr-2 ${
              viewResPayment ? 'bg-green-500' : ''
            }`}
            onClick={() => handleButtonClick("Payments to Restaurant")}
          >
            Payments to Restaurant
          </button>
          <button
            className={`text-[#05204A] font-semibold border rounded p-2 mr-2 ${
              viewCPayment ? 'bg-green-500' : ''
            }`}
            onClick={() => handleButtonClick("Customer Payment Quantity")}
          >
            Customer Payment Quantity
          </button>
          {showReceipt && (
            <div>
              <h1 className={orderListStyle + " text-4xl mb-4"}>Receipt Details</h1>
              <p className={otherElementsStyle}>{receiptInfo}</p>
            </div>
          )}
          {showResPayment && (
            <div>
              <h1 className={orderListStyle + " text-4xl mb-4"}>Restaurant Payment Details</h1>
            </div>
          )}
          {showCPayment && (
            <div>
              <h1 className={orderListStyle + " text-4xl mb-4"}>Customer Payment Quantity</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
