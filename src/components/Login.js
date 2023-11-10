import React from 'react'
import logo from '../img/WTlogo_stacked_white_bordered.png'
import google from '../img/google_logo.png'
import { getDatabase, ref, set } from 'firebase/database'
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom'


const provider = new GoogleAuthProvider();

const Login = () => {
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const Button = ({ text, onClick }) => {
    return (
      <button className='styled-button' onClick={onClick}>
        {text}
      </button>
    )
  }
  const ForgotPasswordButton = ({ text, onClick }) => {
    return (
      <button className='forgotpassword-button' onClick={onClick}>
        {text}
      </button>
    )
  }


  function LoginToFirebaseEmail(){

      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              console.log("login success!")
              console.log(userCredential.user.uid)
              redirect('/Dashboard')
              // ...
          })
          .catch((error) => {
              console.log(error.code)
              console.log(error.message)
          });
  }

    const redirect = useNavigate()
  function LoginToFirebaseGoogle(){
      const auth = getAuth();
      signInWithPopup(auth, provider)
          .then((result) => {
              // This gives you a Google Access Token. You can use it to access the Google API.
              const credential = GoogleAuthProvider.credentialFromResult(result);
              const token = credential.accessToken;
              // The signed-in user info.
              const user = result.user;
              console.log("Login Successful!")
              redirect('/Dashboard')
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

  const handleLoginButtonClick = () => {
        LoginToFirebaseEmail()
  }
  const handleForgotPasswordButtonClick = () => {}
  const handleAlternateLoginButtonClick = () => {
      LoginToFirebaseGoogle()
  }
//TODO: lisää vertailu että onko käyttäjätunnus vai säpo(?) (atm hardcoded email only)
  return (
    <div className='responsive-container'>
      <img className='App-logo' src={logo} alt='Word Tangle Logo' />
      <span className='slogan'>Email</span>
      <p />
      <label htmlFor='email' />
      <input className='textfield' type='text' id='email' value={email} onChange={e => setemail(e.target.value)} />
      <p />
      <span className='slogan'>Password</span>
      <p />
      <label htmlFor='password' />
      <input className='textfield' type='password' id='passwordID' value={password} onChange={e => setpassword(e.target.value)} />
      <p />
      <Button text='Login' onClick={handleLoginButtonClick} />
      <p />
      <ForgotPasswordButton
        text='Forgot password?'
        onClick={handleForgotPasswordButtonClick}
      />
      <p />
      <span className='slogan'>Or log in with...</span>
      <p />
      <button className='button-icon' onClick={handleAlternateLoginButtonClick}>
        <img src={google} height={100} width={100} alt='Google logo' />
      </button>
    </div>
  )
}

export default Login
