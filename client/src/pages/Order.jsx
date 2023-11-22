import placeHolder from '../assets/placeholder.png'
import { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import { UserContext } from "../context/UserContext";
import { Link } from 'react-router-dom';
import axios from 'axios';

function Order() {
    const { cart, removeFromCart } = useContext(OrderContext);
    const { custInfo } = useContext(UserContext);
    const { location } = useContext(OrderContext);

    if (Object.keys(custInfo).length === 0) {
        return <>{alert("Please Sign In as a Customer before Ordering")} {window.location.href = 'signin'}</>
    }

    async function removeItemFromCart(itemObj, itemIndex) {
        try {
            // console.log(itemObj);
            const res = await axios.delete('order/remove/', {data: {
                "email": custInfo.email.toString(),
                "menuItemID": itemObj.itemid,
                "restaurantID": itemObj.restaurantid
            }});
            const data = res.data;
            console.log(data);
            removeFromCart(itemIndex);
            return data;
        } catch (error) {
            console.error(error.response.data);
        }
    }

    // Calculate totals
    const subtotal = cart.reduce((total, item) => total + parseFloat(item.price), 0); 
    console.log(subtotal)
    const tax = subtotal * 0.0825; // 8.25% tax
    const total = subtotal + tax;

    return (
        <div className="flex flex-col items-center text-[#644536]">
            <h1 className="text-[#644536] text-4xl font-bold mt-20">MY ORDER</h1>
            <p className='text-sm'>
                SELECT m.name, r.price, m.type, m.description, r.menuitemid, r.restaurantid <br />
                FROM customerorder c JOIN cart c2 ON c.orderid = c2.orderid <br />
                    JOIN restaurantmenu r ON c2.menuitemid  = r.menuitemid AND c2.restaurantid = r.restaurantid <br />
                    JOIN menuitem m ON m.itemid = c2.menuitemid <br />
                WHERE c.processed = false AND c.customeremail = '{custInfo.email}';
            </p>

            {cart.map((item, index) => (
                <div key={index} className="p-6 w-screen">
                    <div className='flex flex-row justify-between items-center'>
                    <div className='flex justify-center items-center space-x-12'>
                        <img 
                            src={placeHolder}
                            alt={item.name}
                            className="w-full h-48 object-cover mb-4"
                        />
            
                        <div className="font-semibold text-xl">{item.name}</div>
                    </div>

                    <div>
                        <div className=''>${item.price}</div>
                        <div className='space-x-4'>
                            <button onClick={() => {removeItemFromCart(item, index)}} className=' text-[#537D8D] underline'>delete</button>
                        </div>
                    </div>
                    </div>

                    <hr className="border border-[#644536] my-4" />
                </div>
            ))}
            <div className="mt-6 p-4 rounded-lg border w-screen mb-10">
                <div className="flex justify-between text-lg mb-2">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span> 
                </div>
                
                <div className="flex justify-between text-black text-md mb-2">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                </div>

                <hr className="border border-[#644536] my-4" />

                <div className="flex justify-between text-xl font-bold mb-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div><div className="flex justify-between text-xl font-bold mb-2">
                    <span>Pickup Location:</span>
                    <span>{location.name}</span>
                </div>
                <div className='flex justify-center pt-10'>
                <Link to='/Checkout' className="bg-[#644536] text-white px-4 py-4 w-1/4 flex items-center justify-center">
                    CHECKOUT
                </Link>
                </div>
            </div>
        </div>
    )
}

export default Order