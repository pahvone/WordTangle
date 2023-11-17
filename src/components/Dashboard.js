import React from "react";
import NavBar from "./NavBar";
import nonstackedlogo from "../img/wtlogo_nonstacked.png";

const Button = ({ text, onClick }) => {
  return (
    <button className="styled-button" onClick={onClick}>
      {text}
    </button>
  );
};

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
      </div>
    </div>
  );
};
export default DashBoard;
