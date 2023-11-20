const express = require('express');
const router = express.Router();

const historyController = require('../controllers/historyController');

router.get('/get/:email', historyController.getOrdersHistory);

module.exports = router;