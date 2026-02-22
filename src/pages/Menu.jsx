import { useState } from "react";
import idly       from "../assets/breakfast.jpg";
import poori      from "../assets/poori.webp";
import tandoori from "/images/tandoori_naan.jpg";
import butter_naan from "/images/butter_naan.png";
import garlic_naan from "/images/garlic_naan.png";
import cheese_naan from "/images/cheese_naan.png";
import paneer_kulcha from "/images/paneer_kulcha.png";
import aloo_curd from "/images/aloo_paratha_curd.png";
import veg_biryani from "/images/veg_biryani.png";
import gobi_biryani from "/images/gobi_biryani.png";
import mushroom_biryani from "/images/mushroom_biryani.png";
import vada       from "../assets/vada.avif";
import dosa       from "../assets/dosa.png";
import menu       from "../assets/menu1.jpeg";
import menu1      from "../assets/menu2.jpeg";
import paneer     from "../assets/paneer-manchurian.jpg";
import p_biryani  from "../assets/veg-biryani.jpg";
import masalachai from "../assets/masalachai.png";
import corn       from "../assets/corn.jpg";
import lime       from "../assets/limesoda.png";
import "./Menu.css";
import { ImOpt } from "react-icons/im";

function Menu() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [showMenu,       setShowMenu]       = useState(false);
  const [menuIndex,      setMenuIndex]      = useState(0);
  const [zoomOpen,       setZoomOpen]       = useState(false);
  const [transitioning,  setTransitioning]  = useState(false);

  const menuImages = [menu, menu1];

  /* ── Categories with image instead of emoji ── */
  const categories = [
    { key: "tiffins",   label: "Tiffins",    image: idly       },
    { key: "dosa",      label: "Dosa",        image: dosa       },
    { key: "starters",  label: "Starters",    image: paneer     },
    { key: "soup",      label: "Soups",       image: p_biryani  },
    { key: "curries",   label: "Curries",     image: paneer     },
    { key: "friedrice", label: "Fried Rice",  image: p_biryani  },
    { key: "biryani",   label: "Biryani",     image: p_biryani  },
    { key: "noodles",   label: "Noodles",     image: corn       },
    { key: "tikkas",    label: "Tikkas",      image: paneer     },
    { key: "tandoori",  label: "Tandoori",    image: tandoori    },
    { key: "beverages", label: "Beverages",   image: masalachai },
    { key: "meals",     label: "Meals",       image: p_biryani  },
  ];

  const menuData = {
    tiffins: [
      { name: "Sambar Idly",   desc: "Soft idlies served with hot, flavorful sambar",            price: 60,  image: idly,      tag: "Bestseller" },
      { name: "Poori (3pc)",   desc: "Crispy golden pooris served with flavorful potato masala", price: 60,  image: poori },
      { name: "Vada (3pc)",    desc: "Crispy lentil vadas served with hot sambar and chutney",   price: 50,  image: vada },
      { name: "Onion Dosa",    desc: "Crispy dosa topped with fresh onions and mild spices",     price: 65,  image: dosa,      tag: "Popular" },
      { name: "Plain Dosa",    desc: "Classic thin crispy dosa with sambar and chutney",         price: 50,  image: dosa },
      { name: "Masala Dosa",   desc: "Golden dosa stuffed with spiced potato filling",           price: 75,  image: dosa,      tag: "Must Try" },
    ],
    dosa: [
      { name: "Onion Butter Dosa",   desc: "Crispy dosa with fresh onions and butter",           price: 70,  image: dosa },
      { name: "Ghee Plain Dosa",     desc: "Classic dosa drizzled with pure ghee",               price: 60,  image: dosa },
      { name: "Ghee Onion Dosa",     desc: "Buttery dosa topped with caramelised onions",        price: 70,  image: dosa },
      { name: "Paneer Dosa",         desc: "Dosa stuffed with spiced paneer filling",            price: 90,  image: dosa,      tag: "Popular" },
      { name: "Mushroom Dosa",       desc: "Dosa with savory mushroom filling",                  price: 90,  image: dosa },
      { name: "Kaju Mushroom Dosa",  desc: "Premium dosa with cashew & mushroom",                price: 100, image: dosa,      tag: "Special" },
    ],
    starters: [
      { name: "Paneer Manchurian",    desc: "Crispy paneer tossed in tangy Indo-Chinese sauce",  price: 200, image: paneer,    tag: "Bestseller" },
      { name: "Crispy Corn",          desc: "Golden fried corn kernels with aromatic spices",    price: 180, image: corn,      tag: "Popular" },
      { name: "Gobi Manchurian",      desc: "Crispy cauliflower in a spicy tangy sauce",         price: 180, image: paneer },
      { name: "Veg Manchurian",       desc: "Mixed vegetable balls in Indo-Chinese gravy",       price: 180, image: paneer },
      { name: "Baby Corn Manchurian", desc: "Tender baby corn in flavorful manchurian sauce",    price: 180, image: corn },
      { name: "Chilli Paneer",        desc: "Spicy stir-fried paneer with bell peppers",         price: 200, image: paneer,    tag: "Must Try" },
    ],
    soup: [
      { name: "Tomato Soup",     desc: "Classic creamy tomato soup with herbs",                  price: 100, image: p_biryani },
      { name: "Cream of Tomato", desc: "Rich velvety tomato cream soup",                         price: 100, image: p_biryani, tag: "Popular" },
      { name: "Hot & Sour Soup", desc: "Tangy spicy Indo-Chinese style soup",                    price: 100, image: p_biryani, tag: "Bestseller" },
      { name: "Sweet Corn Soup", desc: "Warm soup with sweet corn and vegetables",               price: 100, image: p_biryani },
      { name: "Manchow Soup",    desc: "Spicy thick soup with crispy noodles",                   price: 100, image: p_biryani },
      { name: "Mushroom Soup",   desc: "Earthy creamy mushroom broth",                           price: 100, image: p_biryani },
    ],
    curries: [
      { name: "Paneer Butter Masala",  desc: "Rich creamy tomato-based curry with soft paneer", price: 200, image: paneer,    tag: "Bestseller" },
      { name: "Kadai Paneer Curry",    desc: "Paneer in aromatic kadai masala gravy",            price: 200, image: paneer,    tag: "Popular" },
      { name: "Paneer Tikka Masala",   desc: "Grilled paneer in smoky tikka gravy",              price: 220, image: paneer },
      { name: "Dal Tadka",             desc: "Yellow lentils tempered with spices and ghee",     price: 140, image: p_biryani },
      { name: "Tomato Curry",          desc: "Fresh tomato-based curry with spices",             price: 180, image: p_biryani },
      { name: "Mushroom Curry",        desc: "Tender mushrooms in rich spiced gravy",            price: 200, image: p_biryani },
    ],
    friedrice: [
      { name: "Veg Fried Rice",         desc: "Classic stir-fried rice with mixed vegetables",  price: 200, image: p_biryani },
      { name: "Paneer Fried Rice",      desc: "Aromatic fried rice with paneer pieces",         price: 220, image: p_biryani, tag: "Popular" },
      { name: "Corn Fried Rice",        desc: "Flavorful rice with sweet corn kernels",         price: 200, image: p_biryani },
      { name: "Kaju Paneer Fried Rice", desc: "Premium fried rice with cashews and paneer",     price: 250, image: p_biryani, tag: "Special" },
      { name: "Shezwan Fried Rice",     desc: "Spicy Schezwan-style fried rice",                price: 200, image: p_biryani, tag: "Bestseller" },
      { name: "Mushroom Fried Rice",    desc: "Savory fried rice with mushrooms",               price: 220, image: p_biryani },
    ],
    biryani: [
      { name: "Veg Biryani",          desc: "Aromatic basmati rice with mixed vegetables",      price: 200, image: p_biryani, tag: "Bestseller" },
      { name: "Paneer Biryani",       desc: "Fragrant biryani with soft paneer pieces",         price: 220, image: p_biryani, tag: "Popular" },
      { name: "Gobi Biryani",         desc: "Biryani with tender cauliflower florets",          price: 200, image: p_biryani },
      { name: "Mushroom Biryani",     desc: "Earthy mushrooms in aromatic biryani",             price: 220, image: p_biryani },
      { name: "Kaju Paneer Biryani",  desc: "Premium biryani with cashews and paneer",          price: 250, image: p_biryani, tag: "Special" },
      { name: "Paneer Tikka Biryani", desc: "Smoky tikka paneer layered biryani",               price: 250, image: p_biryani },
    ],
    noodles: [
      { name: "Veg Noodles",         desc: "Classic stir-fried noodles with vegetables",        price: 180, image: p_biryani },
      { name: "Paneer Noodles",      desc: "Flavorful noodles with paneer pieces",              price: 200, image: p_biryani, tag: "Popular" },
      { name: "Manchurian Noodles",  desc: "Noodles tossed in manchurian sauce",                price: 200, image: p_biryani, tag: "Bestseller" },
      { name: "Shezwan Noodles",     desc: "Spicy Schezwan-style noodles",                      price: 200, image: p_biryani },
      { name: "Mushroom Noodles",    desc: "Savory noodles with mushrooms",                     price: 200, image: p_biryani },
      { name: "Baby Corn Noodles",   desc: "Noodles stir-fried with baby corn",                 price: 180, image: corn },
    ],
    tikkas: [
      { name: "Paneer Tikka",          desc: "Marinated paneer grilled to perfection",          price: 200, image: paneer,    tag: "Bestseller" },
      { name: "Mushroom Tikka",        desc: "Tender mushrooms grilled with spices",            price: 200, image: corn },
      { name: "Malai Paneer Tikka",    desc: "Creamy mild paneer tikka with cashew marinade",   price: 220, image: paneer,    tag: "Popular" },
      { name: "Paneer Hariyali Tikka", desc: "Paneer in green herb marinade grilled",           price: 220, image: paneer },
      { name: "Achari Paneer Tikka",   desc: "Tangy pickle-spiced paneer tikka",                price: 220, image: paneer,    tag: "Must Try" },
    ],
    tandoori: [
      { name: "Butter Naan",           desc: "Soft naan brushed with butter",                   price: 60,  image: butter_naan, tag: "Bestseller" },
      { name: "Garlic Naan",           desc: "Naan topped with garlic and herbs",               price: 70,  image: garlic_naan, tag: "Popular" },
      { name: "Cheese Naan",           desc: "Stuffed with melted cheese",                      price: 60,  image: cheese_naan },
      { name: "Paneer Kulcha",         desc: "Soft kulcha stuffed with paneer",                 price: 90,  image: paneer_kulcha },
      { name: "Paneer Parota",         desc: "Flaky parota with paneer filling",                price: 80,  image: paneer,    tag: "Must Try" },
      { name: "Aloo Parata With Curd", desc: "Potato-stuffed paratha served with curd",         price: 100, image: aloo_curd },
    ],
    beverages: [
      { name: "Masala Chai",     desc: "Traditional Indian spiced tea with aromatic herbs",      price: 40,  image: masalachai, tag: "Popular" },
      { name: "Fresh Lime Soda", desc: "Refreshing citrus drink with a hint of mint",            price: 60,  image: lime },
      { name: "Badam Milk",      desc: "Creamy almond milk with saffron and cardamom",           price: 50,  image: masalachai, tag: "Bestseller" },
      { name: "Green Tea",       desc: "Light antioxidant-rich green tea",                       price: 20,  image: masalachai },
      { name: "Badam Tea",       desc: "Classic tea with almond flavor",                         price: 25,  image: masalachai },
      { name: "Horlicks",        desc: "Warm nutritious malt drink",                             price: 50,  image: masalachai },
    ],
    meals: [
      { name: "Veg Meals (Parcel)", desc: "Full south Indian meal - parcel only",               price: 150, image: p_biryani, tag: "Value" },
      { name: "Veg Combo",          desc: "Complete vegetarian combo meal",                     price: 120, image: p_biryani, tag: "Popular" },
      { name: "Sambar Rice",        desc: "Comforting rice mixed with flavorful sambar",        price: 60,  image: p_biryani },
      { name: "Curd Rice",          desc: "Cooling yogurt rice with tempering",                 price: 60,  image: p_biryani },
      { name: "Flavoured Rice",     desc: "Aromatic flavored rice dish",                        price: 60,  image: p_biryani },
    ],
  };

  const tagColors = {
    "Bestseller": { bg: "#fff3cd", color: "#856404" },
    "Popular":    { bg: "#d1e7dd", color: "#0f5132" },
    "Must Try":   { bg: "#f8d7da", color: "#842029" },
    "Special":    { bg: "#cfe2ff", color: "#084298" },
    "Value":      { bg: "#e2d9f3", color: "#432874" },
  };

  const openCategory = (key) => {
    setTransitioning(true);
    setTimeout(() => { setActiveCategory(key); setTransitioning(false); }, 220);
  };

  const goBack = () => {
    setTransitioning(true);
    setTimeout(() => { setActiveCategory(null); setTransitioning(false); }, 220);
  };

  const activeCatMeta = categories.find(c => c.key === activeCategory);
  const activeItems   = activeCategory ? menuData[activeCategory] : [];

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
                  key={cat.key}
                  className="cat-btn"
                  onClick={() => openCategory(cat.key)}
                  aria-label={`Explore ${cat.label}`}
                >
                  <div className="cat-circle">
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="cat-img"
                    />
                  </div>
                  <span className="cat-label">{cat.label}</span>
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
                  src={activeCatMeta?.image}
                  alt={activeCatMeta?.label}
                  className="breadcrumb__img"
                />
                <span className="breadcrumb__label">{activeCatMeta?.label}</span>
              </div>
              <span className="breadcrumb__count">{activeItems.length} items</span>
            </div>

            {/* Food Cards */}
            <div className="food-grid">
              {activeItems.map((item, index) => (
                <div
                  key={`${activeCategory}-${index}`}
                  className="food-card"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="food-card__img-wrap">
                    <img src={item.image} alt={item.name} className="food-card__img" />
                    {item.tag && (
                      <span
                        className="food-card__badge"
                        style={{
                          background: tagColors[item.tag]?.bg,
                          color:      tagColors[item.tag]?.color,
                        }}
                      >
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <div className="food-card__body">
                    <div className="food-card__info">
                      <h4 className="food-card__name">{item.name}</h4>
                      <p className="food-card__desc">{item.desc}</p>
                    </div>
                    <div className="food-card__footer">
                      <span className="food-card__price">₹{item.price}</span>
                      {/* <button className="food-card__add">+ ADD</button> */}
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