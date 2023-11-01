DROP TABLE IF EXISTS Customer;
DROP TABLE IF EXISTS PaymentInformation;
DROP TABLE IF EXISTS Membership;
DROP TABLE IF EXISTS Restaurant;
DROP TABLE IF EXISTS CustomerOrder;
DROP TABLE IF EXISTS MenuItem;
DROP TABLE IF EXISTS RestaurantMenu;
DROP TABLE IF EXISTS Cart;

CREATE TABLE Customer (
    customerID SERIAL PRIMARY KEY,
    pin INT,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(10)
);

INSERT INTO Customer (pin, firstName, lastName, email, phone)
VALUES
(7483, 'Emily', 'Smith', 'EmilySmith@email.com', '8043249351'),
(3269, 'Daniel', 'Johnson', 'DanielJohnson@email.com', '8247179073'),
(5821, 'Olivia', 'Davis', 'OliviaDavis@email.com', '7828849261'),
(9174, 'James', 'Wilson', 'JamesWilson@email.com', '4058399655'),
(4036, 'Sophia', 'Martinez', 'SophiaMartinez@email.com', '5233062438'),
(1598, 'Liam', 'Brown', 'LiamBrown@email.com', '3487579753'),
(6742, 'Ava', 'Taylor', 'AvaTaylor@email.com', '7527147318'),
(2357, 'Benjamin', 'Clark', 'BenjaminClark@example.com', '2580205071'),
(8690, 'Mia', 'Anderson', 'MiaAnderson@email.com', '7860639929'),
(5102, 'Ethan', 'Walker', 'EthanWalker@email.com', '7678716663');

CREATE TABLE PaymentInformation (
    paymentID SERIAL PRIMARY KEY,
    customerID INT,
    cardNumber VARCHAR(16),
    cvv INT,
    cardName VARCHAR(255),
    expiration DATE
);

INSERT INTO PaymentInformation (customerID, cardNumber, cvv, cardName, expiration)
VALUES
(1, '7231272255903891', 783, 'Emily', '2026-08-11'),
(2, '3517476411701086', 369, 'Daniel', '2026-05-10'),
(3, '3868508863048841', 809, 'Olivia', '2027-04-12'),
(4, '8123178976635282', 488, 'James', '2025-03-22'),
(5, '1980717361933340', 536, 'Sophia', '2028-08-30'),
(6, '1224560335103328', 313, 'Liam', '2026-02-16'),
(7, '8215849522893525', 920, 'Ava', '2025-03-18'),
(8, '5285900679883301', 221, 'Benjamin', '2024-05-15'),
(9, '8462496026328840', 513, 'Mia', '2026-06-12'),
(10, '6415187195548769', 652, 'Ethan', '2027-03-25');

CREATE TABLE Restaurant (
    restaurantID SERIAL PRIMARY KEY,
    name VARCHAR(255),
    phone VARCHAR(10),
    street VARCHAR(255),
    revenue FLOAT
);

INSERT INTO Restaurant (name, phone, street, revenue)
VALUES
('The Rustic Table', '6005103401', 'Willowbrook Lane', 0.00),
('Savory Bites Cafe', '2276164313', 'Maplecrest Drive', 0.00),
('Flavor Fusion Grill', '5076099924', 'Skylark Avenue', 0.00),
('La Petite Boulangerie', '3816850026', 'Quail Ridge Road', 0.00),
('Spice Street Kitchen', '5851822528', 'Bluebell Lane', 0.00),
('Oceanview Oyster House', '9443488937', 'Elmwood Way', 0.00),
('The Cozy Corner Cafe', '6455706792', 'Cedar Ridge Lane', 0.00),
('Urban Grill & Bar', '8565650149', 'Oakdale Boulevard', 0.00),
('Pizzeria Bella Napoli', '4513710890', 'Sunflower Street', 0.00),
('Sushi Haven Express', '6475656533', 'Meadowview Terrace', 0.00);


CREATE TABLE Membership (
    membershipID SERIAL PRIMARY KEY,
    customerID INT,
    restaurantID INT,
    firstDate DATE,
    endDate DATE
);

INSERT INTO Membership (customerID, restaurantID, firstDate, endDate)
VALUES
(4, 2, '2025-02-22', '2025-04-22'),
(1, 7, '2025-11-11', '2026-01-11'),
(9, 6, '2028-07-11', '2028-09-11'),
(8, 9, '2024-12-18', '2025-02-18'),
(6, 1, '2026-07-31', '2026-09-30');

CREATE TABLE MenuItem (
    itemID SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT
);

