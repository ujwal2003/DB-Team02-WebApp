import React, { useContext, useEffect, useState } from "react";
import HeroImage from "../assets/HeroImage.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

function SignIn() {
  const navigate = useNavigate();
  const {custInfo, custSignIn, custSignOut} = useContext(UserContext);

  useEffect(() => {
    if(Object.keys(custInfo).length !== 0)
      console.log(`User ${custInfo.email} signed out.`);
    custSignOut();
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    accountPin: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: false,
    accountPin: false,
  });

  const [emailNotRegistered, setEmailNotRegistered] = useState(false);
  const [incorrectAccountPin, setIncorrectAccountPin] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Reset the errors when the user starts typing
    setFormErrors({
      ...formErrors,
      email: false,
      accountPin: false,
    });
    setEmailNotRegistered(false);
    setIncorrectAccountPin(false);
  };

  async function signInUser() {
    try {
      const res = await axios.post('customers/login/', formData);
      const data = await res.data;
      // console.log(data);
      return data;
    } catch (error) {
      // console.log(error.message);
      // console.log(error.response.data);

      if (error.response.data.error_login === `Email ${formData.email} not found`) {
        setFormErrors({
          ...formErrors,
          email: true,
        });
        setEmailNotRegistered(true);
      } else if (error.response.data.error_login === `Invalid pin for ${formData.email}`) {
        setFormErrors({
          ...formErrors,
          accountPin: true,
        });
        setIncorrectAccountPin(true);
      }
      return false;
    }
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    custSignOut();

    const errors = {};
    let hasError = false;

    for (const key in formData) {
      if (formData[key].trim() === "") {
        errors[key] = true;
        hasError = true;
      }
    }

    // Update the state with form errors
    setFormErrors({
      ...formErrors,
      ...errors,
    });

    let logInUser = await signInUser();

    if (logInUser) {
      // Redirect to the ManageAccount page on successful sign-in
      custSignIn(logInUser.email, logInUser.firstname, logInUser.lastname, logInUser.membership, logInUser.phone);
      navigate("/ManageAccount");
    }
  };

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
              className={`form-control ${formErrors.email ? "border-red-500" : ""}`}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm">Please enter a valid email.</p>
            )}
            {emailNotRegistered && (
              <p className="text-red-500 text-sm">Email not registered.</p>
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
              <p className="text-red-500 text-sm">Please enter a valid pin.</p>
            )}
            {incorrectAccountPin ? (
              <p className="text-red-500 text-sm">Incorrect account pin.</p>
            ): (null)}
          </div>
          <div className="mb-8">
            <div className="flex justify-center">
              <button className="w-32 h-12 bg-[#05204A] rounded-md text-white" type="submit" onClick={handleSignIn}>
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