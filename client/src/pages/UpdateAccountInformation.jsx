import React, { useState } from "react";
import AlternateImage from "../assets/alternate-mexican-food.png";
import ManageAccount from "./ManageAccount";
import { Link } from "react-router-dom";

function UpdateAccountInformation(){
    return (
        <main className="relative h-screen bg-cover" style={{backgroundImage: `url(${AlternateImage})`}}>
    
          {/*<div className="absolute inset-0 backdrop-blur-sm"></div>*/}
    
          <div className="container mx-auto text-center relative flex items-center justify-center h-full">
            <div className="bg-white py-14 px-40 bg-opacity-80">
            <h1 className="text-7xl font-semibold text-[#05204A] mb-4">Update Information</h1>
            <p className="text-xl text-[#05204A] mb-8">Description</p>
            
            <Link to='/menu' className="bg-[#537D8D] px-4 py-2 text-white">Order Now</Link>
            </div>
          </div>
    
        </main>
      )
}
export default UpdateAccountInformation