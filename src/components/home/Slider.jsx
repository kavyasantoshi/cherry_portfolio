import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../home/styles/Slider.css";

const slides = [
  { type: "scratch" },
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
  const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div className="cs-backdrop" onClick={handleBackdrop} role="dialog" aria-modal="true">
      <div className="cs-modal">
        <button className="cs-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="cs-icon-wrap" aria-hidden="true"><span className="cs-rocket">🚀</span><div className="cs-icon-ring" /></div>
        <h3 className="cs-title">Coming Soon!</h3>
        <p className="cs-body">The <strong>Cherries Cafe App</strong> is currently in development. Stay tuned!</p>
        <div className="cs-progress-wrap">
          <div className="cs-progress-label"><span>Development progress</span><span className="cs-progress-pct">72%</span></div>
          <div className="cs-progress-track"><div className="cs-progress-fill" /></div>
        </div>
        <a href="/menu" className="cs-menu-btn" onClick={onClose}>Browse Our Menu Instead →</a>
        <p className="cs-fine">We'll notify you once it's live on Google Play</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ANNIVERSARY SCRATCH SLIDE
   ═══════════════════════════════════════════════════════════ */

// Firework burst dots — pre-generated outside component
const FIREWORKS = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: 15 + Math.random() * 70,
  y: 10 + Math.random() * 55,
  delay: Math.random() * 4,
  duration: 1.8 + Math.random() * 2,
  size: 3 + Math.random() * 5,
  color: ["#f7d774","#f97316","#fff","#fbbf24","#fed7aa","#fde68a"][i % 6],
}));

const STARS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1 + Math.random() * 2.5,
  delay: Math.random() * 5,
  duration: 2 + Math.random() * 3,
}));

