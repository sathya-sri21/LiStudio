import React, { useState } from "react";
import axios from "axios";
import "./MakeVideo.css";

const MakeVideo = () => {
  const [prompt, setPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const PEXELS_API_KEY = process.env.REACT_APP_PEXELS_API_KEY;

  // Correct API endpoint
  const searchVideos = async (query) => {
    // Check if API key exists
    if (!PEXELS_API_KEY) {
      throw new Error("API key is missing! Please check your .env file.");
    }

    // Correct endpoint with encoded query
    const url = `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape`;
    
    console.log("Searching for:", query);
    console.log("API URL:", url);

    const response = await axios.get(url, {
      headers: { 
        Authorization: PEXELS_API_KEY 
      }
    });

    console.log("Response status:", response.status);
    console.log("Videos found:", response.data.videos?.length || 0);

    if (!response.data.videos || response.data.videos.length === 0) {
      throw new Error(`No videos found for "${query}"`);
    }

    // Get the first video
    const video = response.data.videos[0];
    
    // Find the best quality video file (HD preferred)
    const bestVideo = video.video_files.find(
      file => file.quality === "hd" || file.quality === "sd"
    ) || video.video_files[0];

    return bestVideo.link;
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt!");
      return;
    }

    setIsLoading(true);
    setError("");
    setVideoUrl("");

    try {
      const video = await searchVideos(prompt);
      setVideoUrl(video);
      console.log("Video loaded successfully!");
    } catch (err) {
      console.error("Error:", err);
      
      // Handle specific error codes
      if (err.response?.status === 401) {
        setError("❌ Invalid API Key! Please check your .env file and restart the app.");
      } else if (err.response?.status === 429) {
        setError("⏰ Rate limit exceeded. Please wait a moment and try again.");
      } else if (err.response?.status === 404) {
        setError("🔍 API endpoint not found. Please check your connection.");
      } else {
        setError(err.message || "Failed to generate video. Please try again.");
      }
      
      // Optional: Fallback to a default video
      setVideoUrl("https://cdn.pixabay.com/video/2019/07/30/25763-352095374_large.mp4");
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "nature", "ocean waves", "sunset beach", "mountain view",
    "forest path", "city night", "cute cat", "sports car"
  ];

  return (
    <div className="app-container">
      {/* LEFT PANEL */}
      <div className="left-panel">
        <h1>🎬 Li Studio</h1>
        <p className="subtitle">Text → Video AI</p>

        {error && <div className="error-message">{error}</div>}

        <textarea
          placeholder="Describe your video... (cinematic sunset, ocean waves, nature...)"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
        />

        <div className="controls">
          <select defaultValue="Cinematic">
            <option>Cinematic</option>
            <option>Realistic</option>
            <option>Anime</option>
          </select>

          <select defaultValue="10 sec">
            <option>5 sec</option>
            <option>10 sec</option>
          </select>
        </div>

        <button onClick={handleGenerate} disabled={isLoading}>
          {isLoading ? "🎬 Generating..." : "✨ Generate Video"}
        </button>

        <div className="suggestions-section">
          <p className="suggestions-title">💡 Try these prompts:</p>
          <div className="suggestions-list">
            {suggestions.map((s, i) => (
              <div
                key={i}
                className="suggestion-chip"
                onClick={() => {
                  setPrompt(s);
                  setTimeout(() => handleGenerate(), 100);
                }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        {isLoading ? (
          <div className="loader">
            <div className="spinner"></div>
            <p>Creating your video...</p>
            <small>Searching Pexels for "{prompt}"</small>
          </div>
        ) : videoUrl ? (
          <video key={videoUrl} controls autoPlay loop muted>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support video playback.
          </video>
        ) : (
          <div className="placeholder">
            <div className="placeholder-icon">🎬</div>
            <p>Your AI-generated video will appear here</p>
            <small>Type a prompt and click Generate</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default MakeVideo;