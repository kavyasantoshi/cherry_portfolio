import { useState } from "react";
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
import menu1       from "/images/menu/menu1.jpeg";
import menu2       from "/images/menu/menu2.jpeg";
import "./styles/Menu.css";
// import { ImOpt } from "react-icons/im";

function Menu() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [showMenu,       setShowMenu]       = useState(false);
  const [menuIndex,      setMenuIndex]      = useState(0);
  const [zoomOpen,       setZoomOpen]       = useState(false);
  const [transitioning,  setTransitioning]  = useState(false);

  const menuImages = [menu1, menu2];

  /* ── Categories with image instead of emoji ── */
  const categories = [
    { key: "idly",   label: "idly",    image: "images/Tiffins/Idly.png"      },
    { key: "dosa",      label: "Dosa",        image:  "images/Tiffins/Set dosa.png "   },
    { key: "pesarattu",  label: "Pesarattu",    image: "images/Tiffins/plain pesarattu.png "  },
    { key: "soup",      label: "Soups",       image: "images/Soups/ClearSoup.png"  },
    { key: "starters",      label: "Starters",       image: "images/Starters/BabyCorn65.png"  },
    { key: "tikkas",    label: "Tikkas",      image: "images/Tikkas/PaneerTikka.png"   },
    { key: "curries",   label: "Curries",     image: butter_masala    },
    { key: "friedrice", label: "Fried Rice",  image: veg_fried },
    { key: "biryani",   label: "Biryani",     image: veg_biryani  },
    { key: "noodles",   label: "Noodles",     image: veg_noodles     },
    { key: "tandoori",  label: "Tandoori",    image: tandoori   },
    { key: "meals",     label: "Meals",       image: south_meal  },
  ];

  const menuData = {
    idly: [
      { name: "Idly",    desc: "Soft, fluffy steamed rice cakes served fresh and warm, perfect for a light and healthy meal.",     price: 30,  image: "images/Tiffins/Idly.png",      tag: "Popular" },
      { name: "Sambar Idly",   desc: "Soft idlies served with hot, flavorful sambar",            price: 60,  image: "images/Tiffins/sambar idly.png",      tag: "Bestseller" },
      { name: "Button Idly",    desc: "Mini soft idlies steamed to perfection, bite-sized and served with delicious chutney and sambar.",     price: 60,  image: "images/Tiffins/Button idly.png"},
      { name: "Ghee karappodi idly",    desc: "Soft idlies tossed in aromatic ghee and spicy karappodi, offering a rich and flavorful traditional taste.",     price: 40,  image: "images/Tiffins/Ghee karappodi idly.png",      tag: "Must try" },
    ],
    dosa: [
      { name: "Onion Butter Dosa",   desc: "Crispy dosa with fresh onions and butter",           price: 70,  image: "images/Tiffins/onion butter dosa.png" },
      { name: "Ghee Plain Dosa",     desc: "Classic dosa drizzled with pure ghee",               price: 60,  image: "images/Tiffins/ghee plain dosa.png" },
      { name: "Ghee Onion Dosa",     desc: "Buttery dosa topped with caramelised onions",        price: 70,  image: "images/Tiffins/GHee onion dosa.png" },
      { name: "Paneer Dosa",         desc: "Dosa stuffed with spiced paneer filling",            price: 90,  image: "images/Tiffins/paneer dosa.png",      tag: "Popular" },
      { name: "Mushroom Dosa",       desc: "Dosa with savory mushroom filling",                  price: 90,  image: "images/Tiffins/Mushroom dosa.png"},
      { name: "Kaju Mushroom Dosa",  desc: "Premium dosa with cashew & mushroom",                price: 100, image: "images/Tiffins/Kaju Mushroom Dosa.png",      tag: "Special" },
    ],
    pesarattu: [
  { 
    name: "Plain Pesarratu",   
    desc: "Traditional green gram crepe served hot and crispy",           
    price: 55,  
    image: "images/Tiffins/plain pesarattu.png" 
  },
  { 
    name: "Ghee Plain Pesarratu",     
    desc: "Crispy pesarratu drizzled with aromatic pure ghee",               
    price: 65,  
    image: "images/Tiffins/Ghee plain pesarattu.png" 
  },
  { 
    name: "Onion Pesarratu",     
    desc: "Pesarratu topped with fresh chopped onions and spices",        
    price: 65,  
    image: "images/Tiffins/Onion pesarttu.png" 
  },
  { 
    name: "Ghee Onion Pesarratu",         
    desc: "Flavorful pesarratu with onions and a rich ghee finish",            
    price: 75,  
    image: "images/Tiffins/Ghee onion pesarattu.png" 
  },
  { 
    name: "Ghee Pesarratu Upma",  
    desc: "Upma-filled pesarratu enriched with a generous drizzle of ghee",                
    price: 90, 
    image: "images/Tiffins/Ghee perarattu upma.png",      
    tag: "Special"
  },
  { 
    name: "Kakinada Chitti Pesarratu",  
    desc: "Authentic small-sized crispy pesarratu from Kakinada style",                
    price: 70, 
    image: "images/Tiffins/kakinada chitti pesarattu.png"
  },
  { 
    name: "Mixture Pesarratu",  
    desc: "Crunchy pesarratu topped with spicy mixture for extra flavor",                
    price: 90, 
    image: "images/Tiffins/Mixture Pesarattu.png",
    tag: "Chef's Choice"
  }
],
    starters: [
      { name: "Paneer Manchurian",    desc: "Crispy paneer tossed in tangy Indo-Chinese sauce",  price: 200, image: "images/Starters/PaneerMunchurian.png",    tag: "Bestseller" },
      { name: "Crispy Corn",          desc: "Golden fried corn kernels with aromatic spices",    price: 180, image: "images/Starters/CrispyCorn.png",      tag: "Popular" },
      { name: "Gobi Manchurian",      desc: "Crispy cauliflower in a spicy tangy sauce",         price: 180, image: "images/Starters/GobiManchurian.png"},
      { name: "Veg Manchurian",       desc: "Mixed vegetable balls in Indo-Chinese gravy",       price: 180, image: "images/Starters/VegManchurian.png"},
      { name: "Baby Corn Manchurian", desc: "Tender baby corn in flavorful manchurian sauce",    price: 180, image:  "images/Starters/BabyCornManchurian.png"},
      { name: "Chilli Paneer",        desc: "Spicy stir-fried paneer with bell peppers",         price: 200, image: "images/Starters/ChilliPaneer.png",    tag: "Must Try" },
    ],
    soup: [
      { name: "Tomato Soup",     desc: "Classic creamy tomato soup with herbs",                  price: 100, image: "images/Soups/TomatoSoup.png" },
      { name: "Cream of Tomato", desc: "Rich velvety tomato cream soup",                         price: 100, image: "images/Soups/CreamTomatoSoup.png", tag: "Popular" },
      { name: "Hot & Sour Soup", desc: "Tangy spicy Indo-Chinese style soup",                    price: 100, image: "images/Soups/HotAndSourSoup.png", tag: "Bestseller" },
      { name: "Sweet Corn Soup", desc: "Warm soup with sweet corn and vegetables",               price: 100, image: "images/Soups/SweetCornSoup.png" },
      { name: "Manchow Soup",    desc: "Spicy thick soup with crispy noodles",                   price: 100, image: "images/Soups/ManchowSoup.png" },
      { name: "Mushroom Soup",   desc: "Earthy creamy mushroom broth",                           price: 100, image: "images/Soups/MushroomSoup.png" },
    ],
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
      { name: "Paneer Biryani",       desc: "Fragrant biryani with soft paneer pieces",         price: 220, image: "images/biryani/paneer_biryani.png", tag: "Popular" },
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
    tikkas: [
      { name: "Paneer Tikka",          desc: "Marinated paneer grilled to perfection",          price: 200, image: "images/Tikkas/PaneerTikka.png",    tag: "Bestseller" },
      { name: "Mushroom Tikka",        desc: "Tender mushrooms grilled with spices",            price: 200, image: "images/Tikkas/MushroomTikka.png" },
      { name: "Malai Paneer Tikka",    desc: "Creamy mild paneer tikka with cashew marinade",   price: 220, image: "images/Tikkas/MalaiPaneerTikka.png",    tag: "Popular" },
      { name: "Paneer Hariyali Tikka", desc: "Paneer in green herb marinade grilled",           price: 220, image: "images/Tikkas/PannerHariyaliTikka.png" },
      { name: "Achari Paneer Tikka",   desc: "Tangy pickle-spiced paneer tikka",                price: 220, image: "images/Tikkas/AchariPannerTikka.png",    tag: "Must Try" },
    ],
    tandoori: [
      { name: "Butter Naan",           desc: "Soft naan brushed with butter",                   price: 60,  image: butter_naan, tag: "Bestseller" },
      { name: "Garlic Naan",           desc: "Naan topped with garlic and herbs",               price: 70,  image: garlic_naan, tag: "Popular" },
      { name: "Cheese Naan",           desc: "Stuffed with melted cheese",                      price: 60,  image: cheese_naan },
      { name: "Paneer Kulcha",         desc: "Soft kulcha stuffed with paneer",                 price: 90,  image: paneer_kulcha },
      { name: "Aloo Parata With Curd", desc: "Potato-stuffed paratha served with curd",         price: 100, image: aloo_curd },
    ],
    meals: [
      { name: "Veg Meals (Parcel)", desc: "Full south Indian meal - parcel only",               price: 150, image: "images/meals/veg_meals.png", tag: "Value" },
      { name: "Veg Combo",          desc: "Complete vegetarian combo meal",                     price: 120, image: "images/meals/veg_combo.png", tag: "Popular" },
      { name: "Sambar Rice",        desc: "Comforting rice mixed with flavorful sambar",        price: 60,  image: "images/meals/sambar_rice.png" },
      { name: "Curd Rice",          desc: "Cooling yogurt rice with tempering",                 price: 60,  image: curd_rice },
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