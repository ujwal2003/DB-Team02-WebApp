const {pool} = require('../config/db');

async function queryWholeRestaurantTable() {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            SELECT * FROM restaurant r
            ORDER BY r.restaurantid;
        `);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error.message);
    }
}

async function queryRestaurantsDishesCount() {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            SELECT r.restaurantid, r."name", COUNT(*) AS "dishes"
            FROM restaurant r JOIN menuitem m ON r.restaurantid = m.restaurantid 
            GROUP BY r.restaurantid
            ORDER BY r.restaurantid;
        `);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error.message);
    }
}

async function queryMenuOfRestaurant(restaurantID) {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            SELECT r.restaurantid, r."name" AS "restaurant_name", m.itemid, m."name" AS "item", m.price 
            FROM restaurant r JOIN menuitem m ON r.restaurantid = m.restaurantid
            WHERE r.restaurantid = ${restaurantID};
        `);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = {
    queryWholeRestaurantTable,
    queryRestaurantsDishesCount,
    queryMenuOfRestaurant
}