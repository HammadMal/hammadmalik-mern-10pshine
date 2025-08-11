const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
const logger = require("../config/logger");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    
    logger.info("User signup attempt", { email, username });
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn("Signup failed - user already exists", { email });
      return res.json({ message: "User already exists" });
    }
    
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    
    logger.info("User created successfully", { 
      userId: user._id, 
      email: user.email, 
      username: user.username 
    });
    
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    
    res.status(201).json({ 
      message: "User signed in successfully", 
      success: true, 
      user 
    });
    
    next();
  } catch (error) {
    logger.error("Signup error", { 
      error: error.message, 
      stack: error.stack,
      body: req.body 
    });
    next(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    logger.info("User login attempt", { email });
    
    if (!email || !password) {
      logger.warn("Login failed - missing credentials", { email });
      return res.status(400).json({ 
        success: false,
        message: 'All fields are required' 
      });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn("Login failed - user not found", { email });
      return res.status(401).json({ 
        success: false,
        message: 'Incorrect email or password' 
      });
    }
    
    if (user.googleId && user.password === 'google-oauth-user') {
      logger.warn("Login failed - Google OAuth user trying regular login", { email });
      return res.status(401).json({ 
        success: false,
        message: 'Please use Google Sign In for this account' 
      });
    }
    
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      logger.warn("Login failed - incorrect password", { email, userId: user._id });
      return res.status(401).json({ 
        success: false,
        message: 'Incorrect email or password' 
      });
    }
    
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    
    logger.info("User logged in successfully", { 
      userId: user._id, 
      email: user.email 
    });
    
    res.status(200).json({ 
      success: true,
      message: "User logged in successfully" 
    });
    
  } catch (error) {
    logger.error("Login error", { 
      error: error.message, 
      stack: error.stack,
      email: req.body.email 
    });
    next(error);
  }
};