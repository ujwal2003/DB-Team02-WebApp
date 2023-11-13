const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/ordersController');

router.post('/add', ordersController.addToCart);

module.exports = router;