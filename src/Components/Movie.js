import React from 'react';
import './movie.css';

const Movie_img = "https://image.tmdb.org/t/p/original";
const Movie = ({ title, poster_path, overview, vote_average, release_date}) => (
    <div className='movie'>
       <img src={Movie_img + poster_path} alt={title}></img>
       <div className='movie-info'>
            <h3>{title}</h3>
            <span>{vote_average}</span>
            
       </div>
       <div className='movie-overview'>
            <h3>Overview</h3>
            <p>{overview}</p>
       </div>
    </div>
);

export default Movie;
