import React, { useState } from "react";
import axios from "axios";
import { HfInference } from "@huggingface/inference";
import "./MakeVideo.css";

const MakeVideo = () => {
  const [prompt, setPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [source, setSource] = useState("pexels"); // 'pexels' or 'huggingface'

  const PEXELS_API_KEY = process.env.REACT_APP_PEXELS_API_KEY;
  const HF_TOKEN = process.env.REACT_APP_HF_TOKEN;

  // Initialize Hugging Face client
  const hf = new HfInference(HF_TOKEN);

  // ========== PEXELS SEARCH (Existing) ==========
  const searchPexelsVideos = async (query) => {
    if (!PEXELS_API_KEY) {
      throw new Error("Pexels API key is missing!");
    }

    const url = `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape`;
    
    const response = await axios.get(url, {
      headers: { Authorization: PEXELS_API_KEY }
    });

    if (!response.data.videos || response.data.videos.length === 0) {
      throw new Error(`No videos found for "${query}"`);
    }

    const video = response.data.videos[0];
    const bestVideo = video.video_files.find(
      file => file.quality === "hd" || file.quality === "sd"
    ) || video.video_files[0];

    return bestVideo.link;
  };

  // ========== HUGGING FACE VIDEO GENERATION ==========
  // Using a working text-to-video model from Hugging Face [citation:1][citation:9]
  const generateHuggingFaceVideo = async (query) => {
    if (!HF_TOKEN) {
      throw new Error("Hugging Face token is missing! Please add REACT_APP_HF_TOKEN to .env");
    }

    console.log("🤗 Generating video with Hugging Face for:", query);
    
    // Using diffusers pipeline approach - compatible with Hugging Face models [citation:9]
    const videoBlob = await hf.textToVideo({
      model: "damo-vilab/text-to-video-ms-1.7b",  // Working model
      inputs: query,
      parameters: {
        num_frames: 30,
        guidance_scale: 7.5,
        num_inference_steps: 50,
      }
    });

    return URL.createObjectURL(videoBlob);
  };

  // ========== MAIN GENERATE FUNCTION ==========
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt!");
      return;
    }

    setIsLoading(true);
    setError("");
    setVideoUrl("");

    try {
      let video;
      
      if (source === "pexels") {
        video = await searchPexelsVideos(prompt);
        console.log("✅ Pexels video loaded!");
      } else {
        video = await generateHuggingFaceVideo(prompt);
        console.log("✅ Hugging Face video generated!");
      }
      
      setVideoUrl(video);
      
    } catch (err) {
      console.error("Error:", err);
      
      if (err.response?.status === 401) {
        setError("❌ Invalid API Key! Please check your .env file.");
      } else if (err.response?.status === 429) {
        setError("⏰ Rate limit exceeded. Please wait a moment.");
      } else {
        setError(err.message || "Failed to generate video.");
      }
      
      // Fallback video
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
      <div className="left-panel">
        <h1>🎬 Lee Studio</h1>
        <p className="subtitle">Text → Video AI</p>

        {/* Source Selector - Choose between Pexels and Hugging Face */}
        <div className="source-selector">
          <button 
            className={`source-btn ${source === "pexels" ? "active" : ""}`}
            onClick={() => setSource("pexels")}
          >
            📹 Pexels (Instant)
          </button>
          <button 
            className={`source-btn ${source === "huggingface" ? "active" : ""}`}
            onClick={() => setSource("huggingface")}
          >
            🤗 Hugging Face (AI Generate)
          </button>
        </div>

        {/* Info about current source */}
        <div className="source-info">
          {source === "pexels" ? (
            <p>⚡ Pexels: Searches stock videos • 1-2 seconds • 200 req/hour</p>
          ) : (
            <p>🤖 Hugging Face: AI generates new video • 1-3 minutes • Free tier</p>
          )}
        </div>

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

      <div className="right-panel">
        {isLoading ? (
          <div className="loader">
            <div className="spinner"></div>
            <p>
              {source === "pexels" ? "Searching Pexels..." : "🤗 AI is creating your video..."}
            </p>
            <small>
              {source === "pexels" 
                ? `Searching for "${prompt}"` 
                : `Generating AI video for "${prompt}" - This may take 1-3 minutes`}
            </small>
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