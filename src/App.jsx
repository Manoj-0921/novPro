import "./App.css";
import Login from "./compents/Login";
import Home from "./compents/Home";
import RegisterCustomer from "./compents/registerCustomer";
import RegisterRetailer from "./compents/registerRetailer";
import Customer from "./compents/customer";
import Retailer from "./compents/retailer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup-customer" element={<RegisterCustomer />} />
        <Route path="/signup-retailer" element={<RegisterRetailer />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/retailer" element={<Retailer />} />
      </Routes>
    </Router>
  );
}

export default App;