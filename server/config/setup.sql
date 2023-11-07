DROP TABLE IF EXISTS Customer;
DROP TABLE IF EXISTS PaymentInformation;
DROP TABLE IF EXISTS Bank;
DROP TABLE IF EXISTS Restaurant;
DROP TABLE IF EXISTS CustomerOrder;
DROP TABLE IF EXISTS MenuItem;
DROP TABLE IF EXISTS RestaurantMenu;
DROP TABLE IF EXISTS Cart;

CREATE TABLE Bank (
    accountID VARCHAR(255) PRIMARY KEY,
    balance DECIMAL(10, 2)
);

CREATE TABLE Customer (
    email VARCHAR(255) PRIMARY KEY,
    pin INT,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    phone VARCHAR(10),
    membership BOOLEAN DEFAULT 'no',
    bankAccountID VARCHAR(255),
    active BOOLEAN DEFAULT 'yes'
);

INSERT INTO Customer (email, pin, firstName, lastName, phone, membership, bankAccountID)
VALUES
('EmilySmith@email.com', 7483, 'Emily', 'Smith', '8043249351', 'yes', '9cXW2pJuXojaeMCvhlCtIA'),
('DanielJohnson@email.com', 3269, 'Daniel', 'Johnson', '8247179073', 'no', 'EMCNFF9sPcwxsEirgNsj5A'),
('OliviaDavis@email.com', 5821, 'Olivia', 'Davis', '7828849261', 'yes', '9vir-UrDyahr-0N395KlXg'),
('JamesWilson@email.com', 9174, 'James', 'Wilson', '4058399655', 'no', 'e3qPx-ClRkQ1b6bBak30Tg'),
('SophiaMartinez@email.com', 4036, 'Sophia', 'Martinez', '5233062438', 'yes', 'NLYzdQi0Satp_AMPi5I-eQ'),
('LiamBrown@email.com', 1598, 'Liam', 'Brown', '3487579753', 'yes', 'd2mO08yOU3sZQQOgYl2NnQ'),
('AvaTaylor@email.com', 6742, 'Ava', 'Taylor', '7527147318', 'no', 'wPNcEbQkH-DjDm7szCH-qA'),
('BenjaminClark@example.com', 2357, 'Benjamin', 'Clark', '2580205071', 'no', 'S-FavXCpDamFkvdUx36YfA'),
('MiaAnderson@email.com', 8690, 'Mia', 'Anderson', '7860639929', 'yes', 'OpyrrkRg09Jbk_nv8OAABQ'),
('EthanWalker@email.com', 5102, 'Ethan', 'Walker', '7678716663', 'yes', 'dCP9Xj7lv4zDPI1cg3ixPw');

INSERT INTO Bank (accountID, balance)
VALUES
('9cXW2pJuXojaeMCvhlCtIA', 11728.56),
('EMCNFF9sPcwxsEirgNsj5A', 9822.43),
('9vir-UrDyahr-0N395KlXg', 10540.92),
('e3qPx-ClRkQ1b6bBak30Tg', 11137.27),
('NLYzdQi0Satp_AMPi5I-eQ', 10951.95),
('d2mO08yOU3sZQQOgYl2NnQ', 9919.38),
('wPNcEbQkH-DjDm7szCH-qA', 9131.78),
('S-FavXCpDamFkvdUx36YfA', 11619.93),
('OpyrrkRg09Jbk_nv8OAABQ', 9568.88),
('dCP9Xj7lv4zDPI1cg3ixPw', 8382.79);

CREATE TABLE PaymentInformation (
    customerEmail VARCHAR(255) PRIMARY KEY,
    cardNumber VARCHAR(16),
    cvv INT,
    cardName VARCHAR(255),
    expiration DATE
);

INSERT INTO PaymentInformation (customerEmail, cardNumber, cvv, cardName, expiration)
VALUES
('EmilySmith@email.com', '7231272255903891', 783, 'Emily', '2026-08-11'),
('DanielJohnson@email.com', '3517476411701086', 369, 'Daniel', '2026-05-10'),
('OliviaDavis@email.com', '3868508863048841', 809, 'Olivia', '2027-04-12'),
('JamesWilson@email.com', '8123178976635282', 488, 'James', '2025-03-22'),
('SophiaMartinez@email.com', '1980717361933340', 536, 'Sophia', '2028-08-30'),
('LiamBrown@email.com', '1224560335103328', 313, 'Liam', '2026-02-16'),
('AvaTaylor@email.com', '8215849522893525', 920, 'Ava', '2025-03-18'),
('BenjaminClark@example.com', '5285900679883301', 221, 'Benjamin', '2024-05-15'),
('MiaAnderson@email.com', '8462496026328840', 513, 'Mia', '2026-06-12'),
('EthanWalker@email.com', '6415187195548769', 652, 'Ethan', '2027-03-25');

