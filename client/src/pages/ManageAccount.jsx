import HeroImage from "../assets/HeroImage.png";
import { Link } from "react-router-dom";

function ManageAccount() {
  // Replace these with actual user data
  const userInfo = {
    firstName: "John",
    lastName: "Doe",
    customerId: "123456",
    phoneNumber: "555-555-5555",
    email: "johndoe@example.com",
    membershipType: "Gold",
  };

  function formatName(userInfo) {
    return userInfo.firstName + ' ' + userInfo.lastName;
  }

  return (
    <div className="flex">
      {/* Left navigation bar with background color #9DC087 */}
      <div className="bg-[#9DC087] w-1/8 p-8">
        <ul>
          <li className="mb-4">
            <Link to="/dashboard" className="text-[#05204A] font-bold">Dashboard</Link>
          </li>
          <li className="mb-4">
            <Link to="/profile" className="text-[#05204A] font-bold">Profile</Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </div>

      {/* Brown rectangle outlining user information with increased height */}
      <div className="w-[85%] p-12 border border-[#644536] border-4 my-12 mt-8">
        <h1 className="text-6xl font-bold mb-4 text-[#644536]">Hello, {formatName(userInfo)}</h1>
        <ul>
          <li className="mb-6">
            <strong className="text-xl text-[#644536]">First Name:</strong> {userInfo.firstName}
          </li>
          <li className="mb-6">
            <strong className="text-xl text-[#644536]">Last Name:</strong> {userInfo.lastName}
          </li>
          <li className="mb-6">
            <strong className="text-xl text-[#644536]">Customer ID:</strong> {userInfo.customerId}
          </li>
          <li className="mb-6">
            <strong className="text-xl text-[#644536]">Phone Number:</strong> {userInfo.phoneNumber}
          </li>
          <li className="mb-6">
            <strong className="text-xl text-[#644536]">Email:</strong> {userInfo.email}
          </li>
          <li className="mb-6">
            <strong className="text-xl text-[#644536]">Membership Type:</strong> {userInfo.membershipType}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ManageAccount;
