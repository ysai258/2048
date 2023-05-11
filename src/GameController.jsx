import React, { useEffect, useState } from "react";

import {
  getEmptyBoard,
  generateRandom,
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  isOver,
  checkWin,
  getScore,
} from "./GameBoard";

const Cell = ({ number }) => {
  return (
    <div className={`cell cell-${number}`}>{number > 0 ? number : ""}</div>
  );
};

const GameController = () => {
  const [board, updateBoard] = useState();
  const [num, setNum] = useState(4);
  const [score, updateScore] = useState(0);

  const [isGameOver, setGameOver] = useState(false);
  const [isWon, setWon] = useState(false);

  const checkEndGame = () => {
    if (checkWin(board)) {
      setWon(true);
    } else if (isOver(board)) {
      setGameOver(true);
    }
  };

  const left = () => {
    const newBoard = moveLeft(board);
    updateBoard(generateRandom(newBoard));
  };

  const right = () => {
    const newBoard = moveRight(board);
    updateBoard(generateRandom(newBoard));
  };

  const up = () => {
    const newBoard = moveUp(board);
    updateBoard(generateRandom(newBoard));
  };

  const down = () => {
    const newBoard = moveDown(board);
    updateBoard(generateRandom(newBoard));
  };

  const onKeyDown = (e) => {
    if (board) {
      if (checkWin(board)) {
        return;
      }
      switch (e.key) {
        case "ArrowLeft":
          left();
          break;
        case "ArrowRight":
          right();
          break;
        case "ArrowUp":
          up();
          break;
        case "ArrowDown":
          down();
          break;

        default:
      }
    }
  };

  useEffect(() => {
    if (board) {
      checkEndGame();
      updateScore(getScore());
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [board]);

  const resetGame = () => {
    setNum(4);
    updateBoard(undefined);
    setGameOver(false);
    setWon(false);
    updateScore(0);
  };

  return (
    <div>
      <h1>2048</h1>
      {!board && (
        <div>
          <input
            type="number"
            value={num}
            min={0}
            onChange={(e) => setNum(e.target.value)}
          />
          <button
            onClick={() => {
              updateBoard(generateRandom(getEmptyBoard(num)));
            }}
          >
            Start game
          </button>
        </div>
      )}
      <div>
        {isWon ? (
          <h1 style={{ color: "green" }}>WON!!</h1>
        ) : isGameOver ? (
          <h1 style={{ color: "red" }}>Game Over!!</h1>
        ) : null}
        {board && (
          <div>
            <h2>Score: {score}</h2>
            <button style={{ margin: 10 }} onClick={resetGame}>
              reset game
            </button>
            {board.map((row, i) => {
              return (
                <div key={`row-${i}`} className="row">
                  {row.map((cell, j) => (
                    <Cell key={`cell-${i}-${j}`} number={cell} />
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameController;
