const {pool} = require("../config/db");

//* add to cart methods
async function queryExistingCustomerOrder(email) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            SELECT c.orderid
            FROM customerorder c
            WHERE c.email = '${email}' AND c.processed = 'no';
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
        const res = await client.query(`
            SELECT *
            FROM cart c
            WHERE c.orderid = ${orderID} AND c.menuitemid = ${itemID};
        `);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error.message);
    }
}

async function insertItemIntoCart(orderID, restaurantID, itemID) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            BEGIN;
            INSERT INTO Cart (orderID, menuItemID, restaurantID)
            VALUES
            (${orderID}, ${itemID}, ${restaurantID});
            COMMIT;
        `);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error.message);
    }
}

//TODO update existing cart item (quantity increase or decrease)
// async function updateCartItemQuantity(orderID)

async function insertNewUserOrder(email, orderDate, orderTime) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            BEGIN;
            INSERT INTO customerorder (customeremail, orderdate, ordertime, tip, processed)
            VALUES
            ('${email}', '${orderDate}', '${orderTime}', 0.00, 'no')
            RETURNING orderid;
            COMMIT;
        `);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error.message);
    }
}

//* remove from cart methods
//TODO implementation

//* add tip method
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

//* process order methods
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

//TODO change these three functions, join and group by each restaurant that customer ordered from
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