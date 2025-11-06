import './css/App.css';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import { NotFound } from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components';

export const App = () => {
  return (
    <>
    <div>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
    </>
  )
}
