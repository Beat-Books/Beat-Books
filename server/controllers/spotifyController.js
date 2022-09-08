const fetch = require('node-fetch');
const CryptoJS = require('crypto-js')
const sha256 = require('crypto-js/sha256');
const UserModel = require('../models/userModel');
const spotifyController = {};

const client_id = process.env.SPOTIFY_CID;
const secret = process.env.SPOTIFY_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT;
const code_verifier = process.env.SPOTIFY_VERIFIER;
const state = Math.random().toString();


// using Spotify Auth code flow: https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
// NOTE: something about the PKCE extension isn't working correctly
spotifyController.authorizeUser = (req, res, next) => {
  try {
    const scope = 'user-read-playback-position user-read-playback-state \
      streaming user-top-read user-library-read user-read-recently-played';
    
    // const code_challenge = sha256(code_verifier);
    const url = 'https://accounts.spotify.com/authorize?';
    const params = new URLSearchParams({
      client_id,
      response_type: 'code',
      redirect_uri,
      state,
      scope,
      show_dialog: false,
      // code_challenge,
      // code_challenge_method: 'S256'
    });

    res.locals.authURL = url + params;
    return next();
  }
  catch (err) {
    return next({
      log: 'error in spotifyController.authorizeUser',
      message: { err }
    })
  }
}

// exchange auth code for access token
// note: access tokens expire every 30mins.
spotifyController.getAccessToken = async (req, res, next) => {
  try {
    const code = req.query.code;
    const recievedState = req.query.state;
    const url = 'https://accounts.spotify.com/api/token';
    const cid64 = Buffer.from(client_id + ':' + secret).toString('base64');
    const formBody = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri,
        // client_id,
        // code_verifier
    });
    const response = await fetch(url, {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + cid64,
      },
      json: true
    })
    const data = await response.json();
    res.locals.spotifyTokens = data;
    return next();
  }
  catch (err) {
    return next({
      log: 'error in spotifyController.getAccessToken',
      message: { err }
    })
  }
}

// write tokens to userDB
spotifyController.saveTokens = async (req, res, next) => {
  try {
    const { access_token, token_type, scope, expires_in, refresh_token } = res.locals.spotifyTokens;
    const username = 'sagarvxyz' // NOTE: this should be dynamic, and retrieved at login.
    const doc = await UserModel.findOneAndUpdate(
      { username },
      { 
        spotify_access_token: access_token,
        spotify_refresh_token: refresh_token,
        spotify_token_type: token_type,
        spotify_scope: scope,
        spotify_token_expires_in_sec: expires_in,
        spotify_token_created_at: new Date()
      },
      { new: true }
    );
    return next();
  }
  catch (err) {
    return next({
      message: 'error in spotifyController.saveTokens',
      message: { err }
    })
  }
};

/* MUSIC REC LOGIC */
spotifyController.getRec = async (req, res, next) => {
  try {
    // get all data about a book
    // NOTE: DUMMY DATA, get this via the user book -> api results
    res.locals.bookData = {
      title: 'The Great Gatsby',
      author: 'Fitzgerald, F. Scott',
      subjects: [
        "First loves",
        // "Long Island (N.Y.)",
        // "Married women",
        // "Psychological",
        // "Rich people"
      ]
    }
    // NOTE: HARDCODED for now from here https://developer.spotify.com/console/get-available-genre-seeds/
    const userToken = 'BQDozjZNJ8M9CCHfVrpBb8O69QJAN84k72VHY_hYYrwlXu_vPTt6qKfAH2TfgfTmy05HOmqHkZl1u02xrSeQKgAyo52BxV4r-e2A3NWiIi8dk1pmNs9ltlYf0yVoKHla5xW8_hNy86n-bJg_y4o5aMHPwDHnumzQkunOyAOWGnfEYS5N75s6M4kOaISqRmC2cKo'
    const userBook = res.locals.bookData;
    const subjects = userBook.subjects
      .map(el => el.trim().replace(/\s/g, '%20'))
      .join(',');
    
    const url = `https://api.spotify.com/v1/search?type=playlist&q=${subjects}`
    const query = await fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + userToken,
        'Content-Type': 'application/json'
      }
    });
    const data = await query.json();
     // return spotify data in res.locals.musicRec
    console.log(data.playlists.items[0]);
     return next();
  }
  catch (err) {
    return next({
      log: 'error in spotifyController.getRec',
      message: { err }
    })
  }
};


module.exports = spotifyController;