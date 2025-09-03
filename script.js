const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let currentPlayer = 'X';
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // linhas
  [0,3,6], [1,4,7], [2,5,8], // colunas
  [0,4,8], [2,4,6]           // diagonais
];

function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Jogador ${currentPlayer} venceu!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusText.textContent = "Empate!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Vez do jogador ${currentPlayer}`;
}

function checkWinner() {
  return winPatterns.some(pattern => {
    return pattern.every(index => board[index] === currentPlayer);
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Vez do jogador ${currentPlayer}`;
  cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);
