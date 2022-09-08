import React, { useEffect } from 'react';
import { useState } from 'react';
// import "../stylesheet/styles.css";
import '../stylesheet/musicRecStyles.css';
import { Navigate, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const MusicContainer = ({ album, subjects }) => {
  console.log(album);

  const [counter, setCount] = useState(0);
  const [currentAlbum, setAlbum] = useState(album[0]);
  const navigate = useNavigate();
  useEffect(async () => {
    // const response = await fetch("https://open.spotify.com/embed-podcast/iframe-api/v1")
    // console.log(response)
  }, []);

  function handleClick(e) {
    navigate('/');
    console.log('subjects', subjects);
  }

  function handleScroll(e) {
    //props is an array

    e.preventDefault();
    setCount(counter + 1);
    if (counter === album.length - 1) setCount(0);
    setAlbum(album[counter]);
  }
  const listArr = [];

  subjects.forEach((element, i) => {
    listArr.push(<li id={i}>{element} </li>);
  });

  useEffect(() => {
    if (!sessionStorage.getItem('loggedIn')) {
      navigate('/');
    }
  }, []);

  return (
    <div id='dope-beats' className='container'>
      <NavBar />
      <div className='dope-beats'>
        <h3>Dope Beats To Pair With Hints Of...</h3>
      </div>
      <div className='subjects-list'>
        <ul>{listArr}</ul>
      </div>
      <div className='album-art'>
        <img id='album-art' src={currentAlbum.albumArtURL}></img>
      </div>
      <div id='song-info' className='artist-info'>
        ARTIST:{currentAlbum.artistName}{' '}
      </div>
      <div className='album-info'>ALBUM: {currentAlbum.albumName} </div>
      <div className='next-album'>
        <button id='next-song' onClick={handleScroll} className='submitButton'>
          Next Album
        </button>
      </div>
      <div className='search-again'>
        <button id='listen-now' onClick={handleClick} className='submitButton'>
          Search Again
        </button>
      </div>
      <div className='web-player'>
        <iframe
          src={`https://open.spotify.com/embed-legacy/album/${currentAlbum.albumURI}?utm_source=generator `}
          width='100%'
          height='380'
          frameBorder='0'
          allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
          loading='lazy'
          id='web-player'
        ></iframe>
      </div>
    </div>
  );
};

export default MusicContainer;
