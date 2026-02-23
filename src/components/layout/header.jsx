import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./styles/header.css";
function header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="nav-container">
         <div className="logo">
          <img src="/logos/cherry_logo.png" alt="Cherries Restaurant Logo" />
          <span >CHERRIES</span>
        </div>
        {/* <div className="search">
          <input type="text" placeholder="Search dishes..." className="search-input"/>
          <FaSearch className="search-icon" />
        </div> */}
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/menu" onClick={() => setMenuOpen(false)}>Menu</Link></li>
          <li><Link to="/contact"   onClick={() => setMenuOpen(false)}>Contact</Link></li>
        </ul>
         <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
        </div>
    </nav>
  );
}
export default header;
