import React from "react";
import "./Playstore.css";

const Playstore = () => {
  return (
    <section className="download-section">
      <div className="download-container">

        {/* LEFT CONTENT */}
        <div className="download-content">
          <h2>Download the app now!</h2>
          <p>
            Experience seamless online ordering only on our mobile app.
          </p>

          <div className="store-buttons">
            <a
              href="https://example.com/google-play"
              target="_blank"
              rel="noopener noreferrer"
              className="store-btn"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
              />
            </a>

            {/* <a
              href="https://example.com/app-store"
              target="_blank"
              rel="noopener noreferrer"
              className="store-btn"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
              />
            </a> */}
          </div>
        </div>

        {/* RIGHT CONTENT — Phone Mockup */}
        <div className="phone-wrapper">
          <div className="phone-mockup">
            {/* Phone outer frame */}
            <div className="phone-frame">
              {/* Notch */}
              <div className="phone-notch">
                <div className="phone-notch-inner"></div>
              </div>
              {/* Screen */}
              <div className="phone-screen">
                <p className="qr-label">Scan the QR code to<br />download the app</p>
                <div className="qr-wrapper">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=RandomDemoLink"
                    alt="QR Code"
                    className="qr-image"
                  />
                </div>
              </div>
              {/* Home indicator */}
              <div className="phone-home-bar"></div>
            </div>

            {/* Side buttons */}
            <div className="phone-btn-volume-up"></div>
            <div className="phone-btn-volume-down"></div>
            <div className="phone-btn-power"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Playstore;