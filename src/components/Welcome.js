import logo from "../img/WTlogo_stacked_white_bordered.png";
import { useNavigate } from "react-router-dom";
import DarkMode from "./DarkMode";

const Welcome = () => {
  const redirect = useNavigate();

  const handleLoginButtonClick = () => {
    redirect("/Login");
  };

  const HandleSignUpButtonClick = () => {
    redirect("/signup");
  };

  return (
    <div className="responsive-container">
      <img className="app-logo" src={logo} alt="Word Tangle Logo" />
      <div className="slogan">No more getting tangled with words!</div>
      <p />
      <button className="styled-button" onClick={handleLoginButtonClick}>
        Login
      </button>
      <p />
      <button className="styled-button" onClick={HandleSignUpButtonClick}>
        Sign Up
      </button>
      <p />
      <DarkMode />
    </div>
  );
};

export default Welcome;
