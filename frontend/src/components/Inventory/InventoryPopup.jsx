import React, { useState } from "react";
import "./InventoryPopup.css";

const InventoryPopup = ({ inventory, owner }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  if (!inventory || inventory.length === 0) {
    return (
      <div className="inventory">
        <h3 className="inventory-title">👜 {owner} Inventory</h3>
        <div className="inventory-grid">
          <div className="inventory-card empty-card">
            <p>No items in inventory</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="inventory">
      <h3 className="inventory-title">👜 {owner} Inventory</h3>
      <div className="inventory-grid">
        {inventory.map((item, index) => (
          <div
            key={index}
            className={`inventory-card rarity-${item.rarity.toLowerCase()} ${item.is_equipped === "true" ? "equipped-card" : ""
              }`}
          >
            <div className="card-header">
              {/* Item Type Emoji */}
              <div className="item-icon" title={`Type: ${item.type}`}>
              {item.type_emoji}
              </div>
              <h4 className="item-name">{item.name}</h4>
              {/* Equipped Status */}
              {item.is_equipped === "true" && (
                <span className="equipped-indicator" title="Equipped">🛡️</span>
              )}
              <span className={`rarity-badge rarity-${item.rarity.toLowerCase()}`}>
                {item.rarity_emoji+" "+item.rarity}
              </span>
            </div>
            <p className="item-description">{item.description}</p>
            <div className="card-footer">
              <span>Qty: {item.quantity || 1}</span>
              <span>Status: {item.status}</span>
              <button
                className="stats-button"
                onClick={() =>
                  setExpandedItem(expandedItem === index ? null : index)
                }
              >
                {expandedItem === index ? "Hide Stats" : "View Stats"}
              </button>
            </div>
            {expandedItem === index && (
              <div className="item-stats">
                <ul>
                  {item.item_stats.map((stat, i) => (
                    <li key={i}>
                      <span>{stat.emoji} {stat.name}</span>
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

export default InventoryPopup;
