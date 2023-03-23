const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authenticateUser = require("../middlewares/authentication.middleware");

// SignUp
router.post('/signup', userController.SignUp);

// SignIn
router.post('/signin', userController.SignIn);

// Verify
router.post('/verify', userController.VerifyAccount);

// Resend verification email
router.post('/resend-verification', userController.ResendVerification);

// Get profile
router.post('/profile', authenticateUser(0), userController.GetProfile);
module.exports = router;