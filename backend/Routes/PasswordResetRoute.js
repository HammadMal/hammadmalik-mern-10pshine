const express = require('express');
const { 
  forgotPassword, 
  resetPassword, 
  verifyOTP 
} = require('../Controllers/PasswordResetController');

const router = express.Router();

router.post('/forgot', forgotPassword);

router.post('/verify-otp', verifyOTP);

router.post('/reset', resetPassword);

module.exports = router;