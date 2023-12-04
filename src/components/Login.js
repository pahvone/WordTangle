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

const provider = new GoogleAuthProvider();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        console.log("login success!");
        console.log(userCredential.user.uid);
        redirect("/Dashboard");
        // ...
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            alert("The given email is invalid.");
            break;
          case "auth/invalid-login-credentials":
            alert("The given email or password is invalid.");
            break;
          case "auth/too-many-requests":
            alert(
              "You have done too many requests to the server! Please wait a moment.",
            );
        }
        alert(error.code);
      });
  }

  const redirect = useNavigate();
  function LoginToFirebaseGoogle() {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // The signed-in user info.
        const user = result.user;
        console.log("Login Successful!");
        console.log(user.uid);
        redirect("/UsernameChange");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/too-many-requests":
            alert(
              "You have done too many requests to the server! Please wait a moment.",
            );
            break;

          case "auth/cancelled-popup-request":
            alert(
              "You cancelled the popup request, please choose a Google account to log in with.",
            );
            break;

          case "auth/popup-blocked":
            alert(
              "Please allow pop-up windows from your browser settings, as the google sign-in was blocked by this.",
            );
            break;
        }
        alert(error.code);
        // The AuthCredential type that was used.
        // ...
      });
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
    </div>
  );
};

export default Login;
