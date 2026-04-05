// ─────────────────────────────────────────────────────────────────────
//  CateringSlide.jsx  — drop-in slide for Slider.jsx
//  Matches Cherries theme: #f97316 orange · Playfair Display · Poppins
//  Mobile-first
// ─────────────────────────────────────────────────────────────────────
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function CateringSlide() {
  const { user } = useAuth();
  const ctaPath = user ? "/catering" : "/login";

  return (
    <div className="csl-root">
      {/* ── Background ── */}
      <div className="csl-bg" aria-hidden="true">
        <div className="csl-bg-blob csl-bg-blob--1" />
        <div className="csl-bg-blob csl-bg-blob--2" />
        <div className="csl-bg-dots" />
      </div>

      {/* ── Main layout ── */}
      <div className="csl-inner">

        {/* Left — copy */}
        <div className="csl-left">
          <div className="csl-pill">
            <div className="csl-pill-dot" />
            Catering Service
          </div>

          <h2 className="csl-heading">
            We Cater Your<br />
            <em>Special Moments</em>
          </h2>

          <p className="csl-body">
            From intimate gatherings to grand functions — choose your plan,
            pick your menu, and let us handle the rest.
          </p>

          {/* Plans preview */}
          <div className="csl-plans">
            {[
              { name: "Basic",       price: "₹100", desc: "per person" },
              { name: "Premium",     price: "₹160", desc: "per person" },
              { name: "Max Premium", price: "₹250", desc: "per person" },
            ].map((p) => (
              <div key={p.name} className="csl-plan-chip">
                <span className="csl-plan-name">{p.name}</span>
                <span className="csl-plan-price">{p.price}</span>
                <span className="csl-plan-desc">{p.desc}</span>
              </div>
            ))}
          </div>

          <Link to="/catering" className="csl-cta">
            View Catering Plans
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Right — decorative food icons grid */}
        <div className="csl-right" aria-hidden="true">
          <div className="csl-wheel-halo" />
          <div className="csl-food-grid">
            {[
              { img: "/images/biryani/paneer_biryani.webp",     label: "Biryani"   },
              { img: "/images/curries/kadai_paneer.webp",       label: "Curries"   },
              { img: "/images/Starters/ChilliPaneer.webp",      label: "Starters"  },
              { img: "/images/meals/south_meal.webp",           label: "Meals"     },
            ].map((item, i) => (
              <div key={i} className={`csl-food-card csl-food-card--${i}`}>
                <div className="csl-food-img-wrap">
                  <img src={item.img} alt={item.label} />
                </div>
                <span className="csl-food-label">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Floating badge */}
          <div className="csl-float-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            50+ guests served
          </div>
        </div>

      </div>

      {/* ── Bottom strip ── */}
      <div className="csl-strip" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i}>
            CHERRIES CATERING &middot; PURE VEG &middot; BOOK YOUR SLOT &middot; ANY OCCASION &middot;
          </span>
        ))}
      </div>
    </div>
  );
}