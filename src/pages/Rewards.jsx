import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SpinWheel from "../components/rewards/SpinWheel";
import toast from "react-hot-toast";
import "./styles/Rewards.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function authHeaders() {
  const token = localStorage.getItem("cherry_token");
  return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
}

/* ================================================================
   OFFER CARD
   ================================================================ */
function OfferCard({ offer, userPoints, onBuy }) {
  const [buying, setBuying] = useState(false);
  const canAfford = userPoints >= offer.pointCost;

  const handleBuy = async () => {
    if (!canAfford || buying) return;
    setBuying(true);
    try { await onBuy(offer._id); }
    finally { setBuying(false); }
  };

  const typeIcon = {
    combo:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>,
    discount: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>,
    freebie:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>,
    cashback: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  };

  return (
    <div className={`offer-card${!canAfford ? " offer-card--locked" : ""}`}>
      <div className="offer-card-type-icon">{typeIcon[offer.type] || typeIcon.combo}</div>
      <div className="offer-card-value">
        {offer.valueType === "percentage" ? `${offer.value}%` : `₹${offer.value}`}
        <span className="offer-card-value-label">OFF</span>
      </div>
      <h3 className="offer-card-name">{offer.name}</h3>
      <p className="offer-card-desc">{offer.description}</p>
      {offer.minOrderValue > 0 && (
        <p className="offer-card-min">Min. order ₹{offer.minOrderValue}</p>
      )}
      <div className="offer-card-footer">
        <div className="offer-card-cost">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          {offer.pointCost} pts
        </div>
        <button className="offer-card-btn" onClick={handleBuy} disabled={!canAfford || buying}>
          {buying ? <span className="btn-spinner" /> : canAfford ? "Buy & Scratch" : "Need more pts"}
        </button>
      </div>
    </div>
  );
}

/* ================================================================
   COUPON CARD  — with WhatsApp share
   ================================================================ */
