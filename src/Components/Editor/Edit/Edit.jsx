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
  
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  // Handle video file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid video file (MP4, WebM, MOV, AVI)');
      return;
    }

    // Validate file size (max 500MB)
    const maxSize = 500 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size must be less than 500MB');
      return;
    }

    setError("");
    uploadVideo(file);
  };

  // Simulate upload with progress
  const uploadVideo = (file) => {
    setIsUploading(true);
    setUploadProgress(0);
    setTrimmedVideoUrl(null); // Clear previous trimmed video

    // Create local URL for preview
    const videoUrl = URL.createObjectURL(file);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Get video duration after upload
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

  // Cut/Trim video function
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

    // Use FFmpeg-like approach with video element
    // For demo, we'll create a new video URL with time range
    // In production, you'd want to use a proper library like @ffmpeg/ffmpeg
    
    const video = uploadedVideo.url;
    const trimmedUrl = `${video}#t=${startTime},${endTime}`;
    
    setTimeout(() => {
      setTrimmedVideoUrl(trimmedUrl);
      setIsTrimming(false);
    }, 1000);
  };

  // Reset trim
  const resetTrim = () => {
    setStartTime(0);
    setEndTime(videoDuration);
    setTrimmedVideoUrl(null);
  };

  // Format time display (seconds to MM:SS)
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Trigger file input
  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  // Remove uploaded video
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
  };

  // Get the current video to display (trimmed or original)
  const currentVideoUrl = trimmedVideoUrl || uploadedVideo?.url;

  return (
    <div className="editor-container">
      
      {/* Header */}
      <div className="editor-header">
        <h1>🎬 Li Studio Editor</h1>
        <p>Upload & Cut your videos like a pro</p>
      </div>

      {/* Main Editor Area */}
      <div className="editor-main">
        
        {/* LEFT PANEL - Timeline & Upload */}
        <div className="timeline-panel">
          <div className="panel-header">
            <span>📊 Timeline</span>
            <button onClick={triggerUpload}>+ Upload Video</button>
          </div>
          
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/webm,video/quicktime,video/x-msvideo"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />

          {/* Upload Progress */}
          {isUploading && (
            <div className="upload-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <span>{Math.round(uploadProgress)}% Uploading...</span>
            </div>
          )}

          {/* Error Message */}
          {error && <div className="error-msg">{error}</div>}

          {/* Uploaded Video in Timeline */}
          {uploadedVideo && (
            <>
              <div className="timeline-track">
                <div className="track-label">Video Track</div>
                <div className="track-clips">
                  <div className="clip uploaded">
                    <span>🎬</span>
                    {uploadedVideo.name.length > 30 
                      ? uploadedVideo.name.substring(0, 30) + "..." 
                      : uploadedVideo.name}
                    <button className="remove-clip" onClick={removeVideo}>✕</button>
                  </div>
                </div>
              </div>
              
              {/* Trim Range Display */}
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
                  Duration: {formatTime(videoDuration)} | 
                  Selected: {formatTime(endTime - startTime)}
                </div>
              </div>
            </>
          )}

          <div className="timeline-track">
            <div className="track-label">Audio Track</div>
            <div className="track-clips">
              <div className="clip audio">🎵 Add Audio</div>
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
              <video 
                ref={videoRef}
                controls 
                src={currentVideoUrl}
                className="preview-video"
                onLoadedMetadata={(e) => {
                  if (!videoDuration && e.target.duration) {
                    setVideoDuration(e.target.duration);
                    setEndTime(e.target.duration);
                  }
                }}
              />
            ) : (
              <div className="preview-placeholder">
                <span>🎬</span>
                <p>No video loaded</p>
                <button onClick={triggerUpload} className="upload-btn-small">
                  Upload Video
                </button>
              </div>
            )}
          </div>
          
          {/* Playback Controls */}
          <div className="playback-controls">
            <button onClick={() => {
              if (videoRef.current) videoRef.current.currentTime = 0;
            }}>⏮️</button>
            <button onClick={() => videoRef.current?.play()}>▶️</button>
            <button onClick={() => videoRef.current?.pause()}>⏸️</button>
            <button onClick={() => {
              if (videoRef.current) videoRef.current.currentTime = videoDuration;
            }}>⏭️</button>
            <span>{formatTime(videoRef.current?.currentTime || 0)} / {formatTime(videoDuration)}</span>
          </div>
        </div>

        {/* RIGHT PANEL - Tools */}
        <div className="tools-panel">
          <div className="tools-tabs">
            <button className={activeTab === "edit" ? "active" : ""} onClick={() => setActiveTab("edit")}>
              ✂️ Cut
            </button>
            <button className={activeTab === "effects" ? "active" : ""} onClick={() => setActiveTab("effects")}>
              ✨ Effects
            </button>
            <button className={activeTab === "text" ? "active" : ""} onClick={() => setActiveTab("text")}>
              📝 Text
            </button>
            <button className={activeTab === "export" ? "active" : ""} onClick={() => setActiveTab("export")}>
              💾 Export
            </button>
          </div>

          {/* Cut Tools */}
          {activeTab === "edit" && uploadedVideo && (
            <div className="tools-content">
              <div className="tool-group">
                <h4>✂️ Trim Video</h4>
                <div className="time-inputs">
                  <div className="time-input">
                    <label>Start Time</label>
                    <input
                      type="number"
                      step="0.1"
                      value={startTime}
                      onChange={(e) => setStartTime(parseFloat(e.target.value))}
                    />
                    <span>seconds</span>
                  </div>
                  <div className="time-input">
                    <label>End Time</label>
                    <input
                      type="number"
                      step="0.1"
                      value={endTime}
                      onChange={(e) => setEndTime(parseFloat(e.target.value))}
                    />
                    <span>seconds</span>
                  </div>
                </div>
                
                <div className="trim-buttons">
                  <button onClick={trimVideo} disabled={isTrimming} className="trim-btn">
                    {isTrimming ? "⏳ Trimming..." : "✂️ Apply Cut"}
                  </button>
                  <button onClick={resetTrim} className="reset-btn">
                    ↺ Reset
                  </button>
                </div>
                
                {trimmedVideoUrl && (
                  <div className="trim-success">
                    ✅ Video cut applied! Preview shows trimmed version.
                  </div>
                )}
              </div>
              
              <div className="tool-group">
                <h4>📹 Quick Actions</h4>
                <button onClick={() => {
                  setStartTime(0);
                  setEndTime(Math.min(10, videoDuration));
                }}>Trim First 10 Seconds</button>
                <button onClick={() => {
                  setStartTime(Math.max(0, videoDuration - 10));
                  setEndTime(videoDuration);
                }}>Trim Last 10 Seconds</button>
              </div>
            </div>
          )}

          {activeTab === "edit" && !uploadedVideo && (
            <div className="tools-content">
              <p className="no-video-msg">📁 Upload a video to start cutting</p>
            </div>
          )}

          {/* Effects Tools */}
          {activeTab === "effects" && uploadedVideo && (
            <div className="tools-content">
              <div className="effects-grid">
                <div className="effect-card">✨ Glow</div>
                <div className="effect-card">🎨 Vintage</div>
                <div className="effect-card">⚫ B&W</div>
                <div className="effect-card">🌀 Blur</div>
                <div className="effect-card">⭐ Sharpen</div>
                <div className="effect-card">🌈 Rainbow</div>
              </div>
            </div>
          )}

          {/* Text Tools */}
          {activeTab === "text" && uploadedVideo && (
            <div className="tools-content">
              <div className="tool-group">
                <h4>📝 Add Text</h4>
                <input type="text" placeholder="Type your text here..." />
                <select>
                  <option>Title Style</option>
                  <option>Subtitle</option>
                  <option>Caption</option>
                </select>
                <button>+ Add to Video</button>
              </div>
            </div>
          )}

          {/* Export Tools */}
          {activeTab === "export" && uploadedVideo && (
            <div className="tools-content">
              <div className="tool-group">
                <h4>💾 Export Video</h4>
                <select>
                  <option>1080p (HD)</option>
                  <option>720p (SD)</option>
                  <option>480p</option>
                </select>
                <select>
                  <option>MP4</option>
                  <option>WebM</option>
                </select>
                <button className="export-btn">
                  Export Video
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="editor-footer">
        <span>✅ Ready</span>
        <span>{uploadedVideo ? `📹 ${uploadedVideo.name}` : "No video loaded"}</span>
        {trimmedVideoUrl && <span>✂️ Trimmed version ready</span>}
        <span>⚡ Cut video online</span>
      </div>
    </div>
  );
};

export default VideoEditor;