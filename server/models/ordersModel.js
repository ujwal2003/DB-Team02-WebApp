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

async function deleteFromCart(email, dishID, restaurantID) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            BEGIN;

            WITH userOrderID AS (
                SELECT orderid AS userorder
                FROM customerorder c 
                WHERE c.customeremail = '${email}' and c.processed = false
            ) DELETE FROM cart c2 
            USING (
                SELECT c3.cartitemid 
                FROM cart c3 
                WHERE c3.orderid = (select userorder from userOrderID)
                    AND c3.restaurantid = ${restaurantID}
                    AND c3.menuitemid = ${dishID}
                ORDER BY c3.cartitemid 
                LIMIT 1
            ) c4
            WHERE c2.cartitemid = c4.cartitemid;
            
            COMMIT;
        `);
        client.release();
        return {"SQL_success": true, "result": res.rows};
    } catch (error) {
        console.error(error.message);
        return {"SQL_success": false, "error": error.message};
    }
}

async function updateTipAttribute(email, tip) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            BEGIN;
            UPDATE customerorder 
            SET tip = ${tip}
            WHERE customeremail = '${email}' AND processed = false;
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
    insertCustomerOrderAndCart,
    deleteFromCart,
    updateTipAttribute
}