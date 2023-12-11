import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp";
import SignOut from "./components/SignOut";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import Settings from "./components/Settings";
import Forums from "./components/Shoutbox";
import About from "./components/About";
import UsernameChange from "./components/UsernameChange";
import LearnPage from "./components/LearnPage";
import LessonPage from "./components/LessonPage";
import Lessons from "./components/Lessons";
import PasswordChange from "./components/PasswordChange";
import Dashboard from "./components/Dashboard";
import UserDataPage from "./components/UserDataPage";
import Shoutbox from "./components/Shoutbox";
import Tester from "./components/placeholder";

/* NOTE THAT GHPAGES REQUIRES ROUTING LIKE 
  <Route path="wordtangle/DashBoard" element={<Dashboard />} /> */

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/About" element={<About />} />
        <Route path="/UsernameChange" element={<UsernameChange />} />
        <Route path="/PasswordChange" element={<PasswordChange />} />
        <Route path="/LearnPage" element={<LearnPage />} />
        <Route path="/LearnPage:lang" element={<LearnPage />} />
        {/*<Route path="/Lessons" element={<Lessons />} />
        <Route path="/Lessons:lang" element={<Lessons />} />*/}
        <Route path="/LessonPage:lang/:diff/:index" element={<LessonPage />} />
        <Route path="/LessonPage" element={<LessonPage />} /> {/*debug*/}
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/SignOut" element={<SignOut />} />
        <Route path="/UserDataPage" element={<UserDataPage />} />
        <Route path="/Test" element={<Tester />} />
      </Routes>
    </>
  );
};

export default App;
