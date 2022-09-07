const fetch = require('node-fetch');
const CryptoJS = require('crypto-js')
const sha256 = require('crypto-js/sha256');
const spotifyController = {};

const client_id = process.env.SPOTIFY_CID;
const redirect_uri = process.env.SPOTIFY_REDIRECT;
const code_verifier = process.env.SPOTIFY_VERIFIER;


// using Spotify Auth code + PKCE flow: https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
spotifyController.authorizeUser = (req, res, next) => {
  try {
    const scope = 'user-read-playback-position user-read-playback-state \
      streaming user-top-read user-library-read user-read-recently-played';
    const state = Math.random().toString();
    const code_challenge = sha256(code_verifier);
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
    });

    res.locals.authURL = url + params;
    return next();
  }
  catch (err) {
    return next({
      log: 'error in spotifyController.authorizeUser',
      error: err
    })
  }
}


spotifyController.getAccessToken = async (req, res, next) => {
  try {
    const code = req.query.code;
    const url = 'https://accounts.spotify.com/api/token';
    const redirect_uri = process.env.SPOTIFY_REDIRECT;
    const cid64 = CryptoJS.enc.Base64.stringify(
      process.env.SPOTIFY_CID + ':' + process.env.SPOTIFY_SECRET
    );

    const response = await fetch(url, {
      method: 'POST',
      body: {
        grant_type: 'authorization_code',
        code,
        redirect_uri,
        client_id,
        code_verifier
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${cid64}`
      }
    })

    console.log(response);
    return next();
  }
  catch (err) {
    return next({
      log: 'error in spotifyController.getAccessToken',
      error: err
    })
  }
}



module.exports = spotifyController;