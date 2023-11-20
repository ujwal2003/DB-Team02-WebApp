const historyModel = require('../models/historyModel');

async function getOrdersHistory(req, res) {
    try {
        let email = req.params['email'];
        const ordersList = await historyModel.queryUserOrders(email);

        if(!ordersList.SQL_success)
            return res.status(500).json({"success": false, "error": ordersList.error});

        ordersList.result.map((elm) => {
            let elmDate = new Date(elm['orderdate']);
            const formatDigit = (x) => x.toString().length === 1 ? '0' + x.toString() : x.toString();

            return elm['orderdate'] = `${elmDate.getFullYear()}-${formatDigit(elmDate.getMonth())}-${formatDigit(elmDate.getDate())}`;
        });

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