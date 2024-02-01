import { useEffect, useState } from "react";
import shuffleArray from "../utils/shuffleFunction";
import Puzzle from "./Puzzle";
import Timer from "./Timer";
import "./Game.css";

export default function Game({ level, onLevelCompletion }) {
  const gridSize = level + 2;
  const [shuffledArray, setShuffledArray] = useState(() => shuffleArray(gridSize));
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    if (moves === 1) setTimerActive(true);
    let won = true;
    for (let i = 0; i < shuffledArray.length - 1; i++) {
      const value = shuffledArray[i];
      if (i === value - 1) continue;
      else {
        won = false;
        break;
      }
    }
    if (won) {
      setWin(true);
      setTimerActive(false);
    }
    return;
  }, [moves, shuffledArray]);

  const newGame = () => {
    setMoves(0);
    setTimerActive(false);
    setTime(0);
    setShuffledArray(() => shuffleArray(gridSize));
    setWin(false);
  };

  const dragStart = (e) => e.dataTransfer.setData("tile", e.target.id);

  const dragOver = (e) => e.preventDefault();

  const dropped = (e) => {
    e.preventDefault();
    const tile = e.dataTransfer.getData("tile");
    const oldPlace = Number(document.getElementById(tile).parentElement.id.slice(6)) - 1;
    const newPlace = Number(e.target.id.slice(6)) - 1;

    if (!(Math.abs(oldPlace - newPlace) === gridSize || Math.abs(oldPlace - newPlace) === 1)) return;

    const [i, j] = [Math.min(oldPlace, newPlace), Math.max(oldPlace, newPlace)];
    setShuffledArray((prevArray) => [
      ...prevArray.slice(0, i),
      prevArray[j],
      ...prevArray.slice(i + 1, j),
      prevArray[i],
      ...prevArray.slice(j + 1),
    ]);
    setMoves((prevMoves) => prevMoves + 1);
  };

  return (
    <div className="game-container1">
      <div className="game-content">
        {win && (
          <div className="win-message">
            <div className="d-flex align-items-center justify-content-center space-x-4">
              <p className="font-medium">You have won the game</p>
            </div>
          </div>
        )}
        <h3 className="game-title">
          {`${gridSize} Puzzle Game`}
        </h3>
        <div className="game-info">
          <p>Moves: {moves}</p>
          <Timer time={time} timerActive={timerActive} setTime={setTime} className="timer" />
        </div>
        <Puzzle
          shuffledArray={shuffledArray}
          dragStart={dragStart}
          dragOver={dragOver}
          dropped={dropped}
          gridSize={gridSize}
        />
        {win && (
          <div className="win-actions">
            <div className="d-flex align-items-center justify-content-center ">
              <div>
                <button
                  onClick={newGame}
                  className="new-game-btn"
                >
                  New Game
                </button>
                <button
                  onClick={() => {
                    newGame();
                    onLevelCompletion();
                  }}
                  className="next-level-btn"
                >
                  Move to Next Level
                </button>
              </div>
            </div>
          </div>
        )}
        {!win && (
          <div className="win-actions">
            <button
              onClick={newGame}
              className="new-game-btn"
            >
              New Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
