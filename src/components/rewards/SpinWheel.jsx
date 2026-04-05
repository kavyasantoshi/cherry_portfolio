import { useState, useRef, useEffect } from "react";

// Segments: weight controls the actual slice size
// Large weight = large slice = label has room to show
const SEGMENTS = [
  { label: "1 pt",   points: 1,   isFood: false, color: "#fff3e0", textColor: "#c2410c", weight: 1 },
  { label: "5 pts",  points: 5,   isFood: false, color: "#ffe0c2", textColor: "#c2410c", weight: 1 },
  { label: "Tea",    foodId: "tea", isFood: true,  color: "#f97316", textColor: "#ffffff", weight: 1, 
    Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg> },
  { label: "Snack",  foodId: "snack", isFood: true,  color: "#ea580c", textColor: "#ffffff", weight: 1, 
    Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a6 6 0 0 0-6 6v2H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2V8a6 6 0 0 0-6-6z"/><path d="M8 22v-4"/><path d="M16 22v-4"/></svg> },
  { label: "20 pts", points: 20,  isFood: false, color: "#fb923c", textColor: "#ffffff", weight: 1 },
  { label: "Poori",  foodId: "poori", isFood: true,  color: "#fdba74", textColor: "#9a3412", weight: 1, 
    Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="5"/></svg> },
  { label: "100 pts",points: 100, isFood: false, color: "#f97316", textColor: "#ffffff", weight: 1 },
];

const totalWeight = SEGMENTS.reduce((s, seg) => s + seg.weight, 0);
let cumDeg = 0;
const SEGMENT_RANGES = SEGMENTS.map((seg) => {
  const degrees = (seg.weight / totalWeight) * 360;
  const start = cumDeg;
  const end = cumDeg + degrees;
  cumDeg = end;
  return { ...seg, startDeg: start, endDeg: end, midDeg: (start + end) / 2 };
});

function buildConicGradient() {
  return `conic-gradient(${SEGMENT_RANGES.map(
    (s) => `${s.color} ${s.startDeg}deg ${s.endDeg}deg`
  ).join(", ")})`;
}

// Convert polar angle + radius to x,y offset from center
// Used to position each label accurately inside its slice
function polarToCartesian(angleDeg, radiusPx) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: radiusPx * Math.cos(rad),
    y: radiusPx * Math.sin(rad),
  };
}

