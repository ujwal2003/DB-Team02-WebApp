import React, { useState } from "react";
import HeroImage from "../assets/HeroImage.png";
import { Link } from "react-router-dom";

import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    accountPin: "",
    phoneNumber: "",
    zipCode: "",
  });

  async function registerUser() {
    try {
      const res = await axios.post('customers/register/', formData);
  
      if(res.status !== 201) {
        throw new Error("unable to register");
      }
  
      const data = await res.data;
      console.log(data);
      return data;
    } catch (error) {
      if(error.response.data.error_registration === `${formData.email} has already been registered`)
      alert("this email has already been registered, please sign in!");
    }
  }

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    accountPin: false,
    phoneNumber: false,
    zipCode: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting (to avoid page reload)

    // Check for empty fields
    const errors = {};
    let hasError = false;
    for (const key in formData) {
      if (formData[key].trim() === "") {
        errors[key] = true;
        hasError = true;
      }
    }

    if (hasError) {
      setFormErrors(errors);
    } else {
      //account creation logic
      registerUser();

      // Display the success message
      setShowSuccessMessage(true);
    }
  };

  return (
    <main className="relative h-screen bg-cover" style={{ backgroundImage: `url(${HeroImage})` }}>
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="container mx-auto text-center relative flex items-center justify-center h-screen">
        <div className="bg-white py-14 px-40 bg-opacity-70 max-h-full overflow-y-auto">
          {showSuccessMessage ? (
            <div className="text-3xl font-semibold text-[#05204A] mb-4">
              Congratulations! You successfully created your account, you may now <Link to="/signin"><u>sign in!</u></Link>
            </div>
          ) : (
            <>
              <h1 className="text-3xl md:text-7xl font-bold text-[#05204A] mb-4">Create an Account</h1>
              <p className="text-sm">
                BEGIN; <br />
                INSERT INTO bank (accountID, balance) <br />
                VALUES <br />
                ('$bankAccountID', $balance); <br /> <br />

                INSERT INTO customer (email, pin, firstName, lastName, phone, zipcode, membership, bankAccountID) <br />
                VALUES <br />
                ('{formData.email}', {formData.accountPin}, '{formData.firstName}', '{formData.lastName}', {formData.phoneNumber}, {formData.zipCode}, 'yes', '$bankAccountID'); <br />
                COMMIT;
              </p>
              <div className="mb-8">
                <div className="mb-2">
                  <label className="text-l text-[#05204A]">First Name</label>
                </div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className={`form-control ${formErrors.firstName ? "border-red-500" : ""}`}
                />
                {formErrors.firstName && (
                  <p className="text-red-500 text-sm">Please enter your first name</p>
                )}
              </div>
              <div className="mb-4">
                <div className="mb-2">
                  <label className="text-l text-[#05204A]">Last Name</label>
                </div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className={`form-control ${formErrors.lastName ? "border-red-500" : ""}`}
                />
                {formErrors.lastName && (
                  <p className="text-red-500 text-sm">Please enter your last name</p>
                )}
              </div>
              <div className="mb-4">
                <div className="mb-2">
                  <label className="text-l text-[#05204A]">Email</label>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={`form-control ${formErrors.email ? "border-red-500" : ""}`}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm">Please enter your email</p>
                )}
              </div>
              <div className="mb-4">
                <div className="mb-2">
                  <label className="text-l text-[#05204A]">Account Pin Number</label>
                </div>
                <input
                  type="text"
                  name="accountPin"
                  value={formData.accountPin}
                  onChange={handleChange}
                  placeholder="Account Pin Number"
                  className={`form-control ${formErrors.accountPin ? "border-red-500" : ""}`}
                />
                {formErrors.accountPin && (
                  <p className="text-red-500 text-sm">Please create a 4 digit pin</p>
                )}
              </div>
              <div className="mb-4">
                <div className="mb-2">
                  <label className="text-l text-[#05204A]">Phone Number</label>
                </div>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className={`form-control ${formErrors.phoneNumber ? "border-red-500" : ""}`}
                />
                {formErrors.phoneNumber && (
                  <p className="text-red-500 text-sm">Please enter your Phone Number</p>
                )}
              </div>
              <div className="mb-4">
                <div className="mb-2">
                  <label className="text-l text-[#05204A]">Zip Code</label>
                </div>
                <input
                  type="tel"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="Zip Code"
                  className={`form-control ${formErrors.zipCode ? "border-red-500" : ""}`}
                />
                {formErrors.zipCode && (
                  <p className="text-red-500 text-sm">Please enter your Zip Code</p>
                )}
              </div>
              <div className="mb-4">
                <div className="flex justify-center">
                  <button
                    className="w-32 h-12 bg-[#537D8D] rounded-md text-white"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Register;