
import React from "react";
import { useState } from "react";

const MusicComponent = ({album}) => {
   console.log(album)

   
const [counter, setCount] = useState(0);
const [currentAlbum, setAlbum] = useState(album[0]);




function handleClick(e) {
window.location.href = currentAlbum.spotifyURL
console.log('album link', currentAlbum.spotifyURL)
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
        <div><button id="listen-now" onClick={handleClick}>Listen Now</button></div>

        <div><button id="next-song" onClick={handleScroll}>Next Song</button></div>
        </div>
    
    )
}


export default MusicComponent;