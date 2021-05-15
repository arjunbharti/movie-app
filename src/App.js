import React from 'react'
import Movie from './components/Movie'
import {useEffect, useState } from 'react'

const MOVIE_API="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=17c2b56f1cc05ee20c1361334d63545d";
const SEARCH_API="https://api.themoviedb.org/3/search/movie?&api_key=17c2b56f1cc05ee20c1361334d63545d&query=";

function App() {
  const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
      getMovies(MOVIE_API);
    }, []);

    const getMovies = (API) => {
      fetch(API)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
        });
    }

    const handleOnSubmit = (e) => {
      e.preventDefault();

      if(searchTerm){
        getMovies(SEARCH_API + searchTerm);
        
        setSearchTerm("");  
      }
    };

    const handleOnChange = (e) => {
      setSearchTerm(e.target.value);
    }
  return (
      <>
        <header>
          <h1 className="site-name">Movie Stack</h1>
          <form onSubmit={handleOnSubmit}>
            <input 
              className="search" 
              type="search" 
              placeholder="Search..."
              value={searchTerm}
              onChange={handleOnChange}
            />
          </form>
        </header>
        <div className="movie-container">
          {movies.length > 0 && 
            movies.map((movie) => <Movie key={movie.id} {...movie} />)
          }
        </div>
        </>
  );
}

export default App;
