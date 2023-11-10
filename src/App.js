import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Welcome from './components/Welcome'
import DashBoard from './components/DashBoard'

const App = () => {
  return (
    <>
      <Routes>
      <Route path='/' element={<DashBoard />} />
        <Route path='/Welcome' element={<Welcome />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
