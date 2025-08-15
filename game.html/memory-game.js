const board = document.getElementById('gameBoard');
const statusText = document.getElementById('statusText');
const restartBtn = document.getElementById('restartBtn');

const emojis = ['🍕', '🚀', '🐱', '🎮', '🎵', '🌈', '🍩', '👾'];
let cards = [...emojis, ...emojis];

let flippedCards = [];
let lockBoard = false;
let matchedPairs = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  board.innerHTML = '';
  matchedPairs = 0;
  flippedCards = [];
  lockBoard = false;
  statusText.textContent = 'Find all the pairs!';
  shuffle(cards);

  cards.forEach(emoji => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <div class="inner">
        <div class="front">❓</div>
        <div class="back">${emoji}</div>
      </div>
    `;

    card.addEventListener('click', () => handleCardClick(card, emoji));
    board.appendChild(card);
  });
}

function handleCardClick(card, emoji) {
  if (lockBoard || card.classList.contains('flip')) return;

  card.classList.add('flip');
  flippedCards.push({ card, emoji });

  if (flippedCards.length === 2) {
    lockBoard = true;
    const [first, second] = flippedCards;

    if (first.emoji === second.emoji) {
      matchedPairs++;
      flippedCards = [];
      lockBoard = false;

      if (matchedPairs === emojis.length) {
        statusText.textContent = '🎉 You found all pairs!';
      }
    } else {
      setTimeout(() => {
        first.card.classList.remove('flip');
        second.card.classList.remove('flip');
        flippedCards = [];
        lockBoard = false;
      }, 1000);
    }
  }
}

restartBtn.addEventListener('click', createBoard);

createBoard();
