import React from 'react'
import { Link } from 'react-router-dom'
import tacos from '../assets/tacos.jpeg'
import drinks from '../assets/drinks.jpeg'
import nachos from '../assets/nachos.jpeg'

export default function Menu() {
  return (
    <div className="flex flex-col items-center">
      <p>
        select m.name, r.price, m.type, m.description, m.itemid, r.restaurantid <br />
        from restaurantmenu r join menuitem m on r.menuitemid = m.itemid <br />
        where r.restaurantid = $restaurantID;
      </p>
      <h1 className="text-[#644536] text-4xl font-bold mt-20">MENU</h1>
      
      <div className="flex flex-col items-center md:items-start md:flex-row justify-evenly mt-16 mb-96 w-screen">
        <Link to="/menu/meals">
          <img 
            src={tacos} 
            alt="Meals"
            className="w-60 h-60 object-cover" 
          />
          <p className="mt-2 text-[#644536] font-bold text-xl text-center">Meals</p>
          </Link>

        <Link to="/menu/sides">
          <img 
            src={nachos}
            alt="Sides" 
            className="w-60 h-60 object-cover"
          />
          <p className="mt-2 text-[#644536] font-bold text-xl text-center">Sides</p>
          </Link>

        <Link to="/menu/drinks">
          <img 
            src={drinks}
            alt="Drinks"
            className="w-60 h-60 object-cover"  
          />
          <p className="mt-2 text-[#644536] font-bold text-xl text-center">Drinks</p>
        </Link>
      </div>
    </div>
  )
}