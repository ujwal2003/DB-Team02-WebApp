const customersModel = require('../models/customersModel');

async function registerNewUser(req, res) {
    try {
        const reg = req.body;
        // let {pin, fname, lname, email, number} = req.body;
        // pin = parseInt(pin, 10);
        // if(number.length !== 10)
        //     return res.status(500).json({"error_status": "registration failed", "error_message": error.message})

        const register = customersModel.insertNewCustomer(parseInt(reg.accountPin, 10), reg.firstName, reg.lastName, reg.email, reg.phoneNumber);
        return res.status(201).send(register);
    } catch (error) {
        return res.status(500).json({"error_status": "registration failed", "error_message": error.message});
    }
}

module.exports = {
    registerNewUser
}