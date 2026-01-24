import { useState } from "react";
import idly from "../assets/breakfast.jpg";
import poori from "../assets/poori.webp";
import vada from "../assets/vada.avif";
import dosa from "../assets/dosa.png";
import menu from "../assets/menu1.jpeg";
import menu1 from "../assets/menu2.jpeg";
import paneer from "../assets/paneer-manchurian.jpg";
import p_biryani from "../assets/veg-biryani.jpg";
import masalachai from "../assets/masalachai.png";
import corn from "../assets/corn.jpg";
import lime from "../assets/limesoda.png";
import "./Menu.css";

function Menu() {
  const [active, setActive] = useState("breakfast");
  const [showMenu, setShowMenu] = useState(false);
  const [menuIndex, setMenuIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  const menuImages = [menu, menu1];

  const menuData = {
    breakfast: [
      {
        name: "Sambar Idly",
        desc: "Soft idlies served with hot, flavorful sambar",
        price: 60,
        image: idly
      },
      {
        name: "Poori",
        desc: "Crispy golden pooris served with flavorful potato masala",
        price: 60,
        image: poori
      },
      {
        name: "Vada",
        desc: "Crispy lentil vadas served with hot sambar and chutney",
        price: 50,
        image: vada
      },
      {
        name: "Onion Dosa",
        desc: "Crispy dosa topped with fresh onions and mild spices",
        price: 65,
        image: dosa
      }
    ],
    starters: [
      {
        name: "Paneer Manchurian",
        desc: "Crispy paneer tossed in tangy Indo-Chinese sauce",
        price: 220,
        image: paneer
      },
      {
        name: "Crispy Corn",
        desc: "Golden fried corn kernels with aromatic spices",
        price: 220,
        image: corn
      }
    ],
    meals: [
      {
        name: "Veg Biryani",
        desc: "Aromatic basmati rice layered with mixed vegetables and spices",
        price: 220,
        image: p_biryani
      },
      {
        name: "Paneer Butter Masala",
        desc: "Rich and creamy tomato-based curry with soft paneer cubes",
        price: 240,
        image: paneer
      },
      {
        name: "Dal Tadka",
        desc: "Yellow lentils tempered with aromatic spices and ghee",
        price: 180,
        image: p_biryani
      }
    ],
    beverages: [
      {
        name: "Masala Chai",
        desc: "Traditional Indian spiced tea with aromatic herbs",
        price: 40,
        image: masalachai
      },
      {
        name: "Fresh Lime Soda",
        desc: "Refreshing citrus drink with a hint of mint",
        price: 60,
        image: lime
      }
    ]
  };

  const categories = [
    { key: "breakfast", label: "Breakfast" },
    { key: "starters", label: "Starters" },
    { key: "meals", label: "Meals" },
    { key: "beverages", label: "Beverages" }
  ];

  return (
    <div className="menu-page">
      <div className="menu-container">
        {/* Header */}
        <div className="menu-header">
          <h2 className="menu-main-title">Our Popular Menu</h2>
          <div className="menu-title-divider"></div>
          <p className="menu-subtitle">
            Discover our delicious selection of authentic dishes
          </p>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.map((category, index) => (
            <div 
              key={category.key} 
              className="tab-item" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => setActive(category.key)}
                className={`category-btn ${active === category.key ? "active" : ""}`}
              >
                {category.label}
                {active === category.key && (
                  <>
                    <span className="category-accent-line"></span>
                    <div className="category-ping"></div>
                    <div className="category-dot"></div>
                  </>
                )}
              </button>
              {index < categories.length - 1 && (
                <div className="category-connector"></div>
              )}
            </div>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="menu-grid">
          {menuData[active].map((item, index) => (
            <div
              key={index}
              className="menu-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="menu-card-content">
                {/* Image */}
                <div className="menu-image-wrapper">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="menu-image"
                  />
                  <div className="menu-image-overlay"></div>
                </div>

                {/* Info */}
                <div className="menu-info">
                  <h4 className="menu-item-title">{item.name}</h4>
                  <p className="menu-item-desc">{item.desc}</p>
                </div>

                {/* Price */}
                <div className="menu-price-wrapper">
                  <span className="menu-price">₹{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Menu Button */}
        {!showMenu && (
          <div className="view-menu-section">
            <button
              onClick={() => setShowMenu(true)}
              className="view-menu-btn"
            >
              <span className="btn-text">View Full Menu</span>
            </button>
          </div>
        )}

        {/* Full Menu View */}
        {showMenu && (
          <div className="full-menu-container">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowMenu(false);
                setMenuIndex(0);
              }}
              className="close-full-menu-btn"
            >
              ✕
            </button>

            {/* Menu Image */}
            <div
              className="full-menu-image-wrapper"
              onClick={() => setZoomOpen(true)}
            >
              <img
                src={menuImages[menuIndex]}
                alt="Full Menu"
                className="full-menu-image"
              />
              <div className="full-menu-overlay"></div>
              <div className="zoom-hint">Click to Zoom</div>
            </div>

            {/* Dots Navigation */}
            <div className="menu-navigation-dots">
              {menuImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMenuIndex(i)}
                  className={`nav-dot ${menuIndex === i ? "active" : ""}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Zoom Modal */}
        {zoomOpen && (
          <div className="zoom-modal">
            <button
              onClick={() => setZoomOpen(false)}
              className="zoom-close-btn"
            >
              <span>✕</span>
            </button>
            <img
              src={menuImages[menuIndex]}
              alt="Zoomed Menu"
              className="zoomed-image"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;