INSERT INTO MenuItem (name, description)
VALUES
('Hawaiian Pizza', 'A pizza topped with ham, pineapple, and mozzarella cheese, offering a sweet and savory combination.'),
('Rustic Truffle Mac n Cheese', 'Creamy macaroni and cheese infused with truffle oil, topped with crispy bacon bits and fresh chives'),
('Savory Spinach Stuffed Chicken', 'Tender chicken breasts stuffed with a flavorful spinach and feta cheese blend, served with garlic mashed potatoes and asparagus.'),
('Mango Tango Shrimp Tacos', 'Grilled shrimp marinated in zesty mango sauce, served in soft corn tortillas with a refreshing avocado and mango salsa.'),
('Spicy Thai Basil Noodles', 'Stir-fried rice noodles with minced chicken, Thai basil, and fiery chili sauce.'),
('Mediterranean Quinoa Salad', 'A wholesome blend of quinoa, cherry tomatoes, cucumbers, Kalamata olives, and feta cheese, drizzled with a lemon herb dressing.'),
('Tandoori Tofu Skewers', 'A wholesome blend of quinoa, cherry tomatoes, cucumbers, Kalamata olives, and feta cheese, drizzled with a lemon herb dressing.'),
('Beef and Broccoli Stir-Fry', 'Sliced beef and broccoli florets wok-tossed in a savory ginger-soy sauce, served over steamed jasmine rice.'),
('Creamy Lobster Bisque', 'Rich and velvety lobster bisque, garnished with a dollop of sour cream and fresh chives.'),
('Vegetable Tikka Masala', 'A vibrant vegetarian dish featuring roasted mixed vegetables in a creamy tomato and coconut curry sauce, served with basmati rice.'),
('Crispy Panko-Crusted Salmon', 'Salmon fillet coated in seasoned panko breadcrumbs and baked until golden brown, served with lemon butter sauce and garlic mashed potatoes.'),
('Caprese Panini', 'A classic Italian sandwich filled with ripe tomatoes, fresh mozzarella, basil leaves, and a drizzle of balsamic glaze, pressed in crispy ciabatta.'),
('Greek Souvlaki Platter', 'Grilled marinated chicken skewers, served with fluffy pita bread, Tzatziki sauce, and a Greek salad.'),
('Cajun Jambalaya', 'A spicy blend of Andouille sausage, shrimp, and chicken simmered with bell peppers, onions, and rice in a Cajun tomato sauce.'),
('Raspberry Almond Tart', 'A delicate almond pastry crust filled with luscious raspberry preserves and topped with toasted almond slivers.'),
('Balsamic Glazed Portobello Mushrooms', 'Roasted portobello mushrooms drizzled with a sweet balsamic reduction and served with garlic parmesan mashed potatoes.'),
('Southwest Black Bean Salad', 'A zesty salad featuring black beans, corn, avocado, and cherry tomatoes, tossed in a cilantro-lime dressing.'),
('Penne alla Vodka', 'Penne pasta in a creamy tomato and vodka sauce, sprinkled with fresh basil and grated Parmesan cheese.'),
('Spinach and Artichoke Stuffed Mushrooms', 'Mushroom caps filled with a creamy spinach and artichoke dip, baked until bubbly and golden.'),
('Hawaiian Poke Bowl', 'A fresh and healthy bowl with diced ahi tuna, avocado, cucumber, and mango over sushi rice, drizzled with soy ginger dressing.'),
('Eggplant Parmesan', 'Slices of breaded and fried eggplant layered with marinara sauce and mozzarella cheese, served with spaghetti.'),
('Blackberry Mascarpone Crepes', 'Thin crepes filled with sweet mascarpone cheese and fresh blackberries, dusted with powdered sugar.'),
('Vegan Chickpea Curry', 'A hearty chickpea curry with a blend of aromatic spices, served with basmati rice and naan bread.'),
('Apple Cinnamon Bread Pudding', 'Warm and comforting bread pudding with layers of cinnamon-spiced apples, topped with a vanilla bourbon sauce.'),
('Chocolate Lava Cake', 'A decadent dessert with a warm, molten chocolate center, dusted with powdered sugar and served with a scoop of vanilla ice cream.'),
('Crispy Duck Confit', 'Duck leg slow-cooked until tender and then crisped to perfection, served with a cherry red wine reduction and sweet potato puree.'),
('Veggie Lovers Pizza', 'A thin-crust pizza topped with a colorful medley of roasted vegetables, mozzarella cheese, and a pesto drizzle.'),
('Stuffed Bell Peppers', 'Bell peppers filled with a savory mixture of ground beef, rice, tomatoes, and herbs, baked to perfection and topped with melted cheese.'),
('Blueberry Pancake Stack', 'A tall stack of fluffy blueberry pancakes, topped with a dollop of whipped cream and drizzled with warm maple syrup.'),
('Pineapple Upside-Down Cake', 'A classic dessert with caramelized pineapple rings and maraschino cherries atop a moist, buttery cake, served warm with a scoop of vanilla ice cream.');

CREATE TABLE RestaurantMenu (
    restaurantID INT,
    menuItemID INT,
    price DECIMAL(6, 2),
    PRIMARY KEY (restaurantID, MenuItemID)
);

INSERT INTO RestaurantMenu (restaurantID, menuItemID, price)
VALUES
(5, 17, 3.14),
(3, 22, 7.29),
(5, 22, 5.29),
(8, 11, 2.75),
(2, 29, 9.50),
(6, 4, 1.23),
(9, 14, 5.67),
(4, 26, 8.89),
(7, 8, 4.50),
(10, 16, 6.75),
(1, 21, 2.33),
(6, 5, 3.75),
(3, 19, 6.01),
(7, 19, 8.25),
(9, 25, 8.50),
(2, 7, 4.88),
(8, 13, 1.99),
(5, 23, 9.25),
(7, 3, 7.50),
(10, 12, 2.15),
(1, 28, 5.50),
(4, 9, 3.33);

CREATE TABLE CustomerOrder (
    orderID SERIAL PRIMARY KEY,
    customerID INT,
    orderDate DATE,
    total DECIMAL(10, 2)
);

CREATE TABLE Cart (
    cartItemID SERIAL PRIMARY KEY,
    orderID INT,
    menuItemID INT,
    quantity INT,
    subtotal DECIMAL(10, 2)
);