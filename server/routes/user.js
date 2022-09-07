// User routes
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

// Get user's profile information
router.get(
  '/profile',
  authController.isLoggedIn,
  userController.getUserProfile,
  (req, res) => {
    // return res.status(200).send('got user profile');
    res.status(200).json(res.locals.userProfile);
  }
);

module.exports = router;
