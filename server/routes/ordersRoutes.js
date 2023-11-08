const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/ordersController');

router.get('/cart', ordersController.addToCart);
router.get('/tip', ordersController.addTip);
router.get('/process_order', ordersController.processOrder);

module.exports = router;