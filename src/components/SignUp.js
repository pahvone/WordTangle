import React from 'react';
import logo from '../img/WTlogo_stacked_white_bordered.png';
import google from '../img/google_logo.png';


const SignUp = () => {
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
      <button className="styled-button" onClick={handleSignUpButtonClick}>Sign Up</button>
      <p/>
      <text className='slogan'>Or sign up with...</text>
      <p/>
        <button className="button_icon" onClick={handleAlternateSignUpButtonClick}><img src={google} height={100} width={100} alt={"Google logo"} /></button>
      
    </div>
  );
};

export default SignUp;

