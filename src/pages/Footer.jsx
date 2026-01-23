import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">


        <div className="footer-brand">
          <h2>Cherries</h2>
          <p>
            Pure vegetarian food made with love.  
            Fresh ingredients, authentic taste, and warm service.
          </p>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h3>Contact</h3>
          <p>📍 Near Fire Station, Opp. HP Petrol Bunk, Salipeta, Kakinada</p>
          <p>
            📞 <a href="tel:+919876543210">+91 90002 02206</a>
          </p>
          {/* <p>
            💬 <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Chat
            </a>
          </p> */}
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Cherries Pure Veg Cafe. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