export default function SpinWheel({ onSpin, canSpin, nextSpinTime, onWin }) {
  const [rotating, setRotating] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [result, setResult] = useState(null);
  const wheelRef = useRef(null);
  const WHEEL_RADIUS = 130; // half of 260px wheel

  // Countdown timer
  const [countdown, setCountdown] = useState("");
  useEffect(() => {
    if (!nextSpinTime || canSpin) return;
    const tick = () => {
      const diff = new Date(nextSpinTime) - Date.now();
      if (diff <= 0) { setCountdown(""); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [nextSpinTime, canSpin]);

  const handleSpin = async () => {
    if (!canSpin || rotating) return;
    setRotating(true);
    setResult(null);

    try {
      const data = await onSpin();
      const seg =
        SEGMENT_RANGES.find((s) => 
          (data.resultType === 'points' && s.points === data.pointsWon) ||
          (data.resultType === 'food' && s.foodId === data.foodId)
        ) || SEGMENT_RANGES[0];

      // Pointer sits at top (0°). We want seg.midDeg to land at top.
      const currentRotationMod = currentRotation % 360;
      const targetDegOffset = (360 - seg.midDeg - currentRotationMod + 360) % 360;
      const finalRotation = currentRotation + (5 * 360) + targetDegOffset;

      if (wheelRef.current) {
        wheelRef.current.style.transition =
          "transform 4s cubic-bezier(0.17, 0.67, 0.12, 1)";
        wheelRef.current.style.transform = `rotate(${finalRotation}deg)`;
      }
      setCurrentRotation(finalRotation);

      setTimeout(() => {
        setRotating(false);
        setResult(data);
        if (onWin) onWin(data);
      }, 4300);
    } catch {
      setRotating(false);
    }
  };

  return (
    <div className="spin-wrap">
      <div className="spin-wheel-outer">

        {/* Pointer — sits at top, outside the wheel */}
        <div className="spin-pointer" aria-hidden="true">
          <svg width="22" height="30" viewBox="0 0 22 30" fill="none">
            <path d="M11 30L1 2h20L11 30z" fill="#f97316" />
            <path d="M11 26L3 5h16L11 26z" fill="#ea580c" />
            <circle cx="11" cy="6" r="2.5" fill="rgba(255,255,255,0.6)" />
          </svg>
        </div>

        {/* Decorative rings */}
        <div className="spin-ring spin-ring--outer" />
        <div className="spin-ring spin-ring--inner" />

        {/* Wheel disc */}
        <div
          className="spin-wheel"
          ref={wheelRef}
          style={{ background: buildConicGradient() }}
        >
          {/* Divider spokes */}
          {SEGMENT_RANGES.map((seg, i) => (
            <div
              key={`div-${i}`}
              className="spin-divider"
              style={{ transform: `rotate(${seg.startDeg}deg)` }}
            />
          ))}

          {/* Labels — positioned using translate from center into each slice */}
          {SEGMENT_RANGES.map((seg, i) => {
            // Place label at 62% of radius so it's inside the slice, not at edge
            const labelRadius = WHEEL_RADIUS * 0.62;
            const { x, y } = polarToCartesian(seg.midDeg, labelRadius);
            // Only show label if slice is large enough (≥ 12 degrees)
            const sliceDeg = seg.endDeg - seg.startDeg;
            const showLabel = sliceDeg >= 10;

            return (
              <div
                key={`lbl-${i}`}
                className="spin-seg-label"
                style={{
                  // Position relative to wheel center (50% 50%)
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  // Translate to the polar position, then rotate to align with slice
                  transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%)) rotate(${seg.midDeg}deg)`,
                  color: seg.textColor,
                  opacity: showLabel ? 1 : 0,
                  fontSize: sliceDeg < 20 ? "8px" : sliceDeg < 36 ? "9px" : "10px",
                  fontWeight: 800,
                  fontFamily: "'Poppins', sans-serif",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  textShadow: "0 1px 2px rgba(0,0,0,0.25)",
                  letterSpacing: "0.2px",
                  lineHeight: 1,
                  // Center the text on its anchor point
                  transformOrigin: "50% 50%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2px"
                }}
              >
                {seg.isFood && <seg.Icon />}
                <span>{seg.label}</span>
              </div>
            );
          })}
        </div>

        {/* Center hub button */}
        <button
          className={`spin-hub ${rotating ? "spin-hub--spinning" : ""} ${!canSpin ? "spin-hub--disabled" : ""}`}
          onClick={handleSpin}
          disabled={!canSpin || rotating}
          aria-label="Spin the wheel"
        >
          <span className="spin-hub-text">
            {rotating ? "···" : canSpin ? "SPIN" : "DONE"}
          </span>
        </button>
      </div>

      {/* Countdown */}
      {!canSpin && countdown && (
        <div className="spin-cooldown">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Next spin in <strong>{countdown}</strong>
        </div>
      )}

      {/* Win result */}
      {result && (
        <div className="spin-result">
          <div className="spin-result-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {result.resultType === 'food' ? `You won a free ${result.foodWon}!` : `+${result.pointsWon} points won!`}
          </div>
          <p className="spin-result-total">
            Balance: <strong>{result.totalPoints} pts</strong>
          </p>
        </div>
      )}

      {/* Already spin */}
      {!canSpin && !countdown && (
        <div className="spin-cooldown spin-cooldown--done">
          You've already spun today. Come back tomorrow!
        </div>
      )}
    </div>
  );
}