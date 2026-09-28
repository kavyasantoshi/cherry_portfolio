// ─────────────────────────────────────────────────────────────────────
//  Catering.jsx  — /catering route
//  Flow: Pick Plan → Build Menu → Event Details → Send Request
//  Mobile-first · Cherries theme
// ─────────────────────────────────────────────────────────────────────
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import "./styles/Catering.css";

import { Search, X, Check, Plus, UtensilsCrossed, CalendarDays, Users, ArrowRight, ClipboardList, HeartHandshake, Info } from "lucide-react";

const earliestDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 2);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

const API = import.meta.env.VITE_API_URL;

function categorySelectionError(category, count) {
  if (category.isOptional) return "";
  const minimum = category.minItems || 0;
  if (count < minimum) {
    const remaining = minimum - count;
    return `Select ${minimum} ${minimum === 1 ? "dish" : "dishes"} in ${category.name}. You’ve selected ${count} — choose ${remaining} more to continue.`;
  }
  if (category.maxItems && count > category.maxItems) {
    return `Choose no more than ${category.maxItems} dishes in ${category.name}. Remove ${count - category.maxItems} to continue.`;
  }
  return "";
}

function focusCategory(id) {
  const category = document.getElementById(`cat-category-${id}`);
  category?.focus({ preventScroll: true });
  category?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
}


// ── Custom Header (with logout button) ───────────────────────────────
function CateringHeader({ user, onLogout }) {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <>
      <div className="cat-header">
        {/* Back button */}
        <button className="cat-back-btn" onClick={() => navigate("/")} aria-label="Back to home">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          <span>Home</span>
        </button>

        {/* Brand */}
        <div className="cat-header-brand">
          <img src="/logos/cherry_logo.png" alt="Cherries" className="cat-logo" />
          <div>
            <div className="cat-header-title">Catering</div>
            <div className="cat-header-user">{user ? user.email : "Guest Order"}</div>
          </div>
        </div>

        {/* Right: rewards + points + logout */}
        {user ? (
          <div className="cat-header-right">
            {/* Rewards link */}
            <button
              className="cat-rewards-btn"
              onClick={() => navigate("/rewards")}
              aria-label="Go to Rewards"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span className="cat-rewards-label">Rewards</span>
            </button>

            <div className="cat-points-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span className="cat-points-num">{user?.points ?? 0}</span>
              <span className="cat-points-label">pts</span>
            </div>

            <button
              className="cat-logout-btn"
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
              <span className="cat-logout-label">Logout</span>
            </button>
          </div>
        ) : (
          <div className="cat-header-right">
            <button
              className="cat-login-btn"
              onClick={() => navigate("/login", { state: { from: "/catering" } })}
            >
              Sign In
            </button>
          </div>
        )}
      </div>

      {/* Logout confirm modal */}
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
            <p className="logout-confirm-body">You can sign back in anytime.</p>
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
    </>
  );
}

// ── Step indicator ─────────────────────────────────────────────────────
function StepBar({ step, onBack, disabled }) {
  const steps = ["Choose Plan", "Select Items", "Your Details"];
  return (
    <nav className="cat-steps" aria-label="Booking progress">
      {steps.map((label, i) => (
        <button type="button" key={i} disabled={disabled || i + 1 > step} onClick={() => onBack(i + 1)} aria-current={i + 1 === step ? "step" : undefined} className={`cat-step ${i + 1 === step ? "cat-step--active" : ""} ${i + 1 < step ? "cat-step--done" : ""}`}>
          <div className="cat-step-num">
            {i + 1 < step ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : i + 1}
          </div>
          <span className="cat-step-label">{label}</span>
          {i < steps.length - 1 && <div className="cat-step-line" />}
        </button>
      ))}
    </nav>
  );
}

