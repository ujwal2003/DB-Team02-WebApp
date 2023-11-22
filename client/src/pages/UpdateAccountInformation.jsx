import React, { useContext, useState } from "react";
import AlternateImage from "../assets/alternate-mexican-food.png";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";

function UpdateAccountInformation() {
  const {custInfo, custSignOut} = useContext(UserContext);
  // console.log(custInfo);

  const [formData, setFormData] = useState({
    firstName: custInfo.firstName,
    lastName: custInfo.lastName,
    email: custInfo.email,
    accountPin: "",
    phoneNumber: custInfo.phone,
    membership: custInfo.membershipType,
    zip: custInfo.zip
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    accountPin: false,
    phoneNumber: false,
    zip: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function updateUserAcctInfo() {
    try {
      const res = await axios.post('customers/profile/', {
        oldEmail: custInfo.email,
        newEmail: formData.email,
        pin: formData.accountPin,
        fname: formData.firstName,
        lname: formData.lastName,
        phone: formData.phoneNumber,
        membership: formData.membership,
        zipCode: formData.zip
      });
      const data = await res;
      return data;
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting (to avoid page reload)

    // Check for empty fields
    const errors = {};
    let hasError = false;
    for (const key in formData) {
      if (formData[key].toString().trim() === "") {
        errors[key] = true;
        hasError = true;
      }
    }

    if (hasError) {
      setFormErrors(errors);
    } else {
      // update account info
      let updatedData = await updateUserAcctInfo();
      custSignOut();
      // console.log(formData);

      // Display the success message
      setShowSuccessMessage(true);
    }
  };

  function handleMembershipClick() {
    let newMembership = formData.membership ? false : true;
    
    setFormData({
      ...formData,
      ["membership"]: newMembership,
    });
  }

  return (
    <main className="relative h-screen bg-cover" style={{ backgroundImage: `url(${AlternateImage})` }}>
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="container mx-auto text-center relative flex items-center justify-center h-screen">
      <div className="bg-white py-14 px-40 bg-opacity-70 max-h-full overflow-y-auto">
          {showSuccessMessage ? (
            <div className="text-4xl font-semibold text-[#05204A] mb-4">
              Information updated, please <Link to="/ManageAccount"><u>sign in again</u></Link>
            </div>
          ) : (
            <>
              <h1 className="text-4xl font-semibold text-[#05204A] mb-4">Update Account Information</h1>
              <p className="text-sm">
                BEGIN; <br />
                UPDATE customer <br />
                SET email = '{formData.email}',
                  pin = $pin,
                  firstname = '{formData.firstName}',
                  lastname = '{formData.lastName}',
                  phone = '{formData.phoneNumber}',
                  membership = '{custInfo.membershipType}',
                  zipcode = {formData.zip} <br />
                WHERE email = '{custInfo.email}'; <br /> <br />

                UPDATE paymentinformation 
                SET customeremail = '{formData.email}'
                WHERE customeremail = '{custInfo.email}'; <br />
                COMMIT;
              </p>
              <div className="mb-4">
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
                  placeholder="Enter 4-digit Pin"
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
                  value={formData.zip}
                  onChange={handleChange}
                  placeholder="Zip Code"
                  className={`form-control ${formErrors.zip ? "border-red-500" : ""}`}
                />
                {formErrors.phoneNumber && (
                  <p className="text-red-500 text-sm">Please enter your Phone Number</p>
                )}
              </div>
              <div className="mb-4">
                <div className="flex justify-center">
                  <button
                    className="w-32 h-12 bg-[#05204A] rounded-md text-white"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  <p>&nbsp;</p>
                  <button
                    className="w-32 h-12 bg-[#05204A] rounded-md text-white"
                    type="submit"
                    onClick={handleMembershipClick}
                  >
                    {formData.membership ? (<>Opt Out Of Membership</>) : (<>Opt Into Membership</>)}
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