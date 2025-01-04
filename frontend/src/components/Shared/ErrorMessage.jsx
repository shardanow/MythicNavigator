import React from "react";

const ErrorMessage = ({ error }) => (
  <p className="error">{error?.message || "An error occurred"}</p>
);

export default ErrorMessage;