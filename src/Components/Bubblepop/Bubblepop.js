// BubblePopGame.js

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './BubblePopGame.css';

const GameResult = ({ score }) => (
  <div className="game-result">
    <h2>Game Over!</h2>
    <p>Final Score: {score}</p>
  </div>
);

const BubblePopGame = () => {
  const [score, setScore] = useState(0);
  const [bubbles, setBubbles] = useState([]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  const generateBubble = useCallback(() => {
    if (!gameOver) {
      const newBubble = {
        id: Date.now(),
        left: Math.random() * window.innerWidth - 1, // Adjust the size as needed
        top: window.innerHeight , // Adjust the size as needed
      };

      setBubbles((prevBubbles) => [...prevBubbles, newBubble]);
    }
  }, [gameOver]);

  useEffect(() => {
    const bubbleTimer = setInterval(() => generateBubble(), 1000);
    return () => {
      clearInterval(bubbleTimer);
    };
  }, [generateBubble]);

  useEffect(() => {
    if (!gameOver) {
      const gameTimer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(gameTimer);
            setGameOver(true);
          }
          return prevTime - 1;
        });
      }, 1000);

      // Cleanup function
      return () => {
        clearInterval(gameTimer);
      };
    }
  }, [gameOver]);

  const popBubble = (id) => {
    if (!gameOver) {
      setBubbles((prevBubbles) => prevBubbles.filter((bubble) => bubble.id !== id));
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleGameOver = useCallback(async (score) => {
    setGameOver(true);
    try {
      const scr = await axios.post('http://localhost:5000/api/activity', {
        email: localStorage.getItem('email'),
        gameType: "Attention",
        score: score,
      });
      console.log(scr);
    } catch (error) {
      console.error('Error submitting:', error);
    }
  }, []);

  useEffect(() => {
    if (gameOver) {
      handleGameOver(score);
    }
  }, [gameOver, score, handleGameOver]);

  return (
    <div className="game-container">
      <div className="bubble-pop-game">
        {gameOver ? (
          <GameResult score={score} timeLeft={timeLeft} />
        ) : (
        <div>
          <div className="time-left">Time Left: {timeLeft}s</div>
          <div className="score">Score: {score}</div>
        </div>
        )}
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="bubble"
            style={{ left: bubble.left, top: bubble.top }}
            onClick={() => popBubble(bubble.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default BubblePopGame;
