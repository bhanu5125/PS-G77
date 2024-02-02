import React from 'react';
import './GameOver.css';

function GameOver({ moves }) {
  return (
    <div className="game-over-container">
      <h2>Game Over!</h2>
      <p>Total Moves: {moves}</p>
    </div>
  );
}


// function calculateFinalScore(moves) {

// }

export default GameOver;
