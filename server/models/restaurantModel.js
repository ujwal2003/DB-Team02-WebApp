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
            SELECT r.restaurantid, r."name" , COUNT(r2.menuitemid)
            from restaurant r join restaurantmenu r2 on r.restaurantid = r2.restaurantid
            group by r.restaurantid
            order by r.restaurantid;
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
            select m.name, r.price, m.description
            from restaurantmenu r join menuitem m on r.menuitemid = m.itemid
            where r.restaurantid = ${restaurantID};
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