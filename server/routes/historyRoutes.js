const express = require('express');
const router = express.Router();

const historyController = require('../controllers/historyController');

router.get('/get/:email', historyController.getOrdersHistory);
router.get('/member/:email', historyController.getUserMembership);
router.post('/receipt', historyController.getOrderReceipt);
router.post('/payments', historyController.getPaymentToEachRestaurant);
router.post('/totals', historyController.getOrderTotals);

module.exports = router;