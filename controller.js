const controller = {};
const token = 'BQA2kkKxw1slctyXxMDzr7RWhbocI6uMe7dwukLkjBk7mG9EEoYQepahA48-3CRTRj4VPTqN2S3Eg4nfs5iprKv3LHxJ-zQmpQTbAcv-NK9epcGpyhUXrB2iGAf0b-2h007Q9WhMCKk88O4xXtn_ijSzOc5TatToBETEzSa2B3GgE-4';

controller.bookToMusic = (searchString) => {
    let resultFromBooks = '';
    console.log('Trying to get book: ',searchString);
    //const searchUrl = 'https://gutendex.com/books?search='+searchString;
    const searchUrl = `https://gutendex.com/books?search=${searchString}`
    console.log('searchUrl: ',searchUrl);
    fetch(searchUrl)
        .then((response) => response.json())
        .then((data) => {
            const listOfSubjects = [...data.results[0].subjects];
            console.log('List of Subjects: ',listOfSubjects);
            listOfSubjects.forEach(el => {
                resultFromBooks += el.split(' ')[0]+' ';
            })
            console.log('Search string for Spotify: ',resultFromBooks);
            //spotify fetch goees here
            const spotifySearchUrl = `https://api.spotify.com/v1/search?type=album&q=${resultFromBooks}`
            fetch(spotifySearchUrl, {
                headers: {
                    "Authorization" : "Bearer "+token,
                    "Content-Type": "application/json"
                }
            })
                .then((response) => {
                    //console.log('Unparsed response from spotify: ',response);
                    return response.json();
                })
                .then((data) => {
                    //console.log('name?: ',data.albums.items[0])
                    const artistName = ''+data.albums.items[0].artists[0].name;
                    const albumName = ''+''+data.albums.items[0].name;
                    const albumArtURL = ''+data.albums.items[0].images[0].url
                    const spotifyURL = ''+data.albums.items[0].external_urls.spotify;
                    const albumInfo = { artistName, albumName, albumArtURL, spotifyURL };
                    console.log('albumInfo: ', albumInfo)
                    return albumInfo;
                    // artist name
                    // album name
                    // album art
                    // uri/url to album
                })
                .catch((err) => {
                    console.log('Error in spotify fetch: ',err);
                })
        })  
        .catch((err) => {
            console.log('Error in bookGet: ',err);
            return {
                artistName: 'Could not find book.',
                albumName: 'Sorry :(',
                albumArtURL: 'image of sad face',
                spotifyUrl: 'url'
            }
        });
    //get request to the gutendex
    //return a genre/bookshelf/search term
    //return resultFromBooks;
}

controller.bookCover = (searchString) => {
    console.log('Trying to get book cover: ',searchString);
    const searchUrl = `https://gutendex.com/books?search=${searchString}`
    console.log('searchUrl: ',searchUrl);
    fetch(searchUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log('Book Cover URL: ',data.results[0].formats['image/jpeg'])
        })
}

export default controller;