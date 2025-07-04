import React from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'

import SignUp from './components/SignUp'

import SignIn from './components/SignIn'

import FirstPage from './components/FirstPage'



function App() {

  return (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage />}/>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>  
    )
}

export default App
