import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Same CSS file

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    if (!agreeTerms) {
      setError("Please agree to the Terms & Conditions");
      return;
    }
    
    setError("");
    // Add your signup logic here
    console.log("Signup:", { name, email, password });
    navigate("/login"); // Redirect to login after signup
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        
        {/* Back Button */}
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>

        {/* Logo */}
        <div className="auth-logo">
          <span className="logo-icon">🎬</span>
          <h2>Lee Studio</h2>
        </div>

        {/* Title */}
        <h1 className="auth-title">Create Account 🚀</h1>
        <p className="auth-subtitle">Start your AI video creation journey today</p>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Signup Form */}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <div className="input-icon">
              <span>👤</span>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <div className="input-icon">
              <span>📧</span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-icon">
              <span>🔒</span>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <small className="input-hint">Minimum 6 characters</small>
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <div className="input-icon">
              <span>✓</span>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            I agree to the{" "}
            <a href="/terms" className="terms-link">Terms & Conditions</a>{" "}
            and{" "}
            <a href="/privacy" className="terms-link">Privacy Policy</a>
          </label>

          <button type="submit" className="auth-btn">
            Get Started 🎯
          </button>
        </form>

        {/* Divider */}
        <div className="auth-divider">
          <span>or sign up with</span>
        </div>

        {/* Social Signup */}
        <div className="social-login">
          <button className="social-btn google">G</button>
          <button className="social-btn github">GH</button>
          <button className="social-btn apple">🍎</button>
        </div>

        {/* Login Link */}
        <p className="auth-footer">
          Already have an account?{" "}
          <span className="auth-link" onClick={() => navigate("/login")}>
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;