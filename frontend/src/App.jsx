import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import FirstPage from './components/FirstPage'
import ForgotPassword from './components/ForgotPassword'
import VerifyOTP from './components/VerifyOTP'; 
import NewPassword from './components/NewPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage />}/>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="verify-otp" element={<VerifyOTP />} />
        <Route path="new-password" element={<NewPassword />} />
      </Routes>
    </BrowserRouter>  
  )
}

export default App