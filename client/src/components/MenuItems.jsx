import placeHolder from '../assets/placeholder.png'
import { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Used to display Meals, Sides, and Drinks pages
export default function MenuItems({ title, items }) {
    const { addToCart } = useContext(OrderContext);
    const { location } = useContext(OrderContext);
    const { custInfo } = useContext(UserContext);

    async function placeItemInCart(itemObj) {
        try {
            addToCart(itemObj);
            const res = await axios.post('order/add/', {
                "email": custInfo.email.toString(),
                "menuItemID": itemObj.itemid,
                "restaurantID": itemObj.restaurantid
            });
            const data = res.data;
            console.log(data);
            return data;
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
      <div className="flex flex-col items-center">
        <h1 className="text-[#644536] text-4xl font-bold mt-20">{title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 mb-96">
            {items.map(item => (
                <div key={item.name} className="border p-4">
    
                <h2 className="font-bold mb-2">{item.name}</h2>
    
                <p className="text-gray-500">{item.description}</p>
    
                <div className="flex justify-between items-center mt-4">
                    <span className="font-bold text-lg">${item.price}</span>
                    {
                        JSON.stringify(location) === '{}'
                        ?
                        <div className='flex flex-col'>
                            <Link to='/Locations' className='text-red-500 italic'>Choose a location</Link>
                            <button disabled
                            className="bg-[#537D8D] text-white py-2 px-4 opacity-50 cursor-not-allowed"
                            onClick={() => {placeItemInCart(item)}}
                            >
                            Add to Cart  
                            </button>
                        </div>
                        :
                            <button
                            className="bg-[#537D8D] text-white py-2 px-4"
                            onClick={() => {placeItemInCart(item)}}
                            >
                            Add to Cart  
                            </button>
                    }
                    
                </div>
    
                </div>
            ))}
        </div>
      </div>
    );
  }