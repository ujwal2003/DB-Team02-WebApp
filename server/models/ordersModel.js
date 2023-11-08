const {pool} = require("../config/db");

async function queryExistingCustomerOrder(email) {
    //TODO implementation
}

async function queryExistingCartItem(orderID, itemID) {
    //TODO implementation
}

async function insertItemIntoCart(orderID, itemID, price) {
    //TODO implementation
}

async function insertNewUserOrder(email) {
    //TODO implementation
}

async function updateOrderWithTip(orderID, tip) {
    //TODO implementation
}

async function validatePaymentMethod(email, cardNumber, zipCode) {
    //TODO implementation
}

async function queryUserBankAccount(email) {
    //TODO implementation
}

async function queryRestaurantBankAccount(restaurantID) {
    //TODO implementation
}

async function updateBankAndOrder(userBankID, restaurantBankID, userPayment, restaurantGain, orderID) {
    //TODO implementation
}

module.exports = {
    queryExistingCustomerOrder,
    queryExistingCartItem,
    insertItemIntoCart,
    insertNewUserOrder,
    updateOrderWithTip,
    validatePaymentMethod,
    queryUserBankAccount,
    queryRestaurantBankAccount,
    updateBankAndOrder
}