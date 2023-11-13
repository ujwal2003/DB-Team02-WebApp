import { createContext, useState } from 'react';

export const ReportsContext = createContext();

export function ReportsProvider({ children }) {
    const [r_menu, setMenu] = useState([]);
    //const [location, setLocation] = useState([]);

    const getRestaurantMenu= (item) => {
        setMenu([...r_menu, item]); 
    };
    <ReportsContext.Provider value={{r_menu, getRestaurantMenu}}>
        {children}
    </ReportsContext.Provider>
} 