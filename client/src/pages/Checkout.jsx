import { useContext, useState, useEffect } from 'react';
import { OrderContext } from '../context/OrderContext';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const tipOptions = [
    { amount: 2.00 },
    { amount: 3.00 },
    { amount: 5.00 },
    { amount: 0.00 },
];

function Checkout() {
    const { cart, clearCart } = useContext(OrderContext);
    const { custInfo, custPaymentInfo } = useContext(UserContext);
    const { location } = useContext(OrderContext); // setting Location for pickup

    console.log([custInfo, custPaymentInfo]); //! DEBUG

    // Calculate totals
    const subtotal = cart.reduce((total, item) => total + parseFloat(item.price), 0);
    const tax = subtotal * 0.0825; // 8.25% tax
    const originalTotal = subtotal + tax;

    const [total, setTotal] = useState(originalTotal);
    const [paymentMethod, setPaymentMethod] = useState("Card");
    const [cardInfo, setCardInfo] = useState({
        'cardNumber': "",
        'cvv': null,
        'expiration': "",
        'zip': null,
        'cardName': ""
    });
    const [cashAmount, setCashAmount] = useState("");
    const [selectedTipAmount, setSelectedTipAmount] = useState(null);
    const [processed, setProcessed] = useState(false);

    const handleTip = async (amount) => {
        try {
            const res = await axios.patch('order/tip/', {
                "email": custInfo.email,
                "tip": amount
            });
            setSelectedTipAmount(amount);
            setTotal(originalTotal + amount);   
        } catch (error) {
            console.error(error.message);
        }
    }

    const handlePaymentMethod = (method) => {
        setPaymentMethod(method);
        setCashAmount("");
    }

    const handleCardInputField = (e) => {
        const { name, value } = e.target;
        setCardInfo({
            ...cardInfo,
            [name]: value
        });
    }

    const processOrder = async () => {
        let cardExpiryParts = custPaymentInfo.expiration.split('-');
        cardExpiryParts[0] = cardExpiryParts[0].length === 1 ? '0' + cardExpiryParts[0] : cardExpiryParts[0];
        let cardExpiry = `${cardExpiryParts[0]}/${cardExpiryParts[2]}`;

        if(custPaymentInfo.cardName === cardInfo.cardName && custPaymentInfo.cardNumber === cardInfo.cardNumber
            && custPaymentInfo.cvv === parseInt(cardInfo.cvv) && cardExpiry.toString() === cardInfo.expiration
            && custInfo.zip === parseInt(cardInfo.zip)) {
                const res = await axios.patch('order/checkout/', {"email": custInfo.email});
                const data = await res.data;
                console.log(data);
                clearCart();

                setProcessed(true);
        } else {
            alert('card information is not correct');
        }
    }

    let remainingBalance = cashAmount - total;
    let changeOwed = null;

    if (paymentMethod === "Cash" && remainingBalance >= 0) {
        changeOwed = remainingBalance;
        remainingBalance = 0;
    }

    const [moneyOwedInfo, setMoneyOwedInfo] = useState([]);
    const [bankInfo, setBankInfo] = useState([]);

    useEffect(() => {
        async function getMoneyOwed() {
          try {
            const res = await axios.get(`order/details/${custInfo.email}`);
            const data = await res.data;
            if (data !== "none") {
                setMoneyOwedInfo(data.data.result);
            }
          } catch (error) {
            console.log(error);
          }
        }
    
        getMoneyOwed();
    }, []);

    useEffect(() => {
        async function getBankInfo() {
          try {
            const res = await axios.get(`order/banks/${custInfo.email}`);
            const data = await res.data;
            if (data !== "none") {
                setBankInfo(data.data.result);
            }
          } catch (error) {
            console.log(error);
          }
        }
    
        getBankInfo();
    }, []);
    
    return (
        <div className="flex flex-col items-center text-[#644536]">
            {!processed && (<>
            <h1 className="text-[#644536] text-4xl font-bold mt-20 mb-10">CHECKOUT</h1>

            <div className='w-1/2 border border-[#644536] p-6'>
                <div className='text-sm'>
                    {/* <div className='text-2xl font-bold '>Pickup Location Details</div>
                    <div className='text-font-semibold'>Restaurant Name: {location.name}</div>
                    <div className='text-font-semibold'>Restaurant ID: {location.restaurantid}</div>
                    <div className='text-font-semibold'>Phone Number: {location.phone}</div>
                    <div className='text-font-semibold'>Location: {location.street}, Houston, TX, 77057</div> */}
                    SELECT r2.restaurantid, r2."name" AS "restaurant", b.accountid, rbill.total_due <br />
                    FROM (select r.restaurantid, sum(r.price) AS "total_due" <br />
                    FROM customerorder c join cart c2 ON c.orderid = c2.orderid <br />
                        JOIN restaurantmenu r ON c2.menuitemid = r.menuitemid AND c2.restaurantid = r.restaurantid <br />
                    WHERE c.processed = false AND c.customeremail = '{custInfo.email}' <br />
                    GROUP BY r.restaurantid) rbill JOIN restaurant r2 ON rbill.restaurantid = r2.restaurantid <br />
                        JOIN bank b ON b.accountid = r2.bankaccountid; <br /> <br />

                        SELECT b.accountid, 'User: ' || c.email as "account_name", b.balance <br />
                        FROM customer c JOIN bank b ON c.bankaccountid = b.accountid <br />
                            JOIN customerorder c2 ON c2.customeremail = c.email <br />
                        WHERE c2.customeremail = '{custInfo.email}' AND c2.processed = false <br />
                        UNION <br />
                        SELECT b2.accountid, 'Restaurant: ' || r."name" as "account_name", b2.balance <br />
                        FROM restaurant r JOIN bank b2 ON r.bankaccountid = b2.accountid <br />
                            JOIN (SELECT DISTINCT ON (c1.restaurantid) c1.restaurantid, c1.orderid FROM cart c1) c ON c.restaurantid = r.restaurantid <br />
                            JOIN customerorder co ON co.orderid = c.orderid AND co.customeremail = '{custInfo.email}' AND co.processed = false <br />
                        ORDER BY "account_name" DESC;
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
                                <span>{total.toFixed(2)} {custInfo.membershipType ? <>+ $1 membership fee</> : <></>}</span>
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
                                        name='cardNumber'
                                        onChange={handleCardInputField}
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
                                        name='cvv'
                                        onChange={handleCardInputField}
                                    />
                                </div>
                            </div>

                            <div className='flex justify-between py-2'>
                                <div className='flex flex-col'>
                                    <label>Expiration</label>
                                    <input
                                        type="text"
                                        className="border border-[#644536] p-1"
                                        placeholder="MM/YYYY"
                                        pattern="\d{2}/\d{2}"
                                        required
                                        name='expiration'
                                        onChange={handleCardInputField}
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
                                        name='zip'
                                        onChange={handleCardInputField}
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
                                        name='cardName'
                                        onChange={handleCardInputField}
                                    />
                                </div>
                            </div>

                            {/* <hr className="border border-[#644536] my-4" />

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
                            </div> */}

                            <>
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
                            </>
                        </div>
                    </div>
                </div>

                <hr className="border border-[#644536] my-4" />
                
                <div>
                    <div className='text-2xl font-bold '>More Details</div>
                    <div className='text-font-semibold'>Money I owe to Restaurants: 
                        {moneyOwedInfo.length >= 1 ? ( 
                            moneyOwedInfo.map(item => (
                            <li key={item.restaurantid}>
                                {item.restaurant}: ${item.total_due}  
                            </li>
                            ))
                        ) : (
                            ""
                        )}
                    </div>
                    <div className='text-font-semibold'>Bank accounts: 
                        {bankInfo.length >= 1 ? ( 
                            bankInfo.map(item => (
                            <li key={item.accountid}>
                                {item.account_name} has ${item.balance}  
                            </li>
                            ))
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>

            <>
                {paymentMethod === "Cash" && (
                <div className="text-[#644536] text-2xl font-semibold mt-4">
                    Remaining Balance: ${Math.abs(remainingBalance).toFixed(2)} {changeOwed ? "Change owed to customer: $" + changeOwed.toFixed(2) : ""}
                </div>)}
            </>


            <button className="bg-[#644536] text-white py-4 px-4 w-1/4 mt-10 mb-20" onClick={() => {processOrder()}}>
                CHECKOUT
            </button>
            </>)}

            {processed && (<>
                <div className='text-2xl font-bold py-6 text-center'>
                    Payment Sucessfully Processed!

                    <div className='text-sm'>
                        BEGIN; <br />

                        UPDATE bank <br />
                        SET balance = balance - {total} <br /> 
                        WHERE accountid IN (
                            SELECT b.accountid
                            FROM customer c JOIN bank b ON c.bankaccountid = b.accountid 
                                JOIN customerorder c2 ON c2.customeremail = c.email 
                            WHERE c2.customeremail = '{custInfo.email}' AND c2.processed = false
                        ); <br /> <br /> 

                        UPDATE bank <br />
                        SET balance = balance - 1 <br />
                        WHERE accountid IN ( 
                            SELECT b.accountid
                            FROM customer c JOIN bank b ON c.bankaccountid = b.accountid 
                                JOIN customerorder c2 ON c2.customeremail = c.email 
                            WHERE c2.customeremail = '{custInfo.email}' AND c.membership = true AND c2.processed = false
                        );<br /> <br />

                        UPDATE bank <br /> 
                        SET balance = balance + total_due <br /> 
                        FROM (
                            SELECT r2.restaurantid, r2."name" AS "restaurant", b.accountid, rbill.total_due
                            FROM (SELECT r.restaurantid, sum(r.price) AS "total_due"
                                FROM customerorder c JOIN cart c2 ON c.orderid = c2.orderid 
                                    JOIN restaurantmenu r ON c2.menuitemid = r.menuitemid AND c2.restaurantid = r.restaurantid 
                                WHERE c.processed = false AND c.customeremail = '{custInfo.email}'
                                GROUP BY r.restaurantid) rbill JOIN restaurant r2 ON rbill.restaurantid = r2.restaurantid
                                                            JOIN bank b ON b.accountid = r2.bankaccountid
                        ) AS owed <br /> 
                        WHERE bank.accountid = owed.accountid; <br /> <br /> 

                        UPDATE customerorder <br /> 
                        SET processed = true,
                            orderdate = '{new Date().getFullYear()}-{new Date().getMonth()+1}-{new Date().getDate()}',
                            ordertime = '{new Date().getHours()}:{new Date().getMinutes()}:{new Date().getSeconds()}' <br /> 
                        WHERE customeremail = '{custInfo.email}' AND processed = false; <br /> <br /> 

                        COMMIT;
                    </div>
                </div>
            </>)}
        </div>
    )
}

export default Checkout;
