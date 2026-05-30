import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    // Add your login logic here
    console.log("Login:", { email, password, rememberMe });
    navigate("/"); // Redirect to home after login
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
        <h1 className="auth-title">Welcome Back! 👋</h1>
        <p className="auth-subtitle">Sign in to continue creating amazing videos</p>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="auth-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <a href="/forgot-password" className="forgot-link">
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="auth-btn">
            Sign In ✨
          </button>
        </form>

        {/* Divider */}
        <div className="auth-divider">
          <span>or continue with</span>
        </div>

        {/* Social Login */}
        <div className="social-login">
          <button className="social-btn google">G</button>
          <button className="social-btn github">GH</button>
          <button className="social-btn apple">🍎</button>
        </div>

        {/* Sign Up Link */}
        <p className="auth-footer">
          Don't have an account?{" "}
          <span className="auth-link" onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;