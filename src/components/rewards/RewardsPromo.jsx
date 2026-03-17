import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./styles/RewardsPromo.css";

const STEPS = [
  {
    num: "01",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 11-.57-8.38"/>
      </svg>
    ),
    title: "Spin daily",
    detail: "One free spin every single day",
  },
  {
    num: "02",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: "Earn points",
    detail: "Win between 1 and 100 points per spin",
  },
  {
    num: "03",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/>
        <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/>
        <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>
      </svg>
    ),
    title: "Redeem at the counter",
    detail: "Show your code for instant savings",
  },
];

// Mini wheel segments for the decorative visual
const WHEEL_SEGS = [
  { c: "#fff3e0", d: 0,   s: 144 },
  { c: "#ffe0c2", d: 144, s: 108 },
  { c: "#f97316", d: 252, s: 54  },
  { c: "#ea580c", d: 306, s: 36  },
  { c: "#fb923c", d: 342, s: 14  },
  { c: "#ffffff", d: 356, s: 4   },
];

export default function RewardsPromo() {
  const { user } = useAuth();
  const ctaTo = user ? "/rewards" : "/login";

  return (
    <section className="rp2-root" aria-label="Cherries Rewards Program">

      {/* Background */}
      <div className="rp2-bg" aria-hidden="true">
        <div className="rp2-bg-wave" />
        <div className="rp2-bg-blob rp2-bg-blob--1" />
        <div className="rp2-bg-blob rp2-bg-blob--2" />
      </div>

      <div className="rp2-inner">

        {/* ── Visual side (wheel + coupon card) ── */}
        <div className="rp2-visual" aria-hidden="true">

          <div className="rp2-wheel-glow" />

          {/* Decorative spin wheel */}
          <div className="rp2-wheel-wrap">
            <div className="rp2-ring rp2-ring--outer" />

            <div className="rp2-pointer">
              <svg width="20" height="28" viewBox="0 0 22 30" fill="none">
                <path d="M11 30L1 2h20L11 30z" fill="#f97316"/>
                <path d="M11 26L3 6h16L11 26z" fill="#ea580c"/>
              </svg>
            </div>

            <div
              className="rp2-wheel"
              style={{
                background: `conic-gradient(${WHEEL_SEGS.map(
                  (s) => `${s.c} ${s.d}deg ${s.d + s.s}deg`
                ).join(",")})`
              }}
            >
              {WHEEL_SEGS.map((s, i) => (
                <div key={i} className="rp2-spoke"
                  style={{ transform: `rotate(${s.d}deg)` }} />
              ))}
              {[
                { mid: 72,  t: "1 pt",   col: "#c2410c" },
                { mid: 198, t: "2 pts",  col: "#c2410c" },
                { mid: 279, t: "5 pts",  col: "#fff"    },
                { mid: 324, t: "10 pts", col: "#fff"    },
              ].map((l, i) => (
                <span key={i} className="rp2-wheel-label" style={{
                  transform: `rotate(${l.mid}deg) translateY(-46px)`,
                  color: l.col,
                }}>{l.t}</span>
              ))}
            </div>

            <div className="rp2-hub"><span>SPIN</span></div>
          </div>

          {/* Coupon card mockup */}
          <div className="rp2-coupon">
            <div className="rp2-coupon-shine" />
            <div className="rp2-coupon-top">
              <span className="rp2-coupon-brand">Cherries Cafe</span>
              <span className="rp2-coupon-tag">Active</span>
            </div>
            <div className="rp2-coupon-value">
              ₹60 <span>OFF</span>
            </div>
            <div className="rp2-coupon-code">CHERRIES-XK9M2P</div>
            <div className="rp2-coupon-bottom">
              Min. order ₹200 &middot; 6 days left
            </div>
          </div>

          {/* Floating points pill */}
          <div className="rp2-pill-float">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            250 pts
          </div>
        </div>

        {/* ── Content side ── */}
        <div className="rp2-content">

          <div className="rp2-eyebrow">
            <div className="rp2-eyebrow-dot" />
            Loyalty Program
          </div>

          <h2 className="rp2-heading">
            Eat More,<br /><em>Pay Less</em>
          </h2>

          <p className="rp2-subhead">
            Cherries Rewards turns every visit into points.
            Spin once a day, stack up your balance,
            and redeem real dining discounts — all for free.
          </p>

          {/* Steps */}
          <div className="rp2-steps">
            {STEPS.map((s) => (
              <div key={s.num} className="rp2-step">
                <div className="rp2-step-num">{s.num}</div>
                <div className="rp2-step-icon">{s.icon}</div>
                <div className="rp2-step-body">
                  <span className="rp2-step-title">{s.title}</span>
                  <span className="rp2-step-detail">{s.detail}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="rp2-actions">
            <Link to={ctaTo} className="rp2-cta">
              {user ? "Open Rewards" : "Start Earning — It's Free"}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <p className="rp2-fine">No download &middot; Just your email</p>
          </div>

        </div>
      </div>
    </section>
  );
}