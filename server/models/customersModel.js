const {pool} = require("../config/db");

async function queryCustomersTable() {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            SELECT * FROM customer;
        `);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error.message);
    }
}

async function insertNewCustomer(email, pin, fname, lname, phone, zip, bankAccountID, balance) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            BEGIN;
            INSERT INTO bank (accountID, balance)
            VALUES
            ('${bankAccountID}', ${balance});

            INSERT INTO customer (email, pin, firstName, lastName, phone, zipcode, membership, bankAccountID)
            VALUES
            ('${email}', ${pin}, '${fname}', '${lname}', ${phone}, ${zip}, 'yes', '${bankAccountID}');
            COMMIT;
        `);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error.message);
    }
}

async function queryUserEmail(email) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            SELECT email
            FROM customer c
            WHERE c.email = '${email}';
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
            SELECT email, firstname, lastname, phone, zipcode, membership
            FROM customer c
            WHERE c.email = '${email}' AND c.pin = ${pin} AND c.active = 'yes';
        `);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error.message);
    }
}

async function queryUserPaymentInfo(email) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            SELECT p.cardname, p.cardnumber, p.cvv, p.expiration
            FROM paymentinformation p 
            WHERE p.customeremail = '${email}';
        `);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error.message);
    }
}

async function insertNewPaymentInfo(customerEmail, cardNumber, cvv, cardName, expiration) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            BEGIN;
            INSERT INTO paymentinformation (customerEmail, cardNumber, cvv, cardName, expiration)
            VALUES
            ('${customerEmail}', '${cardNumber}', '${cvv}', '${cardName}', '${expiration}');
            COMMIT;
        `);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error);
    }
}

async function updateCustomer(oldEmail, newEmail, pin, fname, lname, phone, membership, zip) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            BEGIN;
            UPDATE customer 
            SET email = '${newEmail}',
                pin = ${pin},
                firstname = '${fname}',
                lastname = '${lname}',
                phone = '${phone}',
                membership = '${membership}',
                zipcode = ${zip}
            WHERE email = '${oldEmail}';

            UPDATE paymentinformation 
            SET customeremail = '${newEmail}'
            WHERE customeremail = '${oldEmail}';
            COMMIT;
        `);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error.message);
    }
}

async function updateUserPaymentInfo(customerEmail, cardNumber, cvv, cardName, expiration) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            BEGIN;
            UPDATE paymentinformation 
            SET cardnumber = '${cardNumber}',
                cvv = ${cvv},
                cardname = '${cardName}',
                expiration = '${expiration}'
            WHERE customeremail = '${customerEmail}';
            COMMIT;
        `);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error.message);
    }
}

async function queryByLastNameSearch(searchTerm) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            SELECT email, firstname, lastname, c.phone
            FROM customer c
            WHERE c.lastname LIKE '${searchTerm}%' OR c.lastname LIKE '%${searchTerm}' OR c.lastname LIKE '%${searchTerm}%';
        `);
        client.release();
        return {"SQL_success": true, "result": res.rows};
    } catch (error) {
        console.error(error.message);
        return {"SQL_success": false, "error": error.message};
    }
}
async function queryCustomerInfo(lastName) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            SELECT email, firstname, lastname, phone, zipcode, membership
            FROM customer c
            WHERE c.lastname LIKE '${lastName}%'
                OR c.lastname LIKE '%${lastName}'
                OR c.lastname LIKE '%${lastName}%';
        `);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = {
    insertNewCustomer,
    queryUserEmail,
    queryUserInfo,
    queryUserPaymentInfo,
    insertNewPaymentInfo,
    updateCustomer,
    updateUserPaymentInfo,
    queryCustomersTable,
    queryByLastNameSearch,
    queryCustomerInfo
}