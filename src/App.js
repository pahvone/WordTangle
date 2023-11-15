import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import DashBoard from "./components/Dashboard";
import Settings from "./components/Settings";
import Forums from "./components/Forums";
import About from "./components/About";
import UsernameChange from "./components/UsernameChange";
import VocabLesson from './components/VocabLesson';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/DashBoard" element={<DashBoard />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/Forums" element={<Forums />} />
        <Route path="/About" element={<About />} />
        <Route path="/UsernameChange" element={<UsernameChange />} />
        <Route path="/VocabLesson" element={<VocabLesson/>}/>
      </Routes>
    </>
  );
};

export default App;