function AnniversaryScratchSlide() {
  const [tick, setTick] = useState(0);

  // Drive periodic firework re-triggers
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="ann-slide">

      {/* ── Deep space background ── */}
      <div className="ann-bg" aria-hidden="true">
        {/* Radial glow layers */}
        <div className="ann-glow ann-glow--1" />
        <div className="ann-glow ann-glow--2" />
        <div className="ann-glow ann-glow--3" />

        {/* Star field */}
        {STARS.map(s => (
          <div key={s.id} className="ann-star" style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.size, height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }} />
        ))}

        {/* Animated grid lines */}
        <div className="ann-grid" />

        {/* Firework dots */}
        {FIREWORKS.map(f => (
          <div key={`${f.id}-${tick}`} className="ann-fw-dot" style={{
            left: `${f.x}%`, top: `${f.y}%`,
            width: f.size, height: f.size,
            background: f.color,
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.duration}s`,
          }} />
        ))}

        {/* Diagonal light rays */}
        <div className="ann-ray ann-ray--1" />
        <div className="ann-ray ann-ray--2" />
        <div className="ann-ray ann-ray--3" />
      </div>

      {/* ── Main content ── */}
      <div className="ann-content">

        {/* Left — Anniversary badge + text */}
        <div className="ann-left">

          {/* Rotating ring ornament */}
          <div className="ann-ring-wrap" aria-hidden="true">
            <div className="ann-ring ann-ring--outer" />
            <div className="ann-ring ann-ring--mid" />
            <div className="ann-ring ann-ring--inner" />
            <div className="ann-ring-core">
              <span className="ann-ring-year">1</span>
            </div>
          </div>

          {/* Anniversary text block */}
          <div className="ann-text-block">
            <div className="ann-eyebrow">
              <span className="ann-eyebrow-line" />
              <span>Celebrating</span>
              <span className="ann-eyebrow-line" />
            </div>

            <h2 className="ann-heading">
              <span className="ann-heading-line1">One Year</span>
              <span className="ann-heading-line2">of <em>Cherries</em></span>
            </h2>

            <p className="ann-tagline">
              A year of flavours, love &amp; memories.<br />
              Thank you for being part of our journey.
            </p>

            {/* Anniversary stat pills */}
            <div className="ann-stats">
              <div className="ann-stat">
                <span className="ann-stat-num">365</span>
                <span className="ann-stat-label">Days</span>
              </div>
              <div className="ann-stat-div" />
              <div className="ann-stat">
                <span className="ann-stat-num">∞</span>
                <span className="ann-stat-label">Smiles</span>
              </div>
              <div className="ann-stat-div" />
              <div className="ann-stat">
                {/* <span className="ann-stat-num">🍒</span> */}
                <span className="ann-stat-label">Cherries</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Scratch card offer */}
        <div className="ann-right">

          {/* Card glow halo */}
          <div className="ann-card-halo" aria-hidden="true" />

          {/* Scratch card */}
          <div className="ann-scratch-card">
            <div className="ann-card-shine" aria-hidden="true" />

            <div className="ann-card-header">
              {/* <span className="ann-card-cherry">🍒</span> */}
              <div className="ann-card-header-text">
                <span className="ann-card-brand">Cherries Cafe</span>
                <span className="ann-card-anniv">1st Anniversary</span>
              </div>
              <div className="ann-card-badge">🎂</div>
            </div>

            <div className="ann-card-body">
              <p className="ann-card-occasion">Anniversary Special Offer</p>
              <div className="ann-card-scratch-zone">
                <div className="ann-scratch-lines">
                  {[0,1,2,3].map(i => <div key={i} className="ann-scratch-line" />)}
                </div>
                <span className="ann-scratch-hint">✦ scratch to reveal ✦</span>
              </div>
            </div>

            <div className="ann-card-footer">
              WIN A COMBO DEAL · FREE DAILY
            </div>
          </div>

          {/* CTA */}
          <Link to="/scratch-and-win" className="ann-cta">
            <span className="ann-cta-glow" aria-hidden="true" />
            <span className="ann-cta-text">
              🎁 Claim Your Gift
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          {/* Micro trust pills */}
          <div className="ann-trust">
            <span>🎯 1 per day</span>
            <span>🔒 No login</span>
            <span>🍽️ Dine-in &amp; Takeaway</span>
          </div>
        </div>

      </div>

      {/* ── Bottom ribbon ── */}
      <div className="ann-ribbon" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i}>✦ 1 YEAR ANNIVERSARY ✦ CHERRIES CAFE KAKINADA</span>
        ))}
      </div>

    </div>
  );
}

/* ── Main Slider ── */
function Slider() {
  const [current, setCurrent]               = useState(0);
  const [prev, setPrev]                     = useState(null);
  const [direction, setDirection]           = useState("next");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress]             = useState(0);
  const [showModal, setShowModal]           = useState(false);
  const progressRef = useRef(null);
  const DURATION    = 6000;

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
    return () => { clearTimeout(timer); cancelAnimationFrame(progressRef.current); };
  }, [current]);

  const goNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true); setDirection("next"); setPrev(current);
    setCurrent((c) => (c + 1) % slides.length);
    setTimeout(() => { setPrev(null); setIsTransitioning(false); }, 1000);
  };
  const goPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true); setDirection("prev"); setPrev(current);
    setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
    setTimeout(() => { setPrev(null); setIsTransitioning(false); }, 1000);
  };
  const goTo = (index) => {
    if (isTransitioning || index === current) return;
    setIsTransitioning(true);
    setDirection(index > current ? "next" : "prev"); setPrev(current); setCurrent(index);
    setTimeout(() => { setPrev(null); setIsTransitioning(false); }, 1000);
  };

  const openModal  = (e) => { e.preventDefault(); setShowModal(true); };
  const closeModal = ()  => setShowModal(false);
  const currentSlide = slides[current];

  return (
    <>
      <section className="hs-root">

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
                <AnniversaryScratchSlide />
              </div>
            );
          }
          return (
            <div key={i} className={cls}
              style={{ backgroundImage: `url(${slide.image})` }} />
          );
        })}

        {currentSlide.type === "image" && (
          <><div className="hs-overlay" /><div className="hs-vignette" /></>
        )}

        {currentSlide.type === "image" && (
          <div className="hs-content" key={current}>
            <span className="hs-label">{currentSlide.label}</span>
            <h1 className="hs-title">
              {currentSlide.title.split(" ").map((word, wi) =>
                wi % 2 === 1 ? <em key={wi}> {word}</em> : <span key={wi}>{word} </span>
              )}
            </h1>
            <p className="hs-subtitle">{currentSlide.subtitle}</p>
            <div className="hs-divider" />
            <div className="hs-actions">
              <a href="tel:+919000202206" className="hs-btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                Call Now
              </a>
              <Link to="/menu" className="hs-btn-secondary">
                View Menu
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="hs-store-badge">
              <a href="#" onClick={openModal} aria-label="Cherries Cafe App — Coming Soon"
                style={{ position: "relative", display: "inline-block" }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play — Coming Soon" />
                <span className="cs-badge-tag">Coming Soon</span>
              </a>
            </div>
          </div>
        )}

        <div className="hs-thumbs">
          {slides.map((slide, i) => (
            <div key={i}
              className={`hs-thumb${i === current ? " hs-thumb--active" : ""}${slide.type === "scratch" ? " hs-thumb--scratch" : ""}`}
              style={slide.type === "image" ? { backgroundImage: `url(${slide.image})` } : {}}
              onClick={() => goTo(i)} role="button"
              aria-label={slide.type === "scratch" ? "Anniversary Offer" : `Slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="hs-counter">
          <span className="hs-counter-current">0{current + 1}</span>
          <span className="hs-counter-sep">/</span>
          <span className="hs-counter-total">0{slides.length}</span>
        </div>

        <button className="hs-arrow hs-arrow--left" onClick={goPrev} disabled={isTransitioning} aria-label="Previous slide">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button className="hs-arrow hs-arrow--right" onClick={goNext} disabled={isTransitioning} aria-label="Next slide">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
        </button>

        <div className="hs-dots">
          {slides.map((_, i) => (
            <button key={i} className={`hs-dot${i === current ? " hs-dot--active" : ""}`}
              onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`} />
          ))}
        </div>

        <div className="hs-scroll-hint">
          <div className="hs-scroll-mouse"><div className="hs-scroll-wheel" /></div>
          <span className="hs-scroll-text">Scroll</span>
        </div>

        <div className="hs-progress" style={{ width: `${progress}%` }} />
      </section>

      {showModal && <ComingSoonModal onClose={closeModal} />}
    </>
  );
}

export default Slider;