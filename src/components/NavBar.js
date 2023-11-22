import { NavLink } from "react-router-dom";
import "./navbar.css";
import logo from "../img/WTlogo_white_stroke.png";
import DarkMode from "./DarkMode";
import React, { useState } from "react";

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className={`navbar ${menuActive ? "active" : ""}`}>
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Compact Word Tangle Logo" />
        </div>

        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/Dashboard">Dashboard</NavLink>
            </li>
            <li>
            <span className="merkki">{">> "}</span><NavLink to="/LessonPath">Learn</NavLink>
            </li>
            <li>
              <span className="merkki">{">> "}</span><NavLink to="/Forums">Forums</NavLink>
            </li>
            <li>
            <span className="merkki">{">> "}</span><NavLink to="/Settings">Settings</NavLink>
            </li>
          </ul>
        </div>

        <div className="nav-elements-right">
          <ul>
            <li>
              <DarkMode />
            </li>
            <li>
              <NavLink to="/About">ABOUT</NavLink>
            </li>
            <li>
              <NavLink to="/SignOut">SIGN OUT</NavLink>
            </li>
          </ul>
        </div>
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
      </div>
        </div>
        <div className="hamburgermenucontainer">
          <div className={`hamburgermenu ${menuActive ? "active" : ""}`}>
          <ul>
            <li>
            <NavLink to="/Dashboard">Dashboard</NavLink>
            </li>
            <li>
            <NavLink to="/LessonPath">Learn</NavLink>
            </li>
            <li>
              <NavLink to="/Forums">Forums</NavLink>
            </li>
            <li>
            <NavLink to="/Settings">Settings</NavLink>
            </li>
            <div className="spacer"/>
            <li>
              <DarkMode/>
            </li>
            <li>
              <NavLink to="/About">ABOUT</NavLink>
            </li>
            <li>
              <NavLink to="/SignOut">SIGN OUT</NavLink>
            </li>
          </ul>
          </div>
          </div>
    </nav>
  );
};

export default Navbar;
