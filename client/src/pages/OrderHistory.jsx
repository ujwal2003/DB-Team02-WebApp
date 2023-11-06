import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

function OrderHistory() {
  const dummyOrders = [
    {
      orderId: 1,
      orderDate: "2023-01-10",
      totalPrice: 50.99,
      status: "Delivered",
    },
    {
      orderId: 2,
      orderDate: "2023-01-15",
      totalPrice: 35.49,
      status: "Processing",
    },
    {
      orderId: 3,
      orderDate: "2023-01-20",
      totalPrice: 75.25,
      status: "Delivered",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const orderListStyle = "text-[#05204A] font-bold";
  const otherElementsStyle = "text-[#05204A] font-semibold";

  // Filter the orders based on the search term
  const filteredOrders = dummyOrders.filter((order) =>
    order.orderId.toString().includes(searchTerm)
  );

  return (
    <div className="w-[90%] p-10 mt-8 flex">
      <div className="w-1/2">
        <h1 className={orderListStyle + " text-7xl mb-4"}>Order History</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Order ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded border border-[#05204A] text-[#05204A] font-semibold"
          />
        </div>
        <div className="mb-8">
          <ul>
            {filteredOrders.map((order) => (
              <li key={order.orderId}>
                <h2 className={otherElementsStyle}>Order ID: {order.orderId}</h2>
                <p className={otherElementsStyle}>Order Date: {order.orderDate}</p>
                <p className={otherElementsStyle}>Total Price: ${order.totalPrice}</p>
                <p className={otherElementsStyle}>Status: {order.status}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
