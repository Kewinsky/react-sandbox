import React, { useEffect, useState } from "react";
import "./TicTacToe.css";

const initialBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const TicTacToe = () => {
  const [currentPlayer, setCurrentPlayer] = useState("❌");
  const [winner, setWinner] = useState("");
  const [board, setBoard] = useState(initialBoard);

  const winnerCheck = () => {
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] !== "" &&
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2]
      ) {
        setWinner(board[i][0]);
        return;
      }
      if (
        board[0][i] !== "" &&
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i]
      ) {
        setWinner(board[0][i]);
        return;
      }
    }

    // Check diagonals
    if (
      board[0][0] !== "" &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      setWinner(board[0][0]);
      return;
    }
    if (
      board[0][2] !== "" &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      setWinner(board[0][2]);
      return;
    }

    // Check for tie (no empty cells left)
    const isBoardFull = board.every((row) => row.every((cell) => cell !== ""));
    if (isBoardFull) {
      setWinner("tie");
    }
  };

  const updateBoard = (rowIndex, colIndex) => {
    if (board[rowIndex][colIndex] !== "" || winner) return;

    const updatedBoard = board.map((row, rI) =>
      row.map((col, cI) =>
        rI === rowIndex && cI === colIndex ? currentPlayer : col
      )
    );

    setBoard(updatedBoard);
    setCurrentPlayer((prev) => (prev === "❌" ? "⭕" : "❌"));
  };

  const handleReset = () => {
    setBoard(initialBoard);
    setCurrentPlayer(winner === "❌" ? "⭕" : "❌");
    setWinner("");
  };

  useEffect(() => {
    winnerCheck();
  }, [board]);

  return (
    <div className="ttt-wrapper">
      {!winner && <h1>Current Player: {currentPlayer}</h1>}
      {winner &&
        (winner === "tie" ? <h1>It's Tie!</h1> : <h1>Player {winner} won!</h1>)}
      <div className="ttt-board">
        {board.map((row, rowIndex) =>
          row.map((_, colIndex) => (
            <Tile
              key={`${rowIndex}-${colIndex}`}
              value={board[rowIndex][colIndex]}
              currentPlayer={currentPlayer}
              onClick={() => updateBoard(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
      {winner && (
        <button onClick={handleReset} className="ttt-resetBtn">
          Reset
        </button>
      )}
    </div>
  );
};

const Tile = ({ value, currentPlayer, onClick }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="ttt-tile"
      style={{ content: `${value}` }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      {value || (hover && currentPlayer)}
    </div>
  );
};

export default TicTacToe;
