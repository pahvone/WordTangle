import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Settings" element={<Settings />} />
      </Routes>
    </>
  );
};

export default App;
