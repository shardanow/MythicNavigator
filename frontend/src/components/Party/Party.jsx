import React, { useState } from "react";
import "./Party.css";

const Party = ({ partyMembers }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    if (!partyMembers || Object.keys(partyMembers).length === 0) return null;

    console.log('Passed members', partyMembers);

    return (
        <div className={`party-container ${isCollapsed ? "collapsed" : ""}`}>
            <div className="party-header" onClick={toggleCollapse}>
                <h2 className="party-title">🤝 Group</h2>
                <button className="toggle-button" title="Toggle">
                    {isCollapsed ? "▶" : "▼"}
                </button>
            </div>

            {!isCollapsed && (
                <div className="party-members">
                    {Object.values(partyMembers).map((member) => (
                        <div key={member.id} className="party-member">
                            <div className="member-header">
                                <div className="member-avatar">{member.name.charAt(0)}</div>
                                <div className="member-name">
                                    <h3>{member.name}</h3>
                                    <p className="member-description">{member.description}</p>
                                </div>
                            </div>
                            <div className="member-info">
                                <div className="basic-info">
                                    <p className="join-date"><strong>Joined:</strong> {member.joined_at}</p>
                                    <p className="relationship"><strong>Relations:</strong> {member.relationships.map((relation) => (
                                        <span key={relation.id}>  <b>{relation.name}</b> {relation.emoji} for <b>{relation.target_character.name}</b> - {relation.description}</span>
                                    ))}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Party;
