import React from "react";

const Header = ({ inputData, setInputData, onInit }) => {
  return (
    <div className="header">
      <textarea
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Enter the custom prompt here..."
      />
      <button onClick={onInit}>Init</button>
    </div>
  );
};

export default Header;
