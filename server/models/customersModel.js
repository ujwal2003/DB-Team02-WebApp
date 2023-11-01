const {pool} = require("../config/db");

async function insertNewCustomer(pin, fname, lname, email, phone) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            BEGIN;
            INSERT INTO customer (pin, firstName, lastName, email, phone)
            VALUES
            (${pin}, '${fname}', '${lname}', '${email}', '${phone}');
            COMMIT;
        `);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = {
    insertNewCustomer
}