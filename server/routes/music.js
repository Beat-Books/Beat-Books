const express = require('express');
const spotifyController = require('../controllers/spotifyController');
const recController = require('../controllers/recController');
const router = express.Router();


/* GET RECS */
router.post('/rec', // NOTE: Change to POST in production
  recController.getBookQuery,
  recController.getSearchArray,
  recController.getMusic, 
  (req, res) => {
    res.status(200).json(res.locals.spotifyUrl);
  }
)

/* SPOTIFY AUTH FLOW */
router.get('/spotify/auth', spotifyController.authorizeUser,
  (req, res) => {
    res.redirect(302, res.locals.authURL);
  })

// Retrieve authorization code from previous step. Returns an access token
router.get(
  '/spotify/auth/token', 
  spotifyController.getAccessToken,
  spotifyController.saveTokens,
  (req, res) => {
    console.log('/spotify/auth/token token recieved');
    res.status(200).end();
});

router.get('/', (req, res) => {
  console.log('music router is working');
  res.status(200).end();
})


module.exports = router;