import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import SignIn from "./pages/signin";
import ManageAccount from "./pages/ManageAccount";
import UpdateAccountInformation from "./pages/UpdateAccountInformation";
import UpdatePaymentInformation from "./pages/UpdatePaymentInformation";
import Menu from "./pages/Menu";
import Meals from "./pages/Meals";
import Sides from "./pages/Sides";
import Drinks from "./pages/Drinks";
import Order from "./pages/Order";
import Membership from "./pages/Membership";
import Checkout from "./pages/Checkout";
import { OrderProvider } from './context/OrderContext';
import './App.css';

function App() {
  return (
    <OrderProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/home" />} />
        <Route path="home" element={<Home />}/>
        <Route path="/Register" element={<Register />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/ManageAccount" element={<ManageAccount/>} />
        <Route path="/UpdateAccountInformation" element={<UpdateAccountInformation/>} />
        <Route path="/UpdatePaymentInformation" element={<UpdatePaymentInformation/>} />
        <Route path="/Menu" element={<Menu/>} />
        <Route path="/Menu/Meals" element={<Meals/>} />
        <Route path="/Menu/Sides" element={<Sides/>} />
        <Route path="/Menu/Drinks" element={<Drinks/>} />
        <Route path="/Order" element={<Order/>} />
        <Route path="/Membership" element={<Membership/>}/>
        <Route path="/Checkout" element={<Checkout/>}/>
      </Route>
    </Routes>
    </OrderProvider>
  )
}

export default App