// ─────────────────────────────────────────────────────────────────────
//  CateringTeaser.jsx  — home page section teasing catering feature
//  Placed after About, before Menu in Home.jsx
// ─────────────────────────────────────────────────────────────────────
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./styles/CateringTeaser.css";

const HIGHLIGHTS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l19-9-9 19-2-8-8-2z" />
      </svg>
    ),
    title: "3 Curated Plans",
    desc: "Basic, Premium & Max Premium — priced per person.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="2" />
        <path d="M9 12h6M9 16h4" />
      </svg>
    ),
    title: "Pick Your Items",
    desc: "Select exactly what you want from each category.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: "Book a Slot",
    desc: "Choose your date and we'll handle the rest.",
  },
];

export default function CateringTeaser() {
  const { user } = useAuth();
  const ctaPath = user ? "/catering" : "/login";

  return (
    <section className="ct-root" id="catering">
      {/* Decorative background */}
      <div className="ct-bg" aria-hidden="true">
        <div className="ct-bg-blob ct-bg-blob--1" />
        <div className="ct-bg-blob ct-bg-blob--2" />
        <div className="ct-bg-dots" />
      </div>

      <div className="ct-container">

        {/* ── Left — image collage ── */}
        <div className="ct-visual" aria-hidden="true">
          <div className="ct-img-main">
            <img src="/images/meals/south_meal.webp" alt="South Indian meal spread" />
          </div>
          <div className="ct-img-secondary ct-img-secondary--top">
            <img src="/images/biryani/paneer_biryani.webp" alt="Paneer biryani" />
          </div>
          <div className="ct-img-secondary ct-img-secondary--bottom">
            <img src="/images/Starters/ChilliPaneer.webp" alt="Chilli paneer starter" />
          </div>
          {/* Floating tag */}
          <div className="ct-float-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            For Any Occasion
          </div>
        </div>

        {/* ── Right — copy ── */}
        <div className="ct-copy">
          <div className="ct-eyebrow">
            <div className="ct-eyebrow-dot" />
            Catering Service
          </div>

          <h2 className="ct-heading">
            Celebrate Every<br />
            <em>Moment With Us</em>
          </h2>

          <p className="ct-body">
            Planning a wedding, birthday, corporate lunch or family function?
            Cherries brings authentic pure-veg flavours straight to your event.
            Choose a plan, build your menu, book your slot — we'll take care of everything else.
          </p>

          {/* Highlights */}
          <div className="ct-highlights">
            {HIGHLIGHTS.map((h) => (
              <div key={h.title} className="ct-highlight">
                <div className="ct-highlight-icon">{h.icon}</div>
                <div>
                  <div className="ct-highlight-title">{h.title}</div>
                  <div className="ct-highlight-desc">{h.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link to={ctaPath} className="ct-cta">
            {user ? "Book a Catering Slot" : "Login & Book Now"}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          <p className="ct-note">
            * Admin will confirm your booking and contact you with next steps.
          </p>
        </div>

      </div>
    </section>
  );
}