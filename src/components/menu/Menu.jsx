import { useState } from "react";
// import idly       from "../assets/breakfast.jpg";
// import poori      from "../assets/poori.webp";
import tandoori from "/images/tandoori/tandoori_naan.jpg";
import butter_naan from "/images/tandoori/butter_naan.png";
import garlic_naan from "/images/tandoori/garlic_naan.png";
import cheese_naan from "/images/tandoori/cheese_naan.png";
import paneer_kulcha from "/images/tandoori/paneer_kulcha.png";
import aloo_curd from "/images/tandoori/aloo_paratha_curd.png";
import veg_biryani from "/images/biryani/veg_biryani.png";
import gobi_biryani from "/images/biryani/gobi_biryani.png";
import mushroom_biryani from "/images/biryani/mushroom_biryani.png";
import kaju_biryani from "/images/biryani/kaju_panner_biryani.png";
import dal_tadka from "/images/curries/dal_tadka.png";
import butter_masala from "/images/curries/paneer_butter_masala.png";
import kaju_tomato from "/images/curries/kaju_tomato.png";
import kadai_paneer from "/images/curries/kadai_paneer.png";
import veg_fried from "/images/friedrice/veg_friedrice.png";
import paneer_fried from "/images/friedrice/paneer_friedrice.png";
import mushroom_fried from "/images/friedrice/mushroom_friedrice.png";
import corn_fried from "/images/friedrice/corn_friedrice.png";
import kaju_paneer from "/images/friedrice/kajupaneer_friedrice.png";
import veg_noodles from "/images/noodles/veg_noodles.png";
import paneer_noodles from "/images/noodles/paneer_noodles.png";
import shezwaan_noodles from "/images/noodles/shezwann_noodles.png";
import mushroom_noodles from "/images/noodles/mushroom_noodles.png";
import manchurian_noodles from "/images/noodles/manchurian_noodles.png";
import curd_rice from "/images/meals/curd_rice.png";
import south_meal from "/images/meals/south_meal.png";
// import vada       from "../assets/vada.avif";
// import dosa       from "../assets/dosa.png";
import menu1       from "/images/menu/menu1.jpeg";
import menu2       from "/images/menu/menu2.jpeg";
// import paneer     from "../assets/paneer-manchurian.jpg";
// import p_biryani  from "../assets/veg-biryani.jpg";
import masalachai      from "/images/bevarages/masalachai.png";
// import corn       from "../assets/corn.jpg";
import lime       from "/images/bevarages/limesoda.png";
import Horlicks       from "/images/bevarages/horlicks.png";
import greentea     from "/images/bevarages/green_tea.png";
import badham_milk      from "/images/bevarages/badham_milk.png";
import "./styles/Menu.css";
import { ImOpt } from "react-icons/im";

