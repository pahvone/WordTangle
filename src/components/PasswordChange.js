import NavBar from "./NavBar";
import logo from "../img/WTlogo_stacked_white_bordered.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UsernameChange.css";
import { getAuth, updatePassword } from "firebase/auth";

const auth = getAuth();

const Button = ({ text, onClick }) => {
  return (
    <button className="styled-button" onClick={onClick}>
      {text}
    </button>
  );
};

const PasswordChange = () => {
  const redirect = useNavigate();
  const [password, setpassword] = useState("");

  function ChangePassword() {
    const user = auth.currentUser;
    updatePassword(user, password)
      .then(() => {
        console.log("Password Updated Succesfully!");
        redirect("/");
      })
      .catch((error) => {
        console.error();
      });
  }
  return (
    <div>
      <NavBar />
      <div className="responsive-container">
        <img className="app-logo" src={logo} alt="Word Tangle Logo" />
        <span className="slogan">New Password</span>
        <p />
        <input
          className="textfield"
          type="password"
          id="usernameID"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <Button text="Update Password" onClick={ChangePassword} />
      </div>
    </div>
  );
};

export default PasswordChange;
