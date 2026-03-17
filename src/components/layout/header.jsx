import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext"; // ← NEW
import "./styles/header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth(); // ← NEW

  const close = () => setMenuOpen(false);

  // Rewards goes to /rewards if logged in, /login if not
  const rewardsPath = user ? "/rewards" : "/login"; // ← NEW

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <div className="logo">
          <img src="/logos/cherry_logo.png" alt="Cherries Restaurant Logo" />
          <span>CHERRIES</span>
        </div>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <Link
              to="/"
              onClick={close}
              className={location.pathname === "/" ? "active" : ""}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              onClick={close}
              className={location.pathname === "/about" ? "active" : ""}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/menu"
              onClick={close}
              className={location.pathname === "/menu" ? "active" : ""}
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={close}
              className={location.pathname === "/contact" ? "active" : ""}
            >
              Contact
            </Link>
          </li>

          {/* ── Rewards nav item ── */}
          <li>
            <Link
              to={rewardsPath}
              onClick={close}
              className="nav-rewards-link"
            >
              <svg
                width="14" height="14"
                viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              Rewards
              {/* Show point balance if logged in */}
              {user && (
                <span className="nav-rewards-pts">{user.points ?? 0} pts</span>
              )}
            </Link>
          </li>
          {/* ── end Rewards ── */}
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