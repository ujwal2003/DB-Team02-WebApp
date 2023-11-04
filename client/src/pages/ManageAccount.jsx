import HeroImage from "../assets/HeroImage.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function ManageAccount() {
  const location = useLocation();
  console.log(location.state);

  // if no state was passed in, redirect to signin
  if(location.state === null) {
    window.location.href = "/signin";
    return;
  }

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "Payment Method Not Set!",
    cvv: "Payment Method Not Set!",
    cardName: "Payment Method Not Set!",
    expiration: "Payment Method Not Set!",
  });

  // dummy data
  // comment out actual data, and uncomment this for testing
  /* 
    const userInfo = {
      firstName: "John",
      lastName: "Doe",
      phone: "1234567890",
      email: "JohDoe@email.com",
      membershipType: true,
    };

    const paymentInfo = {
      paymentID: "123",
      cardNumber: "1234-1234-1234-1234",
      cvv: "123",
      cardName: "John Doe",
      expiration: "08/24",
    };
  */

  const userInfo = {
    firstName: location.state.firstname,
    lastName: location.state.lastname,
    phone: location.state.phone,
    email: location.state.email,
    membershipType: location.state.membership,
  };

  useEffect(() => {
    async function getPaymentInfo() {
      try {
        const res = await axios.post('customers/card', {"email": location.state.email});
        const data = await res.data;
        console.log(data);
        if(data !== "none") {
          setPaymentInfo({
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
            <Link to="/orderHistory" className="text-[#05204A] font-bold">
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
          {/* <div className="mb-6">
            <strong className="text-xl text-[#644536]">Customer ID:</strong> {userInfo.customerId}
          </div> */}
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