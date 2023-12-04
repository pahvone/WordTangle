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
        <label htmlFor="password" className="slogan">
          New Password
        </label>
        <p style={{ margin: "0px" }} />
        <input
          className="textfield"
          role="textbox"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <Button text="Update Password" onClick={ChangePassword} />
      </div>
    </div>
  );
};

export default PasswordChange;
