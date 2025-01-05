import React, { useEffect, useRef, useState } from "react";
import "./SoundPlayer.css"; // Add a CSS file for styling

// Helper function to extract YouTube video ID
const extractVideoId = (url) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|embed\/|v\/))([^?&"'>]+)/);
  return match ? match[1] : null;
};

const EnvironmentSoundPlayer = ({ url, play }) => {
  const playerRef = useRef(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [volume, setVolume] = useState(40); // Default volume is 40%
  const [isVisible, setIsVisible] = useState(false); // State to control visibility

  useEffect(() => {
    // Load YouTube IFrame API script
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Initialize player once API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("youtube-player", {
        height: "315",
        width: "560",
        playerVars: {
          autoplay: 0, // Autoplay will be handled manually
          loop: 1,
          playlist: "",
        },
        events: {
          onReady: () => setPlayerReady(true),
        },
      });
    };
  }, []);

  useEffect(() => {
    if (playerReady && play === "play" && playerRef.current) {
      const videoId = extractVideoId(url);
      if (videoId) {
        playerRef.current.loadVideoById({
          videoId,
          startSeconds: 0,
        });
        playerRef.current.setVolume(volume); // Set initial volume
      } else {
        console.warn("Invalid or missing video URL:", url);
      }
    }
  }, [play, url, playerReady]);

  useEffect(() => {
    if (playerReady && playerRef.current) {
      playerRef.current.setVolume(volume);
    }
  }, [volume, playerReady]);

  const handleVolumeChange = (event) => {
    const newVolume = parseInt(event.target.value, 10);
    setVolume(newVolume);
  };

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <>
      <button className="sound-toggle-button" onClick={toggleVisibility}>
        {isVisible ? "🔊" : "🔊"}
      </button>
      <div className={`player-container ${isVisible ? "visible" : "hidden"}`}>
        <div id="youtube-player"></div>
        <div className="volume-control">
          <label>
            Volume:
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
            />
            {volume}%
          </label>
        </div>
      </div>
    </>
  );
};

export default EnvironmentSoundPlayer;
