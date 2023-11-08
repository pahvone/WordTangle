import React from 'react'
import logo from '../img/WTlogo_stacked_white_bordered.png'
import google from '../img/google_logo.png'
import { getDatabase, ref, set } from 'firebase/database'
import { useState } from 'react';

function writeUserData (userId, username, email, password) {
  const db = getDatabase(process.env.REACT_APP_FIREBASE_DATABASE_URL)
  set(ref(db, 'users/' + userId), {
    username: username,
    email: email,
    password: password
  })
}

const SignUp = () => {
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

  const handleSignUpButtonClick = () => {
      // writeUserData() broken
      console.log(email)
      console.log(password)
      console.log(username)
  }

  const handleAlternateSignUpButtonClick = () => {
  }

  return (
    <div className='responsive-container'>
      <img className='App-logo' src={logo} alt='Word Tangle Logo' />
      <text className='slogan'>Username</text>
      <p />
      <input className='textfield' type='text' id='usernameID' value={username} onChange={e => setusername(e.target.value)} />
      <p />
      <text className='slogan'>Email</text>
      <p />
      <input className='textfield' type='text' id='emailID' value={email} onChange={e => setemail(e.target.value)} />
      <p />
      <text className='slogan'>Password</text>
      <p />
      <input className='textfield' type='password' id='passwordID' value={password} onChange={e => setpassword(e.target.value)} />
      <p />
      <button className='styled-button' onClick={handleSignUpButtonClick}>
        Sign Up
      </button>
      <p />
      <text className='slogan'>Or sign up with...</text>
      <p />
      <button
        className='button-icon'
        onClick={handleAlternateSignUpButtonClick}
      >
        <img src={google} height={100} width={100} alt='Google logo' />
      </button>
    </div>
  )
}

export default SignUp
