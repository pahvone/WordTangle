import React, { useState } from "react";
import NavBar from "./NavBar";
import logo from "../img/WTlogo_stacked_white_bordered.png";
import "./Settings.css";
import { useNavigate } from "react-router-dom";
import { child, get, getDatabase, ref } from "firebase/database";
import { getAuth } from "firebase/auth";
import fb from "../firebase";

const auth = getAuth();
const user = auth.currentUser;
const dbRef = ref(getDatabase(fb));
const db = getDatabase();
const Settings = () => {
  const redirect = useNavigate();

  function Usernameredirect() {
    redirect("/UsernameChange");
  }

  const Button = ({ text, onClick }) => {
    return (
      <button className="styled-button" onClick={onClick}>
        {text}
      </button>
    );
  };

  const WarningButton = ({ text, onClick }) => {
    return (
      <button className="styled-warning-button" onClick={onClick}>
        {text}
      </button>
    );
  };

  const CriticalWarningButton = ({ text, onClick }) => {
    return (
      <button className="styled-critical-warning-button" onClick={onClick}>
        {text}
      </button>
    );
  };

  function GetUserData() {
    let userId = auth.currentUser.uid;
    get(child(dbRef, "/users/" + userId))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          // functionality: snapshot.val().insertvaluetobefetchedhere
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <NavBar />
      <div className="responsive-container">
        <img className="app-logo" src={logo} alt="Word Tangle Logo" />
        <p />
        <Button text="Change Nickname" onClick={Usernameredirect} />
        <br />
        <Button text="Reset Password" onClick={Usernameredirect} />
        <br />
        <Button text="Get User Data" onClick={GetUserData} />
        <br />
        <WarningButton text="Sign Out" onClick={GetUserData} />
        <br />
        <CriticalWarningButton text="Delete Account" onClick={GetUserData} />
      </div>
    </div>
  );
};

export default Settings;
