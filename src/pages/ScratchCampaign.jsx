import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import toast from "react-hot-toast";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { motion, AnimatePresence } from "framer-motion";
import ScratchCard from "../components/scratch/ScratchCard";
import "./styles/ScratchCampaign.css";

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id:       i,
  x:        Math.random() * 100,
  delay:    Math.random() * 6,
  duration: 4 + Math.random() * 5,
  size:     6 + Math.random() * 14,
}));

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const KEY_COUPON    = "cherries_coupon";
const KEY_DEVICE    = "cherries_device_id";
const KEY_SCRATCHED = "cherries_scratched";  // true = card was scratched today
const KEY_REVEALED  = "cherries_revealed";   // true = code was fully revealed
const KEY_DATE      = "cherries_date";

const STATES = {
  LOADING:           "loading",
  ELIGIBLE:          "eligible",          // unscratched card
  REVEALED:          "revealed",          // already scratched, show code directly
  ALREADY_SCRATCHED: "already_scratched", // scratched but no code (edge case)
  ERROR:             "error",
};

const getTodayIST = () =>
  new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

const clearIfNewDay = () => {
  const savedDate = sessionStorage.getItem(KEY_DATE);
  const today     = getTodayIST();
  if (savedDate !== today) {
    sessionStorage.removeItem(KEY_COUPON);
    sessionStorage.removeItem(KEY_SCRATCHED);
    sessionStorage.removeItem(KEY_REVEALED);
    sessionStorage.setItem(KEY_DATE, today);
  }
};

