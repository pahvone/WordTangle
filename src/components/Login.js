import React from "react";
import logo from "../img/WTlogo_stacked_white_bordered.png";
import google from "../img/google_logo.png";
import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import MuiError from "./muiError";

const provider = new GoogleAuthProvider();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false); //Controls Alert
  const [message, setMessage] = useState(""); //Controls Message
  const [errorseverity, seterrorseverity] = useState(""); // Controls Error Severity
  const Button = ({ text, onClick }) => {
    return (
      <button className="styled-button" onClick={onClick}>
        {text}
      </button>
    );
  };
  const ForgotPasswordButton = ({ text, onClick }) => {
    return (
      <button className="forgotpassword-button" onClick={onClick}>
        {text}
      </button>
    );
  };

  function LoginToFirebaseEmail() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        redirect("/Dashboard");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setMessage("Your email adress is invalid!");
            setError(true);
            seterrorseverity("warning");
          case "auth/invalid-login-credentials":
            setMessage("Your login credentials are invalid!");
            setError(true);
            seterrorseverity("warning");
            break;
          case "auth/too-many-requests":
            setMessage("You have done too many requests to the server!");
            setError(true);
            seterrorseverity("warning");
        }
      });
    setError(false);
  }

  const redirect = useNavigate();
  function LoginToFirebaseGoogle() {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // The signed-in user info.
        const user = result.user;
        setMessage("Login Successful!");
        setError(true);
        redirect("/UsernameChange");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/too-many-requests":
            setMessage("You have done too many requests to the server!");
            setError(true);
            seterrorseverity("warning");
            break;

          case "auth/cancelled-popup-request":
            setMessage(
              "You cancelled the popup request, please choose a Google account to log in with.",
            );
            setError(true);
            seterrorseverity("warning");
            break;

          case "auth/popup-blocked":
            setMessage(
              "Please allow pop-up windows from your browser settings, as the google sign-in was blocked by this.",
            );
            setError(true);
            seterrorseverity("warning");
            break;
        }

        // The AuthCredential type that was used.
        // ...
      });

    setError(false);
  }

  const handleLoginButtonClick = () => {
    LoginToFirebaseEmail();
  };
  const handleForgotPasswordButtonClick = () => {};
  const handleAlternateLoginButtonClick = () => {
    LoginToFirebaseGoogle();
  };

  const RedirectToDashboard = () => {
    redirect("/");
  };

  return (
    <div className="responsive-container">
      <img
        className="app-logo"
        src={logo}
        alt="Word Tangle Logo"
        onClick={RedirectToDashboard}
      />
      <label htmlFor="email" className="slogan">
        Email
      </label>
      <p style={{ margin: "0px" }} />
      <input
        className="textfield"
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p />
      <label htmlFor="password" className="slogan">
        Password
      </label>
      <p style={{ margin: "0px" }} />
      <input
        className="textfield"
        type="password"
        role="textbox"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p />
      <Button text="Login" onClick={handleLoginButtonClick} />
      <p />
      <ForgotPasswordButton
        text="Forgot password?"
        onClick={handleForgotPasswordButtonClick}
      />
      <p />
      <span className="slogan">Or log in with...</span>
      <p />
      <button className="button-icon" onClick={handleAlternateLoginButtonClick}>
        <img src={google} height={100} width={100} alt="Google logo" />
      </button>
      {error ? (
        <MuiError message={message} errorseverity={errorseverity} />
      ) : (
        ``
      )}
    </div>
  );
};

export default Login;
