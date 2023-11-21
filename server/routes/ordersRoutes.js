const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/ordersController');

router.post('/add', ordersController.addToCart);
router.delete('/remove', ordersController.removeFromCart);
router.patch('/tip', ordersController.addTip);
router.post('/load', ordersController.getUnprocessedUserCart);
router.post('/get', ordersController.getUnprocessedUserOrder);
router.post('/subtotal', ordersController.getUserOrderSubtotal);
router.patch('/checkout', ordersController.processOrder);
router.get('/details/:email', ordersController.getOrderDetails);
router.get('/banks/:email', ordersController.getOrderBankAccounts);
router.get('/popular', ordersController.getMostPopularDishes);

module.exports = router;