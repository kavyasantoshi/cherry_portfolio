import { useState, useEffect, useRef } from "react";
import "./styles/About.css";
import cafe from "/images/cafe/cafe.jpg";

/* ═══════════════════════════════════════════════
   About.jsx — Cherries Veg Restaurant
   Clean · Professional · Image-forward design
   ═══════════════════════════════════════════════ */

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l19-9-9 19-2-8-8-2z" />
      </svg>
    ),
    title: "Traditional Taste",
    desc: "Time-honored authentic recipes passed down through generations.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: "Quality First",
    desc: "Only the freshest, locally sourced ingredients every single day.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Hygienic & Safe",
    desc: "Strict hygiene standards maintained at every step of preparation.",
  },
];

const STATS = [
  { value: "100%", label: "Pure Vegetarian" },
  { value: "50+",  label: "Menu Items" },
  { value: "5★",   label: "Customer Rating" },
];

export default function About() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`ab-root${visible ? " ab-visible" : ""}`}
    >
      {/* Ambient background blobs */}
      <div className="ab-blob ab-blob--1" aria-hidden="true" />
      <div className="ab-blob ab-blob--2" aria-hidden="true" />

      <div className="ab-container">

        {/* ══ LEFT — IMAGE PANEL ══ */}
        <div className="ab-image-col">

          {/* Outer decorative border frame */}
          <div className="ab-frame-border" aria-hidden="true" />

          {/* Main image wrapper */}
          <div className="ab-frame">
            <img
              src={cafe}
              alt="Cherries Cafe — Kakinada"
              className="ab-img"
            />

            {/* Image overlay gradient for depth */}
            <div className="ab-img-overlay" aria-hidden="true" />



            {/* Years badge — overlaps bottom edge */}
            <div className="ab-years-badge">
              <span className="ab-years-num">Since</span>
              <span className="ab-years-val">2025</span>
            </div>
          </div>

          {/* Stats row below image */}
          <div className="ab-stats-row">
            {STATS.map((s, i) => (
              <div key={i} className="ab-stat">
                <span className="ab-stat-val">{s.value}</span>
                <span className="ab-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══ RIGHT — CONTENT ══ */}
        <div className="ab-content-col">

          {/* Eyebrow */}
          <div className="ab-eyebrow">
            <div className="ab-eyebrow-pill">
              <span className="ab-eyebrow-dot" />
              Our Story
            </div>
          </div>

          {/* Headline */}
          <h2 className="ab-headline">
            We Serve More Than<br />
            <span className="ab-headline-accent">
              Just Food
              <svg className="ab-underline-svg" viewBox="0 0 180 10" preserveAspectRatio="none">
                <path d="M0,7 Q45,1 90,6 T180,6" fill="none" stroke="#f97316" strokeWidth="3.5" />
              </svg>
            </span>
          </h2>

          {/* Divider */}
          <div className="ab-divider">
            <span className="ab-divider-line" />
            <span className="ab-divider-dot" />
            <span className="ab-divider-line ab-divider-line--short" />
          </div>

          {/* Description */}
          <p className="ab-desc">
            Cherries Cafe is a pure vegetarian QSR located in the heart of Kakinada.
            Our menu features a wide variety of traditional tiffins prepared using
            high-quality ingredients, authentic recipes, and utmost care for taste
            and hygiene. From comforting idlis and crispy dosas to aromatic teas,
            every item is crafted to deliver a satisfying and affordable experience.
          </p>

          {/* Feature list */}
          <div className="ab-features">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="ab-feature-card"
                style={{ "--i": i }}
              >
                <div className="ab-feature-icon-wrap">{f.icon}</div>
                <div className="ab-feature-text">
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div className="ab-cta-row">
            <a href="tel:+919000202206" className="ab-cta-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              Call Us Now
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}