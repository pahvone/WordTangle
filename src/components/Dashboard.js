import React from 'react'
import logo from '../img/WTlogo_stacked_white_bordered.png'
import NavBar from './NavBar'

const DashBoard = () => {



  return (
    <div>
    <NavBar />
        <div className='responsive-container'>
      <img className='App-logo' src={logo} alt='Word Tangle Logo' />
      <span className='slogan'>Username</span>
      <p />
      
      <p />
      <span className='slogan'>Email</span>
      <p />
      
      <p />
      <span className='slogan'>Password</span>
      <p />
      
      <span className='slogan'>Or sign up with...</span>
      <p />
      </div>
      </div>
  )
}

export default DashBoard
