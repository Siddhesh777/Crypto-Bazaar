import React from "react";
import { Home,Login,Register } from "./Pages";
import { Routes, Route } from "react-router-dom";
export default function App()
{
  return(
      <>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/login" element={<Login/>}></Route>
          <Route exact path="/signup" element={<Register/>}></Route>
        </Routes>
      </>
  )
}