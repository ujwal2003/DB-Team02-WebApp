import React, { useState } from "react";
import AlternateImage from "../assets/alternate-mexican-food.png";

function UpdatePaymentInformation() {
    const [formData, setFormData] = useState({
        paymentId: "",
        cardNumber: "",
        cvv: "",
        cardName: "",
        expiration: "",
      });
    
      const [showSuccessMessage, setShowSuccessMessage] = useState(false);
      const [formErrors, setFormErrors] = useState({
        paymentId: false,
        cardNumber: false,
        cvv: false,
        cardName: false,
        expiration: false,
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
          console.log(formData)
    
          // Display the success message
          setShowSuccessMessage(true);
        }
      };
    
      return (
        <main className="relative h-screen bg-cover" style={{ backgroundImage: `url(${AlternateImage})` }}>
          <div className="absolute inset-0 backdrop-blur-sm"></div>
          <div className="container mx-auto text-center relative flex items-center justify-center h-screen">
          <div className="bg-white py-14 px-40 bg-opacity-70 max-h-full overflow-y-auto">
              {showSuccessMessage ? (
                <div className="text-4xl font-semibold text-[#05204A] mb-4">
                  Congratulations! You have updated your payment information
                </div>
              ) : (
                <>
                  <h1 className="text-7xl font-semibold text-[#05204A] mb-4">Update Payment Information</h1>

                  <div className="mb-8">
                    <div className="mb-2">
                      <label className="text-xl text-[#05204A]">Payment ID</label>
                    </div>
                    <input
                      type="text"
                      name="paymentId"
                      value={formData.paymentId}
                      onChange={handleChange}
                      placeholder="Payment ID"
                      className={`form-control ${formErrors.paymentId ? "border-red-500" : ""}`}
                    />
                    {formErrors.paymentId && (
                      <p className="text-red-500 text-sm">Please enter your payment ID</p>
                    )}
                  </div>

                  <div className="mb-8">
                    <div className="mb-2">
                      <label className="text-xl text-[#05204A]">Card Number</label>
                    </div>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="Card Number"
                      className={`form-control ${formErrors.cardNumber ? "border-red-500" : ""}`}
                    />
                    {formErrors.cardNumber && (
                      <p className="text-red-500 text-sm">Please enter your card number</p>
                    )}
                  </div>

                  <div className="mb-8">
                    <div className="mb-2">
                      <label className="text-xl text-[#05204A]">CVV</label>
                    </div>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="CVV"
                      className={`form-control ${formErrors.cvv ? "border-red-500" : ""}`}
                    />
                    {formErrors.cvv && (
                      <p className="text-red-500 text-sm">Please enter your CVV</p>
                    )}
                  </div>

                  <div className="mb-8">
                    <div className="mb-2">
                      <label className="text-xl text-[#05204A]">Card Name</label>
                    </div>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      placeholder="Name on Card"
                      className={`form-control ${formErrors.cardName ? "border-red-500" : ""}`}
                    />
                    {formErrors.cardName && (
                      <p className="text-red-500 text-sm">Please enter full name on card</p>
                    )}
                  </div>

                  <div className="mb-8">
                    <div className="mb-2">
                      <label className="text-xl text-[#05204A]">Expiration</label>
                    </div>
                    <input
                      type="month"
                      name="expiration"
                      value={formData.expiration}
                      onChange={handleChange}
                      placeholder="Expiration Date"
                      className={`form-control ${formErrors.expiration ? "border-red-500" : ""}`}
                    />
                    {formErrors.expiration && (
                      <p className="text-red-500 text-sm">Please enter your cards expiration date</p>
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

export default UpdatePaymentInformation