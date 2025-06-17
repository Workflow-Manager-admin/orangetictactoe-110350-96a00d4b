import React, { useState } from 'react';
import './OrangeTicTacToeContainer.css';

/**
 * Utility to calculate the winner of the tic-tac-toe board.
 * Returns 'X'/'O' if there's a winner, or null otherwise.
 */
function calculateWinner(squares) {
  // All possible winning lines
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6], // diagonals
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

/**
 * Renders a single square cell in the tic-tac-toe board.
 */
// PUBLIC_INTERFACE
function Square({ value, onClick, highlight }) {
  /** Single cell of the board */
  return (
    <button
      className={`ott-square${highlight ? ' highlight' : ''}`}
      onClick={onClick}
      aria-label={value ? `Square with ${value}` : 'Empty Square'}
    >
      {value}
    </button>
  );
}

/**
 * Renders the 3x3 game board, responsible for displaying all squares.
 */
// PUBLIC_INTERFACE
function Board({ squares, onSquareClick, winningLine }) {
  /** 3x3 tic-tac-toe board */
  function renderSquare(i) {
    const highlight = winningLine && winningLine.includes(i);
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onSquareClick(i)}
        highlight={highlight}
      />
    );
  }

  // Grid layout: render 3 rows of 3 squares
  return (
    <div className="ott-board-grid">
      {[0, 1, 2].map(row =>
        <div className="ott-board-row" key={row}>
          {[0, 1, 2].map(col =>
            renderSquare(row * 3 + col)
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Main Container for OrangeTicTacToe game.
 * Provides title, responsive centered board, theme, and control logic.
 */
// PUBLIC_INTERFACE
function OrangeTicTacToeContainer() {
  /**
   * State setup for board, next player, and move history.
   */
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(squares);

  // Find the winning line, if any, for highlight
  let winningLine = null;
  if (winner) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
      ) {
        winningLine = line;
        break;
      }
    }
  }

  const isBoardFull = squares.every(Boolean);
  const status = winner
    ? `Winner: ${winner}`
    : isBoardFull
      ? "It's a draw!"
      : `Next player: ${xIsNext ? 'X' : 'O'}`;

  /**
   * Handles a square click, updating board state.
   */
  const handleSquareClick = (i) => {
    if (squares[i] || winner) return; // ignore if already filled or game is over
    const next = squares.slice();
    next[i] = xIsNext ? 'X' : 'O';
    setSquares(next);
    setXIsNext(!xIsNext);
  };

  /**
   * Handles resetting the game.
   */
  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="orange-ttt-app">
      <nav className="ott-navbar">
        <div className="ott-logo">
          <span role="img" aria-label="orange" className="ott-logo-symbol">🍊</span> Orange Tic Tac Toe
        </div>
      </nav>
      <main className="ott-main-content">
        <section className="ott-hero-section">
          <h1 className="ott-title">Orange Tic Tac Toe</h1>
          <div className="ott-description">
            Enjoy a simple game of Tic Tac Toe with a citrus-inspired color theme!
          </div>
        </section>
        <section className="ott-game-container">
          <div className="ott-status-bar">{status}</div>
          <Board
            squares={squares}
            onSquareClick={handleSquareClick}
            winningLine={winningLine}
          />
          <button className="ott-btn ott-btn-restart" onClick={handleRestart}>Restart Game</button>
        </section>
      </main>
      <footer className="ott-footer">
        <span>Made with <span className="ott-accent">Orange</span> Theme · ReactJS</span>
      </footer>
    </div>
  );
}

export default OrangeTicTacToeContainer;
