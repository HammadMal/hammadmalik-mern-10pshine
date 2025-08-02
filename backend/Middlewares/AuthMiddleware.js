const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// Existing userVerification function
module.exports.userVerification = (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User.findById(data.id)
      if (user) return res.json({ status: true, user: user.username })
      else return res.json({ status: false })
    }
  })
}

// New middleware for protecting routes (adds user to req object)
module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Access denied. No token provided.' 
    });
  }

  try {
    jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ 
          success: false,
          message: 'Invalid token.' 
        });
      }

      // Add user info to request object
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({ 
          success: false,
          message: 'User not found.' 
        });
      }

      req.user = { 
        id: user._id, 
        username: user.username, 
        email: user.email 
      };
      next();
    });
  } catch (error) {
    res.status(401).json({ 
      success: false,
      message: 'Invalid token.' 
    });
  }
};

// Optional middleware for routes that work with or without auth
module.exports.optionalAuth = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
      if (err) {
        req.user = null;
        return next();
      }

      const user = await User.findById(decoded.id).select('-password');
      req.user = user ? { 
        id: user._id, 
        username: user.username, 
        email: user.email 
      } : null;
      
      next();
    });
  } catch (error) {
    req.user = null;
    next();
  }
};