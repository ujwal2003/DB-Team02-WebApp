import MenuItems from '../components/MenuItems';
import { useContext } from "react";
import { OrderContext } from '../context/OrderContext';

export default function Drinks() {
  const {drinks} = useContext(OrderContext);

  return <>
  {
    drinks.length === 0 
    ? 
    <div>No drinks found</div> 
    :
    <MenuItems title="DRINKS" items={drinks} />
  }
  </>

}