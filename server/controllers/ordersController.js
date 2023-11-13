const ordersModel = require('../models/ordersModel');

async function addToCart(req, res) {
    try {
        let {email, menuItemID, restaurantID} = req.body;

        const currTime = new Date();
        const formatDigit = (x) => x.toString().length === 1 ? '0' + x.toString() : x.toString();

        let orderDate = `${currTime.getFullYear()}-${formatDigit(currTime.getMonth()+1)}-${formatDigit(currTime.getDate())}`;
        let orderTime = `${formatDigit(currTime.getHours())}:${formatDigit(currTime.getMinutes())}:${formatDigit(currTime.getSeconds())}`;

        const addItem = await ordersModel.insertCustomerOrderAndCart(email, orderDate, orderTime, menuItemID, restaurantID);

        if(!addItem.SQL_success)
            return res.status(500).json({"success": false, "error": addItem.error});

        return res.status(201).json({
            "success": true, 
            "result": `added ${menuItemID} from restaurant ${restaurantID} to cart of ${email}`,
            "data": addItem
        });
    } catch (error) {
        return res.status(500).json({
            "success": false,
            "error": error.message
        });
    }
}

module.exports = {
    addToCart
}