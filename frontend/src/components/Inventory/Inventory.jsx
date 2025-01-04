import React, { useState } from "react";
import "./Inventory.css";

const Inventory = ({ inventory }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  if (!Object.keys(inventory).length) {
    return 
  }

  return (
    <div className="inventory">
      <h2 className="inventory-title">
        <span className="inventory-icon">📦</span> Inventory
      </h2>
      <div className="title-separator"></div>
      {Object.keys(inventory).map((character) => (
        <div key={character} className="character-inventory">
          <h3 className="character-name">{character}</h3>
          <div className="inventory-grid">
            {inventory[character].map((item, index) => (
              <div
                key={index}
                className={`inventory-card rarity-${item.rarity.toLowerCase()} ${
                  item.is_equipped === "true" ? "equipped-card" : ""
                }`}
              >
                <div className="card-header">
                  {/* Item Type Emoji */}
                  <div className="item-icon" title={`Type: ${item.type}`}>
                    {getItemIcon(item.type)}
                  </div>
                  <h3 className="item-name">{item.name}</h3>
                  {/* Equipped Status */}
                  {item.is_equipped === "true" && (
                    <span className="equipped-indicator" title="Equipped">🛡️</span>
                  )}
                  <span className={`rarity-badge rarity-${item.rarity.toLowerCase()}`}>
                    {getRarityLabel(item.rarity)}
                  </span>
                </div>
                <p className="item-description">{item.description}</p>
                <div className="card-footer">
                  <span>Qty: {item.quantity || 1}</span>
                  <button
                    className="stats-button"
                    onClick={() =>
                      setExpandedItem(expandedItem === `${character}-${index}` ? null : `${character}-${index}`)
                    }
                  >
                    {expandedItem === `${character}-${index}` ? "Hide Stats" : "View Stats"}
                  </button>
                </div>
                {expandedItem === `${character}-${index}` && (
                  <div className="item-stats">
                    <ul>
                      {item.item_stats.map((stat, i) => (
                        <li key={i}>
                          <span>{stat.name}</span>
                          <span>{stat.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const getItemIcon = (type) => {
  const icons = {
    Weapon: "⚔️",
    Accessory: "💍",
    Potion: "🧪",
    Unknown: "❓",
  };
  return icons[type] || "❓";
};

const getRarityLabel = (rarity) => {
  const labels = {
    Common: "⭐ Common",
    Rare: "🌟 Rare",
    Legendary: "🔥 Legendary",
    Unknown: "❓ Unknown",
  };
  return labels[rarity] || "❓ Unknown";
};

export default Inventory;
