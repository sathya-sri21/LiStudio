import React, { useState, useRef } from "react";
import "./Edit.css";

const VideoEditor = () => {
  const [activeTab, setActiveTab] = useState("edit");
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  
  // Video cutting states
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [trimmedVideoUrl, setTrimmedVideoUrl] = useState(null);
  const [isTrimming, setIsTrimming] = useState(false);
  
  // Effect states (working attributes)
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [blur, setBlur] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("none");
  
  // Text overlay states
  const [textOverlay, setTextOverlay] = useState("");
  const [textColor, setTextColor] = useState("#ffffff");
  const [textSize, setTextSize] = useState(32);
  const [showText, setShowText] = useState(false);
  
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  // Handle video file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid video file (MP4, WebM, MOV, AVI)');
      return;
    }

    const maxSize = 500 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size must be less than 500MB');
      return;
    }

    setError("");
    uploadVideo(file);
  };

  const uploadVideo = (file) => {
    setIsUploading(true);
    setUploadProgress(0);
    setTrimmedVideoUrl(null);

    const videoUrl = URL.createObjectURL(file);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          const tempVideo = document.createElement('video');
          tempVideo.src = videoUrl;
          tempVideo.onloadedmetadata = () => {
            setVideoDuration(tempVideo.duration);
            setEndTime(tempVideo.duration);
          };
          
          setUploadedVideo({
            url: videoUrl,
            name: file.name,
            size: file.size,
            type: file.type,
            file: file
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Trim video function
  const trimVideo = () => {
    if (!uploadedVideo || !uploadedVideo.file) {
      setError("No video loaded to trim");
      return;
    }

    if (startTime >= endTime) {
      setError("Start time must be less than end time");
      return;
    }

    if (startTime < 0 || endTime > videoDuration) {
      setError(`Time range must be between 0 and ${videoDuration.toFixed(1)} seconds`);
      return;
    }

    setIsTrimming(true);
    setError("");

    const video = uploadedVideo.url;
    const trimmedUrl = `${video}#t=${startTime},${endTime}`;
    
    setTimeout(() => {
      setTrimmedVideoUrl(trimmedUrl);
      setIsTrimming(false);
    }, 1000);
  };

  const resetTrim = () => {
    setStartTime(0);
    setEndTime(videoDuration);
    setTrimmedVideoUrl(null);
  };

  // Apply filter effects
  const applyFilter = (filter) => {
    setSelectedFilter(filter);
    switch(filter) {
      case "vintage":
        setBrightness(105);
        setContrast(110);
        setSaturation(80);
        break;
      case "bw":
        setSaturation(0);
        break;
      case "warm":
        setBrightness(110);
        setContrast(105);
        setSaturation(110);
        break;
      case "cool":
        setBrightness(95);
        setContrast(100);
        setSaturation(120);
        break;
      default:
        setBrightness(100);
        setContrast(100);
        setSaturation(100);
        setBlur(0);
    }
  };

  // Add text to video
  const addTextToVideo = () => {
    if (textOverlay.trim()) {
      setShowText(true);
    }
  };

  const removeText = () => {
    setShowText(false);
    setTextOverlay("");
  };

  // Export video
  const exportVideo = () => {
    if (!currentVideoUrl) {
      setError("No video to export");
      return;
    }
    
    // Create download link
    const link = document.createElement('a');
    link.href = currentVideoUrl;
    link.download = `lee-studio-${Date.now()}.mp4`;
    link.click();
    
    setError("");
    alert("✅ Video exported successfully!");
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  const removeVideo = () => {
    if (uploadedVideo?.url) {
      URL.revokeObjectURL(uploadedVideo.url);
    }
    if (trimmedVideoUrl) {
      URL.revokeObjectURL(trimmedVideoUrl);
    }
    setUploadedVideo(null);
    setTrimmedVideoUrl(null);
    setUploadProgress(0);
    setStartTime(0);
    setEndTime(0);
    setVideoDuration(0);
    setShowText(false);
    setTextOverlay("");
    setSelectedFilter("none");
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setBlur(0);
  };

  const currentVideoUrl = trimmedVideoUrl || uploadedVideo?.url;

  // Video style with effects
  const videoStyle = {
    filter: `
      brightness(${brightness}%) 
      contrast(${contrast}%) 
      saturate(${saturation}%) 
      blur(${blur}px)
    `
  };

  return (
    <div className="editor-container">
      
      {/* Header - Updated to Lee Studio */}
      <div className="editor-header">
        <h1>🎬 Lee Studio Editor</h1>
        <p>Upload, Cut & Edit your videos like a pro</p>
      </div>

      {/* Main Editor Area */}
      <div className="editor-main">
        
        {/* LEFT PANEL - Timeline & Upload */}
        <div className="timeline-panel">
          <div className="panel-header">
            <span>📊 Timeline</span>
            <button onClick={triggerUpload}>+ Upload Video</button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/webm,video/quicktime,video/x-msvideo"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />

          {isUploading && (
            <div className="upload-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${uploadProgress}%` }} />
              </div>
              <span>{Math.round(uploadProgress)}% Uploading...</span>
            </div>
          )}

          {error && <div className="error-msg">{error}</div>}

          {uploadedVideo && (
            <>
              <div className="timeline-track">
                <div className="track-label">Video Track</div>
                <div className="track-clips">
                  <div className="clip uploaded">
                    <span>🎬</span>
                    {uploadedVideo.name.length > 30 ? uploadedVideo.name.substring(0, 30) + "..." : uploadedVideo.name}
                    <button className="remove-clip" onClick={removeVideo}>✕</button>
                  </div>
                </div>
              </div>
              
              <div className="timeline-track">
                <div className="track-label">⏱️ Trim Range</div>
                <div className="trim-range">
                  <span>{formatTime(startTime)}</span>
                  <div className="trim-slider-container">
                    <input
                      type="range"
                      min="0"
                      max={videoDuration}
                      step="0.1"
                      value={startTime}
                      onChange={(e) => setStartTime(parseFloat(e.target.value))}
                      className="trim-slider start-slider"
                    />
                    <input
                      type="range"
                      min="0"
                      max={videoDuration}
                      step="0.1"
                      value={endTime}
                      onChange={(e) => setEndTime(parseFloat(e.target.value))}
                      className="trim-slider end-slider"
                    />
                  </div>
                  <span>{formatTime(endTime)}</span>
                </div>
                <div className="duration-info">
                  Duration: {formatTime(videoDuration)} | Selected: {formatTime(endTime - startTime)}
                </div>
              </div>
            </>
          )}

          <div className="timeline-track">
            <div className="track-label">Audio Track</div>
            <div className="track-clips">
              <div className="clip audio">🎵 Add Audio (Coming Soon)</div>
            </div>
          </div>
          
          <div className="timeline-ruler">
            <span>00:00</span>
            <span>00:05</span>
            <span>00:10</span>
            <span>00:15</span>
            <span>00:20</span>
          </div>
        </div>

        {/* CENTER - Video Preview */}
        <div className="preview-panel">
          <div className="preview-screen">
            {currentVideoUrl ? (
              <div className="video-wrapper">
                <video 
                  ref={videoRef}
                  controls 
                  src={currentVideoUrl}
                  className="preview-video"
                  style={videoStyle}
                  onLoadedMetadata={(e) => {
                    if (!videoDuration && e.target.duration) {
                      setVideoDuration(e.target.duration);
                      setEndTime(e.target.duration);
                    }
                  }}
                />
                {showText && textOverlay && (
                  <div 
                    className="video-text-overlay"
                    style={{
                      color: textColor,
                      fontSize: `${textSize}px`,
                      position: 'absolute',
                      bottom: '20%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      padding: '10px 20px',
                      borderRadius: '10px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {textOverlay}
                  </div>
                )}
              </div>
            ) : (
              <div className="preview-placeholder">
                <span>🎬</span>
                <p>No video loaded</p>
                <button onClick={triggerUpload} className="upload-btn-small">Upload Video</button>
              </div>
            )}
          </div>
          
          {/* Playback Controls */}
          <div className="playback-controls">
            <button onClick={() => { if (videoRef.current) videoRef.current.currentTime = 0; }}>⏮️</button>
            <button onClick={() => videoRef.current?.play()}>▶️</button>
            <button onClick={() => videoRef.current?.pause()}>⏸️</button>
            <button onClick={() => { if (videoRef.current) videoRef.current.currentTime = videoDuration; }}>⏭️</button>
            <span>{formatTime(videoRef.current?.currentTime || 0)} / {formatTime(videoDuration)}</span>
          </div>
        </div>

        {/* RIGHT PANEL - Tools */}
        <div className="tools-panel">
          <div className="tools-tabs">
            <button className={activeTab === "edit" ? "active" : ""} onClick={() => setActiveTab("edit")}>✂️ Cut</button>
            <button className={activeTab === "effects" ? "active" : ""} onClick={() => setActiveTab("effects")}>✨ Effects</button>
            <button className={activeTab === "text" ? "active" : ""} onClick={() => setActiveTab("text")}>📝 Text</button>
            <button className={activeTab === "export" ? "active" : ""} onClick={() => setActiveTab("export")}>💾 Export</button>
          </div>

          {/* Cut Tools */}
          {activeTab === "edit" && uploadedVideo && (
            <div className="tools-content">
              <div className="tool-group">
                <h4>✂️ Trim Video</h4>
                <div className="time-inputs">
                  <div className="time-input">
                    <label>Start Time</label>
                    <input type="number" step="0.1" value={startTime} onChange={(e) => setStartTime(parseFloat(e.target.value))} />
                    <span>seconds</span>
                  </div>
                  <div className="time-input">
                    <label>End Time</label>
                    <input type="number" step="0.1" value={endTime} onChange={(e) => setEndTime(parseFloat(e.target.value))} />
                    <span>seconds</span>
                  </div>
                </div>
                <div className="trim-buttons">
                  <button onClick={trimVideo} disabled={isTrimming} className="trim-btn">{isTrimming ? "⏳ Trimming..." : "✂️ Apply Cut"}</button>
                  <button onClick={resetTrim} className="reset-btn">↺ Reset</button>
                </div>
                {trimmedVideoUrl && <div className="trim-success">✅ Video cut applied!</div>}
              </div>
              <div className="tool-group">
                <h4>📹 Quick Actions</h4>
                <button onClick={() => { setStartTime(0); setEndTime(Math.min(10, videoDuration)); }}>Trim First 10s</button>
                <button onClick={() => { setStartTime(Math.max(0, videoDuration - 10)); setEndTime(videoDuration); }}>Trim Last 10s</button>
              </div>
            </div>
          )}

          {/* Effects Tools - Working Attributes */}
          {activeTab === "effects" && uploadedVideo && (
            <div className="tools-content">
              <div className="tool-group">
                <h4>🎨 Filters</h4>
                <div className="effects-grid">
                  <div className={`effect-card ${selectedFilter === "none" ? "active" : ""}`} onClick={() => applyFilter("none")}>✨ Normal</div>
                  <div className={`effect-card ${selectedFilter === "vintage" ? "active" : ""}`} onClick={() => applyFilter("vintage")}>🎨 Vintage</div>
                  <div className={`effect-card ${selectedFilter === "bw" ? "active" : ""}`} onClick={() => applyFilter("bw")}>⚫ B&W</div>
                  <div className={`effect-card ${selectedFilter === "warm" ? "active" : ""}`} onClick={() => applyFilter("warm")}>🔥 Warm</div>
                  <div className={`effect-card ${selectedFilter === "cool" ? "active" : ""}`} onClick={() => applyFilter("cool")}>❄️ Cool</div>
                </div>
              </div>
              <div className="tool-group">
                <h4>🎚️ Adjustments</h4>
                <label>Brightness: {brightness}%</label>
                <input type="range" min="0" max="200" value={brightness} onChange={(e) => setBrightness(parseInt(e.target.value))} />
                <label>Contrast: {contrast}%</label>
                <input type="range" min="0" max="200" value={contrast} onChange={(e) => setContrast(parseInt(e.target.value))} />
                <label>Saturation: {saturation}%</label>
                <input type="range" min="0" max="200" value={saturation} onChange={(e) => setSaturation(parseInt(e.target.value))} />
              </div>
            </div>
          )}

          {/* Text Tools - Working Attributes */}
          {activeTab === "text" && uploadedVideo && (
            <div className="tools-content">
              <div className="tool-group">
                <h4>📝 Add Text Overlay</h4>
                <input type="text" placeholder="Type your text here..." value={textOverlay} onChange={(e) => setTextOverlay(e.target.value)} />
                <label>Text Color</label>
                <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
                <label>Font Size: {textSize}px</label>
                <input type="range" min="16" max="72" value={textSize} onChange={(e) => setTextSize(parseInt(e.target.value))} />
                <button onClick={addTextToVideo}>+ Add to Video</button>
                {showText && <button onClick={removeText} className="remove-text-btn">✕ Remove Text</button>}
              </div>
            </div>
          )}

          {activeTab === "edit" && !uploadedVideo && (
            <div className="tools-content"><p className="no-video-msg">📁 Upload a video to start editing</p></div>
          )}

          {activeTab === "effects" && !uploadedVideo && (
            <div className="tools-content"><p className="no-video-msg">📁 Upload a video to apply effects</p></div>
          )}

          {activeTab === "text" && !uploadedVideo && (
            <div className="tools-content"><p className="no-video-msg">📁 Upload a video to add text</p></div>
          )}

          {/* Export Tools */}
          {activeTab === "export" && uploadedVideo && (
            <div className="tools-content">
              <div className="tool-group">
                <h4>💾 Export Video</h4>
                <select defaultValue="1080p"><option>1080p (HD)</option><option>720p (SD)</option></select>
                <select defaultValue="MP4"><option>MP4</option><option>WebM</option></select>
                <button className="export-btn" onClick={exportVideo}>Export Video</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="editor-footer">
        <span>✅ Ready</span>
        <span>{uploadedVideo ? `📹 ${uploadedVideo.name}` : "No video loaded"}</span>
        {trimmedVideoUrl && <span>✂️ Trimmed</span>}
        {selectedFilter !== "none" && <span>🎨 {selectedFilter}</span>}
        {showText && <span>📝 Text added</span>}
      </div>
    </div>
  );
};

export default VideoEditor;