import { useEffect, useState } from "react";
import "./styles/Slider.css";
import slide1 from "/images/hero/idly_sambar.png";
import slide2 from "/images/hero/starter.png";
import slide3 from "/images/hero/panner-biryani.png";

const slides = [
  {
    image: slide1,
    title: "WELCOME!",
    subtitle: "Cherries Veg Restaurant",
  },
  {
    image: slide2,
    title: "Authentic Taste",
    subtitle: "Pure Veg Delicious",
  },
  {
    image: slide3,
    title: "Fresh & Flavorful",
    subtitle: "Made With Love",
  },
];

function Slider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState('next');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection('next');
    setCurrent((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 1200);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection('prev');
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 1200);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === current) return;
    setIsTransitioning(true);
    setDirection(index > current ? 'next' : 'prev');
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 1200);
  };

  return (
    <section className="hero-slider">
      {slides.map((slide, index) => {
        let slideClass = 'slide';

        if (index === current) {
          slideClass += ' active';
        } else if (direction === 'next') {
          if (index === (current - 1 + slides.length) % slides.length) {
            slideClass += ' prev';
          } else if (index === (current + 1) % slides.length) {
            slideClass += ' next';
          }
        } else {
          if (index === (current + 1) % slides.length) {
            slideClass += ' next';
          } else if (index === (current - 1 + slides.length) % slides.length) {
            slideClass += ' prev';
          }
        }

        return (
          <div
            key={index}
            className={slideClass}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="overlay">
              <div className="content-wrapper">
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-subtitle">{slide.subtitle}</p>

                {/* Call Now Button */}
                <div className="contact-buttons">
                  <button className="slider-btn">
                    <a href="tel:+919000202206">Call Now</a>
                  </button>
                </div>

                {/* Store Buttons */}
                <div className="slider-store-buttons">
                  {/* <a
                    href="https://example.com/app-store"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="slider-store-btn"
                  >
                    <img
                      src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                      alt="Download on the App Store"
                    />
                  </a> */}
                  <a
                    href="https://example.com/google-play"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="slider-store-btn"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Get it on Google Play"
                    />
                  </a>
                </div>

              </div>
            </div>
          </div>
        );
      })}

      <button
        className="arrow left"
        onClick={prevSlide}
        aria-label="Previous slide"
        disabled={isTransitioning}
      >
        ❮
      </button>
      <button
        className="arrow right"
        onClick={nextSlide}
        aria-label="Next slide"
        disabled={isTransitioning}
      >
        ❯
      </button>

      <div className="slide-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === current ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            disabled={isTransitioning}
          />
        ))}
      </div>
    </section>
  );
}

export default Slider;