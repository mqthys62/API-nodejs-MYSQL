const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// SignUp
router.post('/signup', userController.SignUp);

// SignIn
router.post('/signin', userController.SignIn);

// Verify
router.post('/verify', userController.VerifyAccount);

// Resend verification email
router.post('/resend-verification', userController.ResendVerification);

module.exports = router;