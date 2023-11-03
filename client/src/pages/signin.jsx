import React, { useState } from "react";
import HeroImage from "../assets/HeroImage.png";
import { Link } from "react-router-dom";

import axios from "axios";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    accountPin: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function signInUser() {
    const res = await axios.post('customers/login/', formData);

    if(res.status !== 200)
      throw new Error("unable to locate user")

      const data = await res.data;
      console.log(data);
      return data;
  }

  const handleSignIn = (e) => {
    //TODO do something when/after sign in is validated
    signInUser();
  }

  return (
    <main className="relative h-screen bg-cover" style={{ backgroundImage: `url(${HeroImage})` }}>
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="container mx-auto text-center relative flex items-center justify-center h-full">
        <div className="bg-white py-14 px-40 bg-opacity-70">
          <h1 className="text-7xl font-bold text-[#05204A] mb-4">Sign In</h1>
          <div className="mb-8">
            <div className="mb-2">
              <label className="text-xl text-[#05204A]">Email</label>
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="form-control"
            />
          </div>
          <div className="mb-8">
            <div className="mb-2">
              <label className="text-xl text-[#05204A]">Account Pin Number</label>
            </div>
            <input
              type="text"
              name="accountPin"
              value={formData.accountPin}
              onChange={handleChange}
              placeholder="Account Pin Number"
              className="form-control"
            />
          </div>
          <div className="mb-8">
            <div className="flex justify-center">
              <button className="w-32 h-12 bg-[#05204A]  rounded-md text-white" type="submit" onClick={handleSignIn}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignIn;