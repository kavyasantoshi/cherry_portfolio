import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../home/styles/Slider.css";

const slides = [
  {
    type: "scratch",   // ← special scratch slide — no image needed
  },
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

/* ── Coming Soon Modal ── */
function ComingSoonModal({ onClose }) {
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="cs-backdrop" onClick={handleBackdrop} role="dialog" aria-modal="true">
      <div className="cs-modal">
        <button className="cs-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
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
          We're working hard to bring you the best food ordering experience. Stay tuned!
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
        <p className="cs-fine">We'll notify you once it's live on Google Play</p>
      </div>
    </div>
  );
}

/* ── Scratch Slide ── */
function ScratchSlideContent() {
  return (
    <div className="hs-scratch-slide">
      {/* Animated mesh background */}
      <div className="hs-scratch-bg" aria-hidden="true">
        <div className="hs-scratch-blob hs-scratch-blob--1" />
        <div className="hs-scratch-blob hs-scratch-blob--2" />
        <div className="hs-scratch-blob hs-scratch-blob--3" />
        <div className="hs-scratch-grid" />
        {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
          <div key={i} className={`hs-scratch-sparkle hs-scratch-sparkle--${i}`} aria-hidden="true">✦</div>
        ))}
      </div>

      <div className="hs-scratch-inner">

        {/* ── Card mockup (left / top on mobile) ── */}
        <div className="hs-sc-card-wrap" aria-hidden="true">
          <div className="hs-sc-card">
            <div className="hs-sc-card-shine" />
            <div className="hs-sc-card-header">
              <span className="hs-sc-card-cherry">🍒</span>
              <span className="hs-sc-card-brand">Cherries Cafe</span>
              <span className="hs-sc-card-daily">Daily Offer</span>
            </div>
            <div className="hs-sc-card-body">
              <div className="hs-sc-card-scratch-zone">
                <div className="hs-sc-lines">
                  {[0,1,2,3,4].map(i=><div key={i} className="hs-sc-line"/>)}
                </div>
                <span className="hs-sc-hint">scratch here</span>
              </div>
            </div>
            <div className="hs-sc-card-footer">WIN A COMBO OFFER</div>
          </div>
          {/* Shadow card behind */}
          <div className="hs-sc-card-shadow" />
        </div>

        {/* ── Text block (right / bottom on mobile) ── */}
        <div className="hs-scratch-text">
          <div className="hs-scratch-badge">
            <span className="hs-scratch-badge-dot" />
            Free · Every Day
          </div>

          <h2 className="hs-scratch-title">
            Scratch &amp;<br /><em>Win Combos</em>
          </h2>

          <p className="hs-scratch-sub">
            One lucky scratch a day reveals your exclusive combo deal.
            No sign-up. No catch.
          </p>

          <div className="hs-scratch-pills">
            <span>🎯 1 per device / day</span>
            <span>🔒 No account needed</span>
            <span>🍽️ Dine-in &amp; Takeaway</span>
          </div>

          <Link to="/scratch-and-win" className="hs-scratch-cta">
            <span>Try Your Luck Today</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </div>
  );
}

/* ── Main Slider ── */
function Slider() {
  const [current, setCurrent]           = useState(0);
  const [prev, setPrev]                 = useState(null);
  const [direction, setDirection]       = useState("next");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress]         = useState(0);
  const [showModal, setShowModal]       = useState(false);
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

  const openModal  = (e) => { e.preventDefault(); setShowModal(true); };
  const closeModal = ()  => setShowModal(false);

  const currentSlide = slides[current];

  return (
    <>
      <section className="hs-root">

        {/* ── Slides ── */}
        {slides.map((slide, i) => {
          const isActive = i === current;
          const isPrev   = i === prev;
          if (!isActive && !isPrev) return null;

          let cls = "hs-slide";
          if (isActive) cls += prev !== null ? ` hs-slide--enter-${direction}` : " hs-slide--idle";
          if (isPrev)   cls += ` hs-slide--leave-${direction}`;

          if (slide.type === "scratch") {
            return (
              <div key={i} className={`${cls} hs-slide--scratch`}>
                <ScratchSlideContent />
              </div>
            );
          }

          return (
            <div key={i} className={cls}
              style={{ backgroundImage: `url(${slide.image})` }} />
          );
        })}

        {/* ── Overlays — only for image slides ── */}
        {currentSlide.type === "image" && (
          <>
            <div className="hs-overlay" />
            <div className="hs-vignette" />
          </>
        )}

        {/* ── Content — only for image slides ── */}
        {currentSlide.type === "image" && (
          <div className="hs-content" key={current}>
            <span className="hs-label">{currentSlide.label}</span>

            <h1 className="hs-title">
              {currentSlide.title.split(" ").map((word, wi) =>
                wi % 2 === 1
                  ? <em key={wi}> {word}</em>
                  : <span key={wi}>{word} </span>
              )}
            </h1>

            <p className="hs-subtitle">{currentSlide.subtitle}</p>
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
              <a href="#" onClick={openModal}
                aria-label="Cherries Cafe App — Coming Soon on Google Play"
                style={{ position: "relative", display: "inline-block" }}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play — Coming Soon"
                />
                <span className="cs-badge-tag">Coming Soon</span>
              </a>
            </div>
          </div>
        )}

        {/* ── Thumbnail strip ── */}
        <div className="hs-thumbs">
          {slides.map((slide, i) => (
            <div key={i}
              className={`hs-thumb${i === current ? " hs-thumb--active" : ""}${slide.type === "scratch" ? " hs-thumb--scratch" : ""}`}
              style={slide.type === "image" ? { backgroundImage: `url(${slide.image})` } : {}}
              onClick={() => goTo(i)}
              role="button"
              aria-label={slide.type === "scratch" ? "Scratch & Win" : `Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* ── Counter ── */}
        <div className="hs-counter">
          <span className="hs-counter-current">0{current + 1}</span>
          <span className="hs-counter-sep">/</span>
          <span className="hs-counter-total">0{slides.length}</span>
        </div>

        {/* ── Arrows ── */}
        <button className="hs-arrow hs-arrow--left" onClick={goPrev}
          disabled={isTransitioning} aria-label="Previous slide">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button className="hs-arrow hs-arrow--right" onClick={goNext}
          disabled={isTransitioning} aria-label="Next slide">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* ── Dots ── */}
        <div className="hs-dots">
          {slides.map((_, i) => (
            <button key={i}
              className={`hs-dot${i === current ? " hs-dot--active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* ── Scroll hint ── */}
        <div className="hs-scroll-hint">
          <div className="hs-scroll-mouse"><div className="hs-scroll-wheel" /></div>
          <span className="hs-scroll-text">Scroll</span>
        </div>

        {/* ── Progress bar ── */}
        <div className="hs-progress" style={{ width: `${progress}%` }} />

      </section>

      {showModal && <ComingSoonModal onClose={closeModal} />}
    </>
  );
}

export default Slider;