import { NavLink } from "react-router-dom";
import "./navbar.css";
import logo from "../img/WTlogo_white_stroke.png";
import DarkMode from "./DarkMode";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img
            src={logo}
            width={60}
            height={60}
            alt="Compact Word Tangle Logo"
          />
        </div>
        <DarkMode />
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/Dashboard">DashBoard</NavLink>
            </li>

            <li>
              <NavLink to="/Learn">Learn</NavLink>
            </li>
            <li>
              <NavLink to="/Forums">Forums</NavLink>
            </li>
            <li>
              <NavLink to="/Settings">Settings</NavLink>
            </li>
            <li>
              <NavLink to="/About">About</NavLink>
            </li>
            <li>
              <NavLink to="/SignOut">Sign Out</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
