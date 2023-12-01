import React, { useState } from "react";
import NavBar from "./NavBar";
import logo from "../img/WTlogo_stacked_white_bordered.png";
import "./Settings.css";
import fb from "../firebase";
import Footer from "./Footter.js";
import { child, get, getDatabase, ref } from "firebase/database";
import { getAuth } from "firebase/auth";

const UserDataPage = () => {
  const Button = ({ text, onClick }) => {
    return (
      <button className="styled-button" onClick={onClick}>
        {text}
      </button>
    );
  };

  function GetUserData() {
    const dbRef = ref(getDatabase(fb));
    const auth = getAuth();
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
      <div className="pagecontainer">
        <div className="responsive-container">
          <img className="app-logo" src={logo} alt="Word Tangle Logo" />
          testisivu, wip :)
          <br />
          <Button text="Get User Data" onClick={GetUserData} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDataPage;
