import React from 'react';
import logo from '../img/logo.jpg';
import google from '../img/google_logo.png';


const Login = () => {
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
  const IconButton = ({ imageSrc, altText, onClick }) => {
    return (
      <button className="button_icon" onClick={onClick}>
        <img src={imageSrc} alt={altText} />
      </button>
    );
  };

  const handleLoginButtonClick = () => {
    
  };
  const handleForgotPasswordButtonClick = () => {
    
  };
  const handleAlternateLoginButtonClick = () => {
    
  };

  return (
    <div className="responsive-container">
      <img className='App-logo' src={logo} alt="Word Tangle Logo" />
      <text className='slogan'>Username/Email</text>
      <p/>
      <label htmlFor="username"></label>
      <input className='textfield' type="text" id="username" />
      <p/>
      <text className='slogan'>Password</text>
      <p/>
      <label htmlFor="password"></label>
      <input className='textfield' type="password" id="password" />
      <p/>
      <Button text="Login" onClick={handleLoginButtonClick} />
      <p/>
      <ForgotPasswordButton text="Forgot password?" onClick={handleForgotPasswordButtonClick} />
      <p/>
      <text className='slogan'>Or log in with...</text>
      <p/>
      <IconButton imageSrc={google} altText="Google Logo Button" onClick={handleAlternateLoginButtonClick}/>
      
    </div>
  );
};

export default Login;

