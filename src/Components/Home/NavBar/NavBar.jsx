import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation handlers
  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo-section" onClick={handleLogoClick}>
        <h2>Lee Studio</h2>
      </div>

      <div className="nav-links">
        <button onClick={handleLoginClick}>Login</button>
        <button className="signup" onClick={handleSignupClick}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Navbar;