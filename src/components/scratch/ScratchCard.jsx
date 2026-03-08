import { useEffect, useRef, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/ScratchCard.css";

/* ── tiny confetti burst ── */
function launchConfetti(canvas) {
  const container = canvas?.parentElement?.parentElement;
  if (!container) return;

  const colors = ["#f7d774", "#c9a227", "#fff", "#ff6b35", "#e8e8e8"];
  Array.from({ length: 42 }).forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "sc-confetti-dot";
    dot.style.cssText = `
      left:${30 + Math.random() * 40}%;
      background:${colors[i % colors.length]};
      width:${5 + Math.random() * 7}px;
      height:${5 + Math.random() * 7}px;
      animation-delay:${Math.random() * 0.4}s;
      animation-duration:${0.9 + Math.random() * 0.7}s;
    `;
    container.appendChild(dot);
    setTimeout(() => dot.remove(), 2000);
  });
}

function ScratchCard({ coupon }) {
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hintShown, setHintShown] = useState(false);
  const scratchingRef = useRef(false);
  const revealedRef = useRef(false);

  /* ── Draw initial gold overlay ── */
  const draw = useCallback((canvas) => {
    const ctx = canvas.getContext("2d");
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    canvas.width = w;
    canvas.height = h;

    // Gold gradient overlay
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#d4af37");
    grad.addColorStop(0.45, "#f7d774");
    grad.addColorStop(1, "#b8860b");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Subtle texture pattern
    ctx.fillStyle = "rgba(0,0,0,0.07)";
    for (let x = 0; x < w; x += 18) {
      for (let y = 0; y < h; y += 18) {
        ctx.fillRect(x, y, 9, 9);
      }
    }

    // Overlay text hint
    ctx.globalCompositeOperation = "source-over";
    ctx.font = "bold 13px 'DM Sans', sans-serif";
    ctx.fillStyle = "rgba(100,70,0,0.6)";
    ctx.textAlign = "center";
    ctx.fillText("✦  SCRATCH HERE  ✦", w / 2, h / 2 - 6);
    ctx.font = "11px 'DM Sans', sans-serif";
    ctx.fillStyle = "rgba(100,70,0,0.4)";
    ctx.fillText("Your combo offer is hidden below", w / 2, h / 2 + 14);

    ctx.globalCompositeOperation = "destination-out";
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    draw(canvas);

    // Show hint toast after 2s if user hasn't started
    const hintTimer = setTimeout(() => {
      if (!scratchingRef.current && !revealedRef.current) {
        toast("👆 Scratch the gold card to reveal your offer!", {
          icon: "✨",
          style: {
            background: "#1a0e00",
            color: "#f7d774",
            border: "1px solid rgba(247,215,116,0.3)",
            fontFamily: "'DM Sans', sans-serif",
          },
        });
        setHintShown(true);
      }
    }, 2200);

    return () => clearTimeout(hintTimer);
  }, [draw]);

  /* ── Scratch logic ── */
  const scratchAt = useCallback((canvas, x, y) => {
    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
    checkReveal(canvas);
  }, []);

  const checkReveal = useCallback((canvas) => {
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;
    const pixels = ctx.getImageData(0, 0, width, height).data;
    let transparent = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) transparent++;
    }
    const pct = Math.min(100, Math.round((transparent / (pixels.length / 4)) * 100));
    setProgress(pct);

    if (pct > 45 && !revealedRef.current) {
      revealedRef.current = true;
      // Auto-clear remaining overlay with smooth animation
      ctx.globalCompositeOperation = "destination-out";
      let alpha = 1;
      const clear = () => {
        alpha -= 0.06;
        ctx.globalAlpha = alpha;
        ctx.fillRect(0, 0, width, height);
        if (alpha > 0) requestAnimationFrame(clear);
        else {
          setRevealed(true);
          launchConfetti(canvas);
          toast.success("🎉 Combo offer unlocked! Copy your code below.", {
            duration: 4000,
            style: {
              background: "#1a0e00",
              color: "#f7d774",
              border: "1px solid rgba(247,215,116,0.3)",
              fontFamily: "'DM Sans', sans-serif",
            },
          });
        }
      };
      requestAnimationFrame(clear);
    }
  }, []);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return {
      x: (src.clientX - rect.left) * (canvas.width / rect.width),
      y: (src.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const onStart = useCallback((e) => {
    scratchingRef.current = true;
    const canvas = canvasRef.current;
    const pos = getPos(e, canvas);
    scratchAt(canvas, pos.x, pos.y);
  }, [scratchAt]);

  const onMove = useCallback((e) => {
    if (!scratchingRef.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const pos = getPos(e, canvas);
    scratchAt(canvas, pos.x, pos.y);
  }, [scratchAt]);

  const onStop = useCallback(() => { scratchingRef.current = false; }, []);

  const copyCode = () => {
    navigator.clipboard.writeText(coupon).then(() => {
      toast.success("✅ Coupon code copied to clipboard!", {
        style: {
          background: "#1a0e00",
          color: "#f7d774",
          border: "1px solid rgba(247,215,116,0.3)",
          fontFamily: "'DM Sans', sans-serif",
        },
      });
    });
  };

  return (
    <div className="sc-card-wrapper">
      {/* Instruction */}
      <AnimatePresence>
        {!revealed && (
          <motion.p
            className="sc-instruction"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Use your finger or mouse to scratch
          </motion.p>
        )}
      </AnimatePresence>

      {/* Card */}
      <div className="sc-card">
        {/* Reward (visible beneath canvas) */}
        <div className="sc-reward-bg">
          <div className="sc-reward-inner">
            <p className="sc-reward-label">🎉 Your Combo Offer</p>
            <div className="sc-coupon-code">{coupon}</div>
            <p className="sc-reward-sub">Show this at the counter</p>
          </div>
        </div>

        {/* Scratch canvas overlay */}
        <AnimatePresence>
          {!revealed && (
            <motion.canvas
              ref={canvasRef}
              className="sc-canvas"
              onMouseDown={onStart}
              onMouseMove={onMove}
              onMouseUp={onStop}
              onMouseLeave={onStop}
              onTouchStart={onStart}
              onTouchMove={onMove}
              onTouchEnd={onStop}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              aria-label="Scratch card — scratch to reveal your offer"
              role="img"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <AnimatePresence>
        {!revealed && (
          <motion.div
            className="sc-progress-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="sc-progress-bar">
              <motion.div
                className="sc-progress-fill"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <span className="sc-progress-label">{progress}% scratched</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Copy + actions after reveal */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            className="sc-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.45 }}
          >
            <button className="sc-copy-btn" onClick={copyCode}>
              <span>Copy Code</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            </button>
            <a href="/menu" className="sc-menu-btn">Browse Menu →</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Validity note */}
      {revealed && (
        <motion.p
          className="sc-validity"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Valid today only · Dine-in &amp; Takeaway · One use per customer
        </motion.p>
      )}
    </div>
  );
}

export default ScratchCard;