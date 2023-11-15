import React from "react";
import logo from "../img/WTlogo_stacked_white_bordered.png";
import NavBar from "./NavBar";
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import fb from "../firebase";
import nonstackedlogo from "../img/wtlogo_nonstacked.png";

const auth = getAuth();
const user = auth.currentUser;
const dbRef = ref(getDatabase(fb));
const db = getDatabase();
const userId = auth.currentUser.uid;

const Button = ({ text, onClick }) => {
  return (
    <button className="styled-button" onClick={onClick}>
      {text}
    </button>
  );
};

function GetUserData() {
  get(child(dbRef, "/users/" + userId))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val().username);
        // functionality: snapshot.val().insertvaluetobefetchedhere
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

const DashBoard = () => {
  return (
    <div>
      <NavBar />
      <div className="responsive-container">
        <img
          className="app-logo-nonstacked"
          src={nonstackedlogo}
          alt="Word Tangle Logo"
        />
        {<Button text="Get User Data" onClick={GetUserData} />}
      </div>
    </div>
  );
};
export default DashBoard;
