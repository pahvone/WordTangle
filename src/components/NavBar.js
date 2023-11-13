import { NavLink } from "react-router-dom";
import "./navbar.css";
import logo from "../img/WTlogo_white_stroke.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img src={logo} width={60} height={60} />
        </div>
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/">Dashboard</NavLink>
            </li>

            <li>
              <NavLink to="/blog">Learn</NavLink>
            </li>
            <li>
              <NavLink to="/projects">Forums</NavLink>
            </li>
            <li>
              <NavLink to="/Settings">Settings</NavLink>
            </li>
            <li>
              <NavLink to="/contact">About</NavLink>
            </li>
            <li>
              <NavLink to="/signout">Sign Out</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
