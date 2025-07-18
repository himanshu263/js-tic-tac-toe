
const board = document.getElementById("board");
const statusText = document.getElementById("status");
let currentPlayer = "X";
let gameActive = false;
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameMode = "";

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function setMode(mode) {
  gameMode = mode;
  resetGame();
  gameActive = true;
  statusText.textContent = `Player X's turn (${mode === 'single' ? "vs Computer" : "2 Player"})`;
}

function handleCellClick(index) {
  if (!gameActive || gameState[index] !== "") return;

  gameState[index] = currentPlayer;
  renderBoard();

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  if (gameMode === "two") {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  } else if (gameMode === "single") {
    currentPlayer = "O";
    statusText.textContent = `Computer's turn...`;
    setTimeout(computerMove, 500);
  }
}

function computerMove() {
  if (!gameActive) return;

  let emptyIndexes = gameState.map((val, idx) => val === "" ? idx : null).filter(v => v !== null);
  let move = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  gameState[move] = "O";
  renderBoard();

  if (checkWin()) {
    statusText.textContent = `Computer wins! 😢`;
    gameActive = false;
  } else if (!gameState.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winningConditions.some(([a, b, c]) =>
    gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]
  );
}

function renderBoard() {
  board.innerHTML = "";
  gameState.forEach((val, index) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = val;
    cell.addEventListener("click", () => handleCellClick(index));
    board.appendChild(cell);
  });
}

function resetGame() {
  currentPlayer = "X";
  gameActive = gameMode !== "";
  gameState = ["", "", "", "", "", "", "", "", ""];
  renderBoard();
  if (gameMode === "") {
    statusText.textContent = "Choose a mode to start";
  } else {
    statusText.textContent = `Player ${currentPlayer}'s turn (${gameMode === 'single' ? "vs Computer" : "2 Player"})`;
  }
}

// Initial board render
renderBoard();
