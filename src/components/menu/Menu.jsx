import { useState, useEffect } from "react";
import tandoori from "/images/tandoori/tandoori_naan.webp";
import butter_masala from "/images/curries/paneer_butter_masala.webp";
import veg_biryani from "/images/biryani/veg_biryani.webp";
import veg_fried from "/images/friedrice/veg_friedrice.webp";
import veg_noodles from "/images/noodles/veg_noodles.webp";
import south_meal from "/images/meals/south_meal.webp";
import menu1       from "/images/menu/menu1.webp";
import menu2       from "/images/menu/menu2.webp";
import "./styles/Menu.css";

const API = import.meta.env.VITE_API_URL;

function Menu() {
  const [categories,     setCategories]     = useState([]);
  const [menuItems,      setMenuItems]      = useState({});
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading,        setLoading]        = useState(true);
  const [showMenu,       setShowMenu]       = useState(false);
  const [menuIndex,      setMenuIndex]      = useState(0);
  const [zoomOpen,       setZoomOpen]       = useState(false);
  const [transitioning,  setTransitioning]  = useState(false);

  const menuImages = [menu1, menu2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API}/menu`);
        const result = await res.json();
        
        if (result.success) {
          setCategories(result.data.categories || []);
          setMenuItems(result.data.itemsByCategory || {});
        }
      } catch (error) {
        console.error("Error fetching menu data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const tagColors = {
    "Bestseller": { bg: "#fff3cd", color: "#856404" },
    "Popular":    { bg: "#d1e7dd", color: "#0f5132" },
    "Must Try":   { bg: "#f8d7da", color: "#842029" },
    "Special":    { bg: "#cfe2ff", color: "#084298" },
    "Value":      { bg: "#e2d9f3", color: "#432874" },
  };

  const openCategory = (id) => {
    setTransitioning(true);
    setTimeout(() => { setActiveCategory(id); setTransitioning(false); }, 220);
  };

  const goBack = () => {
    setTransitioning(true);
    setTimeout(() => { setActiveCategory(null); setTransitioning(false); }, 220);
  };

  const activeCatMeta = categories.find(c => c.id === activeCategory);
  const activeItems   = activeCategory ? (menuItems[activeCategory] || []) : [];

  if (loading) {
    return (
      <div className="menu-page">
        <div className="menu-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <div className="cat-spinner" />
        </div>
      </div>
    );
  }

  return (
    <div className="menu-page">
      <div className="menu-container">

        {/* ── Header ── */}
        <div className="menu-header">
          <h2 className="menu-main-title">Our Popular Menu</h2>
          <div className="menu-title-divider"></div>
          <p className="menu-subtitle">Authentic flavors crafted with love — explore our full spread</p>
        </div>

        {/* ══════════════════════════════
            VIEW A — Category Image Grid
            ══════════════════════════════ */}
        {!activeCategory && (
          <div className={`cat-view${transitioning ? " view--out" : " view--in"}`}>
            <div className="cat-grid">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className="cat-btn"
                  onClick={() => openCategory(cat.id)}
                  aria-label={`Explore ${cat.name}`}
                >
                  <div className="cat-circle">
                    <img
                      src={cat.img || "images/Tiffins/Idly.webp"}
                      alt={cat.name}
                      className="cat-img"
                    />
                  </div>
                  <span className="cat-label">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════
            VIEW B — Food Cards
            ══════════════════════════════ */}
        {activeCategory && (
          <div className={`cards-view${transitioning ? " view--out" : " view--in"}`}>

            {/* Top bar */}
            <div className="cards-topbar">
              <button className="back-btn" onClick={goBack} aria-label="Back to categories">
                <span className="back-arrow">←</span>
                <span className="back-text">All Categories</span>
              </button>
              <div className="breadcrumb">
                <img
                  src={activeCatMeta?.img || activeCatMeta?.image || "images/Tiffins/Idly.webp"}
                  alt={activeCatMeta?.name}
                  className="breadcrumb__img"
                />
                <span className="breadcrumb__label">{activeCatMeta?.name}</span>
              </div>
              <span className="breadcrumb__count">{activeItems.length} items</span>
            </div>

            {/* Food Cards */}
            <div className="food-grid">
              {activeItems.map((item, index) => (
                <div
                  key={item.id}
                  className="food-card"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="food-card__img-wrap">
                    <img src={item.images?.[0] || item.img || "images/Tiffins/Idly.webp"} alt={item.name} className="food-card__img" />
                    {(item.isPopular || item.tag) && (
                      <span
                        className="food-card__badge"
                        style={{
                          background: tagColors[item.tag || "Popular"]?.bg,
                          color:      tagColors[item.tag || "Popular"]?.color,
                        }}
                      >
                        {item.tag || "Popular"}
                      </span>
                    )}
                  </div>
                  <div className="food-card__body">
                    <div className="food-card__info">
                      <h4 className="food-card__name">{item.name}</h4>
                      <p className="food-card__desc">{item.description || item.desc}</p>
                    </div>
                    <div className="food-card__footer">
                      <span className="food-card__price">₹{item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── View Full Menu ── */}
        {!showMenu && (
          <div className="view-menu-section">
            <button onClick={() => setShowMenu(true)} className="view-menu-btn">
              <span className="btn-text">View Full Menu</span>
            </button>
          </div>
        )}

        {/* ── Full Menu Images ── */}
        {showMenu && (
          <div className="full-menu-container">
            <button
              onClick={() => { setShowMenu(false); setMenuIndex(0); }}
              className="close-full-menu-btn"
            >✕</button>
            <div className="full-menu-image-wrapper" onClick={() => setZoomOpen(true)}>
              <img src={menuImages[menuIndex]} alt="Full Menu" className="full-menu-image" />
              <div className="full-menu-overlay"></div>
              <div className="zoom-hint">Click to Zoom</div>
            </div>
            <div className="menu-navigation-dots">
              {menuImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMenuIndex(i)}
                  className={`nav-dot${menuIndex === i ? " active" : ""}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Zoom Modal ── */}
        {zoomOpen && (
          <div className="zoom-modal" onClick={() => setZoomOpen(false)}>
            <button onClick={() => setZoomOpen(false)} className="zoom-close-btn">
              <span>✕</span>
            </button>
            <img
              src={menuImages[menuIndex]}
              alt="Zoomed Menu"
              className="zoomed-image"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

      </div>
    </div>
  );
}

export default Menu;