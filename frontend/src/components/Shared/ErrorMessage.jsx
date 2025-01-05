import React from "react";
import "./ErrorMessage.css";

const ErrorMessage = ({ error }) => (
  <p className="error">{error?.message || "An error occurred"}</p>
);

export default ErrorMessage;