function CouponCard({ coupon }) {
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const expiresAt  = new Date(coupon.expiresAt);
  const now        = new Date();
  const isExpired  = expiresAt < now;
  const msLeft     = expiresAt - now;
  const daysLeft   = Math.floor(msLeft / 86400000);
  const hoursLeft  = Math.floor((msLeft % 86400000) / 3600000);

  let expiryStatus = "active";
  if (isExpired)       expiryStatus = "expired";
  else if (daysLeft < 1) expiryStatus = "urgent";
  else if (daysLeft <= 2) expiryStatus = "warning";

  const expiryText = isExpired
    ? "Expired"
    : daysLeft >= 1 ? `${daysLeft}d ${hoursLeft}h left` : `${hoursLeft}h left`;

  const offerValue = coupon.offer.valueType === "percentage"
    ? `${coupon.offer.value}% off`
    : `₹${coupon.offer.value} off`;

  const shareText = `🍒 *Cherries Veg Restaurant — Exclusive Offer!*\n\n🎁 *${coupon.offer.name}*\n💰 ${offerValue}${coupon.offer.minOrderValue > 0 ? ` (Min. ₹${coupon.offer.minOrderValue})` : ""}\n\n🎟 Coupon Code: *${coupon.code}*\n\n📅 Valid until: ${expiresAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}\n\n${coupon.offer.terms || "Valid for dine-in and takeaway."}\n\n_Cherries Veg Restaurant, Kakinada_`;

  const copyCode = () => {
    navigator.clipboard.writeText(coupon.code).then(() => {
      setCopied(true);
      toast.success("Code copied!");
      setTimeout(() => setCopied(false), 2500);
    });
    setShareOpen(false);
  };

  const shareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank", "noopener");
    setShareOpen(false);
  };

  const shareNative = () => {
    if (navigator.share) {
      navigator.share({ title: "Cherries Rewards Coupon", text: shareText });
    } else {
      copyCode();
    }
    setShareOpen(false);
  };

  return (
    <div className={`coupon-card${isExpired ? " coupon-card--expired" : ""}`}>
      <div className="coupon-card-left">
        <div className={`coupon-expiry-badge coupon-expiry-badge--${expiryStatus}`}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          {expiryText}
        </div>
        <h3 className="coupon-offer-name">{coupon.offer.name}</h3>
        <p className="coupon-offer-detail">
          {offerValue}
          {coupon.offer.minOrderValue > 0 && ` · Min ₹${coupon.offer.minOrderValue}`}
        </p>
        <p className="coupon-terms">{coupon.offer.terms}</p>
      </div>

      <div className="coupon-card-right">
        <div className="coupon-code-block">
          <span className="coupon-code-label">Code</span>
          <span className="coupon-code">{coupon.code}</span>
        </div>

        <div className="coupon-actions">
          {/* Copy button */}
          <button className="coupon-btn coupon-btn--copy" onClick={copyCode} disabled={isExpired}>
            {copied ? (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                Copy
              </>
            )}
          </button>

          {/* Share dropdown */}
          <div className="coupon-share-wrap">
            <button
              className="coupon-btn coupon-btn--share"
              onClick={() => setShareOpen((o) => !o)}
              disabled={isExpired}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
              Share
            </button>

            {shareOpen && (
              <div className="share-dropdown">
                {/* WhatsApp */}
                <button className="share-option share-option--whatsapp" onClick={shareWhatsApp}>
                  {/* WhatsApp icon */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </button>

                {/* Copy text */}
                <button className="share-option" onClick={copyCode}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                  Copy Code
                </button>

                {/* More / native share */}
                <button className="share-option" onClick={shareNative}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                  More Options
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   MAIN DASHBOARD
   ================================================================ */
export default function Rewards() {
  const { user, updatePoints, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("spin");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const [spinStatus, setSpinStatus]   = useState({ canSpin: true, nextSpinTime: null });
  const [offers, setOffers]           = useState([]);
  const [offersLoading, setOffersLoading] = useState(false);
  const [coupons, setCoupons]         = useState([]);
  const [couponsLoading, setCouponsLoading] = useState(false);
  const [newCoupon, setNewCoupon]     = useState(null);

  /* ── Load spin status ── */
  const loadSpinStatus = useCallback(async () => {
    try {
      const res = await fetch(`${API}/scratch/status`, { headers: authHeaders() });
      if (res.status === 401) { logout(); return; }
      const data = await res.json();
      setSpinStatus({
        canSpin: !data.alreadyScratched,
        nextSpinTime: data.nextScratchDate
          ? new Date(data.nextScratchDate + "T00:00:00") : null,
      });
    } catch { /* silent */ }
  }, [logout]);

  useEffect(() => { loadSpinStatus(); }, [loadSpinStatus]);

  /* ── Load offers ── */
  useEffect(() => {
    if (tab !== "store" || offers.length) return;
    setOffersLoading(true);
    fetch(`${API}/offers`)
      .then((r) => r.json())
      .then((d) => setOffers(d.data || []))
      .catch(() => toast.error("Failed to load offers"))
      .finally(() => setOffersLoading(false));
  }, [tab, offers.length]);

  /* ── Load coupons ── */
  const loadCoupons = useCallback(async () => {
    setCouponsLoading(true);
    try {
      const res = await fetch(`${API}/user/coupons`, { headers: authHeaders() });
      if (res.status === 401) { logout(); return; }
      const data = await res.json();
      setCoupons(data.data || []);
    } catch { toast.error("Failed to load coupons"); }
    finally { setCouponsLoading(false); }
  }, [logout]);

  useEffect(() => {
    if (tab === "wallet") loadCoupons();
  }, [tab, loadCoupons]);

  /* ── Spin handler ── */
  const handleSpin = async () => {
    const res = await fetch(`${API}/game/spin`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({}),
    });
    const data = await res.json();
    if (!res.ok) { toast.error(data.message || "Spin failed"); throw new Error(data.message); }
    updatePoints(data.totalPoints);
    setSpinStatus({ canSpin: false, nextSpinTime: new Date(data.nextSpinAvailable) });
    toast.success(`+${data.pointsWon} points earned!`);
    return data;
  };

  /* ── Buy scratch card ── */
  const handleBuy = async (offerId) => {
    const res = await fetch(`${API}/scratch`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ offerId }),
    });
    const data = await res.json();
    if (!res.ok) { toast.error(data.message || "Purchase failed"); return; }
    updatePoints(data.remainingPoints);
    setNewCoupon(data);
    toast.success("Scratch card purchased!");
  };

  /* ── Logout ── */
  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <div className="rewards-root">

      {/* ── HEADER ── */}
      <div className="rewards-header">
        {/* Back button */}
        <button className="rewards-back-btn" onClick={() => navigate("/")} aria-label="Back to home">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          <span>Home</span>
        </button>

        {/* Brand */}
        <div className="rewards-header-brand">
          <img src="/logos/cherry_logo.png" alt="Cherries" className="rewards-logo" />
          <div>
            <div className="rewards-header-title">Cherries Rewards</div>
            <div className="rewards-header-user">{user?.email}</div>
          </div>
        </div>

        {/* Right: points + catering + logout */}
        <div className="rewards-header-right">
          {/* Catering link */}
          <button
            className="rewards-catering-btn"
            onClick={() => navigate("/catering")}
            aria-label="Go to Catering"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="8" y2="12" />
              <path d="M6 6a2 2 0 014 0v2H6V6z" />
              <line x1="8" y1="12" x2="8" y2="20" />
              <line x1="16" y1="6" x2="16" y2="20" />
              <path d="M14 6c0 0 2-1 2 3s-2 3-2 3" />
            </svg>
            <span className="rewards-catering-label">Catering</span>
          </button>

          <div className="rewards-points-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span className="rewards-points-num">{user?.points ?? 0}</span>
            <span className="rewards-points-label">pts</span>
          </div>

          <button
            className="rewards-logout-btn"
            onClick={() => setShowLogoutConfirm(true)}
            aria-label="Logout"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span className="rewards-logout-label">Logout</span>
          </button>
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="rewards-tabs" role="tablist">
        {[
          {
            key: "spin", label: "Daily Spin",
            icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 11-.57-8.38"/></svg>
          },
          {
            key: "store", label: "Store",
            icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          },
          {
            key: "wallet", label: "My Coupons",
            icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
          },
        ].map((t) => (
          <button key={t.key}
            className={`rewards-tab${tab === t.key ? " rewards-tab--active" : ""}`}
            onClick={() => setTab(t.key)}
            role="tab" aria-selected={tab === t.key}>
            {t.icon}{t.label}
            {t.key === "wallet" && coupons.length > 0 && (
              <span className="tab-badge">{coupons.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* ── PANELS ── */}
      <div className="rewards-panel">

        {/* SPIN TAB */}
        {tab === "spin" && (
          <div className="tab-spin">
            <div className="tab-spin-header">
              <h2 className="tab-heading">Spin &amp; Earn</h2>
              <p className="tab-subheading">
                One free spin every day. Land on a segment to win points.
              </p>
            </div>

            {/* Points summary card */}
            <div className="spin-points-card">
              <div className="spin-points-card-left">
                <span className="spin-points-card-label">Your balance</span>
                <span className="spin-points-card-value">{user?.points ?? 0}</span>
                <span className="spin-points-card-unit">points</span>
              </div>
              <div className="spin-points-card-divider" />
              <div className="spin-points-card-right">
                <div className="spin-points-stat">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 11-.57-8.38"/></svg>
                  <span>{spinStatus.canSpin ? "Spin available!" : "Spun today"}</span>
                </div>
                <div className="spin-points-stat">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  <span>Win up to 100 pts</span>
                </div>
              </div>
            </div>

            <SpinWheel
              onSpin={handleSpin}
              canSpin={spinStatus.canSpin}
              nextSpinTime={spinStatus.nextSpinTime}
            />

            {/* How it works — clean 3-step strip, no probability table */}
            <div className="spin-how-it-works">
              <div className="spin-how-step">
                <div className="spin-how-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 11-.57-8.38"/></svg>
                </div>
                <span>Spin once daily</span>
              </div>
              <div className="spin-how-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
              <div className="spin-how-step">
                <div className="spin-how-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <span>Collect points</span>
              </div>
              <div className="spin-how-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
              <div className="spin-how-step">
                <div className="spin-how-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>
                </div>
                <span>Redeem at counter</span>
              </div>
            </div>
          </div>
        )}

        {/* STORE TAB */}
        {tab === "store" && (
          <div className="tab-store">
            <div className="tab-store-header">
              <h2 className="tab-heading">Offer Store</h2>
              <p className="tab-subheading">Spend your points on exclusive dining offers.</p>
              <div className="tab-points-inline">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                Your balance: <strong>{user?.points ?? 0} pts</strong>
              </div>
            </div>
            {offersLoading ? (
              <div className="rewards-loading"><span className="rewards-spinner" />Loading offers...</div>
            ) : offers.length === 0 ? (
              <div className="rewards-empty">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                <p>No offers available right now. Check back soon!</p>
              </div>
            ) : (
              <div className="offers-grid">
                {offers.map((offer) => (
                  <OfferCard key={offer._id} offer={offer} userPoints={user?.points ?? 0} onBuy={handleBuy} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* WALLET TAB */}
        {tab === "wallet" && (
          <div className="tab-wallet">
            <div className="tab-wallet-header">
              <h2 className="tab-heading">My Coupons</h2>
              <p className="tab-subheading">Show the code at the counter to redeem your offer.</p>
            </div>
            {couponsLoading ? (
              <div className="rewards-loading"><span className="rewards-spinner" />Loading coupons...</div>
            ) : coupons.length === 0 ? (
              <div className="rewards-empty">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                <p>No coupons yet. Spin to earn points and buy from the store!</p>
                <button className="rewards-empty-cta" onClick={() => setTab("spin")}>Go to Spin</button>
              </div>
            ) : (
              <div className="coupons-list">
                {coupons.map((c) => <CouponCard key={c._id} coupon={c} />)}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── PURCHASE SUCCESS MODAL ── */}
      {newCoupon && (
        <div className="modal-backdrop" onClick={() => setNewCoupon(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-confetti" aria-hidden="true">
              {["🎉","✨","🎊","⭐","🎁"].map((e, i) => (
                <span key={i} className="modal-confetti-piece" style={{ "--i": i }}>{e}</span>
              ))}
            </div>
            <div className="modal-success-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h3 className="modal-title">You won!</h3>
            <p className="modal-offer-name">{newCoupon.offer.name}</p>
            <div className="modal-code-block">
              <span className="modal-code-label">Your coupon code</span>
              <span className="modal-code">{newCoupon.code}</span>
            </div>
            <p className="modal-expiry">
              Valid until {new Date(newCoupon.expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </p>
            <p className="modal-terms">{newCoupon.offer.terms}</p>
            <div className="modal-actions">
              <button className="modal-btn modal-btn--whatsapp"
                onClick={() => {
                  const txt = `🍒 *Cherries Veg Restaurant*\n\n🎁 *${newCoupon.offer.name}*\n🎟 Code: *${newCoupon.code}*\n\nUse this at the counter!`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(txt)}`, "_blank", "noopener");
                }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Share on WhatsApp
              </button>
              <button className="modal-btn modal-btn--wallet"
                onClick={() => { setNewCoupon(null); setTab("wallet"); }}>
                View in Wallet
              </button>
              <button className="modal-btn modal-btn--close" onClick={() => setNewCoupon(null)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── LOGOUT CONFIRM ── */}
      {showLogoutConfirm && (
        <div className="modal-backdrop" onClick={() => setShowLogoutConfirm(false)}>
          <div className="logout-confirm-card" onClick={(e) => e.stopPropagation()}>
            <div className="logout-confirm-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </div>
            <h3 className="logout-confirm-title">Sign out?</h3>
            <p className="logout-confirm-body">Your points are saved. You can sign back in anytime.</p>
            <div className="logout-confirm-actions">
              <button className="logout-confirm-btn logout-confirm-btn--yes" onClick={handleLogout}>
                Yes, sign out
              </button>
              <button className="logout-confirm-btn logout-confirm-btn--no" onClick={() => setShowLogoutConfirm(false)}>
                Stay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}