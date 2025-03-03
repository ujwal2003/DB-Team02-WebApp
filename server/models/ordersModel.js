const {pool} = require('../config/db');

async function queryUnprocessedOrder(email) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            SELECT *
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

async function queryCurrentCart(email) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            SELECT m.name, r.price, m.type, m.description, r.menuitemid, r.restaurantid
            FROM customerorder c JOIN cart c2 ON c.orderid = c2.orderid 
                JOIN restaurantmenu r ON c2.menuitemid  = r.menuitemid AND c2.restaurantid = r.restaurantid
                JOIN menuitem m ON m.itemid = c2.menuitemid
            WHERE c.processed = false AND c.customeremail = '${email}';
        `);
        client.release();
        return {"SQL_success": true, "result": res.rows};
    } catch (error) {
        console.error(error.message);
        return {"SQL_success": false, "error": error.message};
    }
}

async function queryCartSubtotal(email) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            SELECT SUM(cost) AS "subtotal"
            FROM (
                SELECT SUM(r.price) AS "cost"
                FROM customerorder c JOIN cart c2 ON c.orderid = c2.orderid 
                    JOIN restaurantmenu r ON c2.menuitemid  = r.menuitemid AND c2.restaurantid = r.restaurantid  
                WHERE c.processed = false AND c.customeremail = '${email}'
            ) costs; 
        `);
        client.release();
        return {"SQL_success": true, "result": res.rows};
    } catch (error) {
        console.error(error.message);
        return {"SQL_success": false, "error": error.message};
    }
}

async function updateBankBalanceAttribute(email, customerTotal, orderDate, orderTime) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            BEGIN;

            UPDATE bank 
            SET balance = balance - ${customerTotal}
            WHERE accountid IN (
                SELECT b.accountid
                FROM customer c JOIN bank b ON c.bankaccountid = b.accountid 
                    JOIN customerorder c2 ON c2.customeremail = c.email 
                WHERE c2.customeremail = '${email}' AND c2.processed = false
            );

            UPDATE bank 
            SET balance = balance - 1
            WHERE accountid IN (
                SELECT b.accountid
                FROM customer c JOIN bank b ON c.bankaccountid = b.accountid 
                    JOIN customerorder c2 ON c2.customeremail = c.email 
                WHERE c2.customeremail = '${email}' AND c.membership = true AND c2.processed = false
            );

            UPDATE bank 
            SET balance = balance + total_due
            FROM (
                SELECT r2.restaurantid, r2."name" AS "restaurant", b.accountid, rbill.total_due
                FROM (SELECT r.restaurantid, sum(r.price) AS "total_due"
                      FROM customerorder c JOIN cart c2 ON c.orderid = c2.orderid 
                        JOIN restaurantmenu r ON c2.menuitemid = r.menuitemid AND c2.restaurantid = r.restaurantid 
                      WHERE c.processed = false AND c.customeremail = '${email}'
                      GROUP BY r.restaurantid) rbill JOIN restaurant r2 ON rbill.restaurantid = r2.restaurantid
                                                JOIN bank b ON b.accountid = r2.bankaccountid
            ) AS owed
            WHERE bank.accountid = owed.accountid;

            UPDATE customerorder 
            SET processed = true,
                orderdate = '${orderDate}',
                ordertime = '${orderTime}'
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

async function queryMoneyOwedToEachRestauarant(email) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            SELECT r2.restaurantid, r2."name" AS "restaurant", b.accountid, rbill.total_due
            FROM (select r.restaurantid, sum(r.price) AS "total_due"
                FROM customerorder c join cart c2 ON c.orderid = c2.orderid 
                    JOIN restaurantmenu r ON c2.menuitemid = r.menuitemid AND c2.restaurantid = r.restaurantid 
                WHERE c.processed = false AND c.customeremail = '${email}'
                GROUP BY r.restaurantid) rbill JOIN restaurant r2 ON rbill.restaurantid = r2.restaurantid
                                            JOIN bank b ON b.accountid = r2.bankaccountid;
        `);
        client.release();
        return {"SQL_success": true, "result": res.rows};
    } catch (error) {
        console.error(error.message);
        return {"SQL_success": false, "error": error.message};
    }
}

async function queryBankAccountsForUserOrder(email) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            SELECT b.accountid, 'User: ' || c.email as "account_name", b.balance
            FROM customer c JOIN bank b ON c.bankaccountid = b.accountid 
                JOIN customerorder c2 ON c2.customeremail = c.email 
            WHERE c2.customeremail = '${email}' AND c2.processed = false
            UNION 
            SELECT b2.accountid, 'Restaurant: ' || r."name" as "account_name", b2.balance
            FROM restaurant r JOIN bank b2 ON r.bankaccountid = b2.accountid
                JOIN (SELECT DISTINCT ON (c1.restaurantid) c1.restaurantid, c1.orderid FROM cart c1) c ON c.restaurantid = r.restaurantid
                JOIN customerorder co ON co.orderid = c.orderid AND co.customeremail = '${email}' AND co.processed = false
            ORDER BY "account_name" DESC;
        `);
        client.release();
        return {"SQL_success": true, "result": res.rows};
    } catch (error) {
        console.error(error.message);
        return {"SQL_success": false, "error": error.message};
    }
}

async function queryDishOrdersByCount() {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            SELECT m."name" AS "dish_name", dishStats.num_orders
            FROM (SELECT c.menuitemid, COUNT(c.menuitemid) AS "num_orders"
                    FROM cart c JOIN customerorder c2 ON c.orderid = c2.orderid
                    WHERE c2.processed = true
                    GROUP BY c.menuitemid
                    ORDER BY "num_orders" DESC) dishStats
                JOIN menuitem m ON m.itemid = dishStats.menuitemid;
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
    updateTipAttribute,
    queryCurrentCart,
    queryCartSubtotal,
    updateBankBalanceAttribute,
    queryMoneyOwedToEachRestauarant,
    queryBankAccountsForUserOrder,
    queryDishOrdersByCount
}