import React from 'react';
import './LevelSelection.css'; // Import a CSS file for styling (you can create this file)

function LevelSelection({ onSelect }) {
  const handleLevelClick = (level) => {
    onSelect(level);
  };

  return (
    <div className="level-selection">
      <h2>Select Level:</h2>
      <div className="level-buttons">
        <button className="level-button" onClick={() => handleLevelClick('easy')}>Easy</button>
        <button className="level-button" onClick={() => handleLevelClick('medium')}>Medium</button>
        <button className="level-button" onClick={() => handleLevelClick('hard')}>Hard</button>
      </div>
    </div>
  );
}

export default LevelSelection;
