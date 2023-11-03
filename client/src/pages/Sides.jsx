import MenuItems from '../components/MenuItems';

export default function Sides() {

  const sides = [
    {
      id: 1,
      name: 'Nachos',
      price: 10.00,
      description: 'Classic mexican nachos'
    }
    //...other sides
  ];

  return <MenuItems title="SIDES" items={sides} />;

}