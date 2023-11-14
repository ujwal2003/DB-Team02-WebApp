const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/ordersController');

router.post('/add', ordersController.addToCart);
router.delete('/remove', ordersController.removeFromCart);
router.patch('/tip', ordersController.addTip);
router.post('/load', ordersController.getUnprocessedUserCart);
router.post('/get', ordersController.getUnprocessedUserOrder);

module.exports = router;