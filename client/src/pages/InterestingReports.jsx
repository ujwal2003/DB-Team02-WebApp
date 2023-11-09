import axios from "axios";
import React, { useState, useEffect } from "react";

function InterestingReports() {
  const [showRestaurantMenu, setShowRestaurantMenu] = useState(false);
  const [joinClicked, setJoinClicked] = useState(false);
  const [restaurantID, setRestaurantID] = useState(""); // State to store the restaurant ID
  const [restaurants, setRestaurantInfo] = useState([]); // State to store restaurant information

  useEffect(() => {
    async function getLocationsInfo() {
      try {
        const res = await axios.get('restaurants/all');
        const data = await res.data;
        if (data !== "none") {
          setRestaurantInfo(data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    // Fetch all restaurants when the component mounts
    getLocationsInfo();
  }, []);

  const handleButtonClick = (buttonName) => {
    if (buttonName === "Restaurants") {
      setShowRestaurantMenu(true);
      setJoinClicked(false);
      setRestaurantID(""); // Clear restaurant ID when "Restaurants" button is clicked
      // No need to fetch data again as we already fetched it when the component mounted
    } else if (buttonName === "Join with Menu Items" && showRestaurantMenu) {
      setJoinClicked(true);
    } else {
      setShowRestaurantMenu(false);
      setJoinClicked(false);
      setRestaurantID("");
      alert("Under development for phase 2");
    }
  };

  const handleRestaurantIDSearch = () => {
    if (restaurantID) {
      // Implement the logic to search for restaurant data based on the entered ID.
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

      {showRestaurantMenu && !joinClicked && (
        <div className="w-full">
          <h2>Showing All Restaurants in the DB</h2>
          <ul>
            {restaurants.map((restaurant, index) => (
              <li key={index}>
                <p style={{ textAlign: "center"}}>
                <strong>Restaurant ID:</strong> {restaurant.restaurantid}<br />
                  Restaurant Name: {restaurant.name}<br />
                  Phone Number: {restaurant.phone}<br />
                </p>
                {/* Add more restaurant information fields as needed */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default InterestingReports;
