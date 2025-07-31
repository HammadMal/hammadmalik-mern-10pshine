const { Signup,Login } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post('/',userVerification)

router.post('/logout', (req, res) => {
 res.clearCookie('token', {
   httpOnly: false,
   secure: process.env.NODE_ENV === 'production',
   sameSite: 'lax'
 });
 
 res.status(200).json({
   success: true,
   message: 'Logged out successfully'
 });
});


module.exports = router;