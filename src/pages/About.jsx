import { useState, useEffect } from "react";
import { Leaf, Star, Utensils, Sparkles, Heart } from "lucide-react";
import "./About.css";
import Veg from "../assets/cafe.jpg";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const aboutSection = document.querySelector(".about");
    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => {
      if (aboutSection) {
        observer.unobserve(aboutSection);
      }
    };
  }, []);

  return (
    <section className="about">
      {/* Decorative Elements */}
      <div className="decoration-circle circle-1"></div>
      <div className="decoration-circle circle-2"></div>
      <div className="decoration-circle circle-3"></div>

      <div className="about-container">
        {/* LEFT IMAGE */}
        <div className={`about-image ${isVisible ? "animate-in" : ""}`}>
          <div className="image-frame">
            <img src={Veg} alt="Healthy food" />
            <div className="image-shadow"></div>
          </div>
          
          {/* Floating badges with icons */}
          <div className="badge badge-1">
            <div className="badge-icon">
              <Leaf size={28} strokeWidth={2} color="#22c55e" />
            </div>
            <div className="badge-text">
              <strong>100%</strong>
              <span>Vegetarian</span>
            </div>
          </div>
          
          <div className="badge badge-2">
            <div className="badge-icon">
              <Star size={28} strokeWidth={2} color="#f59e0b" fill="#f59e0b" />
            </div>
            <div className="badge-text">
              <strong>Fresh</strong>
              <span>Daily</span>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className={`about-content ${isVisible ? "animate-in" : ""}`}>
          <span className="subtitle">
            <span className="subtitle-line"></span>
            About us
          </span>

          <h1 className="main-title">
            We Provide{" "}
            <span className="highlight">
              Healthy Food
              <svg className="title-underline" viewBox="0 0 200 12">
                <path d="M0,6 Q50,0 100,6 T200,6" fill="none" stroke="#f97316" strokeWidth="3"/>
              </svg>
              <span className="food-icon">🥗</span>
            </span>
          </h1>

          <p className="description">
            <span className="text-line">
              Cherries Cafe is a pure vegetarian QSR module. Located in the heart of Kakinada.
              Our menu features a wide variety of traditional tiffins prepared using high-quality ingredients, authentic recipes, and utmost care for taste and hygiene.
              From comforting idlis and crispy dosas to aromatic tea, every item is crafted to give you a satisfying and affordable dining experience.
            </span>
          </p>

          {/* Feature Cards with Icons */}
          <div className="features">
            <div className={`feature-card ${isVisible ? "slide-in" : ""}`}>
              <div className="feature-icon-wrapper">
                <Utensils size={28} strokeWidth={2} />
              </div>
              <div className="feature-info">
                <h4>Traditional Taste</h4>
                <p>Authentic recipes</p>
              </div>
            </div>

            <div className={`feature-card ${isVisible ? "slide-in" : ""}`}>
              <div className="feature-icon-wrapper">
                <Sparkles size={28} strokeWidth={2} />
              </div>
              <div className="feature-info">
                <h4>Quality First</h4>
                <p>Fresh ingredients</p>
              </div>
            </div>

            <div className={`feature-card ${isVisible ? "slide-in" : ""}`}>
              <div className="feature-icon-wrapper">
                <Heart size={28} strokeWidth={2} />
              </div>
              <div className="feature-info">
                <h4>Hygienic</h4>
                <p>Clean & safe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}