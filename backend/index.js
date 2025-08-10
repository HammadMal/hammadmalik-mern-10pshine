const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("./config/passport");
const cookieParser = require("cookie-parser");

// Import logger and middleware
const logger = require("./config/logger");
const httpLogger = require("./Middlewares/httpLogger");
const errorHandler = require("./Middlewares/errorHandler");

const app = express();
require("dotenv").config();

const authRoute = require("./Routes/AuthRoute");
const googleAuthRoute = require("./Routes/GoogleAuthRoute");
const passwordResetRoute = require("./Routes/PasswordResetRoute");
const noteRoute = require("./Routes/NoteRoute");

const { MONGO_URL, PORT } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    logger.info("MongoDB connected successfully", { database: MONGO_URL.split('/').pop() });
  })
  .catch((err) => {
    logger.error("MongoDB connection failed", { error: err.message });
    process.exit(1);
  });

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(express.json());

// Add HTTP logging middleware
app.use(httpLogger);

// Test route with logging
app.get("/test", (req, res) => {
  logger.info("Test endpoint accessed", { ip: req.ip, userAgent: req.get('User-Agent') });
  res.json({ 
    success: true, 
    message: "Welcome to the backend server",
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use("/", authRoute);
app.use("/auth", googleAuthRoute);
app.use("/password-reset", passwordResetRoute);
app.use("/api/notes", noteRoute);

// Add error handling middleware (should be last)
app.use(errorHandler);

// Start server with logging
const server = app.listen(PORT, () => {
  logger.info(`Server started successfully`, { 
    port: PORT, 
    environment: process.env.NODE_ENV || 'development',
    nodeVersion: process.version
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    mongoose.connection.close(false, () => {
      logger.info('MongoDB connection closed');
      process.exit(0);
    });
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    mongoose.connection.close(false, () => {
      logger.info('MongoDB connection closed');
      process.exit(0);
    });
  });
});