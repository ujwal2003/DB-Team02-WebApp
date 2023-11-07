import React, { useState, useEffect } from "react";

function InterestingReports() {
  const [showJoinButtons, setShowJoinButtons] = useState(false);
  const [restaurantMenuData, setRestaurantMenuData] = useState([]);

  useEffect(() => {
    if (showJoinButtons) {
      // Simulated dummy data
      const dummyData = [
        { restaurantID: 1, menuItemID: 101, price: 10.99 },
        { restaurantID: 2, menuItemID: 102, price: 9.99 },
        { restaurantID: 3, menuItemID: 103, price: 12.99 },
      ];

      setRestaurantMenuData(dummyData);
    }
  }, [showJoinButtons]);

  const handleFirstRowButtonClick = () => {
    setShowJoinButtons(true);
  }

  return (
    <div className="flex flex-wrap justify-center items-center text-center">
      <button className="m-2 px-6 py-4 bg-[#05204A] text-white rounded hover:bg-[#0F355A]" onClick={handleFirstRowButtonClick}>
        Table 1
      </button>
      <button className="m-2 px-6 py-4 bg-[#05204A] text-white rounded hover.bg-[#0F355A]" onClick={handleFirstRowButtonClick}>
        Table 2
      </button>
      <button className="m-2 px-6 py-4 bg-[#05204A] text-white rounded hover.bg-[#0F355A]" onClick={handleFirstRowButtonClick}>
        Table 3
      </button>
      {showJoinButtons && (
        <div className="w-full flex flex-wrap justify-center items-center">
          <button className="m-2 px-6 py-4 bg-[#05204A] text-white rounded hover.bg-[#0F355A]">
            Join with Table 1
          </button>
          <button className="m-2 px-6 py-4 bg-[#05204A] text-white rounded hover.bg-[#0F355A]">
            Join with Table 2
          </button>
          <button className="m-2 px-6 py-4 bg-[#05204A] text-white rounded hover.bg-[#0F355A]">
            Join with Table 3
          </button>
        </div>
      )}
      {restaurantMenuData.length > 0 && (
        <div className="w-full">
          <h2>Restaurant Menu Data</h2>
          <ul>
            {restaurantMenuData.map((item, index) => (
              <li key={index}>
                <p>Restaurant ID: {item.restaurantID}</p>
                <p>Menu Item ID: {item.menuItemID}</p>
                <p>Price: {item.price}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default InterestingReports;
