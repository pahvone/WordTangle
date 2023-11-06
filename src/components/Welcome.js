import React from 'react';
import logo from '../img/logo.jpg';
import Login from './Login';
import SignUp from './SignUp';


const Welcome = () => {
  const Button = ({ text, onClick }) => {
    return (
      <button className="styled-button" onClick={onClick}>
        {text}
      </button>
    );
  };

  const handleLoginButtonClick = () => {
    <Login/>
  };
  const handleSignUpButtonClick = () => {
    <SignUp/>
  };

  return (
    <div className="responsive-container">
      <img className='App-logo' src={logo} alt="Word Tangle Logo" />
      <text className='slogan'>No more getting tangled with words!</text>
      <p/>
      <Button text="Login" onClick={handleLoginButtonClick} />
      <p/>
      <Button text="Sign Up" onClick={handleSignUpButtonClick} />
      
    </div>
  );
};

export default Welcome;