const customersModel = require('../models/customersModel');

async function registerNewUser(req, res) {
    try {
        let {firstName, lastName, email, accountPin, phoneNumber} = req.body;
        accountPin = parseInt(accountPin, 10);
        if(phoneNumber.length !== 10)
            return res.status(500).json({"error_status": "invalid phone number", "error_message": error.message});

        const register = customersModel.insertNewCustomer(email, accountPin, firstName, lastName, phoneNumber);
        return res.status(201).json({"message": `Succesfully Registered ${firstName} ${lastName}`});
    } catch (error) {
        return res.status(500).json({"error_status": "registration failed", "error_message": error.message});
    }
}

async function validateSignIn(req, res) {
    try {
        let {email, accountPin} = req.body;
        accountPin = parseInt(accountPin, 10);

        const emailExists = await customersModel.queryUserEmail(email);
        if(emailExists.length === 0)
            return res.status(500).json({"error_login": `Email ${email} not found`});
        
        const userInfo = await customersModel.queryUserInfo(email, accountPin);

        if(userInfo.length === 1)
            return res.status(200).json(userInfo[0]);
        return res.status(500).json({"error_login": `Invalid pin for ${email}`});
    } catch (error) {
        return res.status(500).json({"error_status": "sign in failed", "error_message": error.message});
    }
}

async function getUserPaymentInfo(req, res) {
    try {
        let {email} = req.body;
        const paymentInfoQuery = await customersModel.queryUserPaymentInfo(email);
        if(paymentInfoQuery.length === 0)
            return res.status(200).send("none");

        let paymentInfo = paymentInfoQuery[0];
        let expiryDate = `${paymentInfo.expiration.getMonth()+1}-${paymentInfo.expiration.getDate()}-${paymentInfo.expiration.getFullYear()}`;
        paymentInfo.expiration = expiryDate;
        return res.status(200).json(paymentInfo);
    } catch (error) {
        return res.status(500).json({"status": "could not retrieve payment info", "error": error.message});
    }
}

async function setUserPaymentInfo(req, res) {
    try {
        let {email, number, cvv, name, expiry} = req.body;

        let dateComponents = expiry.split('-');
        [dateComponents[0], dateComponents[1]] = [dateComponents[1], dateComponents[0]];
        dateComponents.reverse();
        expiry = dateComponents.join("-");

        let addInfo = await customersModel.insertNewPaymentInfo(email, number, cvv, name, expiry);
        return res.status(201).json({"message": `Sucessfully added payment information for ${email}`});
    } catch (error) {
        return res.status(500).json({"status": "failed to update payment information", "error": error.message});
    }
}

async function updateUserAccount(req, res) {
    try {
        let {oldEmail, newEmail, pin, fname, lname, phone, membership} = req.body;
        pin = parseInt(pin, 10);

        let newInfo = await customersModel.updateCustomer(oldEmail, newEmail, pin, fname, lname, phone, membership);
        return res.status(201).json({"message": `Sucessfully updated profile information for ${newEmail}`});
    } catch (error) {
        return res.status(500).json({"status": "failed to update user information", "error": error.message});
    }
}

async function updateUserPaymentInfo(req, res) {
    try {
        let {customerEmail, cardNumber, cvv, cardName, expiration} = req.body;

        let dateComponents = expiration.split('-');
        [dateComponents[0], dateComponents[1]] = [dateComponents[1], dateComponents[0]];
        dateComponents.reverse();
        expiration = dateComponents.join("-");

        cvv = parseInt(cvv, 10);

        let newInfo = await customersModel.updateUserPaymentInfo(customerEmail, cardNumber, cvv, cardName, expiration);
        return res.status(201).json({"message": `Sucessfully updated payment information for ${customerEmail}`});
    } catch (error) {
        return res.status(500).json({"status": "failed to update user information", "error": error.message});
    }
}

module.exports = {
    registerNewUser,
    validateSignIn,
    getUserPaymentInfo,
    setUserPaymentInfo,
    updateUserAccount,
    updateUserPaymentInfo
}