// ─────────────────────────────────────────────────────────────────────
//  PreviousOrders.jsx  — /catering/orders route
//  Displays all previous catering orders for the logged-in user
// ─────────────────────────────────────────────────────────────────────
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import toast from "react-hot-toast";
import "./styles/PreviousOrders.css";

const API = import.meta.env.VITE_API_URL;

export default function PreviousOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("cherry_token");
    if (!token) {
      navigate("/login", { state: { from: "/catering/orders" } });
      return;
    }

    fetch(`${API}/catering/orders/my`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setOrders(d.data || []);
        } else {
          toast.error(d.message || "Failed to load orders");
        }
      })
      .catch(() => toast.error("Failed to load orders. Please try again."))
      .finally(() => setLoading(false));
  }, [navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "status--pending";
      case "confirmed": return "status--confirmed";
      case "cancelled": return "status--cancelled";
      case "completed": return "status--completed";
      default: return "";
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <>
        <PageHeader title="My Orders" breadcrumb="Your Catering History" variant="catering" />
        <div className="orders-page">
          <div className="orders-loader">
            <div className="orders-spinner" />
            <p>Loading your orders...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
        <PageHeader title="My Orders" breadcrumb="Your Catering History" variant="catering" />
      <div className="orders-page">
        <div className="orders-container">
          {/* Back button */}
          <button className="orders-back-btn" onClick={() => navigate("/catering")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Catering
          </button>

          {orders.length === 0 ? (
            <div className="orders-empty">
              <div className="orders-empty-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                  <path d="M9 14l2 2 4-4" />
                </svg>
              </div>
              <h2>No Orders Yet</h2>
              <p>You haven't placed any catering orders yet. Start by booking your first event!</p>
              <button className="orders-cta-btn" onClick={() => navigate("/catering")}>
                Book Catering
              </button>
            </div>
          ) : (
            <>
              <div className="orders-header">
                <h2 className="orders-title">Your Catering Orders</h2>
                <p className="orders-subtitle">
                  You have {orders.length} order{orders.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="orders-list">
                {orders.map((order, index) => (
                  <div key={order._id} className="order-card" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="order-card-header">
                      <div className="order-card-left">
                        <span className={`order-status ${getStatusColor(order.status)}`}>
                          <span className="status-dot"></span>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                        <h3 className="order-plan-name">{order.planName}</h3>
                      </div>
                      <div className="order-card-right">
                        <span className="order-id">#{order._id.slice(-8).toUpperCase()}</span>
                      </div>
                    </div>

                    <div className="order-card-body">
                      <div className="order-info-grid">
                        <div className="order-info-item">
                          <div className="info-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                              <line x1="16" y1="2" x2="16" y2="6" />
                              <line x1="8" y1="2" x2="8" y2="6" />
                              <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                          </div>
                          <div className="info-content">
                            <span className="info-label">Delivery Date</span>
                            <span className="info-value">{formatDate(order.deliveryDate)}</span>
                          </div>
                        </div>

                        <div className="order-info-item">
                          <div className="info-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 14" />
                            </svg>
                          </div>
                          <div className="info-content">
                            <span className="info-label">Slot</span>
                            <span className="info-value">{order.slot ? order.slot.charAt(0).toUpperCase() + order.slot.slice(1) : "N/A"}</span>
                          </div>
                        </div>

                        <div className="order-info-item">
                          <div className="info-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                              <circle cx="9" cy="7" r="4" />
                              <path d="M23 21v-2a4 4 0 00-3-3.87" />
                              <path d="M16 3.13a4 4 0 010 7.75" />
                            </svg>
                          </div>
                          <div className="info-content">
                            <span className="info-label">Persons</span>
                            <span className="info-value">{order.persons} guests</span>
                          </div>
                        </div>

                        <div className="order-info-item order-info-item--price">
                          <div className="info-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="12" y1="1" x2="12" y2="23" />
                              <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                            </svg>
                          </div>
                          <div className="info-content">
                            <span className="info-label">Total Amount</span>
                            <span className="info-value">₹{order.totalAmount?.toLocaleString("en-IN") || "TBD"}</span>
                          </div>
                        </div>
                      </div>

                      {order.selectedItems && order.selectedItems.length > 0 && (
                        <div className="order-items-section">
                          <h4 className="order-items-title">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                              <rect x="9" y="3" width="6" height="4" rx="1" />
                            </svg>
                            Selected Items
                          </h4>
                          <div className="order-categories">
                            {order.selectedItems.map((cat, i) => (
                              <div key={i} className="order-category">
                                <span className="category-name">{cat.categoryName}</span>
                                <div className="category-items">
                                  {cat.items.map((item, j) => (
                                    <span key={j} className="item-tag">{item.itemName}</span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {order.note && (
                        <div className="order-note">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                          </svg>
                          <span>{order.note}</span>
                        </div>
                      )}

                      {order.bookingName && (
                        <div className="order-contact">
                          <span className="contact-label">Booked by:</span>
                          <span className="contact-value">{order.bookingName}</span>
                          {order.bookingPhone && <span className="contact-phone">{order.bookingPhone}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
