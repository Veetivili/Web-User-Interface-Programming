import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';

interface Movie {
  id: number;
  poster_path: string;
  original_title: string;
  release_date: string;
  overview: string;
  genres?: { id: number; name: string }[];
  videos?: {
    results?: {
      key: string;
      name: string;
    }[];
  };
}

interface MovieListItemProps {
  movie: Movie;
}

function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    axios
    .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=29725847b9558a283e8e8f82eec493d5&append_to_response=videos`)
      .then((response) => {
        setMovies(response.data.results);
      });
  }, []);

  return movies.length === 0 ? (
    <div style={{ flex: 1, padding: 20 }}>
      <p>Loading, please wait...</p>
    </div>
  ) : (
    <div style={{ flex: 1, padding: 20 }}>
      {movies.map((movie, index) => (
        <MovieListItem key={index} movie={movie} />
      ))}
    </div>
  );
}

function MovieListItem({ movie }: MovieListItemProps) {
  const [detailMovie, setMovie] = useState<Movie | null>(null);
  const [videoPressed, setVideoPressed] = useState<string | null>(null);
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=29725847b9558a283e8e8f82eec493d5&append_to_response=videos`)
      .then(response => {
        setMovie(response.data);
      });
  }, [movie.id]);

  const IMAGEPATH = 'http://image.tmdb.org/t/p/w500';
  const imageurl = IMAGEPATH + movie.poster_path;

  let genres = detailMovie?.genres?.map(genre => genre.name).join(' ') || '';

  let videoComponent: JSX.Element | null = null;
  if (detailMovie?.videos?.results && detailMovie.videos.results.length > 0) {
      videoComponent = (
        <span
          style={{ color: '#00BFFF', cursor: 'pointer' }}
          onClick={() => {
            if(detailMovie?.videos?.results) {
              setVideoPressed(detailMovie.videos.results[0].key);
            }
            setPlayVideo(true);
          }}>
          {detailMovie?.videos?.results?.[0]?.name}  // Further refined optional chaining
        </span>
      );
  }
  
  


  return (
    <div className="Movie">
      <img src={imageurl} alt={movie.original_title} />
      <p className="MovieTitle">{movie.original_title} : {movie.release_date}</p>
      <p className="MovieText">{movie.overview}</p>
      <span className="GenresText">Genres: {genres}</span><br />
      <span className="VideosText">Video: {videoComponent}</span>
      {playVideo && (
        <div className='player-wrapper'>
          <ReactPlayer
            className='react-player'
            url={`https://www.youtube.com/watch?v=${videoPressed}`}
            playing={false}
            controls={true}
            width='100%'
            height='100%'
          />
          <button className='closeButton' onClick={() => setPlayVideo(false)}>X</button>
        </div>
      )}
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
