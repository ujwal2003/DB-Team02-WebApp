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
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </div>

      {/* Account information section */}
      <div className="w-7/8 p-8">
        <h1 className="text-2xl font-bold">Hello, {formatName(userInfo)}</h1>
        <ul>
          <li>
            <strong className="text-lg">First Name:</strong> {userInfo.firstName}
          </li>
          <li>
            <strong className="text-lg">Last Name:</strong> {userInfo.lastName}
          </li>
          <li>
            <strong className="text-lg">Customer ID:</strong> {userInfo.customerId}
          </li>
          <li>
            <strong className="text-lg">Phone Number:</strong> {userInfo.phoneNumber}
          </li>
          <li>
            <strong className="text-lg">Email:</strong> {userInfo.email}
          </li>
          <li>
            <strong className="text-lg">Membership Type:</strong> {userInfo.membershipType}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ManageAccount;
