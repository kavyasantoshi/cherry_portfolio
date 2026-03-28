import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../home/styles/Slider.css";
import CateringSlide from "./CateringSlide";
import "./styles/CateringSlide.css";

const slides = [
  { type: "rewards" },
  { type: "catering" },
  {
    type: "image",
    image: "/images/hero/idly_sambar.webp",
    label: "Breakfast Special",
    title: "WELCOME!",
    subtitle: "Cherries Veg Restaurant",
  },
  {
    type: "image",
    image: "/images/hero/starter.webp",
    label: "Starters & Snacks",
    title: "Authentic Taste",
    subtitle: "Pure Veg Delicious",
  },
  {
    type: "image",
    image: "/images/hero/panner-biryani.webp",
    label: "Main Course",
    title: "Fresh & Flavorful",
    subtitle: "Made With Love",
  },
];

/* ================================================================
   REWARDS SLIDE  — light cream/orange, matches site theme
   ================================================================ */

const WHEEL_SEGMENTS = [
  { color: "#fff3e0", deg: 0, sweep: 144 },
  { color: "#ffe0c2", deg: 144, sweep: 108 },
  { color: "#f97316", deg: 252, sweep: 54 },
  { color: "#ea580c", deg: 306, sweep: 36 },
  { color: "#fb923c", deg: 342, sweep: 14 },
  { color: "#ffffff", deg: 356, sweep: 4 },
];

const WHEEL_LABELS = [
  { mid: 72, text: "1 pt", color: "#c2410c" },
  { mid: 198, text: "2 pts", color: "#c2410c" },
  { mid: 279, text: "5 pts", color: "#fff" },
  { mid: 324, text: "10 pts", color: "#fff" },
  { mid: 349, text: "50 pts", color: "#fff" },
  { mid: 358, text: "100", color: "#ea580c" },
];

function buildWheelGradient() {
  return `conic-gradient(${WHEEL_SEGMENTS.map(
    (s) => `${s.color} ${s.deg}deg ${s.deg + s.sweep}deg`,
  ).join(", ")})`;
}

