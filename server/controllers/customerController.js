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
        
        const userInfo = await customersModel.queryUserInfo(email, accountPin);

        if(userInfo.length === 1)
            return res.status(200).json(userInfo[0]);
        return res.status(500).json({"error_login": `Email ${email} not found`});
    } catch (error) {
        return res.status(500).json({"error_status": "sign in failed", "error_message": error.message});
    }
}

module.exports = {
    registerNewUser,
    validateSignIn
}