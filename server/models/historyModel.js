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

module.exports = {
    queryUserOrders
}