function RewardsSlide() {
  const { user } = useAuth();
  const ctaPath = user ? "/rewards" : "/login";

  return (
    <div className="rsl-root">
      {/* ── Warm background matching hero gradient ── */}
      <div className="rsl-bg" aria-hidden="true">
        <div className="rsl-bg-blob rsl-bg-blob--1" />
        <div className="rsl-bg-blob rsl-bg-blob--2" />
        <div className="rsl-bg-blob rsl-bg-blob--3" />
        <div className="rsl-bg-dots" />
      </div>

      {/* ── Layout ── */}
      <div className="rsl-inner">
        {/* Left — copy */}
        <div className="rsl-left">
          <div className="rsl-pill">
            <div className="rsl-pill-dot" />
            Cherries Rewards
          </div>

          <h2 className="rsl-heading">
            Spin Daily,
            <br />
            <em>Save Every Visit</em>
          </h2>

          <p className="rsl-body">
            One free spin every day. Win points, unlock dining offers and redeem
            at the counter.
          </p>

          <div className="rsl-stats">
            <div className="rsl-stat">
              <span className="rsl-stat-num">1×</span>
              <span className="rsl-stat-label">Free spin daily</span>
            </div>
            <div className="rsl-stat-sep" />
            <div className="rsl-stat">
              <span className="rsl-stat-num">100</span>
              <span className="rsl-stat-label">Max pts / spin</span>
            </div>
            <div className="rsl-stat-sep" />
            <div className="rsl-stat">
              <span className="rsl-stat-num">₹60</span>
              <span className="rsl-stat-label">Top offer value</span>
            </div>
          </div>

          <Link to={ctaPath} className="rsl-cta">
            {user ? "Open Dashboard" : "Start Earning — Free"}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          <div className="rsl-trust">
            <span>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              No app needed
            </span>
            <span>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Free to join
            </span>
            <span>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Dine-in &amp; Takeaway
            </span>
          </div>
        </div>

        {/* Right — decorative spin wheel */}
        <div className="rsl-right" aria-hidden="true">
          <div className="rsl-wheel-halo" />

          <div className="rsl-wheel-wrap">
            {/* Dashed outer ring */}
            <div className="rsl-ring rsl-ring--outer" />
            <div className="rsl-ring rsl-ring--inner" />

            {/* Pointer triangle */}
            <div className="rsl-pointer">
              <svg width="22" height="30" viewBox="0 0 22 30" fill="none">
                <path d="M11 30L1 2h20L11 30z" fill="#f97316" />
                <path d="M11 26L3 6h16L11 26z" fill="#ea580c" />
                <circle cx="11" cy="6" r="2.5" fill="rgba(255,255,255,0.5)" />
              </svg>
            </div>

            {/* Wheel disc */}
            <div
              className="rsl-wheel"
              style={{ background: buildWheelGradient() }}
            >
              {WHEEL_SEGMENTS.map((s, i) => (
                <div
                  key={i}
                  className="rsl-spoke"
                  style={{ transform: `rotate(${s.deg}deg)` }}
                />
              ))}
              {WHEEL_LABELS.map((l, i) => (
                <span
                  key={i}
                  className="rsl-wheel-label"
                  style={{
                    transform: `rotate(${l.mid}deg) translateY(-52px)`,
                    color: l.color,
                  }}
                >
                  {l.text}
                </span>
              ))}
            </div>

            {/* Center hub */}
            <div className="rsl-hub">
              <span>SPIN</span>
            </div>
          </div>

          {/* Floating result pills */}
          <div className="rsl-float-card rsl-float-card--a">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            +10 pts earned
          </div>
          <div className="rsl-float-card rsl-float-card--b">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 12V22H4V12" />
              <path d="M22 7H2v5h20V7z" />
              <path d="M12 22V7" />
              <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" />
              <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
            </svg>
            ₹60 offer unlocked
          </div>
        </div>
      </div>

      {/* ── Bottom marquee strip — orange matches hero ── */}
      <div className="rsl-strip" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i}>
            CHERRIES REWARDS &middot; SPIN DAILY &middot; EARN POINTS &middot;
            UNLOCK OFFERS &middot;
          </span>
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   COMING SOON MODAL  (unchanged)
   ================================================================ */
function ComingSoonModal({ onClose }) {
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="cs-backdrop"
      onClick={handleBackdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className="cs-modal">
        <button className="cs-close" onClick={onClose} aria-label="Close">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="cs-icon-wrap" aria-hidden="true">
          <span className="cs-rocket">🚀</span>
          <div className="cs-icon-ring" />
        </div>
        <h3 className="cs-title">Coming Soon!</h3>
        <p className="cs-body">
          The <strong>Cherries Cafe App</strong> is currently in development.
          Stay tuned!
        </p>
        <div className="cs-progress-wrap">
          <div className="cs-progress-label">
            <span>Development progress</span>
            <span className="cs-progress-pct">72%</span>
          </div>
          <div className="cs-progress-track">
            <div className="cs-progress-fill" />
          </div>
        </div>
        <a href="/menu" className="cs-menu-btn" onClick={onClose}>
          Browse Our Menu Instead →
        </a>
        <p className="cs-fine">
          We'll notify you once it's live on Google Play
        </p>
      </div>
    </div>
  );
}

/* ================================================================
   MAIN SLIDER
   ================================================================ */
function Slider() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [direction, setDirection] = useState("next");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const progressRef = useRef(null);
  const DURATION = 5000;

  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) progressRef.current = requestAnimationFrame(tick);
    };
    progressRef.current = requestAnimationFrame(tick);
    const timer = setTimeout(() => goNext(), DURATION);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(progressRef.current);
    };
  }, [current]);

  const goNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection("next");
    setPrev(current);
    setCurrent((c) => (c + 1) % slides.length);
    setTimeout(() => {
      setPrev(null);
      setIsTransitioning(false);
    }, 1000);
  };
  const goPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection("prev");
    setPrev(current);
    setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
    setTimeout(() => {
      setPrev(null);
      setIsTransitioning(false);
    }, 1000);
  };
  const goTo = (index) => {
    if (isTransitioning || index === current) return;
    setIsTransitioning(true);
    setDirection(index > current ? "next" : "prev");
    setPrev(current);
    setCurrent(index);
    setTimeout(() => {
      setPrev(null);
      setIsTransitioning(false);
    }, 1000);
  };

  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);
  const currentSlide = slides[current];

  return (
    <>
      <section className="hs-root">
        {slides.map((slide, i) => {
          const isActive = i === current;
          const isPrev = i === prev;
          if (!isActive && !isPrev) return null;

          let cls = "hs-slide";
          if (isActive)
            cls +=
              prev !== null
                ? ` hs-slide--enter-${direction}`
                : " hs-slide--idle";
          if (isPrev) cls += ` hs-slide--leave-${direction}`;

          /* ── Rewards slide ── */
          if (slide.type === "rewards") {
            return (
              <div key={i} className={`${cls} hs-slide--rewards`}>
                <RewardsSlide />
              </div>
            );
          }
          if (slide.type === "catering") {
            return (
              <div key={i} className={`${cls} hs-slide--catering`}>
                <CateringSlide />
              </div>
            );
          }

          /* ── Image slides ── */
          return (
            <div
              key={i}
              className={cls}
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          );
        })}

        {currentSlide.type === "image" && (
          <>
            <div className="hs-overlay" />
            <div className="hs-vignette" />
          </>
        )}

        {currentSlide.type === "image" && (
          <div className="hs-content" key={current}>
            <span className="hs-label">{currentSlide.label}</span>
            <h1 className="hs-title">
              {currentSlide.title
                .split(" ")
                .map((word, wi) =>
                  wi % 2 === 1 ? (
                    <em key={wi}> {word}</em>
                  ) : (
                    <span key={wi}>{word} </span>
                  ),
                )}
            </h1>
            <p className="hs-subtitle">{currentSlide.subtitle}</p>
            <div className="hs-divider" />
            <div className="hs-actions">
              <a href="tel:+919000202206" className="hs-btn-primary">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                Call Now
              </a>
              <Link to="/menu" className="hs-btn-secondary">
                View Menu
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="hs-store-badge">
              <a
                href="#"
                onClick={openModal}
                aria-label="Cherries Cafe App — Coming Soon"
                style={{ position: "relative", display: "inline-block" }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play — Coming Soon"
                />
                <span className="cs-badge-tag">Coming Soon</span>
              </a>
            </div>
          </div>
        )}

        {/* Thumbnails */}
        <div className="hs-thumbs">
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`hs-thumb${i === current ? " hs-thumb--active" : ""}${slide.type === "rewards" ? " hs-thumb--rewards" : ""}${slide.type === "catering" ? " hs-thumb--catering" : ""}`}
              style={
                slide.type === "image"
                  ? { backgroundImage: `url(${slide.image})` }
                  : {}
              }
              onClick={() => goTo(i)}
              role="button"
              aria-label={
                slide.type === "rewards" ? "Rewards Program" : `Slide ${i + 1}`
              }
            />
          ))}
        </div>

        {/* Counter */}
        <div className="hs-counter">
          <span className="hs-counter-current">0{current + 1}</span>
          <span className="hs-counter-sep">/</span>
          <span className="hs-counter-total">0{slides.length}</span>
        </div>

        {/* Arrows */}
        <button
          className="hs-arrow hs-arrow--left"
          onClick={goPrev}
          disabled={isTransitioning}
          aria-label="Previous slide"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          className="hs-arrow hs-arrow--right"
          onClick={goNext}
          disabled={isTransitioning}
          aria-label="Next slide"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Dots */}
        <div className="hs-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`hs-dot${i === current ? " hs-dot--active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="hs-scroll-hint">
          <div className="hs-scroll-mouse">
            <div className="hs-scroll-wheel" />
          </div>
          <span className="hs-scroll-text">Scroll</span>
        </div>

        {/* Progress bar */}
        <div className="hs-progress" style={{ width: `${progress}%` }} />
      </section>

      {showModal && <ComingSoonModal onClose={closeModal} />}
    </>
  );
}

export default Slider;
