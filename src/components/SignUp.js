import React from "react";
import logo from "../img/WTlogo_stacked_white_bordered.png";
import google from "../img/google_logo.png";
import { getDatabase, ref, update } from "firebase/database";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

const SignUp = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  function writeUserData() {
    const auth = getAuth();
    const db = getDatabase();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;

        update(ref(db, `users/${userId}`), {
          username: username,
        });
        console.log("Registering Succesful!");
        console.log(username);
        redirect("/Login");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/weak-password":
            setMessage(
              "Your Password Is Too Weak! Your password should be at least 6 Characters!",
            );
            setError(true);
            seterrorseverity("warning");
            break;

          case "auth/invalid-email":
            setMessage("The given email is invalid.");
            setError(true);
            seterrorseverity("warning");
            break;

          case "auth/email-already-in-use":
            setMessage("The given email is already in use.");
            setError(true);
            seterrorseverity("warning");
            break;

          case "auth/too-many-requests":
            setMessage("You have done too many requests to the server!");
            setError(true);
            seterrorseverity("warning");
        }
        // alert(error.code); Uncomment me if error code is not listed in the cases above.
      });
    setError(false);
  }

  const RedirectToDashboard = () => {
    redirect("/");
  };

  function RegisterToFirebaseGoogle() {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Registering Succesful!");
        console.log(username);
        redirect("/Login");
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

        // alert(error.code); uncomment me to discover new errors if nothing happens.
      });
    setError(false);
  }

  const redirect = useNavigate();
  const HandleSignUpButtonClick = () => {
    writeUserData();
  };

  const HandleAlternateSignUpButtonClick = () => {
    RegisterToFirebaseGoogle();
    redirect("/Login");
  };

  return (
    <div className="responsive-container">
      <img
        className="app-logo"
        src={logo}
        alt="Word Tangle Logo"
        onClick={RedirectToDashboard}
      />
      <label className="slogan" htmlFor="username">
        Username
      </label>
      <p style={{ margin: "0px" }} />
      <input
        className="textfield"
        type="text"
        id="username"
        value={username}
        onChange={(e) => setusername(e.target.value)}
      />
      <p />
      <label htmlFor="email" className="slogan">
        Email
      </label>
      <p style={{ margin: "0px" }} />
      <input
        className="textfield"
        type="text"
        id="email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
      <p />
      <label htmlFor="password" className="slogan">
        Password
      </label>
      <p style={{ margin: "0px" }} />
      <input
        className="textfield"
        type="password"
        id="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />
      <p />
      <button className="styled-button" onClick={HandleSignUpButtonClick}>
        Sign Up
      </button>
      <p />
      <span className="slogan">Or sign up with...</span>
      <p />
      <button
        className="button-icon"
        onClick={HandleAlternateSignUpButtonClick}
      >
        <img src={google} height={100} width={100} alt="Google logo" />
      </button>
    </div>
  );
};

export default SignUp;
