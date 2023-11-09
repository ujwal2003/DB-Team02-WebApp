const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/ordersController');

router.get('/cart_add', ordersController.addToCart);
router.get('/cart_remove', ordersController.removeFromCart);
router.get('/tip', ordersController.addTip);
router.get('/process_order', ordersController.processOrder);

module.exports = router;