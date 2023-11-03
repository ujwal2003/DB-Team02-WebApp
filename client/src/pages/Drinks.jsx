import MenuItems from '../components/MenuItems';

export default function Drinks() {

  const drinks = [
    {
      id: 1,
      name: 'Margarita',
      price: 8.99,
      description: 'Classic lime margarita'
    }
    //...other drinks
  ];

  return <MenuItems title="DRINKS" items={drinks} />;

}