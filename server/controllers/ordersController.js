const ordersModel = require('../models/ordersModel');

async function addToCart(req, res) {
    const {email, itemID, restaurantID, quantity} = req.body;
    let hasOrder = await ordersModel.queryExistingCustomerOrder(email);

    if(hasOrder.length === 0) {
        const timeStamp = new Date();
        let orderDate = `${timeStamp.getFullYear()}-${timeStamp.getMonth()}-${timeStamp.getDate()}`;
        let orderTime = `${timeStamp.getHours()}-${timeStamp.getMinutes()}-${timeStamp.getSeconds()}`;

        hasOrder = await ordersModel.insertNewUserOrder(email, orderDate, orderTime);
        ordersModel.insertItemIntoCart(hasOrder[0].orderid, restaurantID, itemID, 1);
        return res.status(201).json({"status": `inserted item into cart of ${email}`});
    }

    //TODO update existing item
    //TODO add new item to cart for that order
}

async function removeFromCart(req, res) {

}

async function addTip(req, res) {
    //TODO implementation
}

async function processOrder(req, res) {
    //TODO implementation
}

module.exports = {
    addToCart,
    removeFromCart,
    addTip,
    processOrder
}