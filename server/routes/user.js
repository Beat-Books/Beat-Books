// User routes
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController')

// Get user's profile information
router.get(
  '/',
  authController.isLoggedIn,
  userController.getUserProfile,
  (req, res) => {
    // return res.status(200).send('got user profile');
    res.status(200).json(res.locals.userProfile);
  }
);

router.post('/addBook',
  userController.addFavoriteBook,
  (req, res) => {
    return res.status(200).json(res.locals.addedBook);
  }
);

router.post('/addSong',
  userController.addFavoriteSong,
  (req, res) => {
    return res.status(200).json(res.locals.updatedObj);
  }
);

module.exports = router;