CREATE TABLE Restaurant (
    restaurantID SERIAL PRIMARY KEY,
    name VARCHAR(255),
    phone VARCHAR(10),
    street VARCHAR(255),
    bankAccountID VARCHAR(255)
);

INSERT INTO Restaurant (name, phone, street, bankAccountID)
VALUES
('The Rustic Table', '6005103401', 'Willowbrook Lane', 'XS8uRWWCaRYWVzB7cOrZig'),
('Savory Bites Cafe', '2276164313', 'Maplecrest Drive', 'usTiA20eC8PQV1YjYZgpDw'),
('Flavor Fusion Grill', '5076099924', 'Skylark Avenue', '4GcSTfqkB-f6H-EiTjb7MA'),
('La Petite Boulangerie', '3816850026', 'Quail Ridge Road', 'NzhL8Gq3KF51atHzGKjVeQ'),
('Spice Street Kitchen', '5851822528', 'Bluebell Lane', 'nGq37Atmqxtkk2pT-T-9XA'),
('Oceanview Oyster House', '9443488937', 'Elmwood Way', 'hge8VnXcCnkdtkqcm28sHA'),
('The Cozy Corner Cafe', '6455706792', 'Cedar Ridge Lane', 'NR-tUZUai36m6Nl0nMso2Q'),
('Urban Grill & Bar', '8565650149', 'Oakdale Boulevard', '_VDHAHkBz3BQ1yIx7sogPQ'),
('Pizzeria Bella Napoli', '4513710890', 'Sunflower Street', 's7CHJngo0FCg2VVFCgh5Rw'),
('Sushi Haven Express', '6475656533', 'Meadowview Terrace', 'q9oO2fRskl6sfo0E7xWlsg');

INSERT INTO Bank (accountID, balance)
VALUES
('XS8uRWWCaRYWVzB7cOrZig', 113720.77),
('usTiA20eC8PQV1YjYZgpDw', 120213.25),
('4GcSTfqkB-f6H-EiTjb7MA', 117803.55),
('NzhL8Gq3KF51atHzGKjVeQ', 118399.55),
('nGq37Atmqxtkk2pT-T-9XA', 112281.60),
('hge8VnXcCnkdtkqcm28sHA', 118818.48),
('NR-tUZUai36m6Nl0nMso2Q', 111247.27),
('_VDHAHkBz3BQ1yIx7sogPQ', 116692.77),
('s7CHJngo0FCg2VVFCgh5Rw', 113545.91),
('q9oO2fRskl6sfo0E7xWlsg', 120592.39);

-- 0: meal, 1: side, 2: drink
CREATE TABLE MenuItem (
    itemID SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    type INT
);

