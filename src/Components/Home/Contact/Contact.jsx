import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>📬 Contact Us</h1>
        <p>We'd love to hear from you</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="info-card">
            <span>📧</span>
            <h3>Email</h3>
            <p>support@leestudio.com</p>
            <p>hello@leestudio.com</p>
          </div>
          <div className="info-card">
            <span>📞</span>
            <h3>Phone</h3>
            <p>+1 (555) 123-4567</p>
            <p>Mon-Fri, 9AM-6PM PST</p>
          </div>
          <div className="info-card">
            <span>📍</span>
            <h3>Location</h3>
            <p>San Francisco, CA</p>
            <p>United States</p>
          </div>
          <div className="info-card">
            <span>💬</span>
            <h3>Social</h3>
            <div className="social-links">
              <a href="#">🐦 Twitter</a>
              <a href="#">📷 Instagram</a>
              <a href="#">💼 LinkedIn</a>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          {submitted && <div className="success-message">✅ Message sent successfully!</div>}
          
          <div className="form-group">
            <label>Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Email *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Subject *</label>
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Message *</label>
            <textarea name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
          </div>
          
          <button type="submit" className="submit-btn">Send Message ✨</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;