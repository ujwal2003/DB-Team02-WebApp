import MenuItems from '../components/MenuItems';

export default function Meals() {

    const meals = [
        {
            id: 1, 
            name: 'Burrito Bowl',
            price: 12.99,
            description: 'Hearty bowl with your choice of meat, brown rice, black beans, pico de gallo, corn salsa, guacamole, and cheese'
        },
        {
            id: 2,
            name: 'Tacos',
            price: 3.00, 
            description: 'Two soft corn tortilla tacos filled with your choice of meat, onions, cilantro, and our signature salsa'
        },
        {
            id: 3,
            name: 'Quesadilla',
            price: 10.00,
            description: 'Griddled flour tortilla filled with melted cheese, pico de gallo, and your choice of meat'
        },
        {
            id: 4,
            name: 'Nachos',
            price: 8.00,
            description: 'Corn tortilla chips layered with beans, cheese, pico de gallo, guacamole, sour cream, and jalapeños' 
        },
    ];

  return <MenuItems title="MEALS" items={meals} />;

}