INSERT INTO MenuItem (name, description, type)
VALUES
('Hawaiian Pizza', 'A pizza topped with ham, pineapple, and mozzarella cheese, offering a sweet and savory combination.', 0),
('Rustic Truffle Mac n Cheese', 'Creamy macaroni and cheese infused with truffle oil, topped with crispy bacon bits and fresh chives', 0),
('Savory Spinach Stuffed Chicken', 'Tender chicken breasts stuffed with a flavorful spinach and feta cheese blend, served with garlic mashed potatoes and asparagus.', 0),
('Mango Tango Shrimp Tacos', 'Grilled shrimp marinated in zesty mango sauce, served in soft corn tortillas with a refreshing avocado and mango salsa.', 0),
('Spicy Thai Basil Noodles', 'Stir-fried rice noodles with minced chicken, Thai basil, and fiery chili sauce.', 0),
('Mediterranean Quinoa Salad', 'A wholesome blend of quinoa, cherry tomatoes, cucumbers, Kalamata olives, and feta cheese, drizzled with a lemon herb dressing.', 1),
('Tandoori Tofu Skewers', 'A wholesome blend of quinoa, cherry tomatoes, cucumbers, Kalamata olives, and feta cheese, drizzled with a lemon herb dressing.', 1),
('Beef and Broccoli Stir-Fry', 'Sliced beef and broccoli florets wok-tossed in a savory ginger-soy sauce, served over steamed jasmine rice.', 0),
('Creamy Lobster Bisque', 'Rich and velvety lobster bisque, garnished with a dollop of sour cream and fresh chives.', 1),
('Vegetable Tikka Masala', 'A vibrant vegetarian dish featuring roasted mixed vegetables in a creamy tomato and coconut curry sauce, served with basmati rice.', 0),
('Crispy Panko-Crusted Salmon', 'Salmon fillet coated in seasoned panko breadcrumbs and baked until golden brown, served with lemon butter sauce and garlic mashed potatoes.', 0),
('Caprese Panini', 'A classic Italian sandwich filled with ripe tomatoes, fresh mozzarella, basil leaves, and a drizzle of balsamic glaze, pressed in crispy ciabatta.', 1),
('Greek Souvlaki Platter', 'Grilled marinated chicken skewers, served with fluffy pita bread, Tzatziki sauce, and a Greek salad.', 1),
('Cajun Jambalaya', 'A spicy blend of Andouille sausage, shrimp, and chicken simmered with bell peppers, onions, and rice in a Cajun tomato sauce.', 0),
('Raspberry Almond Tart', 'A delicate almond pastry crust filled with luscious raspberry preserves and topped with toasted almond slivers.', 1),
('Balsamic Glazed Portobello Mushrooms', 'Roasted portobello mushrooms drizzled with a sweet balsamic reduction and served with garlic parmesan mashed potatoes.', 1),
('Southwest Black Bean Salad', 'A zesty salad featuring black beans, corn, avocado, and cherry tomatoes, tossed in a cilantro-lime dressing.', 1),
('Penne alla Vodka', 'Penne pasta in a creamy tomato and vodka sauce, sprinkled with fresh basil and grated Parmesan cheese.', 2),
('Spinach and Artichoke Stuffed Mushrooms', 'Mushroom caps filled with a creamy spinach and artichoke dip, baked until bubbly and golden.', 0),
('Hawaiian Poke Bowl', 'A fresh and healthy bowl with diced ahi tuna, avocado, cucumber, and mango over sushi rice, drizzled with soy ginger dressing.', 1),
('Eggplant Parmesan', 'Slices of breaded and fried eggplant layered with marinara sauce and mozzarella cheese, served with spaghetti.', 0),
('Blackberry Mascarpone Crepes', 'Thin crepes filled with sweet mascarpone cheese and fresh blackberries, dusted with powdered sugar.', 1),
('Vegan Chickpea Curry', 'A hearty chickpea curry with a blend of aromatic spices, served with basmati rice and naan bread.', 0),
('Apple Cinnamon Bread Pudding', 'Warm and comforting bread pudding with layers of cinnamon-spiced apples, topped with a vanilla bourbon sauce.', 1),
('Chocolate Lava Cake', 'A decadent dessert with a warm, molten chocolate center, dusted with powdered sugar and served with a scoop of vanilla ice cream.', 1),
('Crispy Duck Confit', 'Duck leg slow-cooked until tender and then crisped to perfection, served with a cherry red wine reduction and sweet potato puree.', 0),
('Veggie Lovers Pizza', 'A thin-crust pizza topped with a colorful medley of roasted vegetables, mozzarella cheese, and a pesto drizzle.', 0),
('Stuffed Bell Peppers', 'Bell peppers filled with a savory mixture of ground beef, rice, tomatoes, and herbs, baked to perfection and topped with melted cheese.', 1),
('Blueberry Pancake Stack', 'A tall stack of fluffy blueberry pancakes, topped with a dollop of whipped cream and drizzled with warm maple syrup.', 1),
('Pineapple Upside-Down Cake', 'A classic dessert with caramelized pineapple rings and maraschino cherries atop a moist, buttery cake, served warm with a scoop of vanilla ice cream.', 1),
('Mango Tango Smoothie', 'A refreshing tropical delight, the Mango Tango Smoothie combines ripe mangoes, yogurt, and a touch of honey for a sweet and creamy treat with a hint of tanginess.', 2),
('Minty Mojito', 'The Minty Mojito is a classic cocktail made with fresh mint leaves, lime juice, sugar, and white rum. It''s a zesty and refreshing drink, perfect for a hot summer day.', 2),
('Chai Latte', 'A cozy and aromatic beverage, the Chai Latte is a blend of black tea, warm spices like cinnamon and cardamom, and steamed milk. It offers a soothing and spiced flavor profile.', 2),
('Watermelon Cooler', 'A hydrating and summery drink, the Watermelon Cooler is made by blending fresh watermelon chunks with a squeeze of lime and a hint of agave syrup. It''s a fantastic thirst quencher.', 2),
('Irish Coffee', 'A classic after-dinner drink, Irish Coffee combines hot coffee with a shot of Irish whiskey, sugar, and a dollop of whipped cream. It''s a warming and indulgent beverage with a delightful caffeine kick.', 2);

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
(4, 9, 3.33),
(2, 13, 4.55),
(7, 15, 6.85),
(7, 13, 3.55);

CREATE TABLE CustomerOrder (
    orderID SERIAL PRIMARY KEY,
    customerEmail VARCHAR(255),
    orderDate DATE,
    tip DECIMAL(10, 2),
    processed BOOLEAN
);

CREATE TABLE Cart (
    cartItemID SERIAL PRIMARY KEY,
    orderID INT,
    menuItemID INT,
    quantity INT,
    subtotal DECIMAL(10, 2)
);