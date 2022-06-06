import React from "react";
import { Home, Login, Register, CryptoDetails, Portfolio } from "./Pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path ="/My-portfolio" element={<Portfolio/>}></Route>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Register />}></Route>
          <Route path="/Crypto-details" element={<CryptoDetails />}></Route>
        </Routes>
      </Router>
    </>
  );
}
export default App;
