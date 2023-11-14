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
    zipcode INT,
    membership BOOLEAN DEFAULT 'no',
    bankAccountID VARCHAR(255),
    active BOOLEAN DEFAULT 'yes'
);

INSERT INTO Customer (email, pin, firstName, lastName, phone, zipcode, membership, bankAccountID)
VALUES
('EmilySmith@email.com', 7483, 'Emily', 'Smith', '8043249351', 46784, 'yes', '9cXW2pJuXojaeMCvhlCtIA'),
('DanielJohnson@email.com', 3269, 'Daniel', 'Johnson', '8247179073', 25273, 'no', 'EMCNFF9sPcwxsEirgNsj5A'),
('OliviaDavis@email.com', 5821, 'Olivia', 'Davis', '7828849261', 72758, 'yes', '9vir-UrDyahr-0N395KlXg'),
('JamesWilson@email.com', 9174, 'James', 'Wilson', '4058399655', 95071, 'no', 'e3qPx-ClRkQ1b6bBak30Tg'),
('SophiaMartinez@email.com', 4036, 'Sophia', 'Martinez', '5233062438', 25068, 'yes', 'NLYzdQi0Satp_AMPi5I-eQ'),
('LiamBrown@email.com', 1598, 'Liam', 'Brown', '3487579753', 96717, 'yes', 'd2mO08yOU3sZQQOgYl2NnQ'),
('AvaTaylor@email.com', 6742, 'Ava', 'Taylor', '7527147318', 36703, 'no', 'wPNcEbQkH-DjDm7szCH-qA'),
('BenjaminClark@example.com', 2357, 'Benjamin', 'Clark', '2580205071', 39720, 'no', 'S-FavXCpDamFkvdUx36YfA'),
('MiaAnderson@email.com', 8690, 'Mia', 'Anderson', '7860639929', 21426, 'yes', 'OpyrrkRg09Jbk_nv8OAABQ'),
('EthanWalker@email.com', 5102, 'Ethan', 'Walker', '7678716663', 58521, 'yes', 'dCP9Xj7lv4zDPI1cg3ixPw');

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

-- Insert additional Hispanic dishes
INSERT INTO MenuItem (name, description, type)
VALUES
    ('Queso Fundido', 'Melted cheese with chorizo or other toppings, served with tortillas.', 0),
    ('Tamale', 'Steamed corn dough filled with various ingredients, wrapped in a corn husk.', 0),
    ('Guacamole', 'Mashed avocado mixed with tomatoes, onions, cilantro, and lime juice.', 0),
    ('Sopes', 'Thick corn tortillas with raised edges, topped with beans, meat, lettuce, and cheese.', 0),
    ('Camarones a la Diabla', 'Spicy shrimp cooked in a flavorful red chili sauce.', 0),
    ('Tostadas', 'Crispy fried tortillas topped with beans, lettuce, meat, and salsa.', 0),
    ('Caldo de Res', 'Hearty beef soup with vegetables and rice.', 0),
    ('Papas Rellenas', 'Mashed potato balls stuffed with seasoned meat, then fried.', 0),
    ('Cactus Salad', 'Refreshing salad made with nopales (cactus), tomatoes, and onions.', 0),
    ('Chiles en Nogada', 'Poblano peppers stuffed with picadillo (a mixture of meat and fruits), topped with walnut cream sauce.', 0),
    ('Arroz y Frijoles', 'Classic combination of rice and beans.', 1),
    ('Ensalada de Frutas', 'Fresh fruit salad with a light dressing.', 1),
    ('Yucca Fries', 'Crispy fries made from yucca root.', 1),
    ('Chicharrón de Queso', 'Fried cheese crisps or chips.', 1),
    ('Platanos con Crema', 'Fried plantains served with sour cream.', 1),
    ('Sopaipillas', 'Fried pastry dough, often sprinkled with cinnamon sugar.', 1),
    ('Mexican Street Corn (Elote)', 'Grilled corn on the cob topped with mayo, cheese, and chili powder.', 1),
    ('Papas a la Huancaina', 'Peruvian dish of sliced potatoes in a spicy cheese sauce.', 1),
    ('Coconut Rice', 'Sweet and fragrant rice cooked with coconut milk.', 1),
    ('Pastelón', 'Sweet plantain lasagna with layers of meat and cheese.', 1),
    ('Jamaica Margarita', 'Margarita with a twist, flavored with hibiscus tea.', 2),
    ('Cucumber Agua Fresca', 'Refreshing drink made with cucumber, lime, and sugar.', 2),
    ('Café de Olla', 'Traditional Mexican spiced coffee brewed with cinnamon and piloncillo (unrefined sugar).', 2),
    ('Tequila Sunrise', 'Cocktail made with tequila, orange juice, and grenadine.', 2),
    ('Champurrado', 'Thick and warm chocolate-based drink, often enjoyed during the holidays.', 2),
    ('Mango Lassi', 'Smoothie made with mango, yogurt, and spices.', 2),
    ('Pisco Sour', 'South American cocktail made with pisco, lime juice, and egg white.', 2),
    ('Aguas Frescas', 'Various fruit-infused drinks, such as watermelon or cantaloupe.', 2),
    ('Café con Leche', 'Coffee with steamed milk.', 2),
    ('Horchata Latte', 'Latte made with horchata instead of regular milk.', 2);


