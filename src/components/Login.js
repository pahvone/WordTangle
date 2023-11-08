import React from 'react'
import logo from '../img/WTlogo_stacked_white_bordered.png'
import google from '../img/google_logo.png'
import { getDatabase, ref, set } from 'firebase/database'
import { useState } from 'react';

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

  const handleLoginButtonClick = () => {
          console.log(email)
          console.log(password)
          console.log(username)
  }
  const handleForgotPasswordButtonClick = () => {}
  const handleAlternateLoginButtonClick = () => {}
//lisää vertailu että onko käyttäjätunnus vai säpo(?)
  return (
    <div className='responsive-container'>
      <img className='App-logo' src={logo} alt='Word Tangle Logo' />
      <span className='slogan'>Username/Email</span>
      <p />
      <label htmlFor='username' />
      <input className='textfield' type='text' id='usernameID' value={username} onChange={e => setusername(e.target.value)} />
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
