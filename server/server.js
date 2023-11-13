const express = require('express');
const {dbInitializer} = require('./config/db');

const app = express();
app.use(express.json());
const port = 8080;

let cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({"message": `server running on port ${port}`});
});

app.get('/init', dbInitializer);

// routes
const restaurantRouter = require('./routes/restaurantRoutes');
app.use("/restaurants", restaurantRouter);

const customersRouter = require('./routes/customersRoutes');
app.use("/customers", customersRouter);

const ordersRouter = require('./routes/ordersRoutes');
app.use("/order", ordersRouter);

// start server
app.listen(port, () => {
    console.log(`connected to server on port ${port}.`);
});