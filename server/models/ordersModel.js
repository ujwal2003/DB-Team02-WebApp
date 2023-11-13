const {pool} = require('../config/db');

async function queryUnprocessedOrder(email) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            SELECT orderid
            FROM customerorder c
            WHERE c.customeremail = '${email}' and c.processed = 'no';
        `);
        client.release();
        return {"SQL_success": true, "result": res.rows};
    } catch (error) {
        console.error(error.message);
        return {"SQL_success": false, "error": error.message};
    }
}

async function insertCustomerOrderAndCart(email, date, time, dishID, restaurantID) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            BEGIN;

            INSERT INTO customerorder (customerEmail, orderDate, orderTime, tip, processed)
            SELECT '${email}', '${date}', '${time}', 0.00, false
            WHERE NOT EXISTS (
                SELECT 1
                FROM customerorder 
                WHERE customeremail = '${email}' and processed = false
            );

            WITH userOrderID AS (
                SELECT orderid AS userorder
                FROM customerorder c
                WHERE c.customeremail = '${email}' and c.processed = false
            ) INSERT INTO cart (orderID, menuitemid, restaurantid)
                SELECT userorder, ${dishID}, ${restaurantID}
                FROM userOrderID;

            COMMIT;
        `);
        client.release();
        return {"SQL_success": true, "result": res.rows};
    } catch (error) {
        console.error(error.message);
        return {"SQL_success": false, "error": error.message};
    }
}

module.exports = {
    queryUnprocessedOrder,
    insertCustomerOrderAndCart
}