import React, { useState } from 'react';
import LevelSelection from './components/LevelSelection';
import Cards from './components/Cards';

function MemoryApp() {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  return (
    <div className="App1">
      <h1>Memory Game</h1>
      {!selectedLevel ? (
        <LevelSelection onSelect={handleLevelSelect} />
      ) : (
        <Cards level={selectedLevel} />
      )}
    </div>
  );
}

export default MemoryApp;
