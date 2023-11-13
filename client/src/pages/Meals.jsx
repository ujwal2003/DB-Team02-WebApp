import MenuItems from '../components/MenuItems';
import { useContext } from "react";
import { OrderContext } from '../context/OrderContext';

export default function Meals() {
  const {meals} = useContext(OrderContext);

  return <>
  {
    meals.length === 0 
    ? 
    <div>No meals found</div> 
    :
    <MenuItems title="MEALS" items={meals} />
  }
  </>

}