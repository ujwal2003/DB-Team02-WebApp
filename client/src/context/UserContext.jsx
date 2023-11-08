import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({children}) {
    const [custInfo, setCustInfo] = useState({});
    const [custPaymentInfo, setCustPaymentInfo] = useState({
        cardNumber: "Payment Method Not Set!",
        cvv: "Payment Method Not Set!",
        cardName: "Payment Method Not Set!",
        expiration: "Payment Method Not Set!",
    });

    const custSignIn = (custEmail, fname, lname, member, phoneNum, zipCode) => {
        // console.log("triggered");
        setCustInfo({
            firstName: fname,
            lastName: lname,
            phone: phoneNum,
            email: custEmail,
            membershipType: member,
            zip: zipCode
        });
    };

    const custSignOut = () => {
        setCustInfo({});
        setCustPaymentInfo({
            cardNumber: "Payment Method Not Set!",
            cvv: "Payment Method Not Set!",
            cardName: "Payment Method Not Set!",
            expiration: "Payment Method Not Set!",
        });
    };

    return (
        <UserContext.Provider value={{custInfo, custPaymentInfo, setCustPaymentInfo, custSignIn, custSignOut}}>
            {children}
        </UserContext.Provider>
    );
}