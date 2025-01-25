import React, { useEffect, useState } from "react";
import TextToAudio from "../TextToAudio/TextToAudio";
import "./Story.css";

const parseMarkup = (text) => {
  const patterns = [
    { regex: /\*\*(.+?)\*\*/g, element: (match, p1, index) => <strong className="text-part" key={index}>{p1}</strong> }, // Bold
    { regex: /\*(.+?)\*/g, element: (match, p1, index) => <em className="text-part" key={index}>{p1}</em> }, // Italic
    // Add more patterns here if needed, e.g., links, strikethrough
  ];

  let parts = [text]; // Start with the full text as a single part

  patterns.forEach(({ regex, element }) => {
    const newParts = [];
    parts.forEach((part, i) => {
      if (typeof part === "string") {
        let lastIndex = 0;
        part.replace(regex, (match, p1, offset) => {
          // Push plain text before the match
          if (offset > lastIndex) {
            newParts.push(part.slice(lastIndex, offset));
          }
          // Push the styled element
          newParts.push(element(match, p1, `${i}-${offset}`));
          lastIndex = offset + match.length;
        });
        // Add remaining plain text after the last match
        if (lastIndex < part.length) {
          newParts.push(part.slice(lastIndex));
        }
      } else {
        // If the part is already an element, keep it
        newParts.push(part);
      }
    });
    parts = newParts;
  });

  return parts;
};

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

  // Extract the first alphabetic letter and adjust the remaining text
  const matchLetters = revealedText.match(/[a-zA-Z]/); // Find the first alphabetic letter
  const firstLetter = matchLetters?.[0] || ""; // Get the first letter or an empty string
  const remainingText = matchLetters
    ? revealedText.slice(0, revealedText.indexOf(matchLetters[0])) + revealedText.slice(revealedText.indexOf(matchLetters[0]) + 1)
    : revealedText; // Combine the parts around the first letter

  return (
    <div className="story-container">
      <h2 className="story-title">📜 Story</h2>
      <p className={`story-text ${isAnimating ? "fade-in" : ""}`}>
        {firstLetter && <span className="drop-cap">{firstLetter}</span>}
        {parseMarkup(remainingText)}
      </p>

      <TextToAudio text={prompt} />
    </div>
  );
};

export default Story;