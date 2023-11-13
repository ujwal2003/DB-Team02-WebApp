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
            select m.name, r.price, m.type, m.description, m.itemid, r.restaurantid
            from restaurantmenu r join menuitem m on r.menuitemid = m.itemid
            where r.restaurantid = ${restaurantID};
        `);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error.message);
    }
}

async function queryMaxPriceDish() {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            select r2.restaurantid, res.name as "restaurant_name", mi.name as "dish_name", mi.itemid as "dish_id", maxPrice.price
            from (select r.restaurantid, MAX(r.price) as "price"
                    from restaurantmenu r
                    group by r.restaurantid) maxPrice, restaurantmenu r2, menuitem mi, restaurant res
            where maxPrice.price = r2.price and maxPrice.restaurantid = r2.restaurantid
                    and r2.menuitemid = mi.itemid and res.restaurantid = r2.restaurantid
            order by restaurantid;
        `);
        client.release();
        return res.rows;
    } catch (error) {
        console.error(error.message);
    }
}

async function queryRestaurantsByWealth() {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            select r.restaurantid, r."name", b.balance as "wealth"
            from restaurant r join bank b on r.bankaccountid = b.accountid
            order by b.balance;
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
    queryMenuOfRestaurant,
    queryMaxPriceDish,
    queryRestaurantsByWealth
}