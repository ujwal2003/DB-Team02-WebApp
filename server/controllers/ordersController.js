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

async function removeFromCart(req, res) {
    try {
        let {email, menuItemID, restaurantID} = req.body;
        const removeItem = await ordersModel.deleteFromCart(email, menuItemID, restaurantID);

        if(!removeItem.SQL_success)
            return res.status(500).json({"success": false, "SQL_error": removeItem.error});

        return res.status(200).json({
            "success": true, 
            "result": `removed ${menuItemID} (from restaurant ${restaurantID}) from the cart of ${email}`,
            "data": removeItem
        });
    } catch (error) {
        return res.status(500).json({
            "success": false,
            "error": error.message
        });
    }
}

async function addTip(req, res) {
    try {
        let {email, tip} = req.body;
        tip = parseFloat(tip);

        const addTip = await ordersModel.updateTipAttribute(email, tip);

        if(!addTip.SQL_success)
            return res.status(500).json({"success": false, "error": addTip.error});

        return res.status(200).json({
            "success": true,
            "result": `tip of $${tip} to order of ${email}`,
            "data": addTip
        });
    } catch (error) {
        return res.status(500).json({
            "success": false,
            "error": error.message
        });
    }
}

async function getUnprocessedUserCart(req, res) {
    try {
        let {email} = req.body;
        const getCart = await ordersModel.queryCurrentCart(email);

        if(!getCart.SQL_success)
            return res.status(500).json({"success": false, "error": getCart.error});

        return res.status(200).json({
            "success": true,
            "result": `retrieved unprocessed cart of ${email}`,
            "data": getCart
        });
    } catch (error) {
        return res.status(500).json({
            "success": false,
            "error": error.message
        });
    }
}

async function getUnprocessedUserOrder(req, res) {
    try {
        let {email} = req.body;
        const getOrder = await ordersModel.queryUnprocessedOrder(email);

        if(!getOrder.SQL_success)
            return res.status(500).json({"success": false, "error": getOrder.error});

        return res.status(200).json({
            "success": true,
            "result": `retrieved unproccessed order of ${email}`,
            "data": getOrder
        });
    } catch (error) {
        return res.status(500).json({
            "success": false,
            "error": error.message
        });
    }
}

async function getUserOrderSubtotal(req, res) {
    try {
        let {email} = req.body;
        const getSubTotal = await ordersModel.queryCartSubtotal(email);

        if(!getSubTotal.SQL_success)
            return res.status(500).json({"success": false, "error": getSubTotal.error});

        let tax = parseFloat(getSubTotal.result[0].subtotal) * 0.0825;
        getSubTotal.result[0] = {...getSubTotal.result[0], "tax": tax};

        return res.status(200).json({
            "success": true,
            "result": `retrieved subtotal for unprocessed order of ${email}`,
            "data": getSubTotal
        });
    } catch (error) {
        return res.status(500).json({
            "success": false,
            "error": error.message
        });
    }
}

async function processOrder(req, res) {
    try {
        let {email} = req.body;

        const getSubTotal = await ordersModel.queryCartSubtotal(email);
        if(!getSubTotal.SQL_success)
            return res.status(500).json({"success": false, "error": getSubTotal.error});

        let tax = parseFloat(getSubTotal.result[0].subtotal) * 0.0825;
        getSubTotal.result[0] = {...getSubTotal.result[0], "tax": tax};

        const getOrderTip = await ordersModel.queryUnprocessedOrder(email);
        if(!getOrderTip.SQL_success)
            return res.status(500).json({"success": false, "error": getOrderTip.error});

        let tip = parseFloat(getOrderTip.result[0].tip);

        const currTime = new Date();
        const formatDigit = (x) => x.toString().length === 1 ? '0' + x.toString() : x.toString();

        let orderDate = `${currTime.getFullYear()}-${formatDigit(currTime.getMonth()+1)}-${formatDigit(currTime.getDate())}`;
        let orderTime = `${formatDigit(currTime.getHours())}:${formatDigit(currTime.getMinutes())}:${formatDigit(currTime.getSeconds())}`;

        let userTotal = parseFloat(getSubTotal.result[0].subtotal) + tax + tip;
        const processOrder = await ordersModel.updateBankBalanceAttribute(email, userTotal, orderDate, orderTime);

        if(!processOrder.SQL_success)
            return res.status(500).json({"success": false, "error": processOrder.error});

        return res.status(200).json({
            "success": true,
            "result": `succesfully processed order of ${email}`,
            "data": processOrder
        });

    } catch (error) {
        return res.status(500).json({
            "success": false,
            "error": error.message
        });
    }
}

async function getOrderDetails(req, res) {
    try {
        let email = req.params['email'];
        const userOrderDetails = await ordersModel.queryMoneyOwedToEachRestauarant(email);

        if(!userOrderDetails.SQL_success)
            return res.status(500).json({"success": false, "error": userOrderDetails.error});

        return res.status(200).json({
            "success": true,
            "result": `retrieved subtotal for each restaurant for unprocessed order of ${email}`,
            "data": userOrderDetails
        });
    } catch (error) {
        return res.status(500).json({
            "success": false,
            "error": error.message
        });
    }
}

async function getOrderBankAccounts(req, res) {
    try {
        let email = req.params['email'];
        const userOrderBanks = await ordersModel.queryBankAccountsForUserOrder(email);

        if(!userOrderBanks.SQL_success)
            return res.status(500).json({"success": false, "error": userOrderBanks.error});

        return res.status(200).json({
            "success": true,
            "result": `retrieved bank accounts for each restaurant for unprocessed order of ${email}`,
            "data": userOrderBanks
        });
    } catch (error) {
        return res.status(500).json({
            "success": false,
            "error": error.message
        });
    }
}

module.exports = {
    addToCart,
    removeFromCart,
    addTip,
    getUnprocessedUserCart,
    getUnprocessedUserOrder,
    getUserOrderSubtotal,
    processOrder,
    getOrderDetails,
    getOrderBankAccounts
}