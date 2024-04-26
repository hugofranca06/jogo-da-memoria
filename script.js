const cards = [
    { id: 1, image: '🍎' },
    { id: 2, image: '🍌' },
    { id: 3, image: '🍒' },
    { id: 4, image: '🍉' },
    { id: 5, image: '🍊' },
    { id: 6, image: '🍋' },
    { id: 7, image: '🍇' },
    { id: 8, image: '🍓' }
];

const board = document.getElementById('board');
let firstCard = null, secondCard = null;
let lockBoard = false, foundPairs = 0;

const duplicateCards = [...cards, ...cards];
duplicateCards.sort(() => 0.5 - Math.random());

for (let i = 0; i < duplicateCards.length; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = duplicateCards[i].id;
    card.innerHTML = '&nbsp;';
    card.addEventListener('click', flipCard);
    board.appendChild(card);
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.innerHTML = cards[this.dataset.id - 1].image;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;
        checkForMatch();
    }
}

function checkForMatch() {
    if (firstCard.dataset.id === secondCard.dataset.id) {
        disableCards();
        foundPairs++;
        if (foundPairs === cards.length) {
            alert('Parabéns! Você encontrou todos os pares!');
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.innerHTML = '&nbsp;';
        secondCard.innerHTML = '&nbsp;';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}