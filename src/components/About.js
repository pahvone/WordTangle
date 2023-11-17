import React from "react";
import NavBar from "./NavBar";
import CGlogo from "../img/CodeGoblins.png";
import "./About.css";
import Footer from "./Footter";

const About = () => {
  return (
    <div>
      <NavBar />
      <div className="pagecontainer">
        <div className="responsive-container">
          <h3>We are the coding goblins :-D</h3>
        </div>
        <div className="responsive-container">
          <img className="app-logo" src={CGlogo} alt="Code Goblins logo" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
