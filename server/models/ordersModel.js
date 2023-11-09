const {pool} = require("../config/db");

async function queryExistingCustomerOrder(email) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            
        `);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error.message);
    }
}

async function queryExistingCartItem(orderID, itemID) {
    try {
        const client = await pool.connect();
        const res = await client.query(``);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error.message);
    }
}

async function insertItemIntoCart(orderID, itemID, price) {
    try {
        const client = await pool.connect();
        const res = await client.query(``);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error.message);
    }
}

async function insertNewUserOrder(email) {
    try {
        const client = await pool.connect();
        const res = await client.query(``);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error.message);
    }
}

async function updateOrderWithTip(orderID, tip) {
    try {
        const client = await pool.connect();
        const res = await client.query(``);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error.message);
    }
}

async function validatePaymentMethod(email, cardNumber, zipCode) {
    try {
        const client = await pool.connect();
        const res = await client.query(``);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error.message);
    }
}

async function queryUserBankAccount(email) {
    try {
        const client = await pool.connect();
        const res = await client.query(``);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error.message);
    }
}

async function queryRestaurantBankAccount(restaurantID) {
    try {
        const client = await pool.connect();
        const res = await client.query(``);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error.message);
    }
}

async function updateBankAndOrder(userBankID, restaurantBankID, userPayment, restaurantGain, orderID) {
    try {
        const client = await pool.connect();
        const res = await client.query(``);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = {
    queryExistingCustomerOrder,
    queryExistingCartItem,
    insertItemIntoCart,
    insertNewUserOrder,
    updateOrderWithTip,
    validatePaymentMethod,
    queryUserBankAccount,
    queryRestaurantBankAccount,
    updateBankAndOrder
}