import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./TextToAudio.css"; // Import CSS file

const TextToAudio = ({ text }) => {
    const [audioUrl, setAudioUrl] = useState(""); // URL for the generated audio
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(""); // Error message
    const [isPlaying, setIsPlaying] = useState(false); // Playing state
    const audioRef = useRef(null); // Reference to the audio element

    // Reset state when the text changes
    useEffect(() => {
        setAudioUrl(""); // Reset the audio URL
        setIsPlaying(false); // Reset play state
        setError(""); // Clear any previous error
    }, [text]);

    // Autoplay when audio URL is set
    useEffect(() => {
        if (audioUrl && audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [audioUrl]);

    // Function to handle audio playback state
    const handleAudioEnd = () => {
        setIsPlaying(false); // Reset to play state when audio ends
    };

    // Function to send the request to the backend and generate audio
    const handleButtonClick = async () => {
        // If audio already generated, toggle play/pause
        if (audioUrl) {
            if (audioRef.current) {
                if (isPlaying) {
                    audioRef.current.pause();
                } else {
                    audioRef.current.play();
                }
                setIsPlaying(!isPlaying);
            }
            return;
        }

        // Otherwise, generate audio
        if (!text || text.trim() === "") {
            setError("Text cannot be empty");
            return;
        }

        setLoading(true);
        setError("");
        setAudioUrl("");
        setIsPlaying(false); // Reset play state

        try {
            const sanitizedText = text.replace(
                /[*]|[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}]/gu,
                ""
            );

            const response = await axios.post("http://localhost:8000/text-to-speech", { text: sanitizedText });
            const audioContent = response.data.audioContent;

            const audioBlob = new Blob(
                [Uint8Array.from(audioContent.split("").map((c) => c.charCodeAt(0)))],
                { type: "audio/mp3" }
            );
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl);
        } catch (err) {
            setError("Failed to generate audio. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="audio-generator">
            <button
                className={`action-button ${loading ? "loading" : isPlaying ? "playing" : "idle"}`}
                onClick={handleButtonClick}
                disabled={loading}
            >
                {loading ? (
                    <span className="loader"></span>
                ) : audioUrl ? (
                    isPlaying ? "⏸️" : "▶️"
                ) : (
                    "👂"
                )}
            </button>
            {error && <p className="error-message">{error}</p>}
            {audioUrl && (
                <audio
                    ref={audioRef}
                    src={audioUrl}
                    style={{ display: "none" }}
                    onEnded={handleAudioEnd} // Event listener for when audio ends
                />
            )}
        </div>
    );
};

export default TextToAudio;
