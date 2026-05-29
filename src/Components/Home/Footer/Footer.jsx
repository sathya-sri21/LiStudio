import React, { useState } from "react";
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribeStatus("Subscribed! 🎉");
      setEmail("");
      setTimeout(() => setSubscribeStatus(""), 3000);
    }
  };

  return (
    <div className="footer">
      <div className="footer-content">
        
        {/* Brand Section */}
        <div className="footer-brand">
          <h3>Li Studio</h3>
          <p>
            Create stunning AI-powered videos effortlessly. 
            Transform your ideas into cinematic masterpieces.
          </p>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer">📘</a>
            <a href="#" target="_blank" rel="noopener noreferrer">🐦</a>
            <a href="#" target="_blank" rel="noopener noreferrer">📷</a>
            <a href="#" target="_blank" rel="noopener noreferrer">💼</a>
            <a href="#" target="_blank" rel="noopener noreferrer">🎬</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a onClick={() => window.scrollTo(0, 0)}>Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/features">Features</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="/help">Help Center</a></li>
            <li><a href="/tutorials">Tutorials</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/api">API Documentation</a></li>
            <li><a href="/community">Community</a></li>
          </ul>
        </div>

        {/* Contact & Newsletter */}
        <div className="footer-section">
          <h4>Stay Updated</h4>
          <div className="contact-info">
            <p><span>📧</span> support@listudio.com</p>
            <p><span>📞</span> +1 (555) 123-4567</p>
            <p><span>📍</span> San Francisco, CA</p>
          </div>
          
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
          {subscribeStatus && (
            <p style={{ color: "#a855f7", fontSize: "12px", marginTop: "10px" }}>
              {subscribeStatus}
            </p>
          )}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2026 Li Studio. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/cookies">Cookie Policy</a>
          <a href="/sitemap">Sitemap</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;