function Menu() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [showMenu,       setShowMenu]       = useState(false);
  const [menuIndex,      setMenuIndex]      = useState(0);
  const [zoomOpen,       setZoomOpen]       = useState(false);
  const [transitioning,  setTransitioning]  = useState(false);

  const menuImages = [menu1, menu2];

  /* ── Categories with image instead of emoji ── */
  const categories = [
    { key: "tiffins",   label: "Tiffins",    image: masalachai      },
    { key: "dosa",      label: "Dosa",        image: masalachai      },
    { key: "starters",  label: "Starters",    image: masalachai    },
    { key: "soup",      label: "Soups",       image: masalachai  },
    { key: "curries",   label: "Curries",     image: masalachai     },
    { key: "friedrice", label: "Fried Rice",  image: masalachai },
    { key: "biryani",   label: "Biryani",     image: masalachai  },
    { key: "noodles",   label: "Noodles",     image: masalachai      },
    { key: "tikkas",    label: "Tikkas",      image: masalachai   },
    { key: "tandoori",  label: "Tandoori",    image: masalachai    },
    { key: "beverages", label: "Beverages",   image: masalachai },
    { key: "meals",     label: "Meals",       image: masalachai  },
  ];

  const menuData = {
    // tiffins: [
    //   { name: "Sambar Idly",   desc: "Soft idlies served with hot, flavorful sambar",            price: 60,  image: idly,      tag: "Bestseller" },
    //   { name: "Poori (3pc)",   desc: "Crispy golden pooris served with flavorful potato masala", price: 60,  image: poori },
    //   { name: "Vada (3pc)",    desc: "Crispy lentil vadas served with hot sambar and chutney",   price: 50,  image: vada },
    //   { name: "Onion Dosa",    desc: "Crispy dosa topped with fresh onions and mild spices",     price: 65,  image: dosa,      tag: "Popular" },
    //   { name: "Plain Dosa",    desc: "Classic thin crispy dosa with sambar and chutney",         price: 50,  image: dosa },
    //   { name: "Masala Dosa",   desc: "Golden dosa stuffed with spiced potato filling",           price: 75,  image: dosa,      tag: "Must Try" },
    // ],
    // dosa: [
    //   { name: "Onion Butter Dosa",   desc: "Crispy dosa with fresh onions and butter",           price: 70,  image: dosa },
    //   { name: "Ghee Plain Dosa",     desc: "Classic dosa drizzled with pure ghee",               price: 60,  image: dosa },
    //   { name: "Ghee Onion Dosa",     desc: "Buttery dosa topped with caramelised onions",        price: 70,  image: dosa },
    //   { name: "Paneer Dosa",         desc: "Dosa stuffed with spiced paneer filling",            price: 90,  image: dosa,      tag: "Popular" },
    //   { name: "Mushroom Dosa",       desc: "Dosa with savory mushroom filling",                  price: 90,  image: dosa },
    //   { name: "Kaju Mushroom Dosa",  desc: "Premium dosa with cashew & mushroom",                price: 100, image: dosa,      tag: "Special" },
    // ],
    // starters: [
    //   { name: "Paneer Manchurian",    desc: "Crispy paneer tossed in tangy Indo-Chinese sauce",  price: 200, image: paneer,    tag: "Bestseller" },
    //   { name: "Crispy Corn",          desc: "Golden fried corn kernels with aromatic spices",    price: 180, image: corn,      tag: "Popular" },
    //   { name: "Gobi Manchurian",      desc: "Crispy cauliflower in a spicy tangy sauce",         price: 180, image: paneer },
    //   { name: "Veg Manchurian",       desc: "Mixed vegetable balls in Indo-Chinese gravy",       price: 180, image: paneer },
    //   { name: "Baby Corn Manchurian", desc: "Tender baby corn in flavorful manchurian sauce",    price: 180, image: corn },
    //   { name: "Chilli Paneer",        desc: "Spicy stir-fried paneer with bell peppers",         price: 200, image: paneer,    tag: "Must Try" },
    // ],
    // soup: [
    //   { name: "Tomato Soup",     desc: "Classic creamy tomato soup with herbs",                  price: 100, image: p_biryani },
    //   { name: "Cream of Tomato", desc: "Rich velvety tomato cream soup",                         price: 100, image: p_biryani, tag: "Popular" },
    //   { name: "Hot & Sour Soup", desc: "Tangy spicy Indo-Chinese style soup",                    price: 100, image: p_biryani, tag: "Bestseller" },
    //   { name: "Sweet Corn Soup", desc: "Warm soup with sweet corn and vegetables",               price: 100, image: p_biryani },
    //   { name: "Manchow Soup",    desc: "Spicy thick soup with crispy noodles",                   price: 100, image: p_biryani },
    //   { name: "Mushroom Soup",   desc: "Earthy creamy mushroom broth",                           price: 100, image: p_biryani },
    // ],
    curries: [
      { name: "Paneer Butter Masala",  desc: "Rich creamy tomato-based curry with soft paneer", price: 200, image: butter_masala,    tag: "Bestseller" },
      { name: "Kadai Paneer Curry",    desc: "Paneer in aromatic kadai masala gravy",            price: 200, image: kadai_paneer,    tag: "Popular" },
      { name: "Dal Tadka",             desc: "Yellow lentils tempered with spices and ghee",     price: 140, image: dal_tadka },
      { name: "Kaju Tomato Curry",          desc: "Fresh tomato-based curry with spices",             price: 180, image: kaju_tomato },
    ],
    friedrice: [
      { name: "Veg Fried Rice",         desc: "Classic stir-fried rice with mixed vegetables",  price: 200, image: veg_fried },
      { name: "Paneer Fried Rice",      desc: "Aromatic fried rice with paneer pieces",         price: 220, image: paneer_fried, tag: "Popular" },
      { name: "Corn Fried Rice",        desc: "Flavorful rice with sweet corn kernels",         price: 200, image: corn_fried },
      { name: "Kaju Paneer Fried Rice", desc: "Premium fried rice with cashews and paneer",     price: 250, image: kaju_paneer, tag: "Special" },
      { name: "Mushroom Fried Rice",    desc: "Savory fried rice with mushrooms",               price: 220, image: mushroom_fried },
    ],
    biryani: [
      { name: "Veg Biryani",          desc: "Aromatic basmati rice with mixed vegetables",      price: 200, image: veg_biryani, tag: "Bestseller" },
      { name: "Paneer Biryani",       desc: "Fragrant biryani with soft paneer pieces",         price: 220, image: veg_biryani, tag: "Popular" },
      { name: "Gobi Biryani",         desc: "Biryani with tender cauliflower florets",          price: 200, image: gobi_biryani },
      { name: "Mushroom Biryani",     desc: "Earthy mushrooms in aromatic biryani",             price: 220, image: mushroom_biryani },
      { name: "Kaju Paneer Biryani",  desc: "Premium biryani with cashews and paneer",          price: 250, image: kaju_biryani, tag: "Special" },
    ],
    noodles: [
      { name: "Veg Noodles",         desc: "Classic stir-fried noodles with vegetables",        price: 180, image: veg_noodles },
      { name: "Paneer Noodles",      desc: "Flavorful noodles with paneer pieces",              price: 200, image: paneer_noodles, tag: "Popular" },
      { name: "Manchurian Noodles",  desc: "Noodles tossed in manchurian sauce",                price: 200, image: manchurian_noodles, tag: "Bestseller" },
      { name: "Shezwan Noodles",     desc: "Spicy Schezwan-style noodles",                      price: 200, image: shezwaan_noodles },
      { name: "Mushroom Noodles",    desc: "Savory noodles with mushrooms",                     price: 200, image: mushroom_noodles },
    ],
    // tikkas: [
    //   { name: "Paneer Tikka",          desc: "Marinated paneer grilled to perfection",          price: 200, image: paneer,    tag: "Bestseller" },
    //   { name: "Mushroom Tikka",        desc: "Tender mushrooms grilled with spices",            price: 200, image: corn },
    //   { name: "Malai Paneer Tikka",    desc: "Creamy mild paneer tikka with cashew marinade",   price: 220, image: paneer,    tag: "Popular" },
    //   { name: "Paneer Hariyali Tikka", desc: "Paneer in green herb marinade grilled",           price: 220, image: paneer },
    //   { name: "Achari Paneer Tikka",   desc: "Tangy pickle-spiced paneer tikka",                price: 220, image: paneer,    tag: "Must Try" },
    // ],
    tandoori: [
      { name: "Butter Naan",           desc: "Soft naan brushed with butter",                   price: 60,  image: butter_naan, tag: "Bestseller" },
      { name: "Garlic Naan",           desc: "Naan topped with garlic and herbs",               price: 70,  image: garlic_naan, tag: "Popular" },
      { name: "Cheese Naan",           desc: "Stuffed with melted cheese",                      price: 60,  image: cheese_naan },
      { name: "Paneer Kulcha",         desc: "Soft kulcha stuffed with paneer",                 price: 90,  image: paneer_kulcha },
      { name: "Aloo Parata With Curd", desc: "Potato-stuffed paratha served with curd",         price: 100, image: aloo_curd },
    ],
    beverages: [
      { name: "Masala Chai",     desc: "Traditional Indian spiced tea with aromatic herbs",      price: 40,  image: masalachai, tag: "Popular" },
      { name: "Fresh Lime Soda", desc: "Refreshing citrus drink with a hint of mint",            price: 60,  image: lime },
      { name: "Badam Milk",      desc: "Creamy almond milk with saffron and cardamom",           price: 50,  image: badham_milk, tag: "Bestseller" },
      { name: "Green Tea",       desc: "Light antioxidant-rich green tea",                       price: 20,  image: greentea },
      { name: "Horlicks",        desc: "Warm nutritious malt drink",                             price: 50,  image: Horlicks },
    ],
    // meals: [
    //   { name: "Veg Meals (Parcel)", desc: "Full south Indian meal - parcel only",               price: 150, image: p_biryani, tag: "Value" },
    //   { name: "Veg Combo",          desc: "Complete vegetarian combo meal",                     price: 120, image: p_biryani, tag: "Popular" },
    //   { name: "Sambar Rice",        desc: "Comforting rice mixed with flavorful sambar",        price: 60,  image: p_biryani },
    //   { name: "Curd Rice",          desc: "Cooling yogurt rice with tempering",                 price: 60,  image: p_biryani },
    // ],
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