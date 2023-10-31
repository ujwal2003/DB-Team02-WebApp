DROP TABLE IF EXISTS Customer;
DROP TABLE IF EXISTS PaymentInformation;
DROP TABLE IF EXISTS Membership;
DROP TABLE IF EXISTS Restaurant;
DROP TABLE IF EXISTS CustomerOrder;
DROP TABLE IF EXISTS MenuItem;
DROP TABLE IF EXISTS Cart;

CREATE TABLE Customer (
    customerID INT PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(10)
);

INSERT INTO Customer (customerID, firstName, lastName, email, phone)
VALUES
(1, 'Emily', 'Smith', 'EmilySmith@email.com', '8043249351'),
(2, 'Daniel', 'Johnson', 'DanielJohnson@email.com', '8247179073'),
(3, 'Olivia', 'Davis', 'OliviaDavis@email.com', '7828849261'),
(4, 'James', 'Wilson', 'JamesWilson@email.com', '4058399655'),
(5, 'Sophia', 'Martinez', 'SophiaMartinez@email.com', '5233062438'),
(6, 'Liam', 'Brown', 'LiamBrown@email.com', '3487579753'),
(7, 'Ava', 'Taylor', 'AvaTaylor@email.com', '7527147318'),
(8, 'Benjamin', 'Clark', 'BenjaminClark@example.com', '2580205071'),
(9, 'Mia', 'Anderson', 'MiaAnderson@email.com', '7860639929'),
(10, 'Ethan', 'Walker', 'EthanWalker@email.com', '7678716663');

CREATE TABLE PaymentInformation (
    paymentID INT PRIMARY KEY,
    customerID INT,
    cardNumber VARCHAR(16),
    cvv INT,
    cardName VARCHAR(255),
    expiration DATE
);

INSERT INTO PaymentInformation (paymentID, customerID, cardNumber, cvv, cardName, expiration)
VALUES
(1, 1, '7231272255903891', 783, 'Emily', '2026-08-11'),
(2, 2, '3517476411701086', 369, 'Daniel', '2026-05-10'),
(3, 3, '3868508863048841', 809, 'Olivia', '2027-04-12'),
(4, 4, '8123178976635282', 488, 'James', '2025-03-22'),
(5, 5, '1980717361933340', 536, 'Sophia', '2028-08-30'),
(6, 6, '1224560335103328', 313, 'Liam', '2026-02-16'),
(7, 7, '8215849522893525', 920, 'Ava', '2025-03-18'),
(8, 8, '5285900679883301', 221, 'Benjamin', '2024-05-15'),
(9, 9, '8462496026328840', 513, 'Mia', '2026-06-12'),
(10, 10, '6415187195548769', 652, 'Ethan', '2027-03-25');

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

INSERT INTO Membership (membershipID, customerID, restaurantID, firstDate, endDate)
VALUES
(1, 4, 2, '2025-02-22', '2025-04-22'),
(2, 1, 7, '2025-11-11', '2026-01-11'),
(3, 9, 6, '2028-07-11', '2028-09-11'),
(4, 8, 9, '2024-12-18', '2025-02-18'),
(5, 6, 1, '2026-07-31', '2026-09-30');

CREATE TABLE MenuItem (
    itemID INT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    restaurantID INT,
    price DECIMAL(6, 2)
);

