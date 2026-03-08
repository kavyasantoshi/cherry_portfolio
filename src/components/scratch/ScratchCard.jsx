import { useEffect, useRef, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/ScratchCard.css";

/* ── Confetti burst ── */
function launchConfetti(container) {
  if (!container) return;
  const colors = ["#f7d774", "#f97316", "#fff", "#fbbf24", "#fed7aa"];
  Array.from({ length: 55 }).forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "sc-confetti-dot";
    dot.style.cssText = `
      left:${20 + Math.random() * 60}%;
      background:${colors[i % colors.length]};
      width:${4 + Math.random() * 8}px;
      height:${4 + Math.random() * 8}px;
      animation-delay:${Math.random() * 0.5}s;
      animation-duration:${0.8 + Math.random() * 0.8}s;
    `;
    container.appendChild(dot);
    setTimeout(() => dot.remove(), 2000);
  });
}

function ScratchCard({ coupon, onScratched, alreadyRevealed = false }) {
  const canvasRef      = useRef(null);
  const wrapperRef     = useRef(null);
  const [revealed,     setRevealed]  = useState(alreadyRevealed);
  const [progress,     setProgress]  = useState(alreadyRevealed ? 100 : 0);
  const [copied,       setCopied]    = useState(false);
  const scratchingRef  = useRef(false);
  const revealedRef    = useRef(alreadyRevealed);
  const hasNotifiedRef = useRef(false);

  /* ── Draw gold overlay ── */
  const drawOverlay = useCallback((canvas) => {
    const ctx = canvas.getContext("2d");
    const w   = canvas.offsetWidth  || 360;
    const h   = canvas.offsetHeight || 240;
    canvas.width  = w;
    canvas.height = h;

    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0,   "#c9870a");
    grad.addColorStop(0.3, "#f7d774");
    grad.addColorStop(0.6, "#fce897");
    grad.addColorStop(1,   "#b8860b");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Checkerboard texture
    ctx.fillStyle = "rgba(0,0,0,0.055)";
    for (let x = 0; x < w; x += 14) {
      for (let y = 0; y < h; y += 14) {
        if ((Math.floor(x / 14) + Math.floor(y / 14)) % 2 === 0)
          ctx.fillRect(x, y, 14, 14);
      }
    }

    ctx.textAlign    = "center";
    ctx.textBaseline = "middle";
    ctx.font         = `bold ${Math.round(w * 0.048)}px 'DM Sans', sans-serif`;
    ctx.fillStyle    = "rgba(70,38,0,0.65)";
    ctx.fillText("✦  SCRATCH HERE  ✦", w / 2, h / 2 - 14);
    ctx.font      = `${Math.round(w * 0.036)}px 'DM Sans', sans-serif`;
    ctx.fillStyle = "rgba(70,38,0,0.42)";
    ctx.fillText("Use finger or mouse", w / 2, h / 2 + 14);

    ctx.globalCompositeOperation = "destination-out";
  }, []);

  useEffect(() => {
    if (alreadyRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawOverlay(canvas);

    const hint = setTimeout(() => {
      if (!scratchingRef.current && !revealedRef.current) {
        toast("👆 Scratch the gold card to reveal your offer!", {
          icon: "✨",
          style: { background: "#1a0e00", color: "#f7d774",
            border: "1px solid rgba(247,215,116,0.3)", fontFamily: "'DM Sans', sans-serif" },
        });
      }
    }, 2500);
    return () => clearTimeout(hint);
  }, [drawOverlay, alreadyRevealed]);

  const scratchAt = useCallback((canvas, x, y) => {
    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2); // 28px radius — finger friendly
    ctx.fill();
    checkReveal(canvas);
  }, []); // eslint-disable-line

  const checkReveal = useCallback((canvas) => {
    if (revealedRef.current) return;
    const ctx    = canvas.getContext("2d");
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) transparent++;
    }
    const pct = Math.round((transparent / (pixels.length / 4)) * 100);
    setProgress(Math.min(pct, 100));

    if (pct > 45 && !revealedRef.current) {
      revealedRef.current = true;
      let alpha = 1;
      const sweep = () => {
        alpha -= 0.07;
        ctx.globalAlpha = Math.max(alpha, 0);
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (alpha > 0) requestAnimationFrame(sweep);
        else {
          ctx.globalAlpha = 1;
          setRevealed(true);
          setProgress(100);
          launchConfetti(wrapperRef.current);
          if (!hasNotifiedRef.current) {
            hasNotifiedRef.current = true;
            toast.success("🎉 Offer unlocked! Show the code at the counter.", {
              duration: 5000,
              style: { background: "#1a0e00", color: "#f7d774",
                border: "1px solid rgba(247,215,116,0.3)", fontFamily: "'DM Sans', sans-serif" },
            });
            onScratched?.();
          }
        }
      };
      requestAnimationFrame(sweep);
    }
  }, [onScratched]);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const src  = e.touches ? e.touches[0] : e;
    return {
      x: (src.clientX - rect.left) * (canvas.width  / rect.width),
      y: (src.clientY - rect.top)  * (canvas.height / rect.height),
    };
  };

  const onStart = useCallback((e) => {
    e.preventDefault();
    scratchingRef.current = true;
    const canvas = canvasRef.current;
    if (canvas) { const p = getPos(e, canvas); scratchAt(canvas, p.x, p.y); }
  }, [scratchAt]);

  const onMove = useCallback((e) => {
    if (!scratchingRef.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (canvas) { const p = getPos(e, canvas); scratchAt(canvas, p.x, p.y); }
  }, [scratchAt]);

  const onStop = useCallback(() => { scratchingRef.current = false; }, []);

  const copyCode = () => {
    navigator.clipboard.writeText(coupon).then(() => {
      setCopied(true);
      toast.success("✅ Code copied to clipboard!", {
        style: { background: "#1a0e00", color: "#f7d774",
          border: "1px solid rgba(247,215,116,0.3)", fontFamily: "'DM Sans', sans-serif" },
      });
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const showCode = revealed || alreadyRevealed;

  return (
    <div className="sc-card-wrapper" ref={wrapperRef}>

      {/* Instruction */}
      <AnimatePresence>
        {!showCode && (
          <motion.div className="sc-instruction-row"
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <span className="sc-finger">👆</span>
            <span>Scratch the gold area to reveal your offer</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card */}
      <div className={`sc-card ${showCode ? "sc-card--revealed" : ""}`}>

        {/* Reward underneath */}
        <div className="sc-reward-layer">
          <div className="sc-reward-deco" aria-hidden="true">
            <span className="sc-deco-star">✦</span>
            <span className="sc-deco-star sc-deco-star--r">✦</span>
          </div>
          <p className="sc-reward-eyebrow">🎉 Your Combo Offer</p>
          <div className="sc-coupon-wrap">
            <span className="sc-coupon-code">{coupon}</span>
          </div>
          <p className="sc-reward-hint">Show this code at the counter</p>
        </div>

        {/* Gold scratch overlay */}
        {!alreadyRevealed && (
          <AnimatePresence>
            {!revealed && (
              <motion.canvas ref={canvasRef} className="sc-canvas"
                onMouseDown={onStart} onMouseMove={onMove}
                onMouseUp={onStop}   onMouseLeave={onStop}
                onTouchStart={onStart} onTouchMove={onMove} onTouchEnd={onStop}
                exit={{ opacity: 0, transition: { duration: 0.4 } }}
                aria-label="Scratch card" role="img"
              />
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Progress */}
      <AnimatePresence>
        {!showCode && (
          <motion.div className="sc-progress-wrap"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="sc-progress-track">
              <motion.div className="sc-progress-fill"
                animate={{ width: `${progress}%` }} transition={{ duration: 0.15 }} />
            </div>
            <span className="sc-progress-label">{progress}% scratched</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions after reveal */}
      <AnimatePresence>
        {showCode && (
          <motion.div className="sc-actions"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }} transition={{ delay: 0.25, duration: 0.4 }}>

            <button className={`sc-copy-btn${copied ? " sc-copy-btn--copied" : ""}`} onClick={copyCode}>
              {copied ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Copy Code
                </>
              )}
            </button>

            <a href="/menu" className="sc-menu-btn">
              Browse Menu
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Validity */}
      <AnimatePresence>
        {showCode && (
          <motion.p className="sc-validity"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            Valid today only · Dine-in &amp; Takeaway · One use per customer
          </motion.p>
        )}
      </AnimatePresence>

    </div>
  );
}

export default ScratchCard;