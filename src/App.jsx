import './css/App.css';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import { NotFound } from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components';
import { MovieProvider } from './context/MovieContext'; 
import { useState } from 'react';

export const App = () => {
  const [homeResetKey, setHomeResetKey] = useState(0);

  const handleHomeReset = () => {
    setHomeResetKey(prev => prev + 1);
  };

  return (
    <>
    <MovieProvider>
      {/* Pass the reset function to the Navbar component so that it can call it when the home link is clicked */}
      <Navbar onHomeClick={handleHomeReset} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home resetKey={homeResetKey} />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </MovieProvider>
    </>
  )
}
