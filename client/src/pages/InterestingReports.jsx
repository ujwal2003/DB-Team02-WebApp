import axios from "axios";
import React, { useState, useEffect } from "react";

function InterestingReports() {
  const [showRestaurantMenu, setShowRestaurantMenu] = useState(false);
  const [showExpensiveDishes, setShowExpensiveDishes] = useState(false);
  const [joinClicked, setJoinClicked] = useState(false);
  const [restaurantID, setRestaurantID] = useState("");
  const [restaurants, setRestaurantInfo] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [searchedMenuItems, setSearchedMenuItems] = useState([]);
  const [expensiveDishes, setExpensiveDishes] = useState([]);

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

  useEffect(() => {
    async function getExpensiveDishes() {
      try {
        const res = await axios.get('restaurants/expensive');
        const data = await res.data;
        if (data !== "none") {
          setExpensiveDishes(data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    // Fetch most expensive dishes when the component mounts
    getExpensiveDishes();
  }, []);

  const handleButtonClick = (buttonName) => {
    if (buttonName === "Restaurants") {
      setShowRestaurantMenu(true);
      setShowExpensiveDishes(false); // Hide expensive dishes
      setJoinClicked(false);
      setRestaurantID("");
      setSearchedMenuItems([]); // Clear searched menu items
    } else if (buttonName === "Most Expensive Dishes") {
      setShowExpensiveDishes(true);
      setShowRestaurantMenu(false); // Hide restaurant menu
      setJoinClicked(false);
    } else if (buttonName === "Join with Menu Items" && showRestaurantMenu) {
      setJoinClicked(true);
    } else {
      setShowRestaurantMenu(false);
      setShowExpensiveDishes(false);
      setJoinClicked(false);
      setRestaurantID("");
      setSearchedMenuItems([]);
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

  // Function to fetch menu items based on restaurant ID
  const fetchMenuItems = async () => {
    try {
      const res = await axios.get(`/restaurants/menu/${restaurantID}`);
      const data = await res.data;
      if (data !== "none") {
        setSearchedMenuItems(data);
      } else {
        setSearchedMenuItems([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (restaurantID && joinClicked) {
      fetchMenuItems();
    }
  }, [restaurantID, joinClicked]);

  return (
    <div className="flex flex-wrap justify-center items-center text-center">
      <button className="m-2 px-6 py-4 bg-[#05204A] text-white rounded hover:bg-[#0F355A]" onClick={() => handleButtonClick("Restaurants")}>
        Restaurants
      </button>
      <button className="m-2 px-6 py-4 bg-[#05204A] text-white rounded hover.bg-[#0F355A]" onClick={() => handleButtonClick("Customers")}>
        Customers
      </button>
      <button className="m-2 px-6 py-4 bg-[#05204A] text-white rounded hover.bg-[#0F355A]" onClick={() => handleButtonClick("Orders")}>
        Orders
      </button>
      <button className="m-2 px-6 py-4 bg-[#05204A] text-white rounded hover.bg-[#0F355A]" onClick={() => handleButtonClick("Most Expensive Dishes")}>
        Most Expensive Dishes
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
      {showExpensiveDishes && (
        <div className="w-full">
          <h2>Most Expensive Dishes</h2>
          <ul>
            {expensiveDishes.map((dish, index) => (
              <li key={index}>
                <p style={{ textAlign: "center" }}>
                  Dish Name: {dish.dish_name}<br />
                  Price: {dish.price}<br />
                  {/* Add more dish information fields as needed */}
                </p>
              </li>
            ))}
          </ul>
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
        </div>
      )}
      {showRestaurantMenu && joinClicked && searchedMenuItems.length > 0 && (
        <div className="w-full">
          <h2>Restaurant Menu Items</h2>
          <ul>
            {searchedMenuItems.map((menuItem, index) => (
              <li key={index}>
                <p style={{ textAlign: "center" }}>
                  Menu Item Name: {menuItem.name}<br />
                  Price: {menuItem.price}<br />
                  {/* Add more menu item information fields as needed */}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default InterestingReports;
