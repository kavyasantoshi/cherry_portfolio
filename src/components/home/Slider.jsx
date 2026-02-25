import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../home/styles/Slider.css";

const slides = [
  {
    image: "/images/hero/idly_sambar.webp",
    label: "Breakfast Special",
    title: "WELCOME!",
    subtitle: "Cherries Veg Restaurant",
  },
  {
    image: "/images/hero/starter.webp",
    label: "Starters & Snacks",
    title: "Authentic Taste",
    subtitle: "Pure Veg Delicious",
  },
  {
    image: "/images/hero/panner-biryani.webp",
    label: "Main Course",
    title: "Fresh & Flavorful",
    subtitle: "Made With Love",
  },
];

function Slider() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [direction, setDirection] = useState("next");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);
  const DURATION = 4000;

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
    setTimeout(() => { setPrev(null); setIsTransitioning(false); }, 1000);
  };

  const goPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection("prev");
    setPrev(current);
    setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
    setTimeout(() => { setPrev(null); setIsTransitioning(false); }, 1000);
  };

  const goTo = (index) => {
    if (isTransitioning || index === current) return;
    setIsTransitioning(true);
    setDirection(index > current ? "next" : "prev");
    setPrev(current);
    setCurrent(index);
    setTimeout(() => { setPrev(null); setIsTransitioning(false); }, 1000);
  };

  return (
    <section className="hs-root">

      {/* ── Slide backgrounds ── */}
      {slides.map((slide, i) => {
        let cls = "hs-slide";
        if (i === current) {
          cls += prev !== null ? ` hs-slide--enter-${direction}` : " hs-slide--idle";
        } else if (i === prev) {
          cls += ` hs-slide--leave-${direction}`;
        }
        return (
          <div
            key={i}
            className={cls}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        );
      })}

      {/* ── Overlays ── */}
      <div className="hs-overlay" />
      <div className="hs-vignette" />

      {/* ── Slide content — key remounts on change to retrigger animations ── */}
      <div className="hs-content" key={current}>
        <span className="hs-label">{slides[current].label}</span>

        <h1 className="hs-title">
          {slides[current].title.split(" ").map((word, wi) =>
            wi % 2 === 1
              ? <em key={wi}> {word}</em>
              : <span key={wi}>{word} </span>
          )}
        </h1>

        <p className="hs-subtitle">{slides[current].subtitle}</p>
        <div className="hs-divider" />

        <div className="hs-actions">
          <a href="tel:+919000202206" className="hs-btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            Call Now
          </a>
          <Link to="/menu" className="hs-btn-secondary">
            View Menu
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="hs-store-badge">
          <a href="https://example.com/google-play" target="_blank" rel="noopener noreferrer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
            />
          </a>
        </div>
      </div>

      {/* ── Thumbnail strip (desktop) ── */}
      <div className="hs-thumbs">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`hs-thumb${i === current ? " hs-thumb--active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
            onClick={() => goTo(i)}
            role="button"
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Slide counter ── */}
      <div className="hs-counter">
        <span className="hs-counter-current">0{current + 1}</span>
        <span className="hs-counter-sep">/</span>
        <span className="hs-counter-total">0{slides.length}</span>
      </div>

      {/* ── Arrow navigation ── */}
      <button className="hs-arrow hs-arrow--left" onClick={goPrev}
        disabled={isTransitioning} aria-label="Previous slide">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button className="hs-arrow hs-arrow--right" onClick={goNext}
        disabled={isTransitioning} aria-label="Next slide">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* ── Pill dot indicators ── */}
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

      {/* ── Scroll hint ── */}
      <div className="hs-scroll-hint">
        <div className="hs-scroll-mouse">
          <div className="hs-scroll-wheel" />
        </div>
        <span className="hs-scroll-text">Scroll</span>
      </div>

      {/* ── Progress bar ── */}
      <div className="hs-progress" style={{ width: `${progress}%` }} />

    </section>
  );
}

export default Slider;