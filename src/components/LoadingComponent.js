import React, { useEffect } from "react";
import MusicComponent from "./musicRec";
import { useState } from "react";
import controller from "../../controller";
const token = 'BQDlCmig_c6y8VxUYEp2Ih-A3YeGQUOfg_rda41jGJUiFTz8rwcQel_WjlMWPMHUZvtMdL50G7zCvkGdCKm9otCBU0oMg9mOyzX96mDIIytn0MYBVTdflG7DopVpHXZKHUEQHTduHO6DPHSJbdd9imVH-WTXhKgZXmcGZbCfIE09t6k';

const LoadingComponent = ()=>{
    const [cover, setCover] = useState([{
        title: 'default',
        url: 'default url'
    }]);
    const [loading, setLoading] = useState(true);
    const [tracks, setTracks] = useState(null)
    // const fetchTracks = async ()=> {
    //     const response = await fetch('https://631630f233e540a6d38f0ae4.mockapi.io/api/tracks');
    //     setTracks(await response.json);
    //     console.log(tracks);
    // } 
    useEffect(async ()=>{
       await fetchTracks('Moby Dick')
        .then(()=>{
            setTimeout(()=>{
                console.log('delayed for two seconds');
                setLoading(false);
   
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
        const token = 'BQDlCmig_c6y8VxUYEp2Ih-A3YeGQUOfg_rda41jGJUiFTz8rwcQel_WjlMWPMHUZvtMdL50G7zCvkGdCKm9otCBU0oMg9mOyzX96mDIIytn0MYBVTdflG7DopVpHXZKHUEQHTduHO6DPHSJbdd9imVH-WTXhKgZXmcGZbCfIE09t6k';

        let resultFromBooks = '';
        console.log('Trying to get book: ', searchString);
        const searchUrl = `https://gutendex.com/books?search=${searchString}`;
        console.log('searchUrl: ',searchUrl);
        const bookResponse = await fetch(searchUrl);
        const bookParsed = await bookResponse.json();
        const listOfSubjects = [...bookParsed.results[0].subjects];
        console.log('List of Subjects: ',listOfSubjects);
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
    if(loading){
        return(
            <div>
            <h1>Dope Beats For</h1>
           <img src="https://ai-hmi.com/wp-content/plugins/preloader-sws/assets/img/bg-true/cassette.gif"></img>
           </div>
        )
    }

    return (
        <>
        <MusicComponent
        album = {tracks}
        />
        </>
    )

}

export default LoadingComponent