// ── Step 1: Plan Selection ─────────────────────────────────────────────
function StepPlan({ plans, loading, selected, onSelect }) {
  if (loading) return <div className="cat-loader"><div className="cat-spinner" /></div>;

  return (
    <div className="cat-section">
      <h2 className="cat-section-title">Choose Your Plan</h2>
      <p className="cat-section-sub">Start with a price per person. Next, make the menu your own.</p>
      <div className="cat-plans-grid">
        {plans.map((plan) => (
          <button
            key={plan._id}
            aria-pressed={selected?._id === plan._id}
            className={`cat-plan-card ${selected?._id === plan._id ? "cat-plan-card--active" : ""}`}
            onClick={() => onSelect(plan)}
          >
            {selected?._id === plan._id && (
              <div className="cat-plan-check">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}
            <UtensilsCrossed className="cat-plan-icon" size={24} aria-hidden="true" />
            <div className="cat-plan-name">{plan.name}</div>
            <div className="cat-plan-price">
              ₹{plan.pricePerPerson}
              <span>/person</span>
            </div>
            <span className="cat-plan-choice">{selected?._id === plan._id ? "Selected for your event" : "Choose this plan"}</span>
            {plan.description && (
              <div className="cat-plan-desc">{plan.description}</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Searchable dish picker ─────────────────────────────────────────
function CategoryPicker({ category, selectedIds, onToggle, customSelections, onCustomToggle }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);
  const query = searchTerm.trim();
  const matches = category.items.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
  const visibleItems = query || showAll ? matches : matches.slice(0, 6);
  const atLimit = !category.isOptional && category.maxItems > 0 && selectedIds.length >= category.maxItems;
  return (
    <div className="cat-menu-browser">
      <div className="cat-search-box">
        <Search size={18} aria-hidden="true" />
        <input type="search" aria-label={`Search ${category.name}`} placeholder={`Search ${category.name.toLowerCase()}…`}
          value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        {query && <button type="button" aria-label="Clear search" onClick={() => setSearchTerm("")}><X size={18} /></button>}
      </div>
      <div className="cat-dish-grid">
        {visibleItems.map(item => {
          const selected = selectedIds.includes(item._id);
          return <button type="button" key={item._id} aria-pressed={selected}
            disabled={!selected && atLimit}
            className={`cat-dish ${selected ? "cat-dish--selected" : ""}`} onClick={() => onToggle(item._id)}>
            <span className="cat-dish-check">{selected ? <Check size={15} /> : <Plus size={15} />}</span>
            <span>{item.name}</span>
          </button>;
        })}
      </div>
      {!query && matches.length > 6 && <button type="button" className="cat-text-button" onClick={() => setShowAll(!showAll)}>{showAll ? "Show fewer dishes" : `See all ${matches.length} dishes`}</button>}
      {query && matches.length === 0 && <p className="cat-help">No matching dishes. You can send a special request below.</p>}
      {query && !category.items.some(item => item.name.toLowerCase() === query.toLowerCase()) && <button type="button" className="cat-custom-request" onClick={() => { onCustomToggle(query); setSearchTerm(""); }}>
        <Plus size={16} /> {customSelections.includes(query) ? "Remove request" : "Request"}: “{query}”
      </button>}
      <p className="cat-help">{atLimit ? "Selection complete. Remove a dish to choose another." : "Tap a dish to add it. Tap again to remove it."} Search to request something else; our team will confirm availability. Custom requests are additional to required dishes.</p>
    </div>
  );
}

// ── Step 2: Item Selection ─────────────────────────────────────────────
function StepItems({ planDetail, loading, selections, onChange, customNotes, onCustomNoteChange, showSelectionErrors }) {
  if (loading) return <div className="cat-loader"><div className="cat-spinner" /></div>;
  if (!planDetail) return null;

  const { categories } = planDetail;
  const incomplete = categories.filter(category => categorySelectionError(category, (selections[category._id] || []).length));
  const hasAnySelection = Object.values(selections).some(items => items.length) || Object.values(customNotes).some(note => note.trim());

  const handleSelect = (catId, itemId) => {
    const current = selections[catId] || [];
    const isSelected = current.includes(itemId);
    
    let newSelection;
    if (isSelected) {
      newSelection = current.filter(id => id !== itemId);
    } else {
      newSelection = [...current, itemId];
    }
    onChange(catId, newSelection);
  };

  const handleCustomToggle = (catId, customName) => {
    let currentCustom = customNotes[catId] ? customNotes[catId].split(", ").map(s => s.trim()).filter(Boolean) : [];
    if (currentCustom.includes(customName)) {
      currentCustom = currentCustom.filter(name => name !== customName);
    } else {
      currentCustom.push(customName);
    }
    onCustomNoteChange(catId, currentCustom.join(", "));
  };
  
  const removeCustomItem = (catId, customName) => {
    let currentCustom = customNotes[catId] ? customNotes[catId].split(", ").map(s => s.trim()).filter(Boolean) : [];
    currentCustom = currentCustom.filter(name => name !== customName);
    onCustomNoteChange(catId, currentCustom.join(", "));
  };

  return (
    <div className="cat-section">
      <h2 className="cat-section-title">Select Your Items</h2>
      <p className="cat-section-sub">
        Build a menu your guests will love. Browse each category, tap your favourites, or search for a dish.
      </p>
      {showSelectionErrors && (incomplete.length > 0 || !hasAnySelection) && (
        <div className="cat-selection-alert" role="alert">
          <Info size={23} aria-hidden="true" />
          <div>
            <strong>{incomplete.length ? "Your menu needs a few more choices" : "Choose something for your menu"}</strong>
            <p>{incomplete.length ? "Complete the highlighted categories below to continue. Tap a category to go straight to it." : "Select at least one dish or add a custom request before continuing."}</p>
            {incomplete.map(category => <button type="button" key={category._id} onClick={() => focusCategory(category._id)}>{category.name}: {(selections[category._id] || []).length} selected{category.minItems ? ` · ${category.minItems} required` : ""} <ArrowRight size={15} /></button>)}
          </div>
        </div>
      )}
      <div className="cat-categories">
        {categories.map((cat) => {
          const chosen = selections[cat._id] || [];
          const error = categorySelectionError(cat, chosen.length);
          const showError = showSelectionErrors && Boolean(error);
          const minimum = cat.isOptional ? 0 : cat.minItems || 0;
          const remaining = Math.max(0, minimum - chosen.length);
          const customChosen = customNotes[cat._id] ? customNotes[cat._id].split(", ").map(s => s.trim()).filter(Boolean) : [];
          
          return (
            <section key={cat._id} id={`cat-category-${cat._id}`} tabIndex={-1}
              aria-labelledby={`cat-title-${cat._id}`} aria-describedby={`cat-guidance-${cat._id}`}
              className={`cat-category ${showError ? "cat-category--needs-selection" : ""}`}>
              <div className="cat-category-header">
                <h3 id={`cat-title-${cat._id}`} className="cat-category-name">{cat.name}</h3>
                <div className="cat-category-meta">
                  <span className="cat-category-rule">{cat.isOptional ? "Optional" : `Choose at least ${cat.minItems || 0}${cat.maxItems ? ` · up to ${cat.maxItems}` : ""}`}</span>
                  <span className="cat-chosen-count">
                    {chosen.length} {minimum ? `/ ${minimum} required dishes` : "dishes selected"}{customChosen.length > 0 && ` · ${customChosen.length} custom request${customChosen.length === 1 ? "" : "s"}`}
                  </span>
                </div>
              </div>

              <div id={`cat-guidance-${cat._id}`} aria-live="polite" aria-atomic="true"
                className={`cat-category-guidance ${showError ? "cat-category-guidance--error" : minimum && !error ? "cat-category-guidance--complete" : ""}`}>
                {minimum && !error ? <Check size={20} aria-hidden="true" /> : <Info size={20} aria-hidden="true" />}
                <div>
                  <strong>{showError ? error : remaining ? `Select ${minimum} ${minimum === 1 ? "dish" : "dishes"} in ${cat.name}` : minimum ? `${cat.name} is ready` : "Make it your own"}</strong>
                  <p>{showError || remaining ? `${chosen.length} selected${remaining ? ` · ${remaining} more needed` : ""}. Tap dishes below to update your menu. Custom requests don’t count toward required dishes.` : minimum ? `You’ve selected ${chosen.length} ${chosen.length === 1 ? "dish" : "dishes"}.${cat.maxItems > chosen.length ? ` You can choose up to ${cat.maxItems}.` : " You can still swap your choices."}` : "Choose any dishes you’d like, or leave this category empty."}</p>
                </div>
              </div>
              {/* Browse dishes directly or search for a custom request. */}
              <CategoryPicker
                category={cat}
                selectedIds={chosen}
                onToggle={(itemId) => handleSelect(cat._id, itemId)}
                customSelections={customChosen}
                onCustomToggle={(name) => handleCustomToggle(cat._id, name)}
              />

              {/* Display selected items below the dropdown */}
              {(chosen.length > 0 || customChosen.length > 0) && (
                <div className="cat-selected-tags" style={{ marginTop: '12px', minHeight: '36px' }}>
                  {cat.items.filter(item => chosen.includes(item._id)).map((item) => (
                    <span key={item._id} className="cat-selected-tag">
                      {item.name}
                      <button type="button" aria-label={`Remove ${item.name}`}
                        className="cat-tag-remove"
                        onClick={() => handleSelect(cat._id, item._id)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {customChosen.map((customName, idx) => (
                    <span key={`custom-${cat._id}-${idx}`} className="cat-selected-tag" style={{ border: '1px dashed rgba(247, 215, 116, 0.4)' }}>
                      {customName} (request)
                      <button type="button" aria-label={`Remove request for ${customName}`}
                        className="cat-tag-remove"
                        onClick={() => removeCustomItem(cat._id, customName)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

// ── Step 3: Booking Form ───────────────────────────────────────────────
function StepForm({ user, form, onChange, planDetail, onSubmit, submitting }) {
  const totalPersons = form.persons || 0;
  const pricePerPerson = planDetail?.plan?.pricePerPerson || 0;
  const total = totalPersons * pricePerPerson;

  const isGuest = !user;

  const minDateStr = earliestDate();

  return (
    <div className="cat-section">
      <h2 className="cat-section-title">Your Details</h2>
      <p className="cat-section-sub">A few final details, then your request is ready. Fields marked * are required.</p>

      <form id="cat-booking-form" className="cat-form" onSubmit={e => { e.preventDefault(); onSubmit(); }}>
        <fieldset disabled={submitting} className="cat-contact-fields"><legend className="cat-sr-only">Contact details</legend>
          <div className="cat-form-group cat-form-group--highlight">
            <p className="cat-first-time-note">
              {isGuest 
                ? "Where can we reach you? We’ll use these details to follow up on your request."
                : "Check your contact details below. You can update them for this booking."
              }
            </p>
            <div className="cat-form-row">
              <div className="cat-field">
                <label htmlFor="cat-bookingName">Your Name *</label>
                <input
                  type="text"
                  placeholder="Full name"
                  required id="cat-bookingName" autoComplete="name" value={form.bookingName}
                  onChange={(e) => onChange("bookingName", e.target.value)}
                />
              </div>
              <div className="cat-field">
                <label htmlFor="cat-bookingEmail">Email Address *</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  required id="cat-bookingEmail" autoComplete="email" value={form.bookingEmail}
                  onChange={(e) => onChange("bookingEmail", e.target.value)}
                />
              </div>
            </div>
            <div className="cat-form-row">
              <div className="cat-field">
                <label htmlFor="cat-bookingPhone">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="+91 00000 00000"
                  required aria-describedby="cat-phone-help" id="cat-bookingPhone" autoComplete="tel" value={form.bookingPhone}
                  onChange={(e) => onChange("bookingPhone", e.target.value)}
                />
                <small id="cat-phone-help" className="cat-help">Use a 10-digit Indian mobile number, with or without +91.</small>
              </div>
              <div className="cat-field">
                <label htmlFor="cat-bookingAlternativePhone">Alternative Phone <span className="cat-optional-text">(optional)</span></label>
                <input
                  type="tel"
                  placeholder="+91 00000 00000"
                  id="cat-bookingAlternativePhone" autoComplete="tel" value={form.bookingAlternativePhone}
                  onChange={(e) => onChange("bookingAlternativePhone", e.target.value)}
                />
              </div>
            </div>
          </div>
        </fieldset>

        <div className="cat-form-row">
          <div className="cat-field">
            <label htmlFor="cat-deliveryDate"><CalendarDays size={16} /> Delivery date *</label>
            <input
              type="date"
              min={minDateStr}
              required id="cat-deliveryDate" value={form.deliveryDate}
              onChange={(e) => onChange("deliveryDate", e.target.value)}
            />
            <small className="cat-help">Please allow at least 2 days. Delivery slot: afternoon.</small>
          </div>
          <div className="cat-field">
            <label htmlFor="cat-persons"><Users size={16} /> How many guests? *</label>
            <input
              type="number"
              min="1" step="1" inputMode="numeric"
              placeholder="e.g. 50"
              required id="cat-persons" value={form.persons}
              onChange={(e) => onChange("persons", e.target.value)}
            />
            <div className="cat-guest-presets">{[25, 50, 100, 150].map(count => <button type="button" key={count} aria-pressed={Number(form.persons) === count} onClick={() => onChange("persons", String(count))}>{count}</button>)}</div>
          </div>
        </div>

        <div className="cat-field">
          <label htmlFor="cat-note">Any Special Note <span className="cat-optional-text">(optional)</span></label>
          <textarea
            rows={3}
            placeholder="E.g. Less spicy please, no onion in curries…"
            id="cat-note" value={form.note}
            onChange={(e) => onChange("note", e.target.value)}
          />
        </div>

        {totalPersons > 0 && pricePerPerson > 0 && (
          <div className="cat-summary">
            <div className="cat-summary-row">
              <span>Plan</span>
              <span>{planDetail?.plan?.name}</span>
            </div>
            <div className="cat-summary-row">
              <span>Price per person</span>
              <span>₹{pricePerPerson}</span>
            </div>
            <div className="cat-summary-row">
              <span>Persons</span>
              <span>{totalPersons}</span>
            </div>
            <div className="cat-summary-divider" />
            <div className="cat-summary-row cat-summary-row--approx">
              <span>Approximate Value</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
            <div className="cat-summary-highlight-box">
              <p className="cat-summary-note">
                This is an estimate. Our team will confirm your menu, final price and payment details after reviewing your request.
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────
export default function Catering() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [step, setStep]               = useState(1);
  const [plans, setPlans]             = useState([]);
  const [plansLoading, setPlansLoad]   = useState(true);
  const [selectedPlan, setSelPlan]    = useState(null);
  const [planDetail, setPlanDetail]   = useState(null);
  const [detailLoading, setDetLoad]   = useState(false);
  const [showSelectionErrors, setShowSelectionErrors] = useState(false);
  const [selections, setSelections]   = useState({});
  const [customNotes, setCustomNotes] = useState({});
  const [submitting, setSubmitting]   = useState(false);
  const [submitted, setSubmitted]     = useState(false);
  const contentRef = useRef(null);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [loadError, setLoadError] = useState("");
  const [orders, setOrders]           = useState([]);

  const [form, setForm] = useState({
    bookingName:             user?.name  || "",
    bookingEmail:            user?.email || "",
    bookingPhone:            user?.phone || "",
    bookingAlternativePhone: "",
    deliveryDate:            "",
    persons:                 "",
    note:                    "",
  });

  useEffect(() => {
    if (!user) return;
    setForm(current => ({
      ...current,
      bookingName: current.bookingName || user.name || "",
      bookingEmail: current.bookingEmail || user.email || "",
      bookingPhone: current.bookingPhone || user.phone || "",
    }));
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem("cherry_token");
    if (!token) return;

    fetch(`${API}/catering/orders/my`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setOrders(d.data || []);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setPlansLoad(true);
    fetch(`${API}/menu/plans`)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((d) => setPlans(d.data || []))
      .catch(() => toast.error("Failed to load plans."))
      .finally(() => setPlansLoad(false));
  }, [loadAttempt]);

  useEffect(() => {
    if (!selectedPlan) return;
    const controller = new AbortController();
    setDetLoad(true);
    setLoadError("");
    setPlanDetail(null);
    setSelections({});
    setShowSelectionErrors(false);
    setCustomNotes({});
    fetch(`${API}/menu/plans/${selectedPlan._id}`, { signal: controller.signal })
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((d) => { if (!d.data) throw new Error(); setPlanDetail(d.data); })
      .catch(() => { if (!controller.signal.aborted) setLoadError("We couldn’t load this menu. Please try again."); })
      .finally(() => { if (!controller.signal.aborted) setDetLoad(false); });
    return () => controller.abort();
  }, [selectedPlan, loadAttempt]);

  const handleFormChange = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleCustomNoteChange = (catId, note) => {
    setCustomNotes((prev) => ({ ...prev, [catId]: note }));
  };

  const validateSelections = () => {
    setShowSelectionErrors(true);
    const invalid = planDetail?.categories.find(category =>
      categorySelectionError(category, (selections[category._id] || []).length));
    if (invalid) {
      requestAnimationFrame(() => focusCategory(invalid._id));
      return false;
    }
    const hasSelection = Object.values(selections).some(items => items.length > 0);
    const hasCustomNote = Object.values(customNotes).some(note => note.trim().length > 0);
    if (!hasSelection && !hasCustomNote) {
      requestAnimationFrame(() => {
        contentRef.current?.focus();
        contentRef.current?.scrollIntoView({ block: "start" });
      });
      return false;
    }
    return true;
  };

  const validateForm = () => {
    if (!form.bookingName.trim()) { toast.error("Name is required."); return false; }
    if (!form.bookingEmail.trim()) { toast.error("Email is required."); return false; }
    // Stricter email regex
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.bookingEmail)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!form.bookingPhone.trim()) { toast.error("Phone is required."); return false; }
    // Phone regex (Indian 10-digit)
    const cleanPhone = form.bookingPhone.replace(/\s+/g, "").replace("+91", "");
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return false;
    }
    if (!form.deliveryDate) { toast.error("Please select a delivery date."); return false; }
    if (form.deliveryDate < earliestDate()) { toast.error("Please allow at least 2 days before delivery."); return false; }
    if (!Number.isInteger(Number(form.persons)) || Number(form.persons) < 1) { toast.error("Please enter number of persons."); return false; }
    return true;
  };

  const goToStep = (next) => {
    setStep(next);
    requestAnimationFrame(() => contentRef.current?.focus());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    if (detailLoading || !planDetail) return;
    if (step === 1 && !selectedPlan) { toast.error("Please select a plan."); return; }
    if (step === 2 && !validateSelections()) return;
    goToStep(step + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (submitting || !validateForm()) return;
    setSubmitting(true);

    // Build selectedItems payload with custom notes
    const selectedItems = [...new Set([...Object.keys(selections), ...Object.keys(customNotes)])].map((categoryId) => ({
      categoryId,
      itemIds: selections[categoryId] || [],
      customNote: customNotes[categoryId] || "",
    }));

    const token = localStorage.getItem("cherry_token");
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const res = await fetch(`${API}/catering/orders`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          planId:                  selectedPlan._id,
          persons:                 parseInt(form.persons),
          deliveryDate:            form.deliveryDate,
          slot:                    "afternoon",
          note:                    form.note,
          selectedItems,
          bookingName:             form.bookingName,
          bookingEmail:            form.bookingEmail,
          bookingPhone:            form.bookingPhone,
          bookingAlternativePhone: form.bookingAlternativePhone || undefined,
        }),
      });
      
      const data = await res.json();
      
      if (res.status === 401 || data.message?.toLowerCase().includes("unauthorized")) {
        toast.error("Please login to continue");
        localStorage.removeItem("cherry_user");
        localStorage.removeItem("cherry_token");
        navigate("/login", { state: { from: "/catering" } });
        return;
      }
      
      if (!res.ok) throw new Error(data.message || "Booking failed");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success screen ──
  if (submitted) {
    return (
      <>
        <CateringHeader user={user} onLogout={logout} />
        <div className="cat-success">
          <div className="cat-success-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="cat-success-title">Booking Received!</h2>
          <p className="cat-success-body">
            Thank you! Your catering request has been sent. Our team will review your order
            and contact you shortly to confirm the details and next steps.
          </p>
          <div className="cat-success-actions">
            <button className="cat-btn-primary" onClick={() => navigate("/")}>
              Back to Home
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <CateringHeader user={user} onLogout={logout} />
      
      <div className="cat-page">
        {orders.length > 0 && (
          <Link to="/catering/orders" className="cat-view-orders-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
              <path d="M9 14l2 2 4-4" />
            </svg>
            View Previous Orders ({orders.length})
          </Link>
        )}

        <section className="cat-intro">
          <span className="cat-eyebrow"><UtensilsCrossed size={15} /> MADE FOR YOUR GATHERING</span>
          <h1>Good food.<br className="cat-mobile-break" /> Great company.</h1>
          <p>Bring everyone together. Let’s build your Cherries catering menu, one simple step at a time.</p>
          <div className="cat-intro-notes"><span><CalendarDays size={16} /> Book 2 days ahead</span><span><HeartHandshake size={16} /> Personal help from our team</span></div>
        </section>
        <StepBar step={step} onBack={goToStep} disabled={submitting} />
        <div className="cat-workspace">
        <main className="cat-main" ref={contentRef} tabIndex={-1} aria-label={`Step ${step} of 3`}>
        <div className="cat-step-caption">STEP {step} OF 3 <span>{["Find your fit", "Make it yours", "Bring it together"][step - 1]}</span></div>
        {((step === 1 && !plansLoading && !plans.length) || (selectedPlan && loadError)) && <div className="cat-empty" role="status"><Info size={24} /><p>{loadError || "No plans to show right now. Please try again."}</p><button className="cat-btn-secondary" onClick={() => setLoadAttempt(n => n + 1)}>Try again</button></div>}


        {step === 1 && (
          <StepPlan
            plans={plans}
            loading={plansLoading}
            selected={selectedPlan}
            onSelect={setSelPlan}
          />
        )}
        {step === 2 && (
          <StepItems
            planDetail={planDetail}
            loading={detailLoading}
            selections={selections}
            onChange={(catId, items) => setSelections((s) => ({ ...s, [catId]: items }))}
            customNotes={customNotes}
            onCustomNoteChange={handleCustomNoteChange}
            showSelectionErrors={showSelectionErrors}
          />
        )}
        {step === 3 && (
          <StepForm
            user={user}
            form={form}
            onChange={handleFormChange}
            planDetail={planDetail}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        )}

        <div className="cat-nav">
          <p className="cat-nav-hint">{step === 1 ? "Pick a plan to explore the menu" : step === 2 ? "Your favourites, all in one menu" : "Our team will confirm the details with you"}</p>
          {step > 1 && (
            <button className="cat-btn-secondary" disabled={submitting} onClick={() => goToStep(step - 1)}>
              ← Back
            </button>
          )}
          {step < 3 && (
            <button className="cat-btn-primary" disabled={!selectedPlan || detailLoading || !planDetail} onClick={handleNext}>
              {step === 1 ? "Build my menu" : "Event details"} <ArrowRight size={17} />
            </button>
          )}
          {step === 3 && (
            <button
              className="cat-btn-primary"
              type="submit" form="cat-booking-form"
              disabled={submitting}
            >
              {submitting ? "Submitting…" : "Send booking request"}
            </button>
          )}
        </div>
        </main>
        <aside className="cat-booking-preview" aria-label="Your booking summary">
          <div className="cat-preview-heading"><ClipboardList size={20} /><h2>Your gathering</h2></div>
          <p className="cat-help">A little planning. A lovely meal.</p>
          <div className="cat-preview-plan"><span>{selectedPlan?.name || "Your menu starts here"}</span><strong>{selectedPlan ? `₹${selectedPlan.pricePerPerson}` : "Let’s get started"}</strong>{selectedPlan && <small>per person · estimated</small>}</div>
          {selectedPlan && step > 1 && <button disabled={submitting} className="cat-text-button" onClick={() => goToStep(1)}>Change plan</button>}
          <div className="cat-preview-menu">
            {planDetail?.categories?.filter(cat => selections[cat._id]?.length || customNotes[cat._id]).map(cat => <div key={cat._id}><strong>{cat.name}</strong><p>{cat.items.filter(item => selections[cat._id]?.includes(item._id)).map(item => item.name).join(", ")}{customNotes[cat._id] && `${selections[cat._id]?.length ? " · " : ""}Request: ${customNotes[cat._id]}`}</p></div>)}
            {!Object.values(selections).some(items => items.length) && !Object.values(customNotes).some(Boolean) && <p className="cat-preview-placeholder"><UtensilsCrossed size={24} />The dishes you choose will appear here.</p>}
          </div>
          {form.persons > 0 && selectedPlan && <div className="cat-preview-total"><span>{form.persons} guests · estimate</span><strong>₹{(Number(form.persons) * selectedPlan.pricePerPerson).toLocaleString("en-IN")}</strong></div>}
          <div className="cat-reassurance"><HeartHandshake size={21} /><p><strong>We’ll take it from here.</strong>Send your request. Our team will confirm availability, pricing and payment details with you.</p></div>
        </aside>
        </div>
      </div>
    </>
  );
}
