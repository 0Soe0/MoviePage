import '../css/Favorites.css';
import { useMovieContext } from '../context/MovieContext';
import { MovieCard } from 'components';

export const Favorites = () => {
  const { favorites } = useMovieContext();

  if(favorites) {
    return (
      <div className="favorites">
        <h2>Your Favorite Movies</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    )
  }
    return (
        <div className="favorites-empty">
            <h2>No favorite movies yet</h2>
            <p>Start adding movies to favorites to see them listed here!</p>
        </div>
    )
}