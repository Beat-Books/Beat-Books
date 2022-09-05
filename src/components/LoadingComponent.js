import React from "react";
import MusicComponent from "./musicRec";
import { useState } from "react";

const LoadingComponent = ()=>{
const [tracks, setTracks] = useState([]);

const fetchTracks = async () => {
    const response = await fetch('https://631630f233e540a6d38f0ae4.mockapi.io/api/tracks');
    setTracks(await response.json())
    console.log(tracks)
}





    return (
        <>
        <h1>Loading</h1>
        <button onClick={fetchTracks}>Fetch</button>
        <MusicComponent/>
        </>
    )

}

export default LoadingComponent