CREATE TABLE RestaurantMenu (
    restaurantID INT,
    menuItemID INT,
    price DECIMAL(6, 2),
    PRIMARY KEY (restaurantID, MenuItemID)
);

INSERT INTO RestaurantMenu (restaurantID, menuItemID, price)
VALUES
(1, 1, 3.99),
(2, 2, 3.99),
(3, 1, 4.99),
(4, 2, 4.99),
(5, 1, 3.99),
(6, 2, 3.99),
(7, 1, 4.99),
(8, 2, 4.99),
(9, 1, 3.99),
(10, 2, 3.99),
(1, 3, 3.99),
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
(7, 13, 3.55),
(1, 6, 5.99),
(1, 7, 6.99),
(2, 8, 6.99),
(2, 14, 4.99),
(1, 20, 2.99),
(2, 21, 2.99),
(3, 20, 2.99),
(4, 23, 2.99),
(5, 29, 2.99),
(6, 28, 2.99),
(7, 24, 2.99),
(8, 25, 2.99),
(9, 26, 2.99),
(10, 27, 2.99),
(10, 14 , 3.99),
(10, 1, 2.99),
(10, 8, 6.99),
(10, 23, 2.99),
(10, 29, 3.99),
(10, 6, 7.99),
(9, 27, 3.99),
(9, 2, 4.99),
(9, 4, 6.99),
(9, 9, 5.99),
(9, 7, 7.99),
(9, 12, 3.99),
(9, 13, 3.99),
(9, 15, 2.99),
(9, 16, 4.99),
(9, 21, 2.99),
(9, 22, 1.99),
(9, 23, 2.99),
(9, 24, 2.99),
(8, 1, 4.99),
(8, 3, 5.99),
(8, 4, 6.99),
(8, 7, 4.99),
(8, 8, 5.99),
(8, 12, 3.99),
(8, 14, 4.99),
(8, 15, 2.99),
(8, 16, 3.99),
(8, 21, 2.99),
(8, 22, 1.99),
(8, 24, 2.99),
(8, 26, 2.99),
(8, 27, 1.99);


CREATE TABLE CustomerOrder (
    orderID SERIAL PRIMARY KEY,
    customerEmail VARCHAR(255),
    orderDate DATE,
    orderTime TIME,
    tip DECIMAL(10, 2),
    processed BOOLEAN
);

CREATE TABLE Cart (
    cartItemID SERIAL PRIMARY KEY,
    orderID INT,
    menuItemID INT,
    restaurantID INT
);