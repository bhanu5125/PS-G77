import React, { useRef,useState, useEffect } from 'react';
import '../Css/Card.css';
import Timer from './timer';

import GameOverScreen from './gameoverscreen';
import cat from './assests/cat.png';
import happy from './assests/happy.png';
import sun from './assests/sun.png';
import dog from './assests/dog.png';
import cup from './assests/cup.png';

import axios from 'axios';

const CardGame = ({ onGameOver }) => {
  const [object] = useState([
    { name: 'Cat', image: cat },
    { name: 'Happy', image: happy },
    { name: 'Cup', image: cup },
    { name: 'Dog', image: dog },
    { name: 'Sun', image: sun },
  ]);
  const [usedIndices, setUsedIndices] = useState([]);
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isfirst, setisfirst] = useState(true);
  const feedbackSentences = ['Try again!', 'Try one more time','Give it another shot!'];

  const startNewRound = () => {
    const availableIndices = object
      .map((_, index) => index)
      .filter(index => !usedIndices.includes(index));

    if (availableIndices.length === 0) {
      setGameOver(true);
      return;
    }

    const randomIndex =
      availableIndices[Math.floor(Math.random() * availableIndices.length)];
    const correctAnswerObject = object[randomIndex];
    const correctAnswer = correctAnswerObject.name;

    const incorrectOptions = object
      .filter(item => item.name !== correctAnswer)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const roundOptions = [...incorrectOptions, correctAnswerObject];
    roundOptions.sort(() => 0.5 - Math.random());

    setOptions(roundOptions);
    setCorrectAnswer(correctAnswer);
    setSelectedAnswer('');
    setIsCorrect(null);
    setUsedIndices([...usedIndices, randomIndex]);

    if (isfirst === false) {
      setTimeout(() => {
        speak(` ${correctAnswer}?`);
        spokenRef.current = true;
      }, 500);
    }
  };

  const spokenRef = useRef(false);
  useEffect(() => {
    startNewRound();
  }, []); 

  const handleCardClick = clickedName => {
    if (clickedName === correctAnswer) {
      setIsCorrect(true);
      setScore(prevScore => prevScore + 1);
      setTimeout(() => {
        startNewRound();
      }, 400);
    } else {
      setIsCorrect(false);
      speak(getRandomFeedbackSentence());
      //setScore(prevScore => prevScore - 1);
    }
    setSelectedAnswer(clickedName);
  };

  const getRandomFeedbackSentence = () => {
    const randomIndex = Math.floor(Math.random() * feedbackSentences.length);
    return feedbackSentences[randomIndex];
  };

  const speak = text => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (gameOver) {
      onGameOver(score);
    } else if (correctAnswer && !spokenRef.current) {
      setTimeout(() => {
        speak(`What is the answer for ${correctAnswer}?`);
        spokenRef.current = true;
        setisfirst(false);
      }, 500);
    }
  }, [correctAnswer, gameOver, onGameOver, score]);

  if (gameOver) {
    return <GameOverScreen score={score} />;
  }

  if (!correctAnswer) {
    return <p>Loading...</p>;
  }

  return (
    <div className="game-container">
      <div>
        {score}
      </div>
      <p className="display-4">
        Pick the right answer by listening to how it sounds.
      </p>

      <div className="card-container">
        {options.map((item, idx) => (
          <div
            key={idx}
            className={`card ${
              selectedAnswer === item.name && isCorrect !== null
                ? isCorrect
                  ? 'correct'
                  : 'incorrect'
                : ''
            }`}
            onClick={() => handleCardClick(item.name)}
            style={{ '--index': idx + 1 }}
          >
            <div className="d-flex flex-column align-items-center p-1">
              <p className="size">{item.name}</p>
              <img className="w-75" src={item.image} alt={item.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FlashcardGame = () => {
  const [isclicked, setIsclicked] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const handleTimerEnd = () => {
    setTimerEnded(true);
  };

  const handleButtonClick = () => {
    setShowGame(prevShowGame => !prevShowGame);
    setTimerEnded(false);
    setGameOver(false);
    setIsclicked(!isclicked);
  };

  const handleGameOver = async  score => {
    setGameOver(true);
    setFinalScore(score);
    try {
      const scr = await axios.post('http://localhost:5000/api/activity', {
        email: localStorage.getItem('email'),
        gameType: "Reflex",
        score: score,
    })
    console.log(scr)
    } catch (error) {
        console.error('Error submitting:', error);
    }
  };


  useEffect(() => {
    if (showGame && !timerEnded) {
      // Speak the rules of the game when the timer starts
      speak('Welcome to the Flashcard Game! Try to guess the correct answer for each card. Click on the correct option to score points. Good luck!');
    }
  }, [showGame, timerEnded]);

  const speak = text => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="gcontainer">
      <div>
        
      </div>
      <div className="button-container">
        {isclicked ? (
          <button className="gbutton" onClick={handleButtonClick}>
            Stop Flashcard Game
          </button>
        ) : (
          <button className="gbutton" onClick={handleButtonClick}>
            Start Flashcard Game
          </button>
        )}
      </div>
      {showGame && timerEnded && (
        <div className="game-container p-4">
          {gameOver ? (
            <GameOverScreen score={finalScore} />
          ) : (
            <CardGame onGameOver={handleGameOver} />
          )}
        </div>
      )}
      <div className="d-flex align-items-center justify-content-center">
        {showGame && !timerEnded && <Timer onTimerEnd={handleTimerEnd} />}
      </div>
    </div>
  );
};

export default FlashcardGame;