INSERT INTO MenuItem (itemID, name, description, restaurantID, price)
VALUES
(1, 'Hawaiian Pizza', 'A pizza topped with ham, pineapple, and mozzarella cheese, offering a sweet and savory combination.', 1, 44.36),
(2, 'Rustic Truffle Mac n Cheese', 'Creamy macaroni and cheese infused with truffle oil, topped with crispy bacon bits and fresh chives', 1, 16.50),
(3, 'Savory Spinach Stuffed Chicken', 'Tender chicken breasts stuffed with a flavorful spinach and feta cheese blend, served with garlic mashed potatoes and asparagus.', 6, 18.99),
(4, 'Mango Tango Shrimp Tacos', 'Grilled shrimp marinated in zesty mango sauce, served in soft corn tortillas with a refreshing avocado and mango salsa.', 3, 14.95),
(5, 'Spicy Thai Basil Noodles', 'Stir-fried rice noodles with minced chicken, Thai basil, and fiery chili sauce.', 7, 12.99),
(6, 'Mediterranean Quinoa Salad', 'A wholesome blend of quinoa, cherry tomatoes, cucumbers, Kalamata olives, and feta cheese, drizzled with a lemon herb dressing.', 4, 11.75),
(7, 'Tandoori Tofu Skewers', 'A wholesome blend of quinoa, cherry tomatoes, cucumbers, Kalamata olives, and feta cheese, drizzled with a lemon herb dressing.', 10, 15.99),
(8, 'Beef and Broccoli Stir-Fry', 'Sliced beef and broccoli florets wok-tossed in a savory ginger-soy sauce, served over steamed jasmine rice.', 4, 14.25),
(9, 'Creamy Lobster Bisque', 'Rich and velvety lobster bisque, garnished with a dollop of sour cream and fresh chives.', 6, 22.50),
(10, 'Vegetable Tikka Masala', 'A vibrant vegetarian dish featuring roasted mixed vegetables in a creamy tomato and coconut curry sauce, served with basmati rice.', 2, 13.99),
(11, 'Crispy Panko-Crusted Salmon', 'Salmon fillet coated in seasoned panko breadcrumbs and baked until golden brown, served with lemon butter sauce and garlic mashed potatoes.', 8, 19.95),
(12, 'Caprese Panini', 'A classic Italian sandwich filled with ripe tomatoes, fresh mozzarella, basil leaves, and a drizzle of balsamic glaze, pressed in crispy ciabatta.', 7, 10.50),
(13, 'Greek Souvlaki Platter', 'Grilled marinated chicken skewers, served with fluffy pita bread, Tzatziki sauce, and a Greek salad.', 1, 10.50),
(14, 'Cajun Jambalaya', 'A spicy blend of Andouille sausage, shrimp, and chicken simmered with bell peppers, onions, and rice in a Cajun tomato sauce.', 5, 16.99),
(15, 'Raspberry Almond Tart', 'A delicate almond pastry crust filled with luscious raspberry preserves and topped with toasted almond slivers.', 9, 8.75),
(16, 'Balsamic Glazed Portobello Mushrooms', 'Roasted portobello mushrooms drizzled with a sweet balsamic reduction and served with garlic parmesan mashed potatoes.', 3, 14.25),
(17, 'Southwest Black Bean Salad', 'A zesty salad featuring black beans, corn, avocado, and cherry tomatoes, tossed in a cilantro-lime dressing.', 6, 11.50),
(18, 'Penne alla Vodka', 'Penne pasta in a creamy tomato and vodka sauce, sprinkled with fresh basil and grated Parmesan cheese.', 7, 12.99),
(19, 'Spinach and Artichoke Stuffed Mushrooms', 'Mushroom caps filled with a creamy spinach and artichoke dip, baked until bubbly and golden.', 1, 13.25),
(20, 'Hawaiian Poke Bowl', 'A fresh and healthy bowl with diced ahi tuna, avocado, cucumber, and mango over sushi rice, drizzled with soy ginger dressing.', 8, 16.95),
(21, 'Eggplant Parmesan', 'Slices of breaded and fried eggplant layered with marinara sauce and mozzarella cheese, served with spaghetti.', 6, 14.75),
(22, 'Blackberry Mascarpone Crepes', 'Thin crepes filled with sweet mascarpone cheese and fresh blackberries, dusted with powdered sugar.', 1, 10.99),
(23, 'Vegan Chickpea Curry', 'A hearty chickpea curry with a blend of aromatic spices, served with basmati rice and naan bread.', 2, 12.50),
(24, 'Apple Cinnamon Bread Pudding', 'Warm and comforting bread pudding with layers of cinnamon-spiced apples, topped with a vanilla bourbon sauce.', 5, 9.99),
(25, 'Chocolate Lava Cake', 'A decadent dessert with a warm, molten chocolate center, dusted with powdered sugar and served with a scoop of vanilla ice cream.', 4, 8.99),
(26, 'Crispy Duck Confit', 'Duck leg slow-cooked until tender and then crisped to perfection, served with a cherry red wine reduction and sweet potato puree.', 5, 22.99),
(27, 'Veggie Lovers Pizza', 'A thin-crust pizza topped with a colorful medley of roasted vegetables, mozzarella cheese, and a pesto drizzle.', 3, 16.25),
(28, 'Stuffed Bell Peppers', 'Bell peppers filled with a savory mixture of ground beef, rice, tomatoes, and herbs, baked to perfection and topped with melted cheese.', 1, 14.50),
(29, 'Blueberry Pancake Stack', 'A tall stack of fluffy blueberry pancakes, topped with a dollop of whipped cream and drizzled with warm maple syrup.', 2, 10.25),
(30, 'Pineapple Upside-Down Cake', 'A classic dessert with caramelized pineapple rings and maraschino cherries atop a moist, buttery cake, served warm with a scoop of vanilla ice cream.', 3, 9.50);

CREATE TABLE CustomerOrder (
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