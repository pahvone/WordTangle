import React from 'react';
import logo from '../img/logo.jpg';
import google from '../img/google_logo.png';


const SignUp = () => {
  const Button = ({ text, onClick }) => {
    return (
      <button className="styled-button" onClick={onClick}>
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

  const handleSignUpButtonClick = () => {
    
  };
 
  const handleAlternateSignUpButtonClick = () => {
    
  };

  return (
    <div className="responsive-container">
      <img className='App-logo' src={logo} alt="Word Tangle Logo" />
      <text className='slogan'>Username</text>
      <p/>
      <input className='textfield' type="text" id="username" />
      <p/>
      <text className='slogan'>Email</text>
      <p/>
      <input className='textfield' type="text" id="email" />
      <p/>
      <text className='slogan'>Password</text>
      <p/>
      <input className='textfield' type="password" id="password" />
      <p/>
      <Button text="Sign Up" onClick={handleSignUpButtonClick} />
      <p/>
      <text className='slogan'>Or sign up with...</text>
      <p/>
      <IconButton imageSrc={google} altText="Google Logo Button" onClick={handleAlternateSignUpButtonClick}/>
      
    </div>
  );
};

export default SignUp;

