import { useState, useEffect } from "react";
import axios from "axios";

function OrderHistory() {
  const [email, setOrderEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [orderDate, setOrderDate] = useState("");
  const [orderTime, setOrderTime] = useState("");
  const [viewResPayment, setViewResPayment] = useState(false);
  const [resPayment, setResPayment] = useState([]);
  const [viewCPayment, setViewCPayment] = useState(false);
  const [cusPayment, setCusPaymet] = useState([]);
  const [receipt, setRInfo] = useState([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const [membership, setMembership] = useState(false);

  const orderListStyle = "text-[#05204A] font-bold";
  const otherElementsStyle = "text-[#05204A] font-semibold";

  // Fetch order history when the email changes
  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`history/get/${email}`);
        const data = response.data;
        setOrders(data.data.result);

        const memRes = await axios.get(`history/member/${email}`);
        const memData = memRes.data;
        if(memData.data.result) {
          console.log(memData.data.result[0].membership);
          setMembership(memData.data.result[0].membership);
        }
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
        if (showReceipt && orderDate && orderTime && email) {
          const response = await axios.post("/history/receipt/", { 
              "email": email, 
              "orderDate": orderDate, 
              "orderTime": orderTime 
           });
          const receiptData = response.data.data.result;
          setRInfo(Array.isArray(receiptData) ? receiptData : [receiptData]);
          setShowReceipt(true);
        }
      } catch (error) {
        console.error("Error fetching order receipt:", error);
        setRInfo([]);
      }
    };

    fetchOrderReceipt();
  }, [showReceipt, orderDate, orderTime, email]);
  // fetch payments to restaurant
  useEffect(() => {
    const fetchResPayment = async () => {
      try {
        if (viewResPayment && orderDate && orderTime && email) {
          const response = await axios.post("/history/payments/", { 
              "email": email, 
              "orderDate": orderDate, 
              "orderTime": orderTime 
           });
          const paymentData = response.data.data.result;
          console.log(paymentData);
          setResPayment(Array.isArray(paymentData) ? paymentData : [paymentData]);
          setViewResPayment(true);
        }
      } catch (error) {
        console.error("Error fetching payment to restaurant:", error);
        setResPayment([]);
      }
    };

    fetchResPayment();
  }, [viewResPayment, orderDate, orderTime, email]);
  // fetch customer Payments
  useEffect(() => {
    const fetchCusPayment = async () => {
      try {
        if (viewCPayment && orderDate && orderTime && email) {
          const response = await axios.post("/history/totals/", { 
              "email": email, 
              "orderDate": orderDate, 
              "orderTime": orderTime 
           });
          const cusPaymentData = response.data.data.result;
          console.log(cusPaymentData);
          setCusPaymet(Array.isArray(cusPaymentData) ? cusPaymentData : [cusPaymentData]);
          setViewCPayment(true);
        }
      } catch (error) {
        console.error("Error fetching payment to restaurant:", error);
        setCusPayment([]);
      }
    };

    fetchCusPayment();
  }, [viewCPayment, orderDate, orderTime, email]);
  const handleButtonClick = (buttonName) => {
    if (buttonName === "View Receipt") {
      setShowReceipt(true);
      setViewResPayment(false);
      setViewCPayment(false);
    } else if (buttonName === "Payments to Restaurant") {
      setViewResPayment(true);
      setShowReceipt(false);
      setViewCPayment(false);
    } else if (buttonName === "Customer Payment Quantity") {
      setViewCPayment(true);
      setShowReceipt(false);
      setViewResPayment(false);
    } else {
      setShowReceipt(false);
      setViewResPayment(false);
      setViewCPayment(false);
    }
  };

  return (
    <div className="w-[90%] p-10 mt-8 flex">
      <div className="w-1/2">
        <h1 className={orderListStyle + " text-4xl mb-4"}>Order History</h1>
        <p>
            SELECT c.orderdate, c.ordertime <br />
            FROM customerorder c <br />
            WHERE c.customeremail = '{email}' and c.processed = true <br />
            ORDER BY c.orderdate, c.ordertime;
        </p>
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
        {showReceipt && (
          <p>
            SELECT  m."name" as "item_name", r."name" as "restaurant_name", r2.price <br /> 
            FROM customerorder c join cart c2 ON c.orderid = c2.orderid <br />
                JOIN menuitem m ON c2.menuitemid = m.itemid <br />
                JOIN restaurant r ON r.restaurantid = c2.restaurantid <br />
                JOIN restaurantmenu r2 ON (r2.restaurantid = c2.restaurantid AND r2.menuitemid = m.itemid) <br />
            WHERE c.customeremail = '{email}' AND c.processed = true <br />
                AND c.orderdate = '{orderDate}' AND c.ordertime = '{orderTime}';
          </p>
        )}
        {viewResPayment && (
          <p className="text-sm">
            SELECT r2.restaurantid, r2."name" AS "restaurant", b.accountid, rbill.total_paid <br />
            FROM (SELECT r.restaurantid, SUM(r.price) AS "total_paid" <br />
                  FROM customerorder c JOIN cart c2 ON c.orderid = c2.orderid <br />
                  JOIN restaurantmenu r ON c2.menuitemid = r.menuitemid AND c2.restaurantid = r.restaurantid <br />
                  WHERE c.processed = true AND c.customeremail = '{email}' <br /> AND c.orderdate = '{orderDate}' AND c.ordertime = '{orderTime}' <br />
                  GROUP BY r.restaurantid) rbill JOIN restaurant r2 ON rbill.restaurantid = r2.restaurantid <br />
                                            JOIN bank b ON b.accountid = r2.bankaccountid;
          </p>
        )}
        {viewCPayment && (
          <p className="text-sm">
            SELECT SUM(r2.price) as "subtotal", SUM(r2.price) * 0.0825 AS "tax", MAX(c.tip) AS "tip", <br />
                    SUM(r2.price) + (SUM(r2.price)*0.0825) + MAX(c.tip) AS "total" <br />
            FROM customerorder c JOIN cart c2 ON c.orderid = c2.orderid <br />
                JOIN menuitem m ON c2.menuitemid = m.itemid <br />
                JOIN restaurant r ON r.restaurantid = c2.restaurantid <br />
                JOIN restaurantmenu r2 ON (r2.restaurantid = c2.restaurantid AND r2.menuitemid = m.itemid) <br />
            WHERE c.customeremail = '{email}' AND c.processed = true <br />
                AND c.orderdate = '{orderDate}' AND c.ordertime = '{orderTime}';
          </p>
        )}
        <input
          type="text" // Use type "date" for order date
          placeholder="Order Date (YYYY-MM-DD)"
          value={orderDate}
          onChange={(e) => setOrderDate(e.target.value)}
          className="p-2 rounded border border-[#05204A] text-[#05204A] font-semibold mb-2" // Added margin-bottom
        />
        <input
          type="text" // Keep type "text" for order time
          placeholder="Order Time (HH:mm:ss)"
          value={orderTime}
          onChange={(e) => setOrderTime(e.target.value)}
          className="p-2 rounded border border-[#05204A] text-[#05204A] font-semibold mb-2"
        />
        <div className="mb-4">
          <button
            className={`text-[#05204A] font-semibold border rounded p-2 mr-2 ${
              showReceipt ? 'bg-green-500' : ''
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
              <h1 className={orderListStyle + " text-2xl mb-4"}>Receipt Details</h1>
              <ul>
                {receipt.map((rec, index) => (
                  <li key={index}>
                    <p className={otherElementsStyle}>Menu Item: {rec.item_name}</p>
                    <p className={otherElementsStyle}>Restaurant: {rec.restaurant_name}</p>
                    <p className={otherElementsStyle}>Price: {rec.price}</p>
                    <p className={otherElementsStyle}>- - - - - - - - - - - - - - - - - </p>
                  </li>
                ))}
              </ul>
              {console.log("Receipt section rendered")} {/* Add this line */}
            </div>
          )}
          {viewResPayment && (
            <div>
              <h1 className={orderListStyle + " text-2xl mb-4"}>Restaurant Payment Details</h1>
              <ul>
                {resPayment.map((res, index) => (
                  <li key={index}>
                    <p className={otherElementsStyle}>Restaurant ID: {res.restaurantid}</p>
                    <p className={otherElementsStyle}>Restaurant Name: {res.restaurant}</p>
                    <p className={otherElementsStyle}>Account ID: {res.accountid}</p>
                    <p className={otherElementsStyle}>Total Paid: {res.total_paid}</p>
                    <p className={otherElementsStyle}>- - - - - - - - - - - - - - - - - </p>
                  </li>
                ))}
              </ul>
              {console.log("Restaurant Payment section Rendered")} {/* Add this line */}
            </div>
          )}
          {viewCPayment && (
            <div>
              <h1 className={orderListStyle + " text-2xl mb-4"}>Customer Payment Quantity</h1>
              <ul>
                {cusPayment.map((res, index) => (
                  <li key={index}>
                    <p className={otherElementsStyle}>Subtotal: ${(Number(res.subtotal).toFixed(2))} </p>
                    <p className={otherElementsStyle}>Tax: ${(Number(res.tax).toFixed(2))}</p>
                    <p className={otherElementsStyle}>Tip: ${(Number(res.tip).toFixed(2))}</p>
                    <p className={otherElementsStyle}>Total: ${(Number(res.total).toFixed(2))} {membership ? <>+ $1 membership</> : <></>}</p>
                    <p className={otherElementsStyle}>- - - - - - - - - - - - - - - - - </p>
                  </li>
                ))}
              </ul>
              {console.log("Customer Payment section Rendered")} {/* Add this line */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
