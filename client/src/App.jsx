import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";

import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/home" />} />
              <Route path="home" element={<Home />}/>
              <Route path="/Register" element={<Register />} />
            </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App