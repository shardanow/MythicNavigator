import React, { useEffect, useState } from "react";
import "./Story.css";

const Story = ({ prompt }) => {
  const [revealedText, setRevealedText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!prompt) return;

    let index = 0;
    setRevealedText(""); // Reset the revealed text on new data
    setIsAnimating(true); // Start the fade-in animation

    const interval = setInterval(() => {
      setRevealedText((prev) => prompt.slice(0, index));
      index += 1;
      if (index > prompt.length) {
        clearInterval(interval);
        setTimeout(() => setIsAnimating(false), 500); // Disable animation after text reveal
      }
    }, 20); // Reveal one character every 20ms

    return () => clearInterval(interval);
  }, [prompt]);

  if (!prompt) return null;

  return (
    <div className="story-container">
      <h2 className="story-title">📖 Story</h2>
      <p className={`story-text ${isAnimating ? "fade-in" : ""}`}>
        {revealedText}
      </p>
    </div>
  );
};

export default Story;
