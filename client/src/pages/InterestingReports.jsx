import axios from "axios";
import React, { useState } from "react";

function InterestingReports() {
  const [showRestaurantMenu, setShowRestaurantMenu] = useState(false);
  const [joinClicked, setJoinClicked] = useState(false);
  const [restaurantID, setRestaurantID] = useState(""); // State to store the restaurant ID

  const handleButtonClick = (buttonName) => {
    if (buttonName === "Restaurants") {
      setShowRestaurantMenu(true);
    } else if (buttonName === "Join with Menu Items" && showRestaurantMenu) {
      setJoinClicked(true);
    } else {
      setShowRestaurantMenu(false);
      setJoinClicked(false);
      setRestaurantID(""); // Clear restaurant ID on other button clicks
      alert("Under development for phase 2");
    }
  };

  const handleRestaurantIDSearch = () => {
    // Implement the logic to search for restaurant data based on the entered ID.
    if (restaurantID) {
      // Make an API call or perform a search operation with the restaurantID
      // and then display the results.
      // You can use the Axios library for making HTTP requests.
      axios.get(`/api/restaurants/${restaurantID}`)
        .then((response) => {
          // Handle the response and update the UI accordingly.
        })
        .catch((error) => {
          // Handle any errors that occur during the API request.
        });
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center text-center">
      <button
        className="m-2 px-6 py-4 bg-[#05204A] text-white rounded hover:bg-[#0F355A]"
        onClick={() => handleButtonClick("Restaurants")}
      >
        Restaurants
      </button>
      <button
        className="m-2 px-6 py-4 bg-[#05204A] text-white rounded hover.bg-[#0F355A]"
        onClick={() => handleButtonClick("Customers")}
      >
        Customers
      </button>
      <button
        className="m-2 px-6 py-4 bg-[#05204A] text-white rounded hover.bg-[#0F355A]"
        onClick={() => handleButtonClick("Orders")}
      >
        Orders
      </button>
      {showRestaurantMenu && (
        <div className="w-full flex flex-wrap justify-center items-center">
          <button
            className="m-2 px-6 py-4 bg-[#05204A] text-white rounded hover.bg-[#0F355A]"
            onClick={() => handleButtonClick("Join with Menu Items")}
          >
            Join with Menu Items
          </button>
          <button
            className="m-2 px-6 py-4 bg-[#05204A] text-white rounded hover.bg-[#0F355A]"
            onClick={() => handleButtonClick("Join with Cart")}
          >
            Join with Cart
          </button>
          <button
            className="m-2 px-6 py-4 bg-[#05204A] text-white rounded hover.bg-[#0F355A]"
            onClick={() => handleButtonClick("Join with Orders")}
          >
            Join with Orders
          </button>
        </div>
      )}
      {showRestaurantMenu && joinClicked && (
        <div className="w-full">
          <h2>Enter Restaurant ID:</h2>
          <input
            type="text"
            value={restaurantID}
            onChange={(e) => setRestaurantID(e.target.value)}
            placeholder="Restaurant ID"
          />
          <button className="bg-[#537D8D] text-white " onClick={handleRestaurantIDSearch}>Search</button>
          {/* Display the restaurant data here based on the search results */}
        </div>
      )}
    </div>
  );
}

export default InterestingReports;
