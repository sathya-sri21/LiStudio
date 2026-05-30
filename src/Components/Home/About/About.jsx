import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about">
      {/* Animated Brand Icon */}
      <div className="brand-icon">🎬</div>

      <h2>About Lee Studio</h2>

      <p>
        Lee Studio is an AI-powered video platform where you can create
        cinematic videos using text or edit your own clips easily.
      </p>

      {/* Features with data-label for text */}
      <div className="features">
        <div data-label="AI Video Generation">🤖</div>
        <div data-label="Video Editing">✂️</div>
        <div data-label="Trending Templates">🔥</div>
      </div>

      {/* Stats Section */}
      <div className="stats">
        <div className="stat-item">
          <div className="stat-number">10K+</div>
          <div className="stat-label">Videos Created</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">500+</div>
          <div className="stat-label">Happy Clients</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Support</div>
        </div>
      </div>
    </div>
  );
};

export default About;