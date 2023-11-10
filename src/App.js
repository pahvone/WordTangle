import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Welcome from './components/Welcome'
import Dashboard from './components/Dashboard'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
          <Route path='/Dashboard' element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
