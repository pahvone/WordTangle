import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import NavBar from "./NavBar";
import logo from "../img/WTlogo_white_stroke.png";
import { useNavigate } from "react-router-dom";
import "./SignOut.css"
import Footer from "./Footter";




const Button = ({ text, onClick }) => {
  return (
    <button className="styled-button" onClick={onClick}>
      {text}
    </button>
  );
};

const SignOut = () => {

    const [buttonText, setButtonText] = useState('Really want to sign out?'); 
    const redirect = useNavigate();
    const [isSpinning, setIsSpinning] = useState(false);  

    const handleSignOut = () => {
        setButtonText('Signing out...'); 
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("Signout Successful!");
          // Sign-out successful.
        }).catch((error) => {
            console.log.apply("Signout failed")
        // An error happened.
        });
        setIsSpinning(true);
        
        setTimeout(() => {
          setIsSpinning(false);
          setButtonText('Really want to sign out?'); 
          redirect("/");
        }, 3000);        
      };


  return (
    <div>
      <NavBar />
      <div className="pagecontainer">
      <div className="signout">
      <div className="responsive-container">
        <div className="rotating-thing">
      <img className={isSpinning ? 'spin' : ''} src={logo}  alt="Compacter Word Tangle Logo" style={{height:150, width:150}} />
      </div>
      </div>
      </div>
      <div className="responsive-container">
      <Button text={buttonText} onClick={handleSignOut}> 
        {buttonText} </Button>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignOut;
