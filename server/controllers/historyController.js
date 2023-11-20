const historyModel = require('../models/historyModel');

async function getOrdersHistory(req, res) {
    try {
        let email = req.params['email'];
        const ordersList = await historyModel.queryUserOrders(email);

        if(!ordersList.SQL_success)
            return res.status(500).json({"success": false, "error": ordersList.error});

        return res.status(200).json({
            "success": true,
            "result": `retrieved processed orders of ${email}`,
            "data": ordersList
        });
    } catch (error) {
        return res.status(500).json({
            "success": false,
            "error": error.message
        });
    }
}

module.exports = {
    getOrdersHistory
}