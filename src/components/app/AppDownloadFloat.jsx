import { useEffect, useState } from "react";
import { PLAY_STORE_URL } from "../../constants/links";
import "./styles/AppDownloadFloat.css";

const DISMISS_KEY = "cherry_app_float_dismissed_at";
const DISMISS_DAYS = 3;
const SHOW_AFTER_MS = 2500;

function AppDownloadFloat() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissedAt = Number(localStorage.getItem(DISMISS_KEY) || 0);
    const cooldownOver = Date.now() - dismissedAt > DISMISS_DAYS * 24 * 60 * 60 * 1000;
    if (!cooldownOver) return;

    const timer = setTimeout(() => setShow(true), SHOW_AFTER_MS);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="adf-root" role="complementary" aria-label="Download the Cherries Cafe app">
      <button className="adf-close" onClick={dismiss} aria-label="Dismiss">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="adf-link"
      >
        <span className="adf-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="2" width="12" height="20" rx="2" />
            <line x1="11" y1="18" x2="13" y2="18" />
          </svg>
        </span>
        <span className="adf-text">
          <strong>Get the App</strong>
          <span>Order faster on Google Play</span>
        </span>
      </a>
    </div>
  );
}

export default AppDownloadFloat;
