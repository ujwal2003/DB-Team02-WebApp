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

module.exports = {
    getRestaurants,
    getNumRestaurantDishes,
    getRestaurantMenu
}