import { MovieCard } from 'components';
import { useState } from 'react';
import '../css/Home.css';

export const Home = () => {

  const [search, setSearch] = useState('');

const movies = [
    {
        id: 1,
        title: 'Movie 1',
        poster: 'image',
        release_date: '2021-01-01',
    },
    {
        id: 2,
        title: 'Movie 2',
        poster: 'image',
        release_date: '2021-01-01',
    },
    
    {
        id: 3,
        title: 'Movie 3',
        poster: 'image',
        release_date: '2021-01-01',
    },
    {
        id: 4,
        title: 'Movie 4',
        poster: 'image',
        release_date: '2021-01-01',
    }
]

const handleSearch = (e) => {
  e.preventDefault()
  console.log("pp")
  setSearch("")
}

    return (
        <div className="home">
            <form action="submit" onSubmit={handleSearch} className="search-form">
              <input type="text" placeholder="Search for a movie..." className="search-input" value={search} onChange={(e) => setSearch(e.target.value)}/>
              <button type="submit" className="search-btn">Search</button>
            </form>

            <div className="movies-grid">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
        </div>
    )
}