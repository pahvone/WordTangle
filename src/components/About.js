import React from "react";
import NavBar from "./NavBar";
import logo from "../img/WTlogo_stacked_white_bordered.png";
import CGlogo from "../img/CodeGoblins.png";
import "./About.css";

const About = () => {
  return (
    <div>
      <NavBar />
      <div className="responsive-container">
        <h3>We are the coding goblins :-D</h3>
      </div>
      <div className="responsive-container">
        <img className="app-logo" src={CGlogo} alt="Code Goblins logo" />
      </div>
    </div>
  );
};

export default About;
