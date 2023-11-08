import { useContext, useState } from 'react';
import { OrderContext } from '../context/OrderContext';

const tipOptions = [
    { amount: 2.00 },
    { amount: 3.00 },
    { amount: 5.00 },
    { amount: 0.00 },
];

function Checkout() {
    const { cart } = useContext(OrderContext);
    // setting Location for pickup
    const { location } = useContext(OrderContext);

    // Calculate totals
    const subtotal = cart.reduce((total, item) => total + item.price, 0);
    const tax = subtotal * 0.0825; // 8.25% tax
    const originalTotal = subtotal + tax;

    const [total, setTotal] = useState(originalTotal);
    const [paymentMethod, setPaymentMethod] = useState("Card");
    const [cashAmount, setCashAmount] = useState("");
    const [selectedTipAmount, setSelectedTipAmount] = useState(null);

    const handleTip = (amount) => {
        setSelectedTipAmount(amount);
        setTotal(originalTotal + amount);
    }

    const handlePaymentMethod = (method) => {
        setPaymentMethod(method);
        setCashAmount("");
    }

    let remainingBalance = cashAmount - total;
    let changeOwed = null;

    if (paymentMethod === "Cash" && remainingBalance >= 0) {
        changeOwed = remainingBalance;
        remainingBalance = 0;
    }

    return (
        <div className="flex flex-col items-center text-[#644536]">
            <h1 className="text-[#644536] text-4xl font-bold mt-20 mb-10">CHECKOUT</h1>

            <div className='w-1/2 border border-[#644536] p-6'>
                <div>
                    <div className='text-2xl font-bold '>PICKUP LOCATION</div>
                    <div>{location.name}</div>
                </div>

                <hr className="border border-[#644536] my-4" />

                <div>
                    <div className='text-2xl font-bold pb-6'>ORDER DETAILS</div>
                    <div className='flex justify-center'>
                        <div className='w-1/2'>
                            <div className='flex justify-between'>
                                <span>Sub Total</span>
                                <span>{subtotal.toFixed(2)}</span>
                            </div>

                            <div className='flex justify-between'>
                                <span>Tax</span>
                                <span>{tax.toFixed(2)}</span>
                            </div>

                            <hr className="border border-[#644536] my-4" />

                            <div>
                                <div className='text-lg font-semibold '>Tip the Crew</div>
                                <div>Show some love to the team that prepares your order.</div>
                                <div className='flex flex-col md:flex-row justify-evenly py-4'>
                                    {tipOptions.map(option => (
                                        <button
                                            onClick={() => handleTip(option.amount)}
                                            className={`border border-[#644536] p-2 ${selectedTipAmount === option.amount ? "bg-[#644536] text-white" : ""}`}
                                        >
                                            ${option.amount.toFixed(2)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <hr className="border border-[#644536] my-4" />

                            <div className='flex justify-between'>
                                <span className=' text-xl font-bold'>TOTAL</span>
                                <span>{total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border border-[#644536] my-4" />

                <div>
                    <div className='text-2xl font-bold '>PAYMENT</div>

                    <div className='flex justify-center'>
                        <div className='w-1/2'>
                            <div className='flex justify-between py-2'>
                                <div className='flex flex-col'>
                                    <label>Card Number</label>
                                    <input
                                        type="text"
                                        className="border border-[#644536] p-1"
                                        required
                                        pattern="\d{16}"
                                        title="16 digit card number"
                                    />
                                </div>

                                <div className='flex flex-col'>
                                    <label>CVV</label>
                                    <input
                                        type="text"
                                        className="border border-[#644536] w-20 p-1"
                                        required
                                        pattern="\d{3}"
                                        title="3 digit CVV"
                                    />
                                </div>
                            </div>

                            <div className='flex justify-between py-2'>
                                <div className='flex flex-col'>
                                    <label>Expiration</label>
                                    <input
                                        type="text"
                                        className="border border-[#644536] p-1"
                                        placeholder="MM/YY"
                                        pattern="\d{2}/\d{2}"
                                        required
                                    />
                                </div>

                                <div className='flex flex-col'>
                                    <label>Zip Code</label>
                                    <input
                                        type="text"
                                        className="border border-[#644536] p-1 w-20"
                                        required
                                        pattern="\d{3}"
                                        title="zip code"
                                    />
                                </div>
                            </div>

                            <div className='py-2'>
                                <div className="flex flex-col">
                                    <label>Cardholder Name</label>
                                    <input
                                        type="text"
                                        className="border border-[#644536] px-2 p-1"
                                        required
                                    />
                                </div>
                            </div>

                            <hr className="border border-[#644536] my-4" />

                            <div className="flex flex-col">
                                <label>Select Payment Method</label>
                                <div className="flex justify-evenly py-2">
                                    <button
                                        onClick={() => handlePaymentMethod("Card")}
                                        className={`border border-[#644536] p-2 ${paymentMethod === "Card" ? "bg-[#644536] text-white" : ""}`}
                                    >
                                        Card
                                    </button>
                                    <button
                                        onClick={() => handlePaymentMethod("Cash")}
                                        className={`border border-[#644536] p-2 ${paymentMethod === "Cash" ? "bg-[#644536] text-white" : ""}`}
                                    >
                                        Cash
                                    </button>
                                </div>
                            </div>

                            {paymentMethod === "Cash" && (
                                <div className='py-2'>
                                    <div className="flex flex-col">
                                        <label>Amount Paid with Cash</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0.00"
                                            className="border border-[#644536] p-1"
                                            value={cashAmount}
                                            onChange={(e) => setCashAmount(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {paymentMethod === "Cash" && (
            <div className="text-[#644536] text-2xl font-semibold mt-4">
                Remaining Balance: ${Math.abs(remainingBalance).toFixed(2)} {changeOwed ? "Change owed to customer: $" + changeOwed.toFixed(2) : ""}
            </div>
)}


            <button className="bg-[#644536] text-white py-4 px-4 w-1/4 mt-10 mb-20">
                CHECKOUT
            </button>
        </div>
    )
}

export default Checkout;
