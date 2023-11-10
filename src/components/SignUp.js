import React from 'react'
import logo from '../img/WTlogo_stacked_white_bordered.png'
import google from '../img/google_logo.png'
import { getDatabase, ref, set } from 'firebase/database'
import { useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { useNavigate } from 'react-router-dom'

const provider = new GoogleAuthProvider();

const SignUp = () => {
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');



  function writeUserData () {
    const auth = getAuth();
    const db = getDatabase()

      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

      const userId = userCredential.user.uid;

      set(ref(db, `users/${userId}`), {
        username: username
      })
    });
  };


    function RegisterToFirebaseGoogle(){
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log("Registering Succesful!")
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
            // Handle Errors here.
            console.log(error.code)
            console.log(error.message)
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }


  const HandleSignUpButtonClick = () => {
      writeUserData()
      console.log(username)
      const redirect = useNavigate()
      redirect('/Login')
  }

  const HandleAlternateSignUpButtonClick = () => {
        RegisterToFirebaseGoogle()
      const redirect = useNavigate()
      redirect('/Login')

  }

  return (
    <div className='responsive-container'>
      <img className='App-logo' src={logo} alt='Word Tangle Logo' />
      <span className='slogan'>Username</span>
      <p />
      <input className='textfield' type='text' id='usernameID' value={username} onChange={e => setusername(e.target.value)} />
      <p />
      <span className='slogan'>Email</span>
      <p />
      <input className='textfield' type='text' id='emailID' value={email} onChange={e => setemail(e.target.value)} />
      <p />
      <span className='slogan'>Password</span>
      <p />
      <input className='textfield' type='password' id='passwordID' value={password} onChange={e => setpassword(e.target.value)} />
      <p />
      <button className='styled-button' onClick={HandleSignUpButtonClick}>
        Sign Up
      </button>
      <p />
      <span className='slogan'>Or sign up with...</span>
      <p />
      <button
        className='button-icon'
        onClick={HandleAlternateSignUpButtonClick}
      >
        <img src={google} height={100} width={100} alt='Google logo' />
      </button>
    </div>
  )
}

export default SignUp