function ScratchCampaign() {
  const [coupon,       setCoupon]       = useState(null);
  const [state,        setState]        = useState(STATES.LOADING);
  const [errorMessage, setErrorMessage] = useState("");

  const initScratch = async () => {
    try {
      clearIfNewDay();

      // ── 1. Already revealed → show the code card directly on reload ──
      if (sessionStorage.getItem(KEY_REVEALED) === "true") {
        const savedCoupon = sessionStorage.getItem(KEY_COUPON);
        if (savedCoupon) {
          setCoupon(savedCoupon);
          setState(STATES.REVEALED);
          return;
        }
        setState(STATES.ALREADY_SCRATCHED);
        return;
      }

      // ── 2. Scratched but not revealed → come back tomorrow ──
      if (sessionStorage.getItem(KEY_SCRATCHED) === "true") {
        setState(STATES.ALREADY_SCRATCHED);
        return;
      }

      // ── 3. Coupon fetched but card not yet scratched → show unscratched card ──
      const savedCoupon = sessionStorage.getItem(KEY_COUPON);
      if (savedCoupon) {
        setCoupon(savedCoupon);
        setState(STATES.ELIGIBLE);
        return;
      }

      // ── 4. Fresh visit — get deviceId ──
      let deviceId = sessionStorage.getItem(KEY_DEVICE);
      if (!deviceId) {
        const fp     = await FingerprintJS.load();
        const result = await fp.get();
        deviceId     = result.visitorId;
        sessionStorage.setItem(KEY_DEVICE, deviceId);
      }

      // ── 5. Check backend status ──
      const statusRes = await axios.get(`${API}/api/scratch/status`, {
        params: { deviceId },
      });

      if (statusRes.data.alreadyScratched) {
        sessionStorage.setItem(KEY_SCRATCHED, "true");
        setState(STATES.ALREADY_SCRATCHED);
        return;
      }

      // ── 6. Eligible — fetch coupon ──
      const scratchRes = await axios.post(`${API}/api/scratch`, { deviceId });

      if (scratchRes.data.success) {
        const code = scratchRes.data.code;
        sessionStorage.setItem(KEY_COUPON, code);
        setCoupon(code);
        setState(STATES.ELIGIBLE);
      } else {
        sessionStorage.setItem(KEY_SCRATCHED, "true");
        setState(STATES.ALREADY_SCRATCHED);
      }

    } catch (error) {
      const status = error.response?.status;
      const data   = error.response?.data;

      if (status === 429 || data?.alreadyScratched) {
        sessionStorage.setItem(KEY_SCRATCHED, "true");
        setState(STATES.ALREADY_SCRATCHED);
        return;
      }

      if (!error.response) {
        const msg = "Unable to reach the server. Please check your connection.";
        setErrorMessage(msg);
        toast.error("Connection failed. Please try again.");
        setState(STATES.ERROR);
        return;
      }

      const msg = data?.message || "Something went wrong. Please try again later.";
      setErrorMessage(msg);
      toast.error(msg);
      setState(STATES.ERROR);
    }
  };

  useEffect(() => {
    initScratch();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Called by ScratchCard when user finishes scratching
  const handleScratched = () => {
    sessionStorage.setItem(KEY_SCRATCHED, "true");
    sessionStorage.setItem(KEY_REVEALED,  "true");
    setState(STATES.REVEALED);
  };

  const handleRetry = () => {
    setState(STATES.LOADING);
    setErrorMessage("");
    initScratch();
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Cherries Cafe Scratch & Win Combo Offer",
    description: "Scratch your card and win exclusive combo offers at Cherries Cafe Kakinada. One lucky scratch per day — valid for dine-in and takeaway orders.",
    organizer: { "@type": "Restaurant", name: "Cherries Cafe", url: "https://cherriescafe.in" },
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
  };

  return (
    <>
      <Helmet>
        <title>Scratch & Win Combo Offers | Cherries Cafe Kakinada</title>
        <meta name="description" content="Scratch your card and win exclusive combo meal deals at Cherries Cafe Kakinada. One free scratch per day — reveal your special offer and save on your next meal!" />
        <meta name="keywords"    content="Cherries cafe offer, scratch and win kakinada, combo deal kakinada, restaurant coupon kakinada, food discount cherries cafe" />
        <meta property="og:title"       content="Scratch & Win at Cherries Cafe Kakinada 🎉" />
        <meta property="og:description" content="Scratch your lucky card and win exclusive combo deals at Cherries Cafe. One chance per day!" />
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content="https://cherriescafe.in/scratch-and-win" />
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content="Scratch & Win at Cherries Cafe Kakinada 🎉" />
        <meta name="twitter:description" content="Win exclusive combo deals by scratching your lucky card at Cherries Cafe Kakinada!" />
        <link rel="canonical" href="https://cherriescafe.in/scratch-and-win" />
        <meta name="robots" content="noindex, nofollow" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="sc-page">

        <div className="sc-particles" aria-hidden="true">
          {PARTICLES.map((p) => (
            <span key={p.id} className="sc-particle" style={{
              left: `${p.x}%`, width: p.size, height: p.size,
              animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`,
            }} />
          ))}
        </div>

        <div className="sc-inner">

          <motion.div className="sc-badge"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}>
            <span className="sc-badge-dot" />
            Limited Daily Offer
          </motion.div>

          <motion.h1 className="sc-title"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}>
            Scratch &amp; <span className="sc-title-accent">Win</span>
          </motion.h1>

          <motion.p className="sc-subtitle"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            One lucky scratch a day — reveal your exclusive combo offer and save
            on your next meal at Cherries.
          </motion.p>

          <AnimatePresence mode="wait">

            {state === STATES.LOADING && (
              <motion.div key="loading" className="sc-state-box"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="sc-spinner" aria-label="Loading" />
                <p className="sc-state-text">Checking your eligibility…</p>
              </motion.div>
            )}

            {state === STATES.ELIGIBLE && coupon && (
              <motion.div key="card"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                <ScratchCard coupon={coupon} onScratched={handleScratched} alreadyRevealed={false} />
              </motion.div>
            )}

            {state === STATES.REVEALED && coupon && (
              <motion.div key="revealed"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                <ScratchCard coupon={coupon} onScratched={handleScratched} alreadyRevealed={true} />
              </motion.div>
            )}

            {state === STATES.ALREADY_SCRATCHED && (
              <motion.div key="used" className="sc-state-box sc-state-used"
                initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                <div className="sc-state-icon">⏰</div>
                <h2 className="sc-state-heading">Come Back Tomorrow!</h2>
                <p className="sc-state-text">
                  You've already used your daily scratch. Each device gets one
                  scratch per day — check back tomorrow for a fresh offer.
                </p>
                <a href="/menu" className="sc-cta-btn">Browse Our Menu</a>
              </motion.div>
            )}

            {state === STATES.ERROR && (
              <motion.div key="error" className="sc-state-box sc-state-error"
                initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                <div className="sc-state-icon">⚠️</div>
                <h2 className="sc-state-heading">Oops, Something Went Wrong</h2>
                <p className="sc-state-text">
                  {errorMessage || "We couldn't load your scratch card right now."}
                </p>
                <button className="sc-cta-btn" onClick={handleRetry}>Try Again</button>
              </motion.div>
            )}

          </AnimatePresence>

          <motion.div className="sc-trust"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}>
            <span className="sc-trust-item">🎯 One scratch per day</span>
            <span className="sc-trust-divider" />
            <span className="sc-trust-item">✅ Valid on dine-in &amp; takeaway</span>
            <span className="sc-trust-divider" />
            <span className="sc-trust-item">🔒 No account needed</span>
          </motion.div>

        </div>
      </div>
    </>
  );
}

export default ScratchCampaign;