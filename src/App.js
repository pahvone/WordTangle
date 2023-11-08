import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Welcome from "./components/Welcome";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
