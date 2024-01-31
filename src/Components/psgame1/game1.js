// Install React if you haven't already: npm install -g create-react-app
// Create a new React app: npx create-react-app cognitive-games
// Replace the content of src/App.js with the following:

import React, { useState, useEffect } from 'react';
import './game1.css';

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateRandomLevels = (difficulty, count) => {
  const randomLevels = [];
  for (let i = 0; i < count; i++) {
    const num1 = generateRandomNumber(1, 20);
    const num2 = generateRandomNumber(1, 20);
    const isAddition = Math.random() < 0.5;
    const answer = isAddition ? num1 + num2 : num1 - num2;

    const question = isAddition
      ? `${num1} + ${num2}`
      : `${num1} - ${num2}`;

    randomLevels.push({ question, answer, difficulty });
  }
  return randomLevels;
};

const easyLevels = generateRandomLevels('easy', 2);
const mediumLevels = generateRandomLevels('medium', 2);
const hardLevels = generateRandomLevels('hard', 2);

const allLevels = [...easyLevels, ...mediumLevels, ...hardLevels];

function Game1() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    setUserAnswer('');
  }, [currentLevel]);

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const checkAnswer = () => {
    const correctAnswer = allLevels[currentLevel].answer;
    const userEnteredAnswer = parseInt(userAnswer, 10);

    if (userEnteredAnswer === correctAnswer) {
      setScore(score + 1);
      setFeedback('Correct! Well done!');
    } else {
      setFeedback('Incorrect.');
    }

    setTimeout(() => {
      setFeedback('');
      if (currentLevel + 1 < allLevels.length) {
        setCurrentLevel(currentLevel + 1);
      } else {
        setQuizCompleted(true);
      }
    }, 1500);
  };

  useEffect(() => {
    const speakQuestion = () => {
      const utterance = new SpeechSynthesisUtterance(allLevels[currentLevel].question);
      window.speechSynthesis.speak(utterance);
    };

    speakQuestion();
  }, [currentLevel]);

  const speakQuestion = () => {
    const question = allLevels[currentLevel].question;
    const utterance = new SpeechSynthesisUtterance(question);
    window.speechSynthesis.speak(utterance);
  };

  const resetQuiz = () => {
    setCurrentLevel(0);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className='game'>
    <div className="App">
      <div className="blackboard">
        <div className="score-container">
          <p>Score: {score}</p>
        </div>
        {quizCompleted ? (
          <div>
            <p>Congratulations! You completed all levels. Your score is {score}.</p>
            <button onClick={resetQuiz}>Restart Quiz</button>
          </div>
        ) : (
          <div className="level-container">
            <h2>Level {currentLevel + 1}</h2>
            <p className="handwriting">{allLevels[currentLevel].question}</p>
            <input
              type="text"
              value={userAnswer}
              onChange={handleInputChange}
              placeholder="Enter your answer"
            />
            <button onClick={checkAnswer}>Submit</button>
            <p className="feedback">{feedback}</p>
            <button className="audio-button" onClick={speakQuestion}>
              Speak Question
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default Game1;

