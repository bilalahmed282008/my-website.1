const mazeElement = document.getElementById('maze');
const restartBtn = document.getElementById('restartBtn');

const ROWS = 10;
const COLS = 10;

// Maze layout (0 = path, 1 = wall)
// Design a cool maze pattern with corridors
const mazeMap = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,0,0,1],
  [1,0,1,0,1,0,1,1,0,1],
  [1,0,1,0,0,0,0,1,0,1],
  [1,0,1,1,1,1,0,1,0,1],
  [1,0,0,0,0,1,0,1,0,1],
  [1,1,1,1,0,1,0,1,0,1],
  [1,0,0,1,0,0,0,0,0,1],
  [1,0,0,0,0,1,1,1,0,1],
  [1,1,1,1,1,1,1,1,1,1],
];

let playerPos = { row: 1, col: 1 };

function createMaze() {
  mazeElement.innerHTML = '';
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (mazeMap[r][c] === 1) cell.classList.add('wall');
      else cell.classList.add('path');
      cell.setAttribute('data-row', r);
      cell.setAttribute('data-col', c);
      mazeElement.appendChild(cell);
    }
  }
  drawPlayer();
}

function drawPlayer() {
  // Remove previous player class if any
  document.querySelectorAll('.player').forEach(el => el.classList.remove('player'));
  
  // Add player class to new cell
  const selector = `.cell[data-row="${playerPos.row}"][data-col="${playerPos.col}"]`;
  const playerCell = document.querySelector(selector);
  if (playerCell) playerCell.classList.add('player');
}

function movePlayer(direction) {
  if (!direction) return;

  let { row, col } = playerPos;

  switch(direction) {
    case 'ArrowUp':
      if (row > 0 && mazeMap[row -1][col] === 0) playerPos.row--;
      break;
    case 'ArrowDown':
      if (row < ROWS -1 && mazeMap[row +1][col] === 0) playerPos.row++;
      break;
    case 'ArrowLeft':
      if (col > 0 && mazeMap[row][col -1] === 0) playerPos.col--;
      break;
    case 'ArrowRight':
      if (col < COLS -1 && mazeMap[row][col +1] === 0) playerPos.col++;
      break;
  }
  drawPlayer();
  checkWin();
}

function checkWin() {
  // Let's say bottom-right corner is the goal (8,8)
  if (playerPos.row === 8 && playerPos.col === 8) {
    alert('🎉 You solved the Mystery Maze! 🎉');
    resetGame();
  }
}

function resetGame() {
  playerPos = { row:1, col:1 };
  createMaze();
}

document.addEventListener('keydown', e => {
  movePlayer(e.key);
});

restartBtn.addEventListener('click', resetGame);

createMaze();
