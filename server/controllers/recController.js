const fetch = require('node-fetch');

const recController = {};
// source: https://developer.spotify.com/console/get-available-genre-seeds/
const tempToken = 'BQCyS0uuyofDOY2MXwMn1R0DGx-HD4MW7m4XyoLliuC-T4oqy91R3c4OQlE3hQ8ElXQMNRcCgvEmBSzVz5ZUG03rYJcfOrpn5grBKcBPoH8OpJyWeCz3rqACEybyd7FCYPA3E1EPpKdFiJZBxyNgOCbbVmD3PX5BMjJgrsjEp852_PFffd_J2rgX2IJS4iWY2mc'
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
    const searchArray = res.locals.searchArray;
    const userToken = tempToken; // NOTE: replace with token from UserModel
    res.locals.spotifyMatches = [];
    // default playlist if no results are found
    let defaultAlbum = {
      name: 'Reading Rainbows Greatest Hits',
      artist: 'Reading Rainbow',
      image: 'https://m.media-amazon.com/images/I/81I56pR4RCL._SS500_.jpg',
      url: 'https://open.spotify.com/album/7HXEa9br4BSi46r6APyDo1',
      uri: '7HXEa9br4BSi46r6APyDo1',
      type: 'album'
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
      let match = await data.albums.items;

      // exit loop after 3 matches
      for (let i = 0; i < 3; i++) {
        let newMatch = {
          name: match[i].name,
          artist: match[i].artists[0].name,
          url: match[i].external_urls.spotify,
          id: match[i].id,
          image: match[i].images[0].url,
          type: match[i].type
        };
        res.locals.spotifyMatches.push(newMatch);
      };
    }
    if (res.locals.spotifyMatches.length == 0) {
      res.locals.spotifyMatches.push(defaultAlbum);
    }
    console.log(res.locals.spotifyMatches);
    return next();
    
  } catch (err) {
    return next({
      log: 'error in recController.getMusic',
      message: { err }
    })
  }
};

module.exports = recController;