const express = require('express');
const router = express.Router();

const historyController = require('../controllers/historyController');

router.get('/get/:email', historyController.getOrdersHistory);
router.post('/receipt', historyController.getOrderReceipt);

module.exports = router;