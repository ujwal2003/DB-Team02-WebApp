const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.get("/all", restaurantController.getRestaurants);
router.get("/menu/:id", restaurantController.getRestaurantMenu);
router.get("/dishes", restaurantController.getNumRestaurantDishes);
router.get("/expensive", restaurantController.getMostExpensiveDishForEach);
router.get("/wealth", restaurantController.getRestaurantWealth);
router.post("/search", restaurantController.searchByRestaurantName);
router.get("/popular", restaurantController.getRestaurantsByPopularity);

module.exports = router;