import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>
            Call or WhatsApp us for orders  
            or any enquiries. We’re happy to serve you!
          </p>

          <div className="contact-buttons">
            <button className="call-btn"><a href="tel:+919000202206">
              Call Now
            </a></button>
          </div>
          <div className="contact-details">
            <p>
              📍 Temple St, near fire office petrol
            station, Rama Rao Peta, Kakinada
            </p>
            <p>⏰ Open: 06:00 AM – 11:00 PM</p>
          </div>
        </div>

        <div className="map-container">
        <iframe 
        title="Cherries Veg Restaurant Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3816.3539095647616!2d82.23104577492444!3d16.957133283858578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a382952b626832d%3A0xea201af6aa4e193e!2sCHERRIES%20PURE%20VEG%20CAFE!5e0!3m2!1sen!2sus!4v1767454845432!5m2!1sen!2sus" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
