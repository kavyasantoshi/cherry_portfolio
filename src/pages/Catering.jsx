// ─────────────────────────────────────────────────────────────────────
//  Catering.jsx  — /catering route
//  Flow: Pick Plan → Select Items → Fill Booking Form → Submit
//  Mobile-first · Cherries theme
// ─────────────────────────────────────────────────────────────────────
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import "./styles/Catering.css";

const API = import.meta.env.VITE_API_URL;

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
            <div className="cat-header-user">{user?.email}</div>
          </div>
        </div>

        {/* Right: rewards + points + logout */}
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
function StepBar({ step }) {
  const steps = ["Choose Plan", "Select Items", "Your Details"];
  return (
    <div className="cat-steps">
      {steps.map((label, i) => (
        <div key={i} className={`cat-step ${i + 1 === step ? "cat-step--active" : ""} ${i + 1 < step ? "cat-step--done" : ""}`}>
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
        </div>
      ))}
    </div>
  );
}

// ── Step 1: Plan Selection ─────────────────────────────────────────────
function StepPlan({ plans, loading, selected, onSelect }) {
  if (loading) return <div className="cat-loader"><div className="cat-spinner" /></div>;

  return (
    <div className="cat-section">
      <h2 className="cat-section-title">Choose Your Plan</h2>
      <p className="cat-section-sub">Select the plan that suits your occasion.</p>
      <div className="cat-plans-grid">
        {plans.map((plan) => (
          <button
            key={plan._id}
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
            <div className="cat-plan-name">{plan.name}</div>
            <div className="cat-plan-price">
              ₹{plan.pricePerPerson}
              <span>/person</span>
            </div>
            {plan.description && (
              <div className="cat-plan-desc">{plan.description}</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Step 2: Item Selection ─────────────────────────────────────────────
function StepItems({ planDetail, loading, selections, onChange, customNotes, onCustomNoteChange }) {
  if (loading) return <div className="cat-loader"><div className="cat-spinner" /></div>;
  if (!planDetail) return null;

  const { categories } = planDetail;

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

  return (
    <div className="cat-section">
      <h2 className="cat-section-title">Select Your Items</h2>
      <p className="cat-section-sub">
        Choose your items from each category.
        {" "}Categories marked <span className="cat-required-badge">Required</span> need at least one selection.
      </p>
      <div className="cat-categories">
        {categories.map((cat) => {
          const chosen = selections[cat._id] || [];
          const isError = !cat.isOptional && chosen.length < cat.minItems;
          const atMax = cat.maxItems && chosen.length >= cat.maxItems;
          
          return (
            <div key={cat._id} className={`cat-category ${isError ? "cat-category--error" : ""}`}>
              <div className="cat-category-header">
                <span className="cat-category-name">{cat.name}</span>
                <div className="cat-category-meta">
                  {!cat.isOptional && (
                    <span className="cat-required-badge">Required · min {cat.minItems}</span>
                  )}
                  {cat.isOptional && (
                    <span className="cat-optional-badge">Optional</span>
                  )}
                  {cat.maxItems && (
                    <span className="cat-max-badge">max {cat.maxItems}</span>
                  )}
                  <span className="cat-chosen-count">{chosen.length} selected</span>
                </div>
              </div>
              
              <div className="cat-items-grid">
                {cat.items.map((item) => {
                  const isSelected = chosen.includes(item._id);
                  const disabled = !isSelected && atMax;
                  
                  return (
                    <button
                      key={item._id}
                      className={`cat-item-card ${isSelected ? "cat-item-card--selected" : ""} ${disabled ? "cat-item-card--disabled" : ""}`}
                      onClick={() => !disabled && handleSelect(cat._id, item._id)}
                      disabled={disabled}
                    >
                      <div className="cat-item-check">
                        {isSelected && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span className="cat-item-name">{item.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Custom options text field for each category */}
              <div className="cat-custom-note">
                <label className="cat-custom-note-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Any other options for {cat.name}?
                </label>
                <textarea
                  className="cat-custom-note-input"
                  placeholder={`E.g. Extra quantity, specific preferences...`}
                  value={customNotes[cat._id] || ""}
                  onChange={(e) => onCustomNoteChange(cat._id, e.target.value)}
                  rows={2}
                />
              </div>
              
              {isError && (
                <p className="cat-field-error">
                  Please select at least {cat.minItems} item{cat.minItems > 1 ? "s" : ""} from {cat.name}.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Step 3: Booking Form ───────────────────────────────────────────────
function StepForm({ user, form, onChange, planDetail }) {
  const totalPersons = form.persons || 0;
  const pricePerPerson = planDetail?.plan?.pricePerPerson || 0;
  const total = totalPersons * pricePerPerson;

  const needsProfile = !user?.name || !user?.phone;

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];

  return (
    <div className="cat-section">
      <h2 className="cat-section-title">Your Details</h2>
      <p className="cat-section-sub">Almost there — fill in your event details.</p>

      <div className="cat-form">
        {needsProfile && (
          <div className="cat-form-group cat-form-group--highlight">
            <p className="cat-first-time-note">
              👋 Looks like this is your first catering booking. Please fill in your details below.
            </p>
            <div className="cat-form-row">
              <div className="cat-field">
                <label>Your Name *</label>
                <input
                  type="text"
                  placeholder="Full name"
                  value={form.bookingName}
                  onChange={(e) => onChange("bookingName", e.target.value)}
                />
              </div>
              <div className="cat-field">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  placeholder="+91 00000 00000"
                  value={form.bookingPhone}
                  onChange={(e) => onChange("bookingPhone", e.target.value)}
                />
              </div>
            </div>
            <div className="cat-field">
              <label>Alternative Phone <span className="cat-optional-text">(optional)</span></label>
              <input
                type="tel"
                placeholder="+91 00000 00000"
                value={form.bookingAlternativePhone}
                onChange={(e) => onChange("bookingAlternativePhone", e.target.value)}
              />
            </div>
          </div>
        )}

        {!needsProfile && (
          <div className="cat-prefilled-banner">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Booking as <strong>{user.name}</strong> · {user.phone}
          </div>
        )}

        <div className="cat-form-row">
          <div className="cat-field">
            <label>Delivery Date *</label>
            <input
              type="date"
              min={minDateStr}
              value={form.deliveryDate}
              onChange={(e) => onChange("deliveryDate", e.target.value)}
            />
          </div>
          <div className="cat-field">
            <label>Number of Persons *</label>
            <input
              type="number"
              min="1"
              placeholder="e.g. 50"
              value={form.persons}
              onChange={(e) => onChange("persons", e.target.value)}
            />
          </div>
        </div>

        <div className="cat-field">
          <label>Any Special Note <span className="cat-optional-text">(optional)</span></label>
          <textarea
            rows={3}
            placeholder="E.g. Less spicy please, no onion in curries…"
            value={form.note}
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
            <div className="cat-summary-row cat-summary-row--total">
              <span>Estimated Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
            <p className="cat-summary-note">
              * Final amount confirmed by admin. Payment handled manually after confirmation.
            </p>
          </div>
        )}
      </div>
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
  const [selections, setSelections]   = useState({});
  const [customNotes, setCustomNotes] = useState({});
  const [submitting, setSubmitting]   = useState(false);
  const [submitted, setSubmitted]     = useState(false);
  const [orders, setOrders]           = useState([]);

  const [form, setForm] = useState({
    bookingName:             user?.name  || "",
    bookingPhone:            user?.phone || "",
    bookingAlternativePhone: "",
    deliveryDate:            "",
    persons:                 "",
    note:                    "",
  });

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
    fetch(`${API}/menu/plans`)
      .then((r) => r.json())
      .then((d) => setPlans(d.data || []))
      .catch(() => toast.error("Failed to load plans."))
      .finally(() => setPlansLoad(false));
  }, []);

  useEffect(() => {
    if (!selectedPlan) return;
    setDetLoad(true);
    setSelections({});
    setCustomNotes({});
    fetch(`${API}/menu/plans/${selectedPlan._id}`)
      .then((r) => r.json())
      .then((d) => setPlanDetail(d.data || null))
      .catch(() => toast.error("Failed to load plan details."))
      .finally(() => setDetLoad(false));
  }, [selectedPlan]);

  const handleFormChange = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleCustomNoteChange = (catId, note) => {
    setCustomNotes((prev) => ({ ...prev, [catId]: note }));
  };

  const validateSelections = () => {
    if (!planDetail) return false;
    for (const cat of planDetail.categories) {
      const chosen = selections[cat._id] || [];
      if (!cat.isOptional && chosen.length < cat.minItems) {
        toast.error(`Select at least ${cat.minItems} item(s) from "${cat.name}"`);
        return false;
      }
    }
    return true;
  };

  const validateForm = () => {
    if (!form.bookingName.trim()) { toast.error("Name is required."); return false; }
    if (!form.bookingPhone.trim()) { toast.error("Phone is required."); return false; }
    if (!form.deliveryDate) { toast.error("Please select a delivery date."); return false; }
    if (!form.persons || parseInt(form.persons) < 1) { toast.error("Please enter number of persons."); return false; }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && !selectedPlan) { toast.error("Please select a plan."); return; }
    if (step === 2 && !validateSelections()) return;
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setSubmitting(true);

    // Build selectedItems payload with custom notes
    const selectedItems = Object.entries(selections).map(([categoryId, itemIds]) => ({
      categoryId,
      itemIds,
      customNote: customNotes[categoryId] || "",
    }));

    const token = localStorage.getItem("cherry_token");
    
    if (!token) {
      toast.error("Please login to continue");
      navigate("/login", { state: { from: "/catering" } });
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch(`${API}/catering/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          planId:                  selectedPlan._id,
          persons:                 parseInt(form.persons),
          deliveryDate:            form.deliveryDate,
          slot:                    "afternoon",
          note:                    form.note,
          selectedItems,
          bookingName:             form.bookingName,
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

        <StepBar step={step} />

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
          />
        )}
        {step === 3 && (
          <StepForm
            user={user}
            form={form}
            onChange={handleFormChange}
            planDetail={planDetail}
          />
        )}

        <div className="cat-nav">
          {step > 1 && (
            <button className="cat-btn-secondary" onClick={() => setStep((s) => s - 1)}>
              ← Back
            </button>
          )}
          {step < 3 && (
            <button className="cat-btn-primary" onClick={handleNext}>
              Continue →
            </button>
          )}
          {step === 3 && (
            <button
              className="cat-btn-primary"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting…" : "Confirm Booking"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
