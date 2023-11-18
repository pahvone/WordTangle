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
        <Route path="wordtangle/DashBoard" element={<Dashboard />} />
        <Route path="wordtangle/" element={<Welcome />} />
        <Route path="wordtangle/Login" element={<Login />} />
        <Route path="wordtangle/SignUp" element={<SignUp />} />
        <Route path="wordtangle/Settings" element={<Settings />} />
        <Route path="wordtangle/Forums" element={<Forums />} />
        <Route path="wordtangle/About" element={<About />} />
        <Route path="wordtangle/UsernameChange" element={<UsernameChange />} />
        <Route path="wordtangle/PasswordChange" element={<PasswordChange />} />
        <Route path="wordtangle/LessonPath" element={<LessonPath />} />
        <Route path="wordtangle/LessonPage" element={<LessonPage />} />
        <Route path="wordtangle/Login" element={<Login />} />
        <Route path="wordtangle/Dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;
