const fetch = require('node-fetch');

const recController = {};
// source: https://developer.spotify.com/console/get-available-genre-seeds/
const tempToken = 'BQCQ4s1dd2DBBTzhaNAIgkYw913FULz2h_uT5F1qST39eFeS1vFTB_Saz80bXyixus4ondtSJ_739xHdxc7wbDIPf1JD00unxNLwaS_p7Qn-zgzq3Yev_F1kbQYBmdYQadRt82VJMZ9ncClY-u8NjnmSe3HZmFrRDWEF9Z7c5DL7oHTdUBTtSB6jVUCvTSc2_As'

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
recController.getBookQuery = async (req, res, next) => {
  try {
    const { bookTitle, bookAuthor } = req.body;
    const searchUrl = `https://gutendex.com/books?search=${bookTitle}%20${bookAuthor}`;
    const bookResponse = await fetch(searchUrl);
    const bookParsed = await bookResponse.json();
    if (bookParsed.count > 0) {
      res.locals.bookResponse = await bookParsed.results[0];
    }
    else {
      res.locals.bookResponse = {title: 'none', authors: [{name:'none'}], subjects: []};
    }
    
    return next();
  } catch (err) {
    return next({
      log: 'an error occurred in the getBookQuery middleware' + err,
      message: { err: err },
    });
  }
};

recController.getSearchArray = (req, res, next) => {
  try {
    if (res.locals.bookResponse.title === 'none') {
      res.locals.searchArray = [];
      return next();
    }
    const {title, authors, subjects} = res.locals.bookResponse;
    let searchArray = [title, authors[0].name, ...subjects];
    searchArray = searchArray.map((string) =>
      string.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').replace(/[ ]{1,2}/g, '%20')
    );
    res.locals.searchArray = searchArray;
    return next();
  } catch (err) {
    return next({
      log: 'an error occurred in the getBookQuery middleware' + err,
      message: { err: err },
    });
  }
}

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
    //res.locals.searchArray
    const searchArray = res.locals.searchArray;
    const userToken = tempToken; // NOTE: replace with token from UserModel
    res.locals.spotifyMatches = [];

    // default playlist if no results are found
    let defaultAlbum = {
      name: 'Reading Playlist',
      artist: 'Spotify',
      image: 'https://i.pinimg.com/736x/69/b2/5e/69b25e2c2d0b29cdec93da2fd28ee2ec--old-books-vintage-books.jpg',
      url: 'https://open.spotify.com/playlist/37i9dQZF1DWZwtERXCS82H?si=f78f10d73894477c',
      type: 'playlist'
    };
      
    if (searchArray.length == 0) {
      res.locals.spotifyMatches.push(defaultAlbum);
      return next();
    }
    // iterate through searchArray until a playlist is returned;
    for (const el of searchArray) {
      let queryUrl = `https://api.spotify.com/v1/search?type=album&q=${el}`
      let query = await fetch(queryUrl, {
        headers: {
          'Authorization': 'Bearer ' + userToken,
          'Content-Type': 'application/json'
        }
      });
      let data = await query.json();
      let match = data.albums.items;
      // exit loop after 3 matches
      for (let i = 0; i < 3; i++) {
        let newMatch = {
          name: match[i].name,
          artist: match[i].artists[0].name,
          url: match[i].external_urls.spotify,
          image: match[i].images[0].url,
          type: match[i].type
        };
        res.locals.spotifyMatches.push(newMatch);
      };
    }
    if (res.locals.spotifyMatches.length == 0) {
      res.locals.spotifyMatches.push(defaultAlbum);
    }
    return next();
    
  } catch (err) {
    return next({
      log: 'error in recController.getMusic',
      message: { err }
    })
  }
};

module.exports = recController;