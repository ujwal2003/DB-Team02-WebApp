const {pool} = require("../config/db");

async function insertNewCustomer(email, pin, fname, lname, phone) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            BEGIN;
            INSERT INTO customer (email, pin, firstName, lastName, phone)
            VALUES
            ('${email}', ${pin}, '${fname}', '${lname}', '${phone}');
            COMMIT;
        `);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error.message);
    }
}

async function queryUserInfo(email, pin) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            SELECT email, firstname, lastname, phone
            FROM customer c
            WHERE c.email = '${email}' AND c.pin = ${pin};
        `);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = {
    insertNewCustomer,
    queryUserInfo
}