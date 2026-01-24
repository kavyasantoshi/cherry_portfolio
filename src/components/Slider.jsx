import { useEffect, useState } from "react";
import "./Slider.css";
import slide1 from "../assets/idly_sambar.png";
import slide2 from "../assets/starter.png";
import slide3 from "../assets/panner-biryani.png";
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
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [current]);
   const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };
  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };
  return (
    <section className="hero-slider">
      {slides.map((slide, index) => (
        <div key={index} className={`slide ${index === current ? "active" : ""}`} style={{ backgroundImage: `url(${slide.image})` }}>
          <div className="overlay">
            <h1>{slide.title}</h1>
            <p>{slide.subtitle}</p>
            <div className="contact-buttons">
            <button className="call-btn"><a href="tel:+919000202206">
              Call Now
            </a></button>
          </div>
          </div>
        </div>
      ))}
      <button className="arrow left"  onClick={prevSlide}>❮</button>
      <button className="arrow right" onClick={nextSlide}>❯</button>
    </section>
  );
}
export default Slider;
