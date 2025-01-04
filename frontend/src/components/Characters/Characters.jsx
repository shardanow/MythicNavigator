import React, { useState } from "react";
import "./Characters.css";
import SkillsPopup from "../Skills/SkillsPopup";
import InventoryPopup from "../Inventory/InventoryPopup";

const Characters = ({ characters }) => {
  const [activeModal, setActiveModal] = useState(null);

  const handleOpenModal = (charId, type) => {
    setActiveModal({ charId, type });
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  if (!characters || Object.keys(characters).length === 0) return null;

  return (
    <div className="characters-container">
      <h2 className="characters-title">🛡️ Characters</h2>
      <div className="character-cards">
        {Object.values(characters).map((char) => (
          <div key={char.id} className="character-card">
            <div className="character-header">
              <div className="character-avatar">{char.name.charAt(0)}</div>
              <div className="character-name">
                <h3>{char.name}</h3>
                <p className="character-description">{char.description}</p>
              </div>
            </div>
            <div className="character-info">
              <div className="basic-info">
                <p><strong>Class:</strong> {char.class}</p>
                <p><strong>Race:</strong> {char.race}</p>
                <p><strong>Gender:</strong> {char.gender}</p>
                <p><strong>Age:</strong> {char.age}</p>
                <p><strong>Language:</strong> {char.language}</p>
              </div>
              <div className="additional-info">
                <p><strong>Status:</strong> {char.status}</p>
                <p><strong>Reason:</strong> {char.status_reason}</p>
              </div>
            </div>
            <div className="character-stats">
              <p><strong>Level:</strong> {char.level}</p>
              {[
                { label: "❤️ Health", value: char.current_health, max: char.max_health, className: "health-bar" },
                { label: "🔵 Mana", value: char.current_mana, max: char.max_mana, className: "mana-bar" },
                { label: "⚡ Stamina", value: char.current_stamina, max: char.max_stamina, className: "stamina-bar" },
                { label: "⭐ XP", value: char.current_experience, max: char.next_level_experience, className: "xp-bar" },
              ].map((stat, index) => (
                <div key={index} className="stat-row">
                  <span>{stat.label}:</span>
                  <div className="progress-bar">
                    <div
                      className={`progress-bar-fill ${stat.className} ${
                        stat.value / stat.max < 0.2 && stat.label === "❤️ Health" ? "progress-bar-critical" : ""
                      }`}
                      style={{ width: `${(stat.value / stat.max) * 100}%` }}
                    ></div>
                  </div>
                  <span className="stat-value">{stat.value}/{stat.max}</span>
                </div>
              ))}
            </div>
            <div className="character-actions">
              <button
                className="action-button"
                onClick={() => handleOpenModal(char.id, "skills")}
              >
                🎯 View Skills
              </button>
              <button
                className="action-button"
                onClick={() => handleOpenModal(char.id, "inventory")}
              >
                👜 View Inventory
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Skills */}
      {activeModal?.type === "skills" && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={handleCloseModal}>
              ✖
            </button>
            <SkillsPopup
              skills={
                Object.values(characters).find((char) => char.id === activeModal.charId)
                  ?.skills || []
              }
              owner={Object.values(characters).find((char) => char.id === activeModal.charId).name}
            />
          </div>
        </div>
      )}

      {/* Modal for Inventory */}
      {activeModal?.type === "inventory" && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={handleCloseModal}>
              ✖
            </button>
            <InventoryPopup
              inventory={
                Object.values(characters).find((char) => char.id === activeModal.charId)
                  ?.inventory || []
              }
              owner={Object.values(characters).find((char) => char.id === activeModal.charId).name}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Characters;
