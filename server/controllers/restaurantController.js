const restaurantModel = require('../models/restaurantModel');

async function getRestaurants(req, res) {
    try {
        const restaurants = await restaurantModel.queryWholeRestaurantTable();
        return res.status(200).json(restaurants);
    } catch (error) {
        return res.status(500).json({"error_message": error.message});
    }
}

async function getNumRestaurantDishes(req, res) {
    try {
        const rDishesCount = await restaurantModel.queryRestaurantsDishesCount();
        return res.status(200).json(rDishesCount);
    } catch (error) {
        return res.status(500).json({"error_message": error.message});
    }
}

async function getRestaurantMenu(req, res) {
    try {
        const restaurantID = req.params.id;
        const menu = await restaurantModel.queryMenuOfRestaurant(restaurantID);
        return res.status(200).json(menu);
    } catch (error) {
        return res.status(500).json({"error_message": error.message});
    }
}

async function getMostExpensiveDishForEach(req, res) {
    try {
        const expensiveDishes = await restaurantModel.queryMaxPriceDish();
        return res.status(200).json(expensiveDishes);
    } catch (error) {
        return res.status(500).json({"error_message": error.message});
    }
}

async function getRestaurantWealth(req, res) {
    try {
        const restaurantMoney = await restaurantModel.queryRestaurantsByWealth();
        return res.status(200).json(restaurantMoney);
    } catch (error) {
        return res.status(500).json({"error_message": error.message});
    }
}

async function searchByRestaurantName(req, res) {
    try {
        let {search} = req.body;

        const getRestaurantNames = await restaurantModel.queryRestaurantByName(search);
        if(!getRestaurantNames.SQL_success)
            return res.status(500).json({"success": false, "error": getRestaurantNames.error});

        return res.status(200).json({
            "success": true,
            "result": `retrieved users where last name contains ${search}`,
            "data": getRestaurantNames
        });
    } catch (error) {
        return res.status(500).json({
            "success": false,
            "error": error.message
        });
    }
}

async function getRestaurantsByPopularity(req, res) {
    try {
        const restaurantsList = await restaurantModel.queryRestaurantByOrders();

        if(!restaurantsList.SQL_success)
            return res.status(500).json({"success": false, "error": restaurantsList.error});

        return res.status(200).json({
            "success": true,
            "result": "restrived popular restaurants",
            "data": restaurantsList
        });
    } catch (error) {
        return res.status(500).json({
            "success": false,
            "error": error.message
        });
    }
}

module.exports = {
    getRestaurants,
    getNumRestaurantDishes,
    getRestaurantMenu,
    getMostExpensiveDishForEach,
    getRestaurantWealth,
    searchByRestaurantName,
    getRestaurantsByPopularity
}