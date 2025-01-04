import React from "react";
import "./Skills.css";

const Skills = ({ skills }) => {
  if (!skills || skills.length === 0) return <p className="no-skills">No skills available.</p>;

  return (
    <div className="skills-container">
      <h4 className="skills-title">🎯 Skills</h4>
      <div className="skills-list">
        {skills.map((skill) => (
          <div key={skill.id} className="skill-card">
            <div className="skill-header">
              <h5 className="skill-name">{skill.name}</h5>
              {skill.is_attack === "true" && <span className="skill-type attack">⚔️ Attack</span>}
              {skill.is_attack === "false" && <span className="skill-type support">✨ Support</span>}
            </div>
            <p className="skill-description">{skill.description}</p>
            <div className="skill-costs">
              <p>❤️ Health: {skill.skill_health_cost}</p>
              <p>🔵 Mana: {skill.skill_mana_cost}</p>
              <p>⚡ Stamina: {skill.skill_stamina_cost}</p>
            </div>
            <div className="skill-progress">
              <span>Success: {skill.success_chance}%</span>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill success-bar"
                  style={{ width: `${skill.success_chance}%` }}
                ></div>
              </div>
            </div>
            {/* Effects Section */}
            {skill.effects && skill.effects.length > 0 && (
              <div className="skill-effects">
                <h6 className="effects-title">Effects:</h6>
                <ul className="effects-list">
                  {skill.effects.map((effect) => (
                    <li key={effect.id} className="effect-item">
                      <strong>{effect.name}:</strong> {effect.description}
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

export default Skills;
