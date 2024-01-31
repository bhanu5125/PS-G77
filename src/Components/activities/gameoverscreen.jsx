import React from 'react';

const GameOverScreen = ({ score }) => {
  return (
    <div>
      <h2>Game Over!</h2>
      <h1>{score}</h1>
    </div>
  );
};

export default GameOverScreen;