
import React from "react";
import { useState } from "react";

const MusicComponent = () => {
   
    const props = testCreator();
   
const [counter, setCount] = useState(0);
const [currentTrack, setTrack] = useState(props[0])


console.log(counter);
console.log(currentTrack)

    const artistName = 'Beck';
    const songName = 'Loser'
    const albumArt = "https://i.scdn.co/image/ab67616d0000b273b07e5a0787e609bc1f1270f8"
    const songUrl = "www.spotify.com"

function handleClick(e) {
// window.location.href = currentTrack.songUrl
console.log('click handled')
}

function handleScroll(e){
//props is an array

    e.preventDefault()
    setCount(counter + 1)
    if(counter === props.length - 1) setCount(0)
    setTrack(props[counter])
    
 
}

function testCreator(){
    const result = [];

    let count = 10;

    while(count > 0){
        result.push({
            artistName: `name ${count}`,
            albumArt: `art ${count}`,
            songName: `song ${count}`,
            songUrl: `ur; ${count}`


        })
    count--
    }
    return result;
}
    return (
        // <div>
        // <img id="album-art" src={albumArt}></img>
        // <div id="song-info"><span className="bold">Artist:</span> {artistName} <span className="bold">Song:</span> {songName} </div>
        // <div><button id="listen-now" onClick={handleClick}>Listen Now</button></div>

        // <div><button id="next-song" onClick={handleScroll}>Next Song</button></div>
        // </div>
        <div>
        {/* <img id="album-art" src={currentTrack.albumArt}></img> */}
        <h1>{currentTrack.albumArt}</h1>
        <div id="song-info"><span className="bold">Artist:</span> {currentTrack.artistName} <span className="bold">Song:</span> {currentTrack.songName} </div>
        <div><button id="listen-now" onClick={handleClick}>Listen Now</button></div>

        <div><button id="next-song" onClick={handleScroll}>Next Song</button></div>
        </div>

        
    )
}


export default MusicComponent;