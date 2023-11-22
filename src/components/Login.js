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
  const [username, setusername] = useState("");
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
        const user = userCredential.user;
        console.log("login success!");
        console.log(userCredential.user.uid);
        redirect("/Dashboard");
        // ...
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  }

  const redirect = useNavigate();
  function LoginToFirebaseGoogle() {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("Login Successful!");
        console.log(user.uid);
        redirect("/UsernameChange");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error.code);
        console.log(error.message);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
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

  return (
    <div className="responsive-container">
      <img className="app-logo" src={logo} alt="Word Tangle Logo" />
      <label htmlFor="email" className="slogan">Email</label>
      <p style={{margin: '0px'}}/>
      <input
        className="textfield"
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p />
      <label htmlFor="password" className="slogan">Password</label>
      <p style={{margin: '0px'}}/>
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
