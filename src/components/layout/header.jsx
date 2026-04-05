// src/components/layout/header.jsx — Mobile-first navigation
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import "./styles/header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const close = () => setMenuOpen(false);
  const rewardsPath  = user ? "/rewards" : "/login";
  const cateringPath = "/catering";

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <Link to="/" className="logo" onClick={close}>
          <img src="/logos/cherry_logo.png" alt="Cherries Restaurant Logo" />
          <span>CHERRIES</span>
        </Link>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <Link to="/" onClick={close}
              className={location.pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={close}
              className={location.pathname === "/about" ? "active" : ""}>
              About
            </Link>
          </li>
          <li>
            <Link to="/menu" onClick={close}
              className={location.pathname === "/menu" ? "active" : ""}>
              Menu
            </Link>
          </li>

          <li>
            <Link to="/contact" onClick={close}
              className={location.pathname === "/contact" ? "active" : ""}>
              Contact
            </Link>
          </li>

          {/* ── Catering + Rewards as side-by-side pills on mobile ── */}
          <li className="nav-actions-row">
            <Link
              to={cateringPath}
              onClick={close}
              className={`nav-action-btn nav-action-btn--catering${location.pathname === "/catering" ? " active" : ""}`}
            >
              <svg
                width="14" height="14"
                viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <line x1="8" y1="6" x2="8" y2="12" />
                <path d="M6 6a2 2 0 014 0v2H6V6z" />
                <line x1="8" y1="12" x2="8" y2="20" />
                <line x1="16" y1="6" x2="16" y2="20" />
                <path d="M14 6c0 0 2-1 2 3s-2 3-2 3" />
              </svg>
              <span>Catering</span>
            </Link>

            <Link to={rewardsPath} onClick={close} className="nav-action-btn nav-action-btn--rewards">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>Rewards</span>
              {user && (
                <span className="nav-rewards-pts">{user.points ?? 0} pts</span>
              )}
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
