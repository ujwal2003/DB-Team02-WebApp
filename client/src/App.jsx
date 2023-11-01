import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import SignIn from "./pages/signin";

import './App.css';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/home" />} />
        <Route path="home" element={<Home />}/>
        <Route path="/Register" element={<Register />} />
        <Route path="/SignIn" element={<SignIn />} />
      </Route>
    </Routes>
    </>
  )
}

export default App