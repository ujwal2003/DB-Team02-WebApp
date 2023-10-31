const Pool = require('pg').Pool;
const creds = require('./creds.json');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    user: creds.user,
    password: creds.password,
    host: creds.host,
    port: creds.port,
    database: creds.database
});

async function dbInitializer(req, res) {
    try {
        const queries = fs.readFileSync(path.join(__dirname, 'setup.sql'), 'utf-8');

        const client = await pool.connect();
        const response = await client.query(queries, (err, result) => {
            if(err) {
                return res.status(500).json({"sql_error_message": err});
            }
        });
        client.release();

        return res.status(200).send('succesfully initialized database.');
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({"status": "failed to initialize database", "error_message": error.message});
    }
}

module.exports = {
    pool,
    dbInitializer
};