import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./styles/header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const close = () => setMenuOpen(false);

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <div className="logo">
          <img src="/logos/cherry_logo.png" alt="Cherries Restaurant Logo" />
          <span>CHERRIES</span>
        </div>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <Link to="/" onClick={close} className={location.pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={close} className={location.pathname === "/about" ? "active" : ""}>
              About
            </Link>
          </li>
          <li>
            <Link to="/menu" onClick={close} className={location.pathname === "/menu" ? "active" : ""}>
              Menu
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={close} className={location.pathname === "/contact" ? "active" : ""}>
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/scratch-and-win"
              onClick={close}
              className={`nav-scratch-link ${location.pathname === "/scratch-and-win" ? "active" : ""}`}
              aria-label="Scratch and Win — daily combo offer"
            >
              Scratch &amp; Win
            </Link>
          </li>
        </ul>

        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
}

export default Header;