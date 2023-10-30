DROP TABLE IF EXISTS Customer;
DROP TABLE IF EXISTS PaymentInformation;
DROP TABLE IF EXISTS Membership;
DROP TABLE IF EXISTS Restaurant;
DROP TABLE IF EXISTS Order;
DROP TABLE IF EXISTS MenuItem;
DROP TABLE IF EXISTS Cart;

CREATE TABLE Customer (
    customerID INT PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255),
    phone INT
);

CREATE TABLE PaymentInformation (
    paymentID INT PRIMARY KEY,
    customerID INT,
    cardNumber INT,
    cvv INT,
    cardName VARCHAR(255),
    expiration DATE
);

CREATE TABLE Restaurant (
    restaurantID INT PRIMARY KEY,
    name VARCHAR(255),
    phone VARCHAR(10),
    street VARCHAR(255),
    revenue FLOAT
);

INSERT INTO Restaurant (restaurantID, name, phone, street, revenue)
VALUES
(1, 'The Rustic Table', '6005103401', 'Willowbrook Lane', 0.00),
(2, 'Savory Bites Cafe', '2276164313', 'Maplecrest Drive', 0.00),
(3, 'Flavor Fusion Grill', '5076099924', 'Skylark Avenue', 0.00),
(4, 'La Petite Boulangerie', '3816850026', 'Quail Ridge Road', 0.00),
(5, 'Spice Street Kitchen', '5851822528', 'Bluebell Lane', 0.00),
(6, 'Oceanview Oyster House', '9443488937', 'Elmwood Way', 0.00),
(7, 'The Cozy Corner Cafe', '6455706792', 'Cedar Ridge Lane', 0.00),
(8, 'Urban Grill & Bar', '8565650149', 'Oakdale Boulevard', 0.00),
(9, 'Pizzeria Bella Napoli', '4513710890', 'Sunflower Street', 0.00),
(10, 'Sushi Haven Express', '6475656533', 'Meadowview Terrace', 0.00);


CREATE TABLE Membership (
    membershipID INT PRIMARY KEY,
    customerID INT,
    restaurantID INT,
    firstDate DATE,
    endDate DATE
);

CREATE TABLE MenuItem (
    itemID INT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    restaurantID INT,
    price DECIMAL(6, 2)
);

CREATE TABLE RestaurantOrder (
    orderID INT PRIMARY KEY,
    customerID INT,
    orderDate DATE,
    total DECIMAL(10, 2)
);

CREATE TABLE Cart (
    cartItemID INT PRIMARY KEY,
    orderID INT,
    menuItemID INT,
    quantity INT,
    subtotal DECIMAL(10, 2)
);