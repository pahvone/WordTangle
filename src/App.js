import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import Settings from "./components/Settings";
import Forums from "./components/Forums";
import About from "./components/About";
import UsernameChange from "./components/UsernameChange";
import LessonPath from "./components/LessonPath";
import LessonPage from "./components/LessonPage";
import PasswordChange from "./components/PasswordChange";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/DashBoard" element={<Dashboard />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/Forums" element={<Forums />} />
        <Route path="/About" element={<About />} />
        <Route path="/UsernameChange" element={<UsernameChange />} />
        <Route path="/PasswordChange" element={<PasswordChange />} />
        <Route path="/LessonPath" element={<LessonPath />} />
        <Route path="/LessonPage" element={<LessonPage />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;
