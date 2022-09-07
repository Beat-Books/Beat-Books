const express = require('express');
const musicController = require('../controllers/musicController');
const router = express.Router();

router.get('/spotify/auth', musicController.AuthorizeSpotifyUser, 
  (req, res) => {
    res.redirect(res.locals.authURL).status(302);
  })

// Note: req.query.code is the Spotify auth code needed to get an access token
router.get('/spotify/auth/token', (req, res) => {
  console.log('/spotify/auth/token token recieved');
  res.status(200).send(req.query.code);
});

router.get('/', (req, res) => {
  console.log('music router is working');
  res.status(200).end();
})


module.exports = router;