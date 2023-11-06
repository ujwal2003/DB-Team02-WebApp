import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

function LocationList() {
    {/*const dummyLocations = [
        {
          restaurantId: 1,
          restaurantName: "Restaurant A",
          phone: "123-456-7890",
          street: "123 Main St",
          revenue: 1000,
        },
        {
          restaurantId: 2,
          restaurantName: "Restaurant B",
          phone: "987-654-3210",
          street: "456 Elm St",
          revenue: 1500,
        },
        {
          restaurantId: 3,
          restaurantName: "Restaurant C",
          phone: "555-555-5555",
          street: "789 Oak St",
          revenue: 800,
        },
      ];*/}
    
      
    
      // Filter the locations based on the search term
      
      const [locations, setRestaurantInfo] = useState([]);
      useEffect(() => {
        async function getLocationsInfo() {
          try {
            const res = await axios.get('restaurants/all');
            const data = await res.data;
            console.log(data);
            if(data !== "none") {
              setRestaurantInfo({
                restaurantId: data.restaurantid,
                name: data.name,
                phone: data.phone,
                street: data.street,
                revenue: data.revenue,
              });
            }
          } catch (error) {
            console.log(error);
          }
        }
    
        getLocationsInfo();
      }, []);
      console.log(typeof locations);
    const filteredLocations = locations.filter((location) =>
        location.restaurantId.toString().includes(searchTerm)
      );
      const [searchTerm, setSearchTerm] = useState("");
      const locationListStyle = "text-[#05204A] font-bold";
      const otherElementsStyle = "text-[#05204A] font-semibold";
    
  return (
    <div className="w-[90%] p-10 mt-8 flex">
      <div className="w-1/2">
        <h1 className={locationListStyle + " text-7xl mb-4"}>Location List</h1>
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
              <li key={location.restaurantId}>
                <h2 className={otherElementsStyle}>Restaurant-ID: {location.restaurantId}</h2>
                <p className={otherElementsStyle}>Restaurant Name: {location.restaurantName}</p>
                <p className={otherElementsStyle}>Phone: {location.phone}</p>
                <p className={otherElementsStyle}>Street: {location.street}</p>
                <p className={otherElementsStyle}>Revenue: ${location.revenue}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LocationList;
