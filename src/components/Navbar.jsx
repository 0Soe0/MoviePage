import { Link, useLocation } from 'react-router-dom';
import '../css/Navbar.css';

export const Navbar = ({ onHomeClick }) => {
    const location = useLocation();

    const handleHomeClick = (e) => {
        // If we're already on the home page, reset it instead of navigating
        if (location.pathname === '/') {
            e.preventDefault();
            if (onHomeClick) { //If reset function passed by props from parent (App.jsx) exists
                onHomeClick(); //Call the function
            }
        }
    };

    return (
        <nav className="navbar">
            <div>
                <Link to="/" onClick={handleHomeClick}><img src="/video.png" alt="An icon of a video camera" className="navbar-img"/></Link>
            </div>
            <div className="navbar-links">
              <Link to="/" className="nav-link" onClick={handleHomeClick}>Home</Link>
              <Link to="/favorites" className="nav-link">Favorites</Link>
            </div>
        </nav>
    )
}