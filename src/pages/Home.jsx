import { MovieCard } from 'components';
import { useState, useEffect, useRef, useCallback } from 'react';
import '../css/Home.css';
import { searchMovies, getPopularMovies } from '../services/api';

export const Home = ({ resetKey }) => {

  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const observerTarget = useRef(null);

  // Reset function to reload popular movies
  const resetHome = useCallback(async () => {

    //Reset all state to initial values
    setSearch('');
    setSearchQuery('');
    setIsSearching(false);
    setCurrentPage(1);
    setError(null);
    setLoading(true);

    //Load popular movies
    try {
      const response = await getPopularMovies(1);
      const moviesWithImages = response.results.filter(movie => movie.poster_path);
      setMovies(moviesWithImages);
      setCurrentPage(response.currentPage);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error loading popular movies:', error);
      setError('Failed to load movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Reset when resetKey changes
  useEffect(() => {
    if (resetKey > 0) {
      resetHome();
    }
  }, [resetKey, resetHome]);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        setLoading(true);
        const response = await getPopularMovies(1);
        // Filter out movies without poster images
        const moviesWithImages = response.results.filter(movie => movie.poster_path);
        setMovies(moviesWithImages);
        setCurrentPage(response.currentPage);
        setTotalPages(response.totalPages);
        setIsSearching(false);
      } catch (error) {
        console.error('Error loading popular movies:', error);
        setError('Failed to load movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    loadPopularMovies();
}, []);

  const loadMoreMovies = useCallback(async () => {
    //cant load more movies if we are already loading more or if we are at the last page
    if (loadingMore || currentPage >= totalPages) return;

    try {
      setLoadingMore(true);
      const nextPage = currentPage + 1;
      
      // Load more based on whether we're searching or viewing popular movies
      let response;
      if (isSearching && searchQuery) {
        response = await searchMovies(searchQuery, nextPage);
      } else {
        response = await getPopularMovies(nextPage);
      }
      
      // Filter out movies without poster images
      const moviesWithImages = response.results.filter(movie => movie.poster_path);
      setMovies(prevMovies => [...prevMovies, ...moviesWithImages]);
      setCurrentPage(response.currentPage);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error loading more movies:', error);
      setError('Failed to load more movies. Please try again later.');
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, currentPage, totalPages, isSearching, searchQuery]);

  // Infinite scroll effect - works for both popular movies and search results
  useEffect(() => {
    // Only enable infinite scroll when not loading
    if (loading || loadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && currentPage < totalPages) {
          loadMoreMovies();
        }
      },
      { threshold: 0.1 }
    );

    // Capture the current ref value to use in cleanup
    const currentTarget = observerTarget.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [currentPage, totalPages, loading, loadingMore, loadMoreMovies]);

const handleSearch = async (e) => {
  e.preventDefault()
  
  // if the search is a bunch of blank spaces, we dont search for anything
  if(!search.trim()) {
    // Reset to popular movies if search is cleared
    setIsSearching(false);
    setSearchQuery('');
    setCurrentPage(1);
    const response = await getPopularMovies(1);
    const moviesWithImages = response.results.filter(movie => movie.poster_path);
    setMovies(moviesWithImages);
    setTotalPages(response.totalPages);
    return;
  }
  //cant search if we are still loading a previous search
  if(loading || loadingMore) return;
  setLoading(true);
  setIsSearching(true);
  setSearchQuery(search.trim());

  try {
    const response = await searchMovies(search.trim(), 1);
    // Filter out movies without poster images
    const moviesWithImages = response.results.filter(movie => movie.poster_path);
    setMovies(moviesWithImages);
    setCurrentPage(response.currentPage);
    setTotalPages(response.totalPages);
    setError(null);
  } catch (error) {
    console.error('Error searching movies:', error);
    setError('Failed to search movies. Please try again later.');
  } finally {
    setLoading(false);
  }
}

    return (
        <div className="home">
            <form action="submit" onSubmit={handleSearch} className="search-form">
              <input type="text" placeholder="Search for a movie..." className="search-input" value={search} onChange={(e) => setSearch(e.target.value)}/>
              <button type="submit" className="search-btn">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
              <div className="loading-message">Loading...</div>
            ) : (
              <>
                <div className="movies-grid">
                  {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
                {/* Infinite scroll trigger - show when more pages available */}
                {currentPage < totalPages && (
                  <div ref={observerTarget} className="scroll-trigger">
                    {loadingMore && <div className="loading-message">Loading more movies...</div>}
                  </div>
                )}
              </>
            )}
        </div>
    )
}