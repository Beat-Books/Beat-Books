const fetch = require('node-fetch');
const sha256 = require('crypto-js/sha256');
const musicController = {};

// using Spotify Auth code + PKCE flow: https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
musicController.AuthorizeSpotifyUser = async (req, res, next) => {
  try {
    const client_id = process.env.SPOTIFY_CID;
    
    const redirect_uri = 'http://localhost:3000/api/music/spotify/auth/token/';
    const scope = 'user-read-playback-position user-read-playback-state \
      streaming user-top-read user-library-read user-read-recently-played';
    const state = Math.random().toString();
    
    // use sha256 hash to generate codeChallenge
    const code_challenge = sha256(Math.random().toString());
    const url = 'https://accounts.spotify.com/authorize?';
    const params = new URLSearchParams({
      client_id,
      response_type: 'code',
      redirect_uri,
      state,
      scope,
      show_dialog: false,
      code_challenge,
      code_challenge_method: 'S256'
    })

    res.locals.authURL = (url + params);
    console.log(res.locals.authURL);
    return next();
  }
  catch (err) {
    return next({
      log: 'error in musicController.AuthorizeSpotifyUser',
      error: err
    })
  }
}

module.exports = musicController;