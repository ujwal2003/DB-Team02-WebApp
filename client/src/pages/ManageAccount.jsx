import HeroImage from "../assets/HeroImage.png";
import { Link } from "react-router-dom";

function ManageAccount() {
  // Replace these with actual user data
  const userInfo = {
    firstName: "John",
    lastName: "Doe",
    customerId: "123456",
    phone: "555-555-5555",
    email: "johndoe@example.com",
    membershipType: "Gold",
  };
  const paymentInfo = {
    paymentID: "123",
    cardNumber: "1234-1234-1234-1234",
    cvv: "123",
    cardName: "John Doe",
    expiration: "08/24",
  };

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
            <strong className="text-xl text-[#644536]">Customer ID:</strong> {userInfo.customerId}
          </div>
          <div className="mb-6">
            <strong className="text-xl text-[#644536]">Phone Number:</strong> {userInfo.phone}
          </div>
          <div className="mb-6">
            <strong className="text-xl text-[#644536]">Email:</strong> {userInfo.email}
          </div>
          <div className="mb-6">
            <strong className="text-xl text-[#644536]">Membership Type:</strong> {userInfo.membershipType}
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
          <div className="mb-6">
            <strong className="text-xl text-[#644536]">Payment ID:</strong> {paymentInfo.paymentID}
          </div>
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