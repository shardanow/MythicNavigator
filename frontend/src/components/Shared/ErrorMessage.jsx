import React from "react";
import "./ErrorMessage.css";

const ErrorMessage = ({ error }) => (
  <p className="error-message">{error?.message || "An error occurred"}</p>
);

export default ErrorMessage;