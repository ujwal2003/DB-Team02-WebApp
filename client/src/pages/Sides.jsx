import MenuItems from '../components/MenuItems';
import { useContext } from "react";
import { OrderContext } from '../context/OrderContext';

export default function Sides() {
  const {sides} = useContext(OrderContext);   

  return <>
  {
    sides.length === 0 
    ? 
    <div>No sides found</div> 
    :
    <MenuItems title="SIDES" items={sides} />
  }
  </>

}