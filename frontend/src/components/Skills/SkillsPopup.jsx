import React from "react";
import "./SkillsPopup.css";

const Skills = ({ skills, owner }) => {
  if (!skills || skills.length === 0) 
    return (
      <div className="skills-container">
      <h4 className="skills-title">🎯 {owner} Skills</h4>
      <div className="skills-list">
        <div className="skill-card">
          <p className="no-skills">No skills available.</p>
        </div>
      </div>
    </div>
  )


  return (
    <div className="skills-container">
      <h4 className="skills-title">🎯 {owner} Skills</h4>
      <div className="skills-list">
        {skills.map((skill) => (
          <div key={skill.id} className="skill-card">
            <div className="skill-header">
              <h5 className="skill-name">{skill.emoji} {skill.name}</h5>
              {skill.is_attack === "true" && <span className="skill-type attack">⚔️ {skill.type}</span>}
              {skill.is_attack === "false" && <span className="skill-type support">✨ {skill.type}</span>}
            </div>
            <p className="skill-description">{skill.description}</p>
            <div className="skill-costs">
              <span>Costs:</span>
              <p>❤️ Health: {skill.skill_health_cost}</p>
              <p>🔵 Mana: {skill.skill_mana_cost}</p>
              <p>⚡ Stamina: {skill.skill_stamina_cost}</p>
            </div>
            <div className="skill-progress">
              <span>Success chance: {skill.success_chance}%</span>
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
                      <strong>{effect.name}:</strong> {effect.emoji} {effect.description}
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
