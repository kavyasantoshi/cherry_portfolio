import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { UtensilsCrossed } from "lucide-react";
import "../home/styles/Slider.css";
import CateringSlide from "./CateringSlide";
import "./styles/CateringSlide.css";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.cherriescafe.app&pcampaignid=web_share";

const slides = [
  {
    type: "intro",
    image: "/images/cafe/cafe.webp",
    logo: "/logos/cherry_logo.png",
    title: "WELCOME TO CHERRIES",
    subtitle: "Your Favorite Pure Veg Spot in Kakinada",
  },
  { type: "catering" },
  {
    type: "image",
    image: "/images/hero/idly_sambar.webp",
    label: "Breakfast Special",
    title: "Delicious South Indian Tiffins",
    subtitle: "Soft idlis, crispy dosas & hot sambar served fresh every morning",
  },
  {
    type: "image",
    image: "/images/hero/starter.webp",
    label: "Starters & Snacks",
    title: "Crispy & Tasty Bites",
    subtitle: "Savor our crunchy snacks and flavorful starters made to delight every craving",
  },
  {
    type: "image",
    image: "/images/hero/panner-biryani.webp",
    label: "Main Course",
    title: "Hearty Meals & Main Course",
    subtitle: "Rich curries, aromatic biryanis, and wholesome meals prepared with love",
  },
];

/* ================================================================
   MAIN SLIDER
   ================================================================ */
function Slider() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [direction, setDirection] = useState("next");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const DURATION = 5000;

  // Automatic transition logic
  const startTimer = () => {
    stopTimer();
    const start = Date.now();

    // Timer for next slide
    timerRef.current = setTimeout(() => {
      // If we are currently transitioning (e.g. manual click), 
      // wait a bit longer instead of skipping entirely.
      if (isTransitioning) {
        startTimer();
      } else {
        goNext();
      }
    }, DURATION);

    // Progress animation
    let frame;
    const animate = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    progressRef.current = frame;
  };

  const stopTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) cancelAnimationFrame(progressRef.current);
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
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

          if (slide.type === "catering") {
            return (
              <div key={i} className={`${cls} hs-slide--catering`}>
                <CateringSlide />
              </div>
            );
          }

          /* ── Intro slide ── */
          if (slide.type === "intro") {
            return (
              <div
                key={i}
                className={`${cls} hs-slide--intro`}
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="hs-intro-overlay" />
                <div className="hs-intro-content">
                  <div className="hs-intro-logo-wrap">
                    <img src={slide.logo} alt="Cherries Logo" className="hs-intro-logo" />
                  </div>
                  <h1 className="hs-intro-title">{slide.title}</h1>
                  <p className="hs-intro-subtitle">{slide.subtitle}</p>
                  <div className="hs-intro-divider" />
                  <div className="hs-intro-actions">
                    <button className="hs-intro-btn" onClick={goNext}>
                      Explore Now
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
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
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get Cherries Cafe App on Google Play"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                />
              </a>
            </div>
          </div>
        )}

        {/* Thumbnails */}
        <div className="hs-thumbs">
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`hs-thumb${i === current ? " hs-thumb--active" : ""}${slide.type === "intro" ? " hs-thumb--intro" : ""}${slide.type === "catering" ? " hs-thumb--catering" : ""}`}
              style={
                (slide.type === "image")
                  ? { backgroundImage: `url(${slide.image})` }
                  : {}
              }
              onClick={() => goTo(i)}
              onMouseEnter={() => stopTimer()}
              onMouseLeave={() => startTimer()}
            >
              {slide.type === "intro" && (
                <img src={slide.logo} alt="Logo" style={{ width: '70%', height: '70%', objectFit: 'contain' }} />
              )}
              {slide.type === "catering" && <UtensilsCrossed size={20} color="#fff" />}
            </div>
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
    </>
  );
}

export default Slider;
