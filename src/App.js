import React, { useEffect, useState } from 'react';
import './App.css';
import Movie from './Components/Movie';

/**
 *  
 * For this task, you need to create a react project that will use an API to display the movie data in the UI using react.

You are free to use any UI library you want for it, the UI 
does not have to be too fancy, just make something presentable.

UI has to be responsive.

When the page loads, you need to display the list of popular 
movies in the UI.

You can get the list from this API - 
https://movie-task.vercel.app/api/popular?page=1

You need to show the movies in the UI as a grid of cards.

You need to show the loading and error states as well.

Clicking on a movie card would open a modal where you can 
show some more details about that particular movie, like 
description.

For this you have to use this api to get the details of an 
individual movie - 
https://movie-task.vercel.app/api/movie?movieId=634649

Create a filter by year select menu that will be able to 
filter the movies out depending on the year they were released.
 You will get the release_date property from the API.

Host the project and get back to us with the link to the 
project as well as a link to the github.

Note: All the image links received through the API are 
something like "/nogV4th2P5QWYvQIMiWHj4CFLU9.jpg". If you 
just use this as src of the image, it would fail. What you 
need to do is append all these links with 
https://image.tmdb.org/t/p/original. So to access the image 
path above you have to append it with the said link and the 
actual src link would be 
https://image.tmdb.org/t/p/original/nogV4th2P5QWYvQIMiWHj4CFLU9.jpg. 
For more info, check out here
* 
*/

const PopularMovie_API = "https://movie-task.vercel.app/api/popular?page=1";
const Movie_details = "https://movie-task.vercel.app/api/movie?movieId=";
const Movie_search = "https://movie-task.vercel.app/api/search?page=1&query=";
  

function App() {

  const [ movies,  setMovies ] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
      getMovies(PopularMovie_API);    
  }, []);

  const getMovies = (API) => {
    fetch(API)
    .then((res) => res.json())
    .then((data) => {
        setMovies(data.data.results);
    });
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if(searchTerm){
      console.log(searchTerm);
      getMovies(Movie_search + searchTerm);

      setSearchTerm("");
    }
  }

  
  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <div className="App">
      <header>
         <form onSubmit={handleOnSubmit}>
            <input type="number" min='1000' max='2022' className='filter-year'  onChange={handleOnChange}/>
         </form>
         <form onSubmit={handleOnSubmit}>
            <input type="search" placeholder='Search....' className='search-bar' value={searchTerm} onChange={handleOnChange} />
         </form>
      </header>
      <div className='movie-container'>
      {movies.length > 0 && movies.map((movie) => 
        <Movie key={movie.id} {...movie} />
      )}
      </div>
    </div>
  );
}

export default App;
