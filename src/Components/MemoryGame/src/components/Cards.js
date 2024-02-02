import { useState, useEffect } from 'react';
import Card from './Card';
import GameOver from './GameOver';

function Cards({ level }) {
  const gridSize = {
    easy: { rows: 2, cols: 4 },
    medium: { rows: 3, cols: 4 },
    hard: { rows: 4, cols: 6 }
  };

  const [cards, setCards] = useState(generateCards(gridSize[level]));
  const [prevCardIndex, setPrevCardIndex] = useState(null);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (matchedPairs === cards.length / 2) {
      setGameOver(true);
    }
  }, [matchedPairs, cards.length]);

  function generateCards(size) {
    const totalPairs = (size.rows * size.cols) / 2;
    const images = ['/img/cat.png', '/img/dog.png', '/img/deer.png','/img/pegion.png','/img/sheep.png','/img/bunny.png','/img/cow.png','/img/buffalo.png'];
    const shuffledImages = [...images, ...images].sort(() => Math.random() - 0.5);

    const cards = [];
    let id = 0;
    for (let i = 0; i < totalPairs; i++) {
      const img = shuffledImages[i];
      cards.push({ id: id++, img: img, stat: "" });
      cards.push({ id: id++, img: img, stat: "" });
    }

    return shuffleArray(cards);
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function handleCardClick(index) {
    if (cards[index].stat !== "" || gameOver) {
      // Ignore clicks on already matched cards or after the game is over
      return;
    }

    if (prevCardIndex === null) {
      setCards(cards.map((card, i) => i === index ? { ...card, stat: "active" } : card));
      setPrevCardIndex(index);
    } else {
      if (cards[prevCardIndex].img === cards[index].img && prevCardIndex !== index) {
        setCards(cards.map((card, i) => (i === index || i === prevCardIndex) ? { ...card, stat: "correct" } : card));
        setMatchedPairs(matchedPairs + 1);
      } else {
        setCards(cards.map((card, i) => (i === index || i === prevCardIndex) ? { ...card, stat: "wrong" } : card));
        setTimeout(() => {
          setCards(cards.map((card, i) => (card.stat === "active") ? { ...card, stat: "" } : card));
        }, 1000);
      }
      setPrevCardIndex(null);
      setMoves(moves + 1);
    }
  }

  return (
    <div>
      {!gameOver ? (
        <div className="container" style={{ gridTemplateColumns: `repeat(${gridSize[level].cols}, 1fr)`, gridTemplateRows: `repeat(${gridSize[level].rows}, 1fr)` }}>
          {cards.map((card, index) => (
            <Card key={index} item={card} id={index} handleClick={handleCardClick} />
          ))}
        </div>
      ) : (
        <GameOver moves={moves} />
      )}
    </div>
  );
}

export default Cards;
