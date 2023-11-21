import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function InterestingReports() {
  const [showRestaurantMenu, setShowRestaurantMenu] = useState(false);
  const [showExpensiveDishes, setShowExpensiveDishes] = useState(false);
  const [showWealthiestRestaurants, setShowWealthiestRestaurants] = useState(false);
  const [showAllCustomers, setShowAllCustomers] = useState(false);
  const [joinClicked, setJoinClicked] = useState(false);
  const [showOneCustomer, setShowOneCustomer] = useState(false);
  const [orders, setOrders] = useState(false);
  const [dishesClicked, setDishesClicked] = useState(false);
  const [popularRes, setPopularRes] = useState(false);
  const [restaurantID, setRestaurantID] = useState("");
  const [restaurants, setRestaurantInfo] = useState([]);
  const [popOrders, setPopOrders] = useState([]);
  const [searchedMenuItems, setSearchedMenuItems] = useState([]);
  const [searchedCustomer, setSearchedCustomerItems] = useState([]);
  const [expensiveDishes, setExpensiveDishes] = useState([]);
  const [richestRestaurants, setRichestRestaurants] = useState([]);
  const [allCustomers, setCustomers] = useState([]);
  const [customerLastName, setCustomerLastName] = useState("");

  const {custInfo, custSignIn, custSignOut} = useContext(UserContext);

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
    async function getPopularOrders() {
      try {
        const res = await axios.get('/order/popular');
        const data = await res.data.data.result;
        console.log(data);
        if (data !== "none") {
          setPopOrders(data);
        }
      } catch (error) {
        console.log(error);
        setPopOrders([]);
      }
    }

    // Fetch all restaurants when the component mounts
    getPopularOrders();
  }, []);
  
  // get all customers info
  useEffect(() => {
    async function getCustomersInfo() {
      try {
        const res = await axios.get('customers/all');
        const data = await res.data;
        if (data !== "none") {
          setCustomers(data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    // Fetch all customers when the component mounts
    getCustomersInfo();
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

  useEffect(() => {
    async function getRichestRestaurants() {
      try {
        const res = await axios.get('restaurants/wealth');
        const data = await res.data;
        if (data !== "none") {
          setRichestRestaurants(data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    // Fetch wealthiest restaurants when the component mounts
    getRichestRestaurants();
  }, []);

  const handleButtonClick = (buttonName) => {
    if (buttonName === "Restaurants") {
      setShowRestaurantMenu(true);
      setShowExpensiveDishes(false); // Hide expensive dishes
      setShowWealthiestRestaurants(false);
      setJoinClicked(false);
      setDishesClicked(false);
      setPopularRes(false);
      setShowAllCustomers(false);
      setRestaurantID("");
      setSearchedMenuItems([]); // Clear searched menu items
      setShowOneCustomer(false);
      setSearchedCustomerItems([]);
      setOrders(false);
    } else if (buttonName === "Most Expensive Dishes") {
      setShowExpensiveDishes(true);
      setShowRestaurantMenu(false); // Hide restaurant menu
      setShowWealthiestRestaurants(false); // hide the wealthiest restaurant menu
      setJoinClicked(false);
      setDishesClicked(false);
      setPopularRes(false);
      setShowAllCustomers(false);
      setShowOneCustomer(false);
      setOrders(false);
    } else if (buttonName === "Restaurants By Wealth") {
      setShowWealthiestRestaurants(true);
      setShowExpensiveDishes(false);
      setShowRestaurantMenu(false); // Hide restaurant menu
      setJoinClicked(false);
      setDishesClicked(false);
      setPopularRes(false);
      setShowAllCustomers(false);
      setShowOneCustomer(false);
      setOrders(false);
    } else if (buttonName === "Customers") {
      setShowAllCustomers(true);
      setShowWealthiestRestaurants(false);
      setShowExpensiveDishes(false);
      setShowRestaurantMenu(false); // Hide restaurant menu
      setJoinClicked(false);
      setDishesClicked(false);
      setPopularRes(false);
      setShowOneCustomer(false);
      setOrders(false);
    } else if (buttonName === "Search for Customer") {
      setShowAllCustomers(false);
      setShowWealthiestRestaurants(false);
      setShowExpensiveDishes(false);
      setShowRestaurantMenu(false); // Hide restaurant menu
      setSearchedCustomerItems([]);
      setJoinClicked(false);
      setDishesClicked(false);
      setPopularRes(false);
      setShowOneCustomer(true);
      setOrders(false);
    } else if (buttonName === "Orders") {
      setShowAllCustomers(false);
      setShowWealthiestRestaurants(false);
      setShowExpensiveDishes(false);
      setShowRestaurantMenu(false); // Hide restaurant menu
      setSearchedCustomerItems([]);
      setJoinClicked(false);
      setDishesClicked(false);
      setPopularRes(false);
      setShowOneCustomer(false);
      setOrders(true);
    } else if (buttonName === "Join with Menu Items") {
      setDishesClicked(false);
      setPopularRes(false);
      setJoinClicked(true);
      
    } else if (buttonName === "Popular Dishes") {
      setDishesClicked(true);
      setPopularRes(false);
      setJoinClicked(false);
    } else if (buttonName === "Popular Restaurants") {
      setDishesClicked(false);
      setPopularRes(true);
      setJoinClicked(false);
    } else if (buttonName === "Orders") {
      window.location.href = '/OrderHistory';
    } else {
      setShowRestaurantMenu(false);
      setShowExpensiveDishes(false);
      setShowWealthiestRestaurants(false);
      setShowAllCustomers(false);
      setJoinClicked(false);
      setDishesClicked(false);
      setPopularRes(false);
      setRestaurantID("");
      setSearchedMenuItems([]);
      setSearchedCustomerItems([]);
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
  const handleCustomerSearch = () => {
    if (customerLastName) {
      axios.get(`/api/customers/${customerLastName}`)
        .then((response) => {
          // Handle the response and update the UI accordingly.
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const fetchCustomerItems = async () => {
    try {
      const res = await axios.get(`/customers/user/${customerLastName}`);
      const data = await res.data;
      if (data !== "none") {
        setSearchedCustomerItems(data);
      } else {
        setSearchedCustomerItems([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (customerLastName && showOneCustomer) {
      fetchCustomerItems();
    }
  }, [customerLastName, showOneCustomer]);

  function signInSelectedCustomer(customerObj) {
    console.log(customerObj);
    custSignOut();
    custSignIn(customerObj.email, customerObj.firstname, customerObj.lastname, customerObj.membership, customerObj.phone, customerObj.zipcode);
  }

  return (
    <div className="flex flex-wrap justify-center items-center text-center">
      <button className="m-2 px-6 py-4 bg-[#05204A] text-white rounded hover:bg-[#0F355A]" onClick={() => handleButtonClick("Restaurants")}>
        Restaurants
      </button>
      <button className="m-2 px-6 py-4 bg-[#05204A] text-white rounded hover.bg-[#0F355A]" onClick={() => handleButtonClick("Customers")}>
        Customers
      </button>
      <Link to={`/OrderHistory`}>
        <button className="m-2 px-6 py-4 bg-[#05204A] text-white rounded hover.bg-[#0F355A]" onClick={() => handleButtonClick("Orders")}>
          Orders
        </button>
      </Link>
      <button className="m-2 px-6 py-4 bg-[#05204A] text-white rounded hover.bg-[#0F355A]" onClick={() => handleButtonClick("Most Expensive Dishes")}>
        Most Expensive Dishes
      </button>
      <button className="m-2 px-6 py-4 bg-[#05204A] text-white rounded hover.bg-[#0F355A]" onClick={() => handleButtonClick("Restaurants By Wealth")}>
        Restaurants By Wealth
      </button>
      <button className="m-2 px-6 py-4 bg-[#05204A] text-white rounded hover.bg-[#0F355A]" onClick={() => handleButtonClick("Search for Customer")}>
        Search for Customer
      </button>
      {showRestaurantMenu && (
        <div className="w-full flex flex-wrap justify-center items-center">
          <button className="m-2 px-6 py-4 bg-[#05204A] text-white rounded hover.bg-[#0F355A]" onClick={() => handleButtonClick("Join with Menu Items")}>
            Restaurant's Menu Items
          </button>
          <button className="m-2 px-6 py-4 bg-[#05204A] text-white rounded hover.bg-[#0F355A]" onClick={() => handleButtonClick("Popular Dishes")}>
            Popular Dishes
          </button>
          <button className="m-2 px-6 py-4 bg-[#05204A] text-white rounded hover.bg-[#0F355A]" onClick={() => handleButtonClick("Popular Restaurants")}>
            Popular Restaurants
          </button>
        </div>
      )}
      {showRestaurantMenu && !joinClicked && !dishesClicked && !popularRes &&(
        <div className="w-full">
          <h2 style={{ fontWeight: '600', color: '#0066cc' }}>Showing All Restaurants in the DB</h2>
          <p style={{ fontWeight: '600', color: 'red', textAlign: 'center' }}>Query to get all restaurants information:</p>
          <p style={{ fontWeight: '600', color: 'black', textAlign: 'center' }}>"SELECT * FROM restaurant r ORDER BY r.restaurantid;"</p>
          <ul>
            {restaurants.map((restaurant, index) => (
              <li key={index}>
                <p style={{ fontWeight: '400', textAlign: "center"}}>
                <span style={{ color: 'green' }}> Restaurant ID:</span> {restaurant.restaurantid}<br />
                <span style={{ color: 'green' }}> Restaurant Name:</span> {restaurant.name}<br />
                <span style={{ color: 'green' }}> Phone Number:</span> {restaurant.phone}<br />
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showExpensiveDishes && (
        <div className="w-full">
        <h2 style={{ fontWeight: '600', color: '#0066cc' }}> The priciest dish at each restaurant!</h2>
        <p style={{ fontWeight: '600', color: 'red', textAlign: 'center' }}>Query to get the priciest dish:</p>
          <p style={{ fontWeight: '600', color: 'black', textAlign: 'center' }}>"SELECT r2.restaurantid, res.name AS "restaurant_name", mi.name AS "dish_name", mi.itemid AS "dish_id", maxPrice.price
            FROM (SELECT r.restaurantid, MAX(r.price) AS "price"
                    FROM restaurantmenu r
                    GROUP BY r.restaurantid) maxPrice, restaurantmenu r2, menuitem mi, restaurant res
            WHERE maxPrice.price = r2.price AND maxPrice.restaurantid = r2.restaurantid
                    AND r2.menuitemid = mi.itemid AND res.restaurantid = r2.restaurantid
            ORDER BY restaurantid;"</p>
          <ul>
            {expensiveDishes.map((dish, index) => (
              <li key={index}>
                <p style={{ fontWeight: '400', textAlign: "center" }}>
                <span style={{ color: 'green' }}> Dish Name:</span> {dish.dish_name}<br />
                <span style={{ color: 'green' }}> Price:</span> {dish.price}<br />
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {showAllCustomers && (
        <div className="w-full">
          <h2 style={{ fontWeight: '600', color: '#0066cc' }}> Showing All Customers in the DB!</h2>
          <h4 style={{ fontWeight: '600', color: '#0066cc' }}> Add a new customer by clicking <Link to="/Register"><u>Register</u></Link>!</h4>
          <p style={{ fontWeight: '600', color: 'red', textAlign: 'center' }}>Query to get all customers:</p>
          <p style={{ fontWeight: '600', color: 'black', textAlign: 'center' }}>
            SELECT email, pin, firstname, lastname, phone, zipcode, bankaccountid FROM customer;
          </p>
          <ul>
            {allCustomers.map((customers, index) => (
              <li key={index}>
                <p style={{ fontWeight: '400', textAlign: "center" }}>
                <span style={{ color: 'green' }}> <b>Email (PK)</b>:</span> {customers.email}<br />
                <span style={{ color: 'green' }}> Pin:</span> {customers.pin}<br />
                <span style={{ color: 'green' }}> First Name:</span> {customers.firstname}<br />
                <span style={{ color: 'green' }}> Last Name:</span> {customers.lastname}<br />
                <span style={{ color: 'green' }}> Phone:</span> {customers.phone}<br />
                <span style={{ color: 'green' }}> Zip Code:</span> {customers.zipcode}<br />
                <span style={{ color: 'green' }}> <i>Bank Account (FK):</i></span> {customers.bankaccountid}<br />
                <div className="space-x-2 py-3">
                  <Link to="/ManageAccount" onClick={() => {signInSelectedCustomer(customers)}} className="bg-[#537D8D] text-white py-2 px-4">
                    Order as customer
                  </Link>
                  {/* <Link to="/OrderHistory" className="bg-[#537D8D] text-white py-2 px-4">See customer orders</Link> */}
                </div>
                <br />
                  {/* Add more dish information fields as needed */}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {showWealthiestRestaurants && (
        <div className="w-full">
          <h2 style={{ fontWeight: '600', color: '#0066cc' }}>Restaurants Ordered By Highest Revenue</h2>
          <p style={{ fontWeight: '600', color: 'red', textAlign: 'center' }}>Query to order by highest revenue:</p>
          <p style={{ fontWeight: '600', color: 'black', textAlign: 'center' }}>"SELECT" r.restaurantid, r."name", b.balance AS "wealth"
            FROM restaurant r JOIN bank b ON r.bankaccountid = b.accountid
            ORDER BY b.balance;"</p>
          <ul>
            {richestRestaurants.map((res, index) => (
              <li key={index}>
                <p style={{  fontWeight: '400', textAlign: "center" }}>
                <span style={{ color: 'green' }}> Restaurant Name:</span> {res.name}<br />
                <span style={{ color: 'green' }}> Revenue:</span> {res.wealth}<br />
                  {/* Add more restaurant information fields as needed */}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {showOneCustomer && (
        <div className="w-full">
          <label htmlFor="customerLastName" className="mb-2">Enter Customer Last Name:</label>
          <br />
          <label htmlFor="customerLastName" className="mb-2 text-sm">(If last name matches in DB result will be displayed)</label>
          <div className="flex flex-col items-center">
            <input
              type="text"
              id="customerLastName"
              value={customerLastName}
              onChange={(e) => setCustomerLastName(e.target.value)}
              placeholder="Last Name"
              className="border border-gray-300 rounded px-2 py-1 mb-2"
            />
            {/* <button className="bg-[#537D8D] text-white " onClick={handleCustomerSearch}>Search</button> */}
          </div>
        </div>
      )}
      {showOneCustomer && searchedCustomer.length > 0 && (
        <div className="w-full">
          <h2 style={{ color: 'blue' }}>Customer Information</h2>
          <p style={{ fontWeight: '600', color: 'red', textAlign: 'center' }}>Query:</p>
          <p style={{ fontWeight: '600', color: 'black', textAlign: 'center' }}>SELECT email, firstname, lastname, phone, zipcode, membership
            FROM customer c
            WHERE c.lastname LIKE '${customerLastName}%'
                OR c.lastname LIKE '%{customerLastName}'
                OR c.lastname LIKE '%{customerLastName}%';</p>
          <ul></ul>
          <br />
          <ul>
            {searchedCustomer.map((customer, index) => (
              <li key={index}>
                <p style={{ fontWeight: '400', textAlign: "center" }}>
                  <span style={{ color: 'green' }}>First Name:</span> {customer.firstname}<br />
                  <span style={{ color: 'green' }}>Last Name:</span> {customer.lastname}<br />
                  <span style={{ color: 'green' }}>Email:</span> {customer.email}<br />
                </p>
                <br />
              </li>
            ))}
          </ul>
        </div>
      )}
      {showRestaurantMenu && dishesClicked && (
        <div className="w-full">
          <h2 style={{ fontWeight: '600', color: '#0066cc' }}>Popular Dishes</h2>
          <p style={{ fontWeight: '600', color: 'red', textAlign: 'center' }}>Query to get the most popular dishes:</p>
          <p style={{ fontWeight: '600', color: 'black', textAlign: 'center' }}>"SELECT m."name" AS "dish_name", dishStats.num_orders
            FROM (SELECT c.menuitemid, COUNT(c.menuitemid) AS "num_orders"
                    FROM cart c JOIN customerorder c2 ON c.orderid = c2.orderid
                    WHERE c2.processed = true
                    GROUP BY c.menuitemid
                    ORDER BY "num_orders" DESC) dishStats
                JOIN menuitem m ON m.itemid = dishStats.menuitemid;"</p>
          <ul>
            {popOrders.map((pop, index) => (
              <li key={index}>
                <p style={{  fontWeight: '400', textAlign: "center" }}>
                <span style={{ color: 'green' }}>Dish Name: </span> {pop.dish_name}<br />
                <span style={{ color: 'green' }}>Number of Orders:</span> {pop.num_orders}<br />
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {showRestaurantMenu && popularRes && (
        <div className="w-full">
          <h2 style={{ fontWeight: '600', color: '#0066cc' }}>Popular Restaurants</h2>
          <p style={{ fontWeight: '600', color: 'red', textAlign: 'center' }}>Query to get the most popular dishes:</p>
          <p style={{ fontWeight: '600', color: 'black', textAlign: 'center' }}>"insert query here"</p>
        </div>
      )}
      {showRestaurantMenu && joinClicked && (
        <div className="w-full">
          <h2 style={{ fontWeight: '600', color: '#0066cc' }}>Enter Restaurant ID:</h2>
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
          <h2 style = {{color: 'blue'}}>Restaurant Menu Items</h2>
          <p style={{ fontWeight: '600', color: 'red', textAlign: 'center' }}>Query to get restaurant menu based off of id:</p>
          <p style={{ fontWeight: '600', color: 'black', textAlign: 'center' }}>"SELECT m.name, r.price, m.type, m.description, m.itemid, r.restaurantid
            FROM restaurantmenu r join menuitem m on r.menuitemid = m.itemid
            where r.restaurantid = ${restaurantID};"</p>
          <ul>
            {searchedMenuItems.map((menuItem, index) => (
              <li key={index}>
                <p style={{  fontWeight: '400', textAlign: "center" }}>
                <span style={{ color: 'green' }}>Menu Item Name: </span> {menuItem.name}<br />
                <span style={{ color: 'green' }}>Price:</span> {menuItem.price}<br />
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