import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import "./Scratchpromosection.css";

function ScratchPromoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="sps-section" ref={ref} aria-label="Scratch and Win daily combo offer">
      {/* Decorative blobs */}
      <div className="sps-blob sps-blob--1" aria-hidden="true" />
      <div className="sps-blob sps-blob--2" aria-hidden="true" />

      <div className="sps-inner">

        {/* ── Left: Floating scratch card mockup ── */}
        <motion.div
          className="sps-visual"
          initial={{ opacity: 0, x: -50, rotate: -6 }}
          animate={isInView ? { opacity: 1, x: 0, rotate: -4 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          {/* Shadow card (stacked behind) */}
          <div className="sps-card-shadow" />

          {/* Main card */}
          <div className="sps-card-mockup">
            <div className="sps-card-shine" />
            <motion.div
              className="sps-card-icon"
              animate={isInView ? { rotate: [0, -8, 8, -4, 0] } : {}}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              🎁
            </motion.div>
            <p className="sps-card-label">SCRATCH &amp; WIN</p>
            <div className="sps-card-lines">
              <span /><span /><span />
            </div>
          </div>

          {/* Floating sparkles */}
          {["✦", "★", "✦"].map((s, i) => (
            <motion.span
              key={i}
              className={`sps-sparkle sps-sparkle--${i + 1}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
            >
              {s}
            </motion.span>
          ))}
        </motion.div>

        {/* ── Right: Text ── */}
        <div className="sps-text">
          <motion.span
            className="sps-eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Daily Offer
          </motion.span>

          <motion.h2
            className="sps-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Scratch Your Card,{" "}
            <span className="sps-accent">Win a Combo</span>
          </motion.h2>

          <motion.p
            className="sps-body"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Every day brings a fresh lucky scratch — reveal an exclusive combo
            meal offer at Cherries. No app, no signup. Just scratch and save on
            your next dine-in or takeaway order.
          </motion.p>

          {/* Trust pills */}
          <motion.div
            className="sps-pills"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.42 }}
          >
            <span className="sps-pill">One scratch / day</span>
            <span className="sps-pill">Dine-in &amp; Takeaway</span>
            <span className="sps-pill">No account needed</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            <Link
              to="/scratch-and-win"
              className="sps-btn"
              aria-label="Go to Scratch and Win page"
            >
              Scratch Now — It's Free
              <svg className="sps-btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </motion.div>

          <motion.p
            className="sps-fine"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.75 }}
          >
            Valid today only · Subject to availability · One use per customer
          </motion.p>
        </div>

      </div>
    </section>
  );
}

export default ScratchPromoSection;