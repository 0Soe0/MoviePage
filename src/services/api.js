// API key is loaded from environment variables
// In Vite, environment variables must be prefixed with VITE_ to be accessible in the browser
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_URL = 'https://api.themoviedb.org/3';

// Throw error if API key is missing - fail fast to prevent broken API calls
if (!API_KEY) {
  throw new Error(
    'VITE_TMDB_API_KEY is not defined in environment variables.\n' +
    'Please create a .env file in the movies folder with:\n' +
    'VITE_TMDB_API_KEY=your_api_key_here\n' +
    'Then restart your dev server.'
  );
}

export const getPopularMovies = async (page = 1) => {
  const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
  const data = await response.json();
  return {
    results: data.results,
    totalPages: data.total_pages,
    currentPage: data.page
  };
}

export const searchMovies = async (query, page = 1) => {
  // encodeURIComponent is used to encode the query so that it can be used in the URL
  const response = await fetch(`${API_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`); 
  const data = await response.json();
  return {
    results: data.results,
    totalPages: data.total_pages,
    currentPage: data.page
  };
}

export const getMovieDetails = async (movieId) => {
  const response = await fetch(`${API_URL}/movie/${movieId}?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  const data = await response.json();
  return data;
}