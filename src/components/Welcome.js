import React, { useEffect, useState } from "react";
import logo from "../img/WTlogo_stacked_white_bordered.png";
import { useNavigate } from "react-router-dom";

import Toggle from "react-toggle";
import { useMediaQuery } from "react-responsive";

const Welcome = () => {
  const [isDark, setIsDark] = useState(true);

  const systemPrefersDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined,
    (isSystemDark) => setIsDark(isSystemDark),
  );

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);
  const redirect = useNavigate();

  const handleLoginButtonClick = () => {
    redirect("/Login");
  };

  const HandleSignUpButtonClick = () => {
    redirect("/signup");
  };

  return (
    <div className="responsive-container">
      <img className="App-logo" src={logo} alt="Word Tangle Logo" />
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
      <Toggle
        checked={isDark}
        onChange={({ target }) => setIsDark(target.checked)}
        icons={{ checked: "🌙", unchecked: "🔆" }}
        aria-label="Dark mode toggle"
      />
    </div>
  );
};

export default Welcome;
