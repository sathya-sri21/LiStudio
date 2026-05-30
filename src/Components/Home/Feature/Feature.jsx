import React from "react";
import "./Feature.css";

const Features = () => {
  const features = [
    {
      icon: "🤖",
      title: "AI Video Generation",
      desc: "Create stunning videos from text prompts using advanced AI technology",
      color: "#a855f7"
    },
    {
      icon: "✂️",
      title: "Professional Editing",
      desc: "Trim, cut, add effects, filters, and text overlays to your videos",
      color: "#ec489a"
    },
    {
      icon: "🎬",
      title: "Stock Video Library",
      desc: "Access thousands of high-quality stock videos from Pexels",
      color: "#f59e0b"
    },
    {
      icon: "🎨",
      title: "Visual Effects",
      desc: "Apply filters, adjust brightness, contrast, and saturation",
      color: "#22c55e"
    },
    {
      icon: "📝",
      title: "Text Overlays",
      desc: "Add custom text with customizable colors and font sizes",
      color: "#06b6d4"
    },
    {
      icon: "⚡",
      title: "Fast Export",
      desc: "Export your videos in HD quality with one click",
      color: "#ef4444"
    },
    {
      icon: "🔒",
      title: "Privacy First",
      desc: "All processing happens in your browser - no uploads to servers",
      color: "#8b5cf6"
    },
    {
      icon: "🌐",
      title: "No Watermark",
      desc: "Export videos without any watermarks - completely free",
      color: "#14b8a6"
    }
  ];

  return (
    <div className="features-page">
      <div className="features-header">
        <h1>✨ Powerful Features</h1>
        <p>Everything you need to create amazing videos</p>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon" style={{ background: `${feature.color}20` }}>
              <span style={{ color: feature.color }}>{feature.icon}</span>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="features-cta">
        <h2>Ready to create amazing videos?</h2>
        <button onClick={() => window.location.href = "/makevideo"}>
          🎬 Start Creating Now
        </button>
      </div>
    </div>
  );
};

export default Features;