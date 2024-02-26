document.addEventListener('DOMContentLoaded', init);

const board = [];
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let turn = 'X';

function init() {
  document.querySelectorAll('.square').forEach((square, index) => {
    square.textContent = '';
    square.addEventListener('click', () => handleMove(square, index));
  });
  document.getElementById('reset-button').addEventListener('click', init);
  document.getElementById('messages').textContent = `It's ${turn}'s turn!`;
  for (let i = 0; i < 9; i++) board[i] = '';
}

function handleMove(square, index) {
  if (square.textContent === '' && !getWinner()) {
    square.textContent = turn;
    board[index] = turn;
    turn = turn === 'X' ? 'O' : 'X';
    updateStatus();
  }
}

function getWinner() {
  let winner = null;
  winningCombos.forEach(combo => {
    if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
      winner = board[combo[0]];
    }
  });
  return winner ? winner : board.includes('') ? null : 'T';
}

function updateStatus() {
  const win = getWinner();
  const messages = document.getElementById('messages');
  if (win === 'T') {
    messages.textContent = `That's a tie, queen!`;
  } else if (win) {
    messages.textContent = `${win} wins the game!`;
  } else {
    messages.textContent = `It's ${turn}'s turn!`;
  }
}
