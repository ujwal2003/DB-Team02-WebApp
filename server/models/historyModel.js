const {pool} = require('../config/db');

async function queryUserOrders(email) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            SELECT c.orderdate, c.ordertime 
            FROM customerorder c 
            WHERE c.customeremail = '${email}' and c.processed = true
            ORDER BY c.orderdate, c.ordertime;
        `);
        client.release();
        return {"SQL_success": true, "result": res.rows};
    } catch (error) {
        console.log(error.message);
        return {"SQL_success": false, "error": error.message};
    }
}

async function queryUserReceipt(email, orderDate, orderTime) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            SELECT  m."name" as "item_name", r."name" as "restaurant_name", r2.price  
            FROM customerorder c join cart c2 ON c.orderid = c2.orderid
                JOIN menuitem m ON c2.menuitemid = m.itemid
                JOIN restaurant r ON r.restaurantid = c2.restaurantid
                JOIN restaurantmenu r2 ON (r2.restaurantid = c2.restaurantid AND r2.menuitemid = m.itemid)
            WHERE c.customeremail = '${email}' AND c.processed = true
                AND c.orderdate = '${orderDate}' AND c.ordertime = '${orderTime}';
        `);
        client.release();
        return {"SQL_success": true, "result": res.rows};
    } catch (error) {
        console.log(error.message);
        return {"SQL_success": false, "error": error.message};
    }
}

async function queryPaidToRestaurantInOrder(email, orderDate, orderTime) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            SELECT r2.restaurantid, r2."name" AS "restaurant", b.accountid, rbill.total_paid
            FROM (SELECT r.restaurantid, SUM(r.price) AS "total_paid"
                FROM customerorder c JOIN cart c2 ON c.orderid = c2.orderid 
                    JOIN restaurantmenu r ON c2.menuitemid = r.menuitemid AND c2.restaurantid = r.restaurantid 
                WHERE c.processed = true AND c.customeremail = '${email}' AND c.orderdate = '${orderDate}' AND c.ordertime = '${orderTime}' 
                GROUP BY r.restaurantid) rbill JOIN restaurant r2 ON rbill.restaurantid = r2.restaurantid
                                            JOIN bank b ON b.accountid = r2.bankaccountid;
        `);
        client.release();
        return {"SQL_success": true, "result": res.rows};
    } catch (error) {
        console.log(error.message);
        return {"SQL_success": false, "error": error.message};
    }
}

async function queryOrderTotals(email, orderDate, orderTime) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            SELECT SUM(r2.price) as "subtotal", SUM(r2.price) * 0.0825 AS "tax", MAX(c.tip) AS "tip",
                    SUM(r2.price) + (SUM(r2.price)*0.0825) + MAX(c.tip) AS "total" 
            FROM customerorder c JOIN cart c2 ON c.orderid = c2.orderid
                JOIN menuitem m ON c2.menuitemid = m.itemid
                JOIN restaurant r ON r.restaurantid = c2.restaurantid
                JOIN restaurantmenu r2 ON (r2.restaurantid = c2.restaurantid AND r2.menuitemid = m.itemid)
            WHERE c.customeremail = '${email}' AND c.processed = true
                AND c.orderdate = '${orderDate}' AND c.ordertime = '${orderTime}';
        `);
        client.release();
        return {"SQL_success": true, "result": res.rows};
    } catch (error) {
        console.log(error.message);
        return {"SQL_success": false, "error": error.message};
    }
}

module.exports = {
    queryUserOrders,
    queryUserReceipt,
    queryPaidToRestaurantInOrder,
    queryOrderTotals
}