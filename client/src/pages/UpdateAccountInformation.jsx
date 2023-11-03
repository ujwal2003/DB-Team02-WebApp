import React, { useState } from "react";
import AlternateImage from "../assets/alternate-mexican-food.png";
import { Link } from "react-router-dom";

function UpdateAccountInformation() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    accountPin: "",
    phoneNumber: "",
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    accountPin: false,
    phoneNumber: false,
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
      // You can add your account creation logic here if needed

      // Display the success message
      setShowSuccessMessage(true);
    }
  };

  return (
    <main className="relative h-screen bg-cover" style={{ backgroundImage: `url(${AlternateImage})` }}>
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="container mx-auto text-center relative flex items-center justify-center h-full">
        <div className="bg-white py-14 px-40 bg-opacity-70">
          {showSuccessMessage ? (
            <div className="text-4xl font-semibold text-[#05204A] mb-4">
              Congratulations! You have updated your account information
            </div>
          ) : (
            <>
              <h1 className="text-7xl font-semibold text-[#05204A] mb-4">Update Account Information</h1>
              <div className="mb-8">
                <div className="mb-2">
                  <label className="text-xl text-[#05204A]">First Name</label>
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
              <div className="mb-8">
                <div className="mb-2">
                  <label className="text-xl text-[#05204A]">Last Name</label>
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
                  className={`form-control ${formErrors.email ? "border-red-500" : ""}`}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm">Please enter your email</p>
                )}
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
                  className={`form-control ${formErrors.accountPin ? "border-red-500" : ""}`}
                />
                {formErrors.accountPin && (
                  <p className="text-red-500 text-sm">Please create a 4 digit pin</p>
                )}
              </div>
              <div className="mb-8">
                <div className="mb-2">
                  <label className="text-xl text-[#05204A]">Phone Number</label>
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
              <div className="mb-8">
                <div className="flex justify-center">
                  <button
                    className="w-32 h-12 bg-[#05204A] rounded-md text-white"
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

export default UpdateAccountInformation;