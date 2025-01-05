import React, { useState } from "react";
import "./World.css";

const World = ({ worldStatus, worldHistory, worldChooses }) => {
    const [isCollapsed, setIsCollapsed] = useState(true); // Collapsible state

    if (!worldStatus || !worldHistory?.length || !worldChooses?.length) return null;

    console.log(worldChooses);
    console.log(worldHistory);


    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`world-container ${isCollapsed ? "collapsed" : ""}`}>
            {/* Toggle Button */}
            <div className="world-header" onClick={toggleCollapse}>
                <h2 className="world-title">🌍 World Overview</h2>
                <button className="toggle-button">
                    {isCollapsed ? "▶" : "▼"} {/* Toggle arrow */}
                </button>
            </div>

    {/* Collapsible Content */}
    {!isCollapsed && (
         <div className="world-content">
            <div className="world-status">
                <h3>🌟 World Status</h3>
                <p>📅 <strong>Date:</strong> {worldStatus.game_date}</p>
                <p>🗺️ <strong>Grounds:</strong> {worldStatus.grounds.name} - {worldStatus.grounds.description}</p>
                <p>📍 <strong>Location:</strong> {worldStatus.location.name} - {worldStatus.location.description}</p>
                <p>⛅ <strong>Weather:</strong> {worldStatus.weather?.name} - {worldStatus.weather?.description}</p>
                <p>🌡️ <strong>Temp Range:</strong> {worldStatus.weather?.min_temperature}°C - {worldStatus.weather?.max_temperature}°C</p>
            </div>

            <div className="world-current-event">
                <h3>🎯 Current Event</h3>
                <p>⚡ <strong>Event:</strong> {worldStatus.event?.name} - {worldStatus.event?.description}</p>
                <p>🙋 <strong>Initiator:</strong> {worldStatus.event?.quest_giver.name}</p>
                <p>📅 <strong>Started At:</strong> {worldStatus.event?.started_at}</p>
                <p>📊 <strong>Progress:</strong>
                    <progress value={worldStatus.event?.completion_percentage} max="100"></progress>
                    {worldStatus.event?.completion_percentage}%
                </p>
                <p>🎯 <strong>Target Amount:</strong> {worldStatus.event?.target_amount}</p>
                <p>📥 <strong>Current Amount:</strong> {worldStatus.event?.current_amount}</p>
            </div>

            <div className="world-history">
                <h3>📖 World History</h3>
                <ul>
                    {worldHistory.map((history) => (
                        <li key={history.id}>
                            <span className="entry-icon">📜</span>
                            <p>{history.description}</p>
                            <span className="date">{history.added_at}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="world-chooses">
                <h3>🪶 Previous Choices</h3>
                <ul>
                    {worldChooses.map((choose) => (
                        <li key={choose.id}>
                            <span className="entry-icon">🔖</span>
                            <p>{choose.description}</p>
                            <span className="date">{choose.added_at}</span>
                        </li>
                    ))}
                </ul>
            </div>

            </div>

)}
        </div>
    );
};

export default World;
