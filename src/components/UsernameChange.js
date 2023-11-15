import NavBar from "./NavBar";
import logo from "../img/WTlogo_stacked_white_bordered.png";
import React, { useState } from "react";
import { redirect } from "react-router-dom";
import "./UsernameChange.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const Button = ({ text, onClick }) => {
  return (
    <button className="styled-button" onClick={onClick}>
      {text}
    </button>
  );
};

function UploadUserName() {
  const db = getDatabase();
  const [username, setusername] = useState("");
  const auth = getAuth();
  const userId = auth.currentUser.uid;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      set(ref(db, "/users/" + userId), {
        username: username,
      });
      console.log(user.uid);
      redirect("/Dashboard");
    } else {
      // User is signed out
      // ...
    }
  });
}

const Usernamechange = () => {
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
          onChange={(e) => setusername(e.target.value)}
        />
        <Button text="Update Username" onClick={UploadUserName} />
      </div>
    </div>
  );
};

export default Usernamechange;
