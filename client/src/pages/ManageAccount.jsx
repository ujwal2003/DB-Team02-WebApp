import HeroImage from "../assets/HeroImage.png";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

function ManageAccount() {
  const {custInfo, custPaymentInfo, setCustPaymentInfo} = useContext(UserContext);

  // if user has not signed in, redirect to signin
  if(Object.keys(custInfo).length === 0) {
    window.location.href = "/signin";
    return;
  }

  useEffect(() => {
    async function getPaymentInfo() {
      try {
        const res = await axios.post('customers/card', {"email": custInfo.email});
        const data = await res.data;
        console.log(data);
        if(data !== "none") {
          setCustPaymentInfo({
            cardNumber: data.cardnumber,
            cvv: data.cvv,
            cardName: data.cardname,
            expiration: data.expiration,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    getPaymentInfo();
  }, []);

  const userInfo = custInfo;
  const paymentInfo = custPaymentInfo;

  console.log(custInfo);
  console.log(custPaymentInfo);


  function formatName(userInfo) {
    return userInfo.firstName + ' ' + userInfo.lastName;
  }

  return (
    <div className="flex">
      <div className="bg-[#9DC087] w-1/8 p-8">
        <ul>
          <li className="mb-4">
            <Link to="/dashboard" className="text-[#05204A] font-bold">
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/profile" className="text-[#05204A] font-bold">
              Profile
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/OrderHistory" className="text-[#05204A] font-bold">
              Order History
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/Membership" className="text-[#05204A] font-bold">
              Membership
            </Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </div>

      <div className="w-[85%] p-10 mt-8 flex">
        <div className="w-1/2">
          <h1 className="text-4xl font-bold mb-8 text-[#644536]">
            Account Information
          </h1>
          <div className="mb-6">
            <strong className="text-xl text-[#644536]">First Name:</strong> {userInfo.firstName}
          </div>
          <div className="mb-6">
            <strong className="text-xl text-[#644536]">Last Name:</strong> {userInfo.lastName}
          </div>
          <div className="mb-6">
            <strong className="text-xl text-[#644536]">Zip Code:</strong> {userInfo.zip}
          </div>
          <div className="mb-6">
            <strong className="text-xl text-[#644536]">Phone Number:</strong> {userInfo.phone}
          </div>
          <div className="mb-6">
            <strong className="text-xl text-[#644536]">Email:</strong> {userInfo.email}
          </div>
          <div className="mb-6">
            <strong className="text-xl text-[#644536]">Membership:</strong> {userInfo.membershipType ? "yes" : "no"}
          </div>
          <Link to="/UpdateAccountInformation">
            <button className="bg-[#05204A] text-white font-bold py-2 px-4 rounded">
              Update Account Information
            </button>
          </Link>
          <button className="bg-red-500 text-white font-bold py-2 px-4 rounded" onClick={() => {
            if (window.confirm("Confirm Deletion of Account")) {
              // Handle the account deletion logic here
            }}}>
    Delete Account
  </button>
        </div>
        <div className="w-1/2">
          <h1 className="text-4xl font-bold mb-8 text-[#644536]">
            Payment Information
          </h1>
          {/* <div className="mb-6">
            <strong className="text-xl text-[#644536]">Payment ID:</strong> {paymentInfo.paymentID}
          </div> */}
          <div className="mb-6">
            <strong className="text-xl text-[#644536]">Card Number:</strong> {paymentInfo.cardNumber}
          </div>
          <div className="mb-6">
            <strong className="text-xl text-[#644536]">CVV:</strong> {paymentInfo.cvv}
          </div>
          <div className="mb-6">
            <strong className="text-xl text-[#644536]">Card Name:</strong> {paymentInfo.cardName}
          </div>
          <div className="mb-6">
            <strong className="text-xl text-[#644536]">Expiration:</strong> {paymentInfo.expiration}
          </div>
          <div className="mb-6">
            <strong className="text-xl text-[#644536]">Balance:</strong> {paymentInfo.expiration}
          </div>
          <Link to ="/UpdatePaymentInformation">
            <button className="bg-[#05204A] text-white font-bold py-2 px-4 rounded">
              Update Payment Information
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ManageAccount;