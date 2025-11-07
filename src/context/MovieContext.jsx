import { createContext, useState, useContext, useEffect } from 'react';

const MovieContext = createContext();

// Custom hook to use the movie context
// eslint-disable-next-line react-refresh/only-export-components
export const useMovieContext = () => useContext(MovieContext);

// Provider component to wrap the app and provide the movie context to the children
export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    // Load favorites from localStorage on mount
    useEffect(() => {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        // Parse the stored favorites, (convert from text to object) and set the state
          setFavorites(JSON.parse(storedFavorites));
      }
    }, []);

    // Save favorites to localStorage whenever the state changes
    useEffect(() => {
      // Convert the favorites array to a string and save to localStorage
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (movie) => {
      setFavorites(prev => [...prev, movie]);
    }

    const removeFromFavorites = (movieId) => {
      setFavorites(prev => prev.filter(movie => movie.id !== movieId));
    }

    const isFavorite = (movieId) => {
      return favorites.some(movie => movie.id === movieId);
    }

    // Value object to provide to the children components
    const value = {
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite
    }
    
    return (
      // Provide the value to the children components
      <MovieContext.Provider value={value}>
        {/* Render the children components */}
        {children}
      </MovieContext.Provider>
    )
}