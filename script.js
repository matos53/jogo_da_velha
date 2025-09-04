const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let currentPlayer = "X"; // Jogador humano é sempre X

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  // Jogador joga
  makeMove(index, "X");

  if (!gameActive) return;

  // Máquina joga após pequena pausa
  setTimeout(() => {
    machinePlay();
  }, 400);
}

function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;

  if (checkWinner(player)) {
    statusText.textContent = `Jogador ${player} venceu!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusText.textContent = "Empate!";
    gameActive = false;
    return;
  }

  if (player === "X") {
    statusText.textContent = "Vez da máquina (O)";
  } else {
    statusText.textContent = "Sua vez (X)";
  }
}

function machinePlay() {
  if (!gameActive) return;

  // Escolhe posição vazia aleatória
  const emptyCells = board
    .map((cell, index) => cell === "" ? index : null)
    .filter(index => index !== null);

  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  makeMove(randomIndex, "O");
}

function checkWinner(player) {
  return winPatterns.some(pattern => {
    return pattern.every(index => board[index] === player);
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = "Sua vez (X)";
  cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);

// Inicialização
statusText.textContent = "Sua vez (X)";
