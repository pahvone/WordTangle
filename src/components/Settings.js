import React, { useState } from "react";
import NavBar from "./NavBar";
import logo from "../img/WTlogo_stacked_white_bordered.png";
import "./Settings.css";

const Settings = () => {
  const [username, setusername] = useState("");

  return (
    <div>
      <NavBar />
      <div className="responsive-container">
        <img className="app-logo" src={logo} alt="Word Tangle Logo" />
        <span className="slogan">Username</span>
        <p />
        <input
          className="textfield"
          type="text"
          id="usernameID"
          value={username}
        />
      </div>
    </div>
  );
};

export default Settings;
