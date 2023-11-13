import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { OrderContext } from '../context/OrderContext';


function LocationList() {
  const [restaurants, setRestaurantInfo] = useState([]);
  const {addLocation, addMeals, addSides, addDrinks} = useContext(OrderContext);
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

    getLocationsInfo();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const locationListStyle = "text-[#05204A] font-bold";
  const otherElementsStyle = "text-[#05204A] font-semibold";

  const setupOrderContext = (location, restaurantId) => {
    addLocation(location)

    async function getMenuInfo() {
      try {
        const res = await axios.get(`restaurants/menu/${restaurantId}`);
        const data = await res.data;
        if (data !== "none") {
          console.log(data)
          addMeals(data.filter(item => item.type === 0))
          addSides(data.filter(item => item.type === 1))
          addDrinks(data.filter(item => item.type === 2))
        }
      } catch (error) {
        console.log(error);
      }
    }
    getMenuInfo()

  }

  const filteredLocations = restaurants.filter((location) => {
    return location.restaurantid.toString().includes(searchTerm);
  });

  return (
    <div className="w-[90%] p-10 mt-8 flex">
      <div className="w-1/2">
        <h1 className={locationListStyle + " text-7xl mb-4"}>Choose a Location to View Our Menu</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Restaurant ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded border border-[#05204A] text-[#05204A] font-semibold"
          />
        </div>
        <div className="mb-8">
          <ul>
            {filteredLocations.map((location) => (
              <li key={location.restaurantId} className="flex items-center justify-between">
                <div>
                  <h2 className={otherElementsStyle}>Restaurant-ID: {location.restaurantid}</h2>
                  <p className={otherElementsStyle}>Restaurant Name: {location.name}</p>
                  <p className={otherElementsStyle}>Phone: {location.phone}</p>
                  <p className={otherElementsStyle}>Street: {location.street}</p>
                </div>
                <Link to={`/Menu`}>
                  <button className="bg-[#05204A] text-white p-2 rounded" onClick={() => setupOrderContext(location, location.restaurantid)}>
                    Order here!
                  </button>
                </Link>
                {/*<button className="bg-[#05204A] text-white p-2 rounded" onClick={() => orderHere(location)}>
                  Order here!
                </button>*/}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LocationList;