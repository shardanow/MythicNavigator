import React from "react";
import "./StepButtons.css";

const StepButtons = ({ steps, onStepClick }) => {
  if (!steps?.length) return null;

  return (
    <div className="step-buttons">
      <div className="steps-header">
      <h2 className="steps-title">🗺️ Next Steps</h2>
      </div>
      <div className="steps-container">
        {steps.map((step) => (
          <button
            key={step.id}
            className={`step-button risk-${step.risk_level.toLowerCase()}`}
            onClick={() => onStepClick(step)}
          >
            <div className="step-info">
              <span className="step-description">{step.description}</span>
              <div className="step-meta">
                <span className="risk-level">Risk: {step.risk_level}</span>
                <span className="time-estimate">{step.time_estimate}</span>
              </div>
            </div>
            <div className="hover-progress"></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StepButtons;
