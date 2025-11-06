import '../css/MovieCard.css';

export const MovieCard = ({movie}) => {

const onFavoriteClick = () => {
    console.log('Favorite clicked')
}

    return (
        <div className="movie-card">
          <img src={movie.poster} alt={movie.title} />
            <div className="movie-overlay">
              <button className="favorite-btn" onClick={onFavoriteClick}>
                ♥
              </button>
            </div>
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-year">{movie.release_date}</p>
            </div>
        </div>
    )
}