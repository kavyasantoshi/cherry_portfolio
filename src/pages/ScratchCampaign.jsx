import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import toast from "react-hot-toast";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { motion, AnimatePresence } from "framer-motion";
import ScratchCard from "../components/scratch/ScratchCard";
import "./styles/ScratchCampaign.css";

const STATES = {
  LOADING: "loading",
  ELIGIBLE: "eligible",
  ALREADY_SCRATCHED: "already_scratched",
  ERROR: "error",
};

function ScratchCampaign() {
  const [coupon, setCoupon] = useState(null);
  const [state, setState] = useState(STATES.LOADING);
  const [errorMessage, setErrorMessage] = useState("");
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate floating particles for background
    setParticles(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 4 + Math.random() * 5,
        size: 6 + Math.random() * 14,
      }))
    );
    initScratch();
  }, []);

  const initScratch = async () => {
    try {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      const deviceId = result.visitorId;

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/scratch`,
        { deviceId }
      );

      if (res.data.success) {
        setCoupon(res.data.code);
        setState(STATES.ELIGIBLE);
      } else {
        setState(STATES.ALREADY_SCRATCHED);
      }
    } catch (error) {
      if (error.response?.status === 429 || error.response?.data?.alreadyScratched) {
        setState(STATES.ALREADY_SCRATCHED);
      } else if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
        setState(STATES.ERROR);
        toast.error(error.response.data.message);
      } else if (!error.response) {
        setErrorMessage("Unable to reach the server. Please check your connection.");
        setState(STATES.ERROR);
        toast.error("Connection failed. Please try again.");
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
        setState(STATES.ERROR);
        toast.error("Something went wrong.");
      }
    }
  };

  const handleRetry = () => {
    setState(STATES.LOADING);
    setErrorMessage("");
    initScratch();
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Cherries Restaurant Scratch & Win Combo Offer",
    description:
      "Scratch your card and win exclusive combo offers at Cherries Restaurant. One lucky scratch per day — valid for dine-in and takeaway orders.",
    organizer: {
      "@type": "Restaurant",
      name: "Cherries Restaurant",
      url: typeof window !== "undefined" ? window.location.origin : "",
    },
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Scratch & Win Combo Offers | Cherries Restaurant</title>
        <meta
          name="description"
          content="Scratch your card and win exclusive combo meal deals at Cherries Restaurant. One free scratch per day — reveal your special offer and save on your next meal!"
        />
        <meta
          name="keywords"
          content="Cherries restaurant offer, scratch and win, combo deal, restaurant coupon, food discount, Cherries combo offer"
        />
        <meta property="og:title" content="Scratch & Win at Cherries Restaurant 🎉" />
        <meta
          property="og:description"
          content="Scratch your lucky card and win exclusive combo deals at Cherries. One chance per day!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={typeof window !== "undefined" ? window.location.href : ""} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Scratch & Win at Cherries Restaurant 🎉" />
        <meta
          name="twitter:description"
          content="Win exclusive combo deals by scratching your lucky card at Cherries Restaurant!"
        />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : ""} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="sc-page">
        {/* Floating background particles */}
        <div className="sc-particles" aria-hidden="true">
          {particles.map((p) => (
            <span
              key={p.id}
              className="sc-particle"
              style={{
                left: `${p.x}%`,
                width: p.size,
                height: p.size,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}
        </div>

        <div className="sc-inner">
          {/* Header badge */}
          <motion.div
            className="sc-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="sc-badge-dot" />
            Limited Daily Offer
          </motion.div>

          <motion.h1
            className="sc-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Scratch &amp; <span className="sc-title-accent">Win</span>
          </motion.h1>

          <motion.p
            className="sc-subtitle"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            One lucky scratch a day — reveal your exclusive combo offer and save
            on your next meal at Cherries.
          </motion.p>

          {/* State Machine Rendering */}
          <AnimatePresence mode="wait">
            {state === STATES.LOADING && (
              <motion.div
                key="loading"
                className="sc-state-box"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="sc-spinner" aria-label="Loading" />
                <p className="sc-state-text">Checking your eligibility…</p>
              </motion.div>
            )}

            {state === STATES.ELIGIBLE && coupon && (
              <motion.div
                key="card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ScratchCard coupon={coupon} />
              </motion.div>
            )}

            {state === STATES.ALREADY_SCRATCHED && (
              <motion.div
                key="used"
                className="sc-state-box sc-state-used"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="sc-state-icon">⏰</div>
                <h2 className="sc-state-heading">Come Back Tomorrow!</h2>
                <p className="sc-state-text">
                  You've already used your daily scratch. Each device gets one
                  scratch per day — check back tomorrow for a fresh offer.
                </p>
                <a href="/menu" className="sc-cta-btn">
                  Browse Our Menu
                </a>
              </motion.div>
            )}

            {state === STATES.ERROR && (
              <motion.div
                key="error"
                className="sc-state-box sc-state-error"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="sc-state-icon">⚠️</div>
                <h2 className="sc-state-heading">Oops, Something Went Wrong</h2>
                <p className="sc-state-text">
                  {errorMessage || "We couldn't load your scratch card right now."}
                </p>
                <button className="sc-cta-btn" onClick={handleRetry}>
                  Try Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trust badges */}
          <motion.div
            className="sc-trust"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <span className="sc-trust-item">One scratch per day</span>
            <span className="sc-trust-divider" />
            <span className="sc-trust-item">✅ Valid on dine-in &amp; takeaway</span>
            <span className="sc-trust-divider" />
            <span className="sc-trust-item">No account needed</span>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default ScratchCampaign;