const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.post("/register", customerController.registerNewUser);
router.post("/login", customerController.validateSignIn);
router.post("/card", customerController.getUserPaymentInfo);
router.post("/set_card", customerController.setUserPaymentInfo);
router.post("/profile", customerController.updateUserAccount);
router.post("/new_card", customerController.updateUserPaymentInfo);
router.get("/all", customerController.getAllCustomers);
router.post("/search", customerController.searchByUserLastName);
router.get("/user/:lastName", customerController.getUserInfo);

module.exports = router;