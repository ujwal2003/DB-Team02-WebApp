const express = require("express");
const router = express.Router();
//TODO import customers controller

router.post("/register", async(req, res) => {
    return res.status(201).send(req.body);
});

module.exports = router;