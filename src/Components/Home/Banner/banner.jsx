import React from "react";
import "./banner.css";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="banner">

      {/* LEFT CONTENT */}
      <div className="banner-left">
        <h1>
          Create AI Videos <br />
          <span style={{ background: "linear-gradient(135deg, #a855f7, #ec489a)", 
                         backgroundClip: "text",
                         WebkitBackgroundClip: "text",
                         WebkitTextFillColor: "transparent" }}>
            Effortlessly 🎬
          </span>
        </h1>

        <p>
          Generate stunning cinematic videos using AI magic or edit your own clips 
          in seconds. No technical skills needed!
        </p>

        <div className="banner-buttons">
          <button
            className="primary-btn"
            onClick={() => navigate("/makevideo")}
          >
            🤖 Make Video
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/editor")}
          >
            ✂️ Open Editor
          </button>
        </div>

        {/* Optional: Trust Badges */}
        <div style={{ 
          marginTop: "40px", 
          display: "flex", 
          gap: "20px", 
          justifyContent: "center",
          flexWrap: "wrap",
          opacity: 0.7
        }}>
          <span style={{ fontSize: "14px", color: "#94a3b8" }}>⭐ 4.9 Rating</span>
          <span style={{ fontSize: "14px", color: "#94a3b8" }}>🎥 10K+ Videos Created</span>
          <span style={{ fontSize: "14px", color: "#94a3b8" }}>⚡ Instant Generation</span>
        </div>
      </div>

      {/* RIGHT VIDEO */}
      <div className="banner-right">
        <video
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

    </div>
  );
};

export default Banner;