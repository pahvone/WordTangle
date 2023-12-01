import React, { useState } from "react";
import NavBar from "./NavBar";
import logo from "../img/WTlogo_stacked_white_bordered.png";
import "./Settings.css";
import { useNavigate } from "react-router-dom";
import { child, get, getDatabase, ref, remove } from "firebase/database";
import {
  getAuth,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut,
} from "firebase/auth";
import fb from "../firebase";
import Footer from "./Footter.js";

const Settings = () => {
  const dbRef = ref(getDatabase(fb));
  const auth = getAuth();
  const user = auth.currentUser;
  const [password, setpassword] = useState("");
  const redirect = useNavigate();
  const [googleVar, setGoogleVar] = useState(true);

  auth.onAuthStateChanged(function (user) {
    if (user) {
      //check provider data
      user.providerData.forEach(function (profile) {
        if (profile) {
          if (profile.providerId) {
            const signInProvider = profile.providerId;
            console.log("Sign-in provider: " + profile.providerId);
          }
        }
      });
    }
  });

  if (user) {
    console.log("Auth provider: " + user.providerId);
  }

  function Usernameredirect() {
    redirect("/UsernameChange");
  }

  function Passwordredirect() {
    redirect("/PasswordChange");
  }
  const Button = ({ text, onClick }) => {
    return (
      <button className="styled-button" onClick={onClick}>
        {text}
      </button>
    );
  };

  const WarningButton = ({ text, onClick }) => {
    return (
      <button className="styled-warning-button" onClick={onClick}>
        {text}
      </button>
    );
  };

  const CriticalWarningButton = ({ text, onClick }) => {
    return (
      <button className="styled-critical-warning-button" onClick={onClick}>
        {text}
      </button>
    );
  };

  function UserDataRedirect() {
    redirect("/UserDataPage");
  }

  function DeleteUserData(signInProvider) {
    let userId = auth.currentUser.uid;
    console.log(auth.currentUser.uid);

    if (signInProvider != "google.com") {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        document.getElementById("passwordID").value,
      );
      //reauthenticate the user to facilitate removal of account
      reauthenticateWithCredential(auth.currentUser, credential)
        .then(() => {
          deleteUser(user).then(() => {
            remove(child(dbRef, "/users/" + userId));
            redirect("/");
            console.log("User Succesfully Deleted!");
          });
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-login-credentials":
              alert(
                "The password in the confirmation field is wrong! You should type in your current password to confirm the account deletion.",
              );
              break;
            case "auth/too-many-requests":
              alert(
                "You have done too many requests to the server! Please wait a moment.",
              );
          }
          // alert(error.code); uncomment for catching un-documented errors.
        });
    }
  }

  function SignOut() {
    signOut(auth)
      .then(() => {
        console.log("Successfully signed out!");
        redirect("/");
      })
      .catch((error) => {
        console.error();
      });
  }

  const showTextbox = () => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        //check provider data
        user.providerData.forEach(function (profile) {
          const signInProvider = profile.providerId;
          console.log("Sign-in provider in showbox: " + signInProvider);
          if (signInProvider == "google.com") {
            console.log("google found");
            setGoogleVar(false);
          } else {
            console.log("no google found");
            setGoogleVar(true);
          }
        });
      }
    });
  };

  return (
    <div>
      <NavBar />
      <div className="pagecontainer">
        <div className="responsive-container">
          <img className="app-logo" src={logo} alt="Word Tangle Logo" />
          <p />
          <Button text="Change Nickname" onClick={Usernameredirect} />
          <br />
          <Button text="Change Password" onClick={Passwordredirect} />
          <br />
          <Button text="Get User Data" onClick={UserDataRedirect} />
          <br />
          <WarningButton text="Sign Out" onClick={SignOut} />
          <br />
          {showTextbox()}
          <p>
            {googleVar && (
              <input
                className="textfield"
                type="password"
                id="passwordID"
                value={password}
                placeholder="Enter password to delete account"
                onChange={(e) => setpassword(e.target.value)}
              />
            )}
          </p>
          <CriticalWarningButton
            text="Delete Account"
            onClick={DeleteUserData}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
