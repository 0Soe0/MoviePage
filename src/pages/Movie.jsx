import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieDetails } from '../services/api';
import '../css/Movie.css';

export const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);
                setError(null);
                const movieData = await getMovieDetails(id);
                setMovie(movieData);
            } catch (err) {
                console.error('Error fetching movie details:', err);
                setError('Failed to load movie details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchMovie();
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!movie) {
        return <div>Movie not found</div>;
    }

    return (
        <div className="movie-container">
          <div className="movie-details-header">
            <div className="movie-rating-container">
              <p>Rating: {movie.vote_average}</p>
              <p>Votes: {movie.vote_count}</p>
            </div>
            <h1 className="movie-title">{movie.title}</h1>
          </div>
          <div className="movie-details-container">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <div className="movie-details">
              <p className="movie-overview">{movie.overview}</p>
              <p className="movie-release-date">{movie.release_date.split('-')[0]}</p>
              <div className="movie-genres-container">
                {movie.genres?.map(genre => (
                  <span className="movie-genre" key={genre.id}>{genre.name}</span>
                ))}
              </div>
            </div>
          </div>
      </div>
    )
}