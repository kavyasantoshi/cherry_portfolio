import { useEffect, useRef, useState } from "react";
import "./styles/Playstore.css";

/* ═══════════════════════════════════════════════
   Playstore.jsx — Cherries Veg Restaurant
   App download promotion section
   ═══════════════════════════════════════════════ */

const APP_FEATURES = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    label: "Easy Ordering",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Live Tracking",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    label: "Secure Payments",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    label: "Exclusive Offers",
  },
];

/* ── Coming Soon Modal ── */
function ComingSoonModal({ onClose }) {
  // Close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="cs-backdrop" onClick={handleBackdrop} role="dialog" aria-modal="true" aria-label="App coming soon">
      <div className="cs-modal">
        {/* Close button */}
        <button className="cs-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Rocket icon */}
        <div className="cs-icon-wrap" aria-hidden="true">
          <span className="cs-rocket">🚀</span>
          <div className="cs-icon-ring" />
        </div>

        {/* Text */}
        <h3 className="cs-title">Coming Soon!</h3>
        <p className="cs-body">
          The <strong>Cherries Cafe App</strong> is currently in development.
          We're working hard to bring you the best food ordering experience.
          Stay tuned!
        </p>

        {/* Progress bar (decorative) */}
        <div className="cs-progress-wrap">
          <div className="cs-progress-label">
            <span>Development progress</span>
            <span className="cs-progress-pct">72%</span>
          </div>
          <div className="cs-progress-track">
            <div className="cs-progress-fill" />
          </div>
        </div>

        {/* CTA — go to menu instead */}
        <a href="/menu" className="cs-menu-btn" onClick={onClose}>
          Browse Our Menu Instead →
        </a>

        <p className="cs-fine">We'll notify you once it's live on Google Play</p>
      </div>
    </div>
  );
}

export default function Playstore() {
  const sectionRef = useRef(null);
  const [visible, setVisible]       = useState(false);
  const [showModal, setShowModal]   = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showModal]);

  const openModal  = (e) => { e.preventDefault(); setShowModal(true); };
  const closeModal = ()  => setShowModal(false);

  return (
    <>
      <section
        ref={sectionRef}
        className={`ps-root${visible ? " ps-visible" : ""}`}
      >
        {/* Ambient decorations */}
        <div className="ps-blob ps-blob--1" aria-hidden="true" />
        <div className="ps-blob ps-blob--2" aria-hidden="true" />
        <div className="ps-dot-grid"        aria-hidden="true" />

        <div className="ps-container">

          {/* ══ LEFT — Content ══ */}
          <div className="ps-content">

            {/* Eyebrow */}
            <div className="ps-eyebrow">
              <span className="ps-eyebrow-dot" />
              Mobile App
            </div>

            {/* Headline */}
            <h2 className="ps-headline">
              Order Fresh Food
              <br />
              <span className="ps-headline-accent">Right From Your Phone</span>
            </h2>

            {/* Subtext */}
            <p className="ps-subtext">
              Skip the queue. Browse our full menu, place your order in seconds,
              and track it live — all from the Cherries Cafe app.
            </p>

            {/* Feature pills */}
            <div className="ps-feature-pills">
              {APP_FEATURES.map((f, i) => (
                <div key={i} className="ps-pill" style={{ "--i": i }}>
                  <span className="ps-pill-icon">{f.icon}</span>
                  {f.label}
                </div>
              ))}
            </div>

            {/* Store button + rating */}
            <div className="ps-actions">
              {/* ── Intercept click — app not live yet ── */}
              <a
                href="#"
                onClick={openModal}
                className="ps-store-btn"
                aria-label="Cherries Cafe App — Coming Soon on Google Play"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                />
                {/* Coming soon badge on the button */}
                <span className="ps-coming-tag">Coming Soon</span>
              </a>

              <div className="ps-rating">
                <div className="ps-rating-stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24"
                      fill="#f59e0b" stroke="#f59e0b" strokeWidth="1"
                      strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span className="ps-rating-text">4.8 · 2,400+ reviews</span>
              </div>
            </div>

          </div>

          {/* ══ RIGHT — Phone Mockup ══ */}
          <div className="ps-phone-col">
            <div className="ps-phone-glow" aria-hidden="true" />
            <div className="ps-phone-wrapper">
              <div className="ps-phone-clip">
                <div className="ps-phone">
                  <div className="ps-btn-vol-up"   aria-hidden="true" />
                  <div className="ps-btn-vol-down" aria-hidden="true" />
                  <div className="ps-btn-power"    aria-hidden="true" />

                  <div className="ps-screen">
                    <div className="ps-island" aria-hidden="true">
                      <div className="ps-island-inner" />
                    </div>

                    <div className="ps-screen-content">
                      <p className="ps-qr-label">
                        Scan to download
                        <br />
                        <strong>Cherries Cafe App</strong>
                      </p>

                      {/* QR tap also opens modal */}
                      <div
                        className="ps-qr-box ps-qr-coming"
                        onClick={openModal}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && openModal(e)}
                        aria-label="App coming soon — tap to learn more"
                        title="App coming soon!"
                      >
                        {/* Blurred placeholder QR */}
                        <img
                          src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com/cherries-cafe-app&color=1c0f07&bgcolor=ffffff"
                          alt="QR code — app coming soon"
                          className="ps-qr-img ps-qr-blurred"
                          loading="lazy"
                        />
                        {/* Overlay */}
                        <div className="ps-qr-overlay">
                          <span className="ps-qr-overlay-icon">🚀</span>
                          <span className="ps-qr-overlay-text">Coming<br/>Soon</span>
                        </div>
                      </div>

                      <p className="ps-qr-hint">· Launching Soon ·</p>

                      <div className="ps-nav-bar" aria-hidden="true">
                        <div className="ps-nav-item ps-nav-item--active">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          </svg>
                        </div>
                        <div className="ps-nav-item">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                          </svg>
                        </div>
                        <div className="ps-nav-item">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                          </svg>
                        </div>
                        <div className="ps-nav-item">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="ps-home-bar" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Coming Soon Modal — rendered outside section so it overlays everything */}
      {showModal && <ComingSoonModal onClose={closeModal} />}
    </>
  );
}