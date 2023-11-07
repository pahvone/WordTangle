import React from 'react';
import logo from '../img/WTlogo_stacked_white_bordered.png';
import { useNavigate } from 'react-router-dom';


const Welcome = () => {

  const navigate = useNavigate();
  
  const handleLoginButtonClick = () => {
    navigate('/Login');
  };

  const handleSignUpButtonClick = () => {
    navigate('/signup');
  };

  return (
    <div className="responsive-container">
      <img className='App-logo' src={logo} alt="Word Tangle Logo" />
      <text className='slogan'>No more getting tangled with words!</text>
      <p/>
      <button className="styled-button" onClick={handleLoginButtonClick}>Login</button>
      <p/>
      <button className="styled-button" onClick={handleSignUpButtonClick}>Sign Up</button>
      
    </div>
  );
};

export default Welcome;