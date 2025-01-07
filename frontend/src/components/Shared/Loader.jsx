import React from "react";
import "./Loader.css";

const Loader = ({ message = "Loading the tale..." }) => (
    <div className="loader-container">
        <div className="loader-frame">
            <div className="loader-icon">
                <span className="loader-emoji">📜</span>
            </div>
            <div className="loader-title">Preparing Your Adventure</div>
            <div className="loader-message">{message}</div>
        </div>
    </div>
);

export default Loader;
