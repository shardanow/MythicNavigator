import React from "react";
import "./Loader.css";

const Loader = ({ message = "Loading..." }) => (
    <div className="loader-container">
        <span className="loader-message">{message}</span>
    </div>
);

export default Loader;