const express = require('express');

const app = express();
app.use(express.json());
const port = 8080;

app.get('/', (req, res) => {
    res.status(200).json({"message": `server running on port ${port}`});
});

app.listen(port, () => {
    console.log(`connected to server on port ${port}.`);
});