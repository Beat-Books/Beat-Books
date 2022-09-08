const express = require('express');
const spotifyController = require('../controllers/spotifyController');
const router = express.Router();

router.get('/spotify/auth', spotifyController.authorizeUser,
  (req, res) => {
    res.redirect(302, res.locals.authURL);
  })

// Retrieve authorization code from previous step. Returns an access token
router.get(
  '/spotify/auth/token', 
  spotifyController.getAccessToken,
  spotifyController.saveTokens, // NOTE: WIP. running into middleware errors
  (req, res) => {
    console.log('/spotify/auth/token token recieved');
    res.status(200).end();
});

router.get('/', (req, res) => {
  console.log('music router is working');
  res.status(200).end();
})


module.exports = router;