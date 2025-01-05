import React from "react";
import "./Logs.css";

const Logs = ({ logs }) => {
  if (!logs?.length) return null;

  return (
    <div className="logs">
      <h2>Logs</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
};

export default Logs;
