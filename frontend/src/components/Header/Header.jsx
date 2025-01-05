import React from "react";
import "./Header.css";

const Header = ({ inputData, setInputData, onInit }) => {
  return (
    <div className="header">
      <textarea
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Enter the custom prompt here..."
      />
      <button className="init-game-button" onClick={onInit}>Init</button>
    </div>
  );
};

export default Header;
