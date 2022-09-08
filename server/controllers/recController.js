const fetch = require('node-fetch');

const recController = {};
// source: https://developer.spotify.com/console/get-available-genre-seeds/
const tempToken = 'BQDozjZNJ8M9CCHfVrpBb8O69QJAN84k72VHY_hYYrwlXu_vPTt6qKfAH2Tf\
  gfTmy05HOmqHkZl1u02xrSeQKgAyo52BxV4r-e2A3NWiIi8dk1pmNs9ltlYf0yVoKHla5xW8_hNy8\
  6n-bJg_y4o5aMHPwDHnumzQkunOyAOWGnfEYS5N75s6M4kOaISqRmC2cKo'

/* MUSIC REC LOGIC */
/**
 * function parseQuery with:
 *  inputs: object bookData 
 *  side-effect: add array queries to object res.locals
 * 
 * This function should recieve an object of metadata about a book, and return 
 * an array of potential queries based on:
 * 1. subjects
 * 2. genres/other classifications
 * 3. book title
 * 4. author name
 * 
 * Each array element should contain no symbols other than %20 for spaces.
 * 
*/

/**
 * function getMusic:
 *  inputs: array queries, string userToken
 *  side-effect: add string SpotifyURI to object res.locals
 *  
 * This function should iterate through the queryArray and query the Spotify
 * API. If a match is found, store that URI in res.locals. If no match is found,
 * Pass a default URI to a generic "reading" playlist.
 */
recController.getMusic = async (req, res, next) => {
  try {
    // NOTE: DUMMY DATA
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
    const userToken = tempToken; // NOTE: replace with token from UserModel
    const subjects = res.locals.bookData.subjects
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

module.exports = recController;