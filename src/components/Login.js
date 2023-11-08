import React from 'react'
import logo from '../img/WTlogo_stacked_white_bordered.png'
import google from '../img/google_logo.png'

const Login = () => {
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

  const handleLoginButtonClick = () => {}
  const handleForgotPasswordButtonClick = () => {}
  const handleAlternateLoginButtonClick = () => {}

  return (
    <div className='responsive-container'>
      <img className='App-logo' src={logo} alt='Word Tangle Logo' />
      <text className='slogan'>Username/Email</text>
      <p />
      <label htmlFor='username' />
      <input className='textfield' type='text' id='username' />
      <p />
      <text className='slogan'>Password</text>
      <p />
      <label htmlFor='password' />
      <input className='textfield' type='password' id='password' />
      <p />
      <Button text='Login' onClick={handleLoginButtonClick} />
      <p />
      <ForgotPasswordButton
        text='Forgot password?'
        onClick={handleForgotPasswordButtonClick}
      />
      <p />
      <text className='slogan'>Or log in with...</text>
      <p />
      <button className='button-icon' onClick={handleAlternateLoginButtonClick}>
        <img src={google} height={100} width={100} alt='Google logo' />
      </button>
    </div>
  )
}

export default Login
