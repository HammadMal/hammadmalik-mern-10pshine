const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("./config/passport");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const googleAuthRoute = require("./Routes/GoogleAuthRoute");
const passwordResetRoute = require("./Routes/PasswordResetRoute"); 
const { MONGO_URL, PORT } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

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

app.get("/test", (req, res) => {
  res.send("Welcome to the backend server");
});

app.use("/", authRoute);
app.use("/auth", googleAuthRoute);
app.use("/password-reset", passwordResetRoute); // New route

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});