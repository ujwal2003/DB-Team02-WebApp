import placeHolder from '../assets/placeholder.png'
import { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';

function Order() {
    const { cart, removeFromCart } = useContext(OrderContext);

    // Calculate totals
    const subtotal = cart.reduce((total, item) => total + item.price, 0); 
    const tax = subtotal * 0.0825; // 8.25% tax
    const total = subtotal + tax;

    return (
        <div className="flex flex-col items-center text-[#644536]">
            <h1 className="text-[#644536] text-4xl font-bold mt-20">MY ORDER</h1>

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
                            <button onClick={() => removeFromCart(index)} className=' text-[#537D8D] underline'>delete</button>
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
                </div>
                
                <div className='flex justify-center pt-10'>
                <button className="bg-[#644536] text-white px-4 py-4 w-1/4">
                    CHECKOUT
                </button>
                </div>
            </div>
        </div>
    )
}

export default Order