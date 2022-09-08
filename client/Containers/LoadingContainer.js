import React, { useEffect } from "react";
import MusicComponent from "./musicRec";
import { useState } from "react";
import controller from "../../controller";
//const token = 'BQCY3iCemJ3XgdjAwJaFwVLZXQBQRczK6mAe9QrZWmc3WDLhHLHOZDHeGjmr4WuFwmyrKXT-9wDIr9gfylQLZwmhyp5PpZhbxzft-ed-fUA0VmjQYD0g-3VnGAKcfJ9yBALl-EPggufyGJ479Jd74MrLaM1dm__weH1wTPWmhnX8J0g';
import BeatLoader from "react-spinners/BeatLoader";
import { useLocation } from "react-router-dom";


const LoadingContainer = ()=>{
    const [cover, setCover] = useState([{
        title: 'default',
        url: 'default url'
    }]);
    const [loading, setLoading] = useState(true);
    const [tracks, setTracks] = useState(null);
    const [subjects, setSubjects] = useState(null);

    const {state} = useLocation();
    const { book, author} = state;
    // const fetchTracks = async ()=> {
    //     const response = await fetch('https://631630f233e540a6d38f0ae4.mockapi.io/api/tracks');
    //     setTracks(await response.json);
    //     console.log(tracks);
    // } 
    useEffect(async ()=>{
       await fetchTracks(`${book} ${author}`)
        .then(()=>{
            setTimeout(()=>{
                console.log('delayed for two seconds');
                setLoading(false);
                console.log('logging passed state', book, author, state)
            }, 2000)
        })
        .catch((err)=>{
            if(err) console.log(err)
        })
        // .then(async()=>{
        //     const tracksArr = await fetchTracks(cover.title);
        //     setLoading(false)
        // })
    }, [])

    // const fetchCover = async (Search)=> {
       
    //     let coverSearch = 'jack london'
    //     const response = await fetch(`https://gutendex.com/books?search=${coverSearch}`);
    //     const parsed = await response.json();
    //     const title = parsed.results[0].title;
    //     const url = parsed.results[0].formats['image/jpeg']
    //     const bookInfo = { 
    //         title,
    //         url
    //     }
    //     setCover(bookInfo);
        
        
    // } 
    const fetchTracks = async (searchString) => {
        const token = 'BQBm6fX3D_pQLZIC9WU9UJgpsruqTY5VBDKl9I5Aidan-wjsjqf0dRPImNYVk5O95Vh1BngLKUItuUIl73KvvS-YS6RLhvnBYBK7wllsimlRC045d_b1MAyStm6IxOPhZjyROSiEljU5ZOydNYtvAOZ4Ym2BVl8jDq_3LdYQtmR8-JI';

        let resultFromBooks = '';
        console.log('Trying to get book: ', searchString);
        const searchUrl = `https://gutendex.com/books?search=${searchString}`;
        console.log('searchUrl: ',searchUrl);
        const bookResponse = await fetch(searchUrl);
        const bookParsed = await bookResponse.json();
        const listOfSubjects = [...bookParsed.results[0].subjects];
        console.log('List of Subjects: ',listOfSubjects);
        setSubjects(listOfSubjects);
        listOfSubjects.forEach(el => {
            resultFromBooks += el.split(' ')[0]+' ';
        })
        console.log('Search string for Spotify: ',resultFromBooks);
        const spotifySearchUrl = `https://api.spotify.com/v1/search?type=album&q=${resultFromBooks}`
        const config = {
            headers: {
                "Authorization" : "Bearer "+token,
                'Content-Type': 'application/json',
            },
        }
        const spotifyResponse = await fetch(spotifySearchUrl, config)
        console.log('Spotify resonse: ',spotifyResponse)
        const spotifyParsed = await spotifyResponse.json();
        const albums = [];
        for (let i = 0; i < spotifyParsed.albums.items.length; i++){
            const artistName = ''+spotifyParsed.albums.items[i].artists[0].name;
            const albumName = ''+''+spotifyParsed.albums.items[i].name;
            const albumURI = ''+''+spotifyParsed.albums.items[i].uri.slice(14);
            const albumArtURL = ''+spotifyParsed.albums.items[i].images[0].url
            const spotifyURL = ''+spotifyParsed.albums.items[i].external_urls.spotify;
            const albumInfo = { artistName, albumName, albumArtURL, spotifyURL, albumURI };
            albums.push(albumInfo);
        }
        
        console.log('albumInfo: ', albums)
        setTracks(albums)
        return albums;
    }
    const quotes = [
        "\“A reader lives a thousand lives before he dies...The man who never reads lives only one.\” - George R.R.Martin",
        "\“Until I feared I would lose it, I never loved to read. One does not love breathing.\” - Harper Lee",
        "\“Never trust anyone who has not brought a book with them.\” - Lemony Snicket",
        "\“You can never get a cup of tea large enough or a book long enough to suit me.\” - C.S. Lewis",
        "\“I find television very educating. Every time somebody turns on the set, I go into the other room and read a book.\” - Groucho Marx",
        "\“Thats the thing about books. They let you travel without moving your feet.\” - Jhumpa Lahiri",
        "\“In the case of good books, the point is not to see how many of them you can get through, but rather how many can get through to you.\” - Mortimer J. Adler",
        "\“Reading one book is like eating one potato chip.\” - Diane Duane",
        "\“The more that you read, the more things you will know. The more that you learn, the more places you’ll go.\” - Dr. Seuss",
        "\“Fill your house with stacks of books, in all the crannies and all the nooks.\” - Dr. Seuss"
    ];
    function randomQuote() {
        const random = Math.floor(Math.random() * quotes.length);
        return quotes[random];
    }
    if(loading){
        return(
            <div className="loadingBox">
            <h1>Loading Beats</h1>
            <BeatLoader />
            <h3>{randomQuote()}</h3>
        </div>
        )
    }

    return (
        <>
        <MusicComponent
        album = {tracks}
        subjects = {subjects}
        />
        </>
    )

}

export default LoadingContainer