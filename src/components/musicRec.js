
import React, { useEffect } from "react";
import { useState } from "react";

const MusicComponent = ({album}) => {
   console.log(album)

   
const [counter, setCount] = useState(0);
const [currentAlbum, setAlbum] = useState(album[0]);

useEffect(async ()=>{
    // const response = await fetch("https://open.spotify.com/embed-podcast/iframe-api/v1")
    // console.log(response)
}, [])


function handleClick(e) {
// window.location.href = currentAlbum.spotifyURL
console.log('album uri', currentAlbum.albumURI)

}

function handleScroll(e){
//props is an array

    e.preventDefault()
    setCount(counter + 1)
    if(counter === album.length - 1) setCount(0)
    setAlbum(album[counter])
    
 
}


    return (
        <div>
        <img id="album-art" src={currentAlbum.albumArtURL}></img>
        <div id="song-info"><span className="bold">Artist:</span> {currentAlbum.artistName} <span className="bold">Album:</span> {currentAlbum.albumName} </div>
        {/* <div><button id="listen-now" onClick={handleClick}>Listen Now</button></div> */}

        <div><button id="next-song" onClick={handleScroll}>Next Album</button></div>
        <iframe  src={`https://open.spotify.com/embed-legacy/album/${currentAlbum.albumURI}?utm_source=generator `}width="100%" height="380" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
    
    )
}


export default MusicComponent;