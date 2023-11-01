const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.get("/all", restaurantController.getRestaurants);
router.get("/menu/:id", restaurantController.getRestaurantMenu);
router.get("/dishes", restaurantController.getNumRestaurantDishes);

module.exports = router;