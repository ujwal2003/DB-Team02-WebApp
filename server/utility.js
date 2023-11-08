let crypto = require('crypto');

function getRandomWithinRange(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomString() {
    return crypto.randomBytes(15).toString('hex');
}

module.exports = {
    getRandomWithinRange,
    getRandomString
}