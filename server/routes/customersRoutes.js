const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.post("/register", customerController.registerNewUser);
router.post("/login", customerController.validateSignIn);

module.exports = router;