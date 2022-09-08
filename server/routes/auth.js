// Authentication routes
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

// Sign up route
router.post('/signup', userController.createUser, (req, res) => {
  console.log('Successfully signed up');
  res.status(200).json({ status: 200, message: 'Signup success' });
});

// Log in route
router.post(
  '/login',
  userController.verifyUser,
  authController.startSession,
  authController.setSSIDCookie,
  (req, res) => {
    res.status(200).json({
      status: 200,
      username: res.locals.user.username,
      id: res.locals.user.id,
    });
  }
);

// Log out route
router.get(
  '/logout',
  authController.isLoggedIn,
  authController.endSession,
  (req, res) => {
    console.log('successfully logged out');
    res.status(200).json({ message: 'successfully logged out' });
  }
);

module.exports = router;
