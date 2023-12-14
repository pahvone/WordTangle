import NavBar from "./NavBar";
import logo from "../img/WTlogo_stacked_white_bordered.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UsernameChange.css";
import { getAuth, updatePassword } from "firebase/auth";
import muiError from "./muiError";
import MuiError from "./muiError";

const auth = getAuth();

const Button = ({ text, onClick }) => {
  return (
    <button className="styled-button" onClick={onClick}>
      {text}
    </button>
  );
};
const PasswordChange = () => {
  const redirect = useNavigate();
  const [password, setpassword] = useState("");
  const [error, setError] = useState(false); //Controls Alert
  const [message, setMessage] = useState(""); //Controls Message
  const [errorseverity, seterrorseverity] = useState(""); // Controls Error Severity

  function ChangePassword() {
    const user = auth.currentUser;
    updatePassword(user, password)
      .then(() => {
        console.log("Password Updated Succesfully!");
        redirect("/");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/too-many-requests":
            setMessage("You have done too many requests to the server!");
            setError(true);
            seterrorseverity("warning");
            break;
          case "auth/weak-password":
            setMessage(
              "Your Password Is Too Weak! Your password should be at least 6 Characters!",
            );
            setError(true);
            seterrorseverity("warning");
            break;
          case "auth/requires-recent-login":
            setMessage("Your login has timed out.");
            setError(true);
            seterrorseverity("error");
            break;
        }
        // alert(error.code); if nothing happens uncomment me.
      });
    setError(false);
  }
  return (
    <div>
      <NavBar />
      <div className="responsive-container">
        <img className="app-logo" src={logo} alt="Word Tangle Logo" />
        <label htmlFor="password" className="slogan">
          New Password
        </label>
        <p style={{ margin: "0px" }} />
        <input
          className="textfield"
          role="textbox"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <Button text="Update Password" onClick={ChangePassword} />
      </div>
      {error ? (
        <MuiError message={message} errorseverity={errorseverity} />
      ) : (
        ``
      )}
    </div>
  );
};

export default PasswordChange;
