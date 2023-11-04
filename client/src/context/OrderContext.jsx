import { createContext, useState } from 'react';

export const OrderContext = createContext();

export function OrderProvider({ children }) {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart([...cart, item]); 
    };

    const removeFromCart = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
        console.log(index)
    };

    return (
        <OrderContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </OrderContext.Provider>
    );
} 