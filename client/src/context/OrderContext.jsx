import { createContext, useState } from 'react';

export const OrderContext = createContext();

export function OrderProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [location, setLocation] = useState({})
    const [meals, setMeals] = useState([])
    const [sides, setSides] = useState([])
    const [drinks, setDrinks] = useState([])

    const addToCart = (item) => {
        setCart([...cart, item]); 
        console.log(item)
    };

    const clearCart = () => {
        setCart([]);
    };

    const removeFromCart = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
        console.log(index)
    };

    const addLocation = (locationObj) => {
        setLocation(locationObj)
    }

    const addMeals = (mealItems) => {
        setMeals(mealItems)
        console.log(mealItems)
    }

    const addSides = (sideItems) => {
        setSides(sideItems)
        console.log(sideItems)
    }

    const addDrinks = (drinkItems) => {
        setDrinks(drinkItems)
        console.log(drinkItems)
    }

    return (
        <OrderContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, location, addLocation, meals, addMeals, sides, addSides, drinks, addDrinks }}>
            {children}
        </OrderContext.Provider>
    );
} 