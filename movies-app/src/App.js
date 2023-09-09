import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import React from 'react'
import ReactPlayer from 'react-player/youtube'


function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
    .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=29725847b9558a283e8e8f82eec493d5&append_to_response=videos`)
    .then((response) => {
      setMovies(response.data.results);
      
    })
  }, []);

  if (movies.length === 0) {
    return(
      <div style={{flex: 1, padding: 20}}>
        <p>Loading, please wait...</p>
      </div>
    )
  } else {
      const movieItems = movies.map((movie,index) =>
        <MovieListItem key={index} movie={movie}/>
      );
  
    return(
      <div style={{flex: 1, padding: 20}}>
        {movieItems}
      </div>
    )
  }};

function MovieListItem(props) {
  const [movie, setMovie] = useState([]);
  const [videoPressed, setVideoPressed] = useState([]);
  const [playVideo, setPlayVideo] = useState(false);

useEffect(() => {
  axios
    .get('https://api.themoviedb.org/3/movie/'+props.movie.id+'?api_key=29725847b9558a283e8e8f82eec493d5&append_to_response=videos')
    .then(response => {
      setMovie(response.data)
    })
}, [])

let IMAGEPATH = 'http://image.tmdb.org/t/p/w500'
let imageurl = IMAGEPATH + props.movie.poster_path;

// get genres
var genres = "";  
if (movie !== undefined && movie.genres !== undefined) {
  for (var i=0;i<movie.genres.length;i++) {
    genres += movie.genres[i].name+" ";
  }
}

// get first youtube video
var video = "";
if (movie !== undefined && movie.videos !== undefined && movie.videos.results !== undefined) {
  video = <span style={{color:'#00BFFF', cursor:'pointer'}} onClick={() => {setVideoPressed(movie.videos.results[0].key); setPlayVideo(true)}}>{movie.videos.results[0].name}</span>
} 

// render close button if playVideo state is true
let closeButton = null;
if (playVideo) {
  closeButton = <button className='closeButton' onClick={() => setPlayVideo(false)}>X</button>
}

// render ReactPlayer component if playVideo state is true
let player = null;

if (playVideo) {
  player = 
  <div className='player-wrapper'>
  <ReactPlayer
  className='react-player'
   url={`https://www.youtube.com/watch?v=${videoPressed}`} 
   playing = {false}
   controls = {true}
   width='100%'
   height='100%'
  />
  {closeButton}
  </div>
}


return(
  <div className="Movie">
    <img src={imageurl}/>
    <p className="MovieTitle">{props.movie.original_title} : {props.movie.release_date}</p>
    <p className="MovieText">{props.movie.overview}</p>
    <span className="GenresText">Genres: {genres}</span><br/>
    <span className="VideosText">Video: {video}</span>
    {player}
  </div> 
);
}




function App() {


  return (
    <div className="App">
      <h1 className='h1Title'>Now Playing</h1>
      <MovieList />
    </div>
  );
}

export default App;
