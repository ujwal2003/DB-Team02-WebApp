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
            SELECT  m."name", r."name", r2.price  
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

module.exports = {
    queryUserOrders,
    queryUserReceipt
}