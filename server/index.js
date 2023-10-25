const data = require('./creds.json');
const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({"message": "hello, world"});
});

app.listen(data.port, () => {
    console.log(`connected to server on port ${data.port}.`);
});