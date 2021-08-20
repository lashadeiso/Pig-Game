'use strict';

const rollDice = document.querySelector('.btn--roll');
const rollImg = document.querySelector('.dice');
const holdBtn = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');
const diceEl = document.querySelector('.dice');
let rollNumber = Math.trunc(Math.random() * 6 + 1);
let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');
let index = 0;
let number = 0;

diceEl.classList.add('hidden');

newGame.addEventListener('click', function () {
  diceEl.classList.add('hidden');
  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#score--1').textContent = 0;
  document.querySelector('#current--1').textContent = 0;
  if (player1.classList.contains('player--active')) {
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
  }
  if (player0.classList.contains('player--winner')) {
    player0.classList.remove('player--winner');
  }
  if (player1.classList.contains('player--winner')) {
    player1.classList.remove('player--winner');
  }
});

function rollFunction(number, index) {
  rollImg.src = `./dice-${number}.png`;
  document.querySelector(`#current--${index}`).textContent =
    Number(document.querySelector(`#current--${index}`).textContent) +
    rollNumber;
}

function looser(number, index) {
  rollImg.src = `./dice-${number}.png`;
  document.querySelector(`#current--${index}`).textContent = 0;
  if (player0.classList.contains('player--active')) {
    player1.classList.add('player--active');
  } else {
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
  }
}

rollDice.addEventListener('click', function () {
  diceEl.classList.remove('hidden');

  rollNumber = Math.trunc(Math.random() * 6 + 1);
  if (player0.classList.contains('player--active')) {
    index = 0;
  } else index = 1;
  if (rollNumber === 1) {
    looser(rollNumber, index);
  } else rollFunction(rollNumber, index);
});

holdBtn.addEventListener('click', function () {
  if (player0.classList.contains('player--active')) {
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
    number = 0;
  } else {
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
    number = 1;
  }

  document.querySelector(`#score--${number}`).textContent =
    Number(document.querySelector(`#score--${number}`).textContent) +
    Number(document.querySelector(`#current--${number}`).textContent);
  document.querySelector(`#current--${number}`).textContent = 0;

  if (document.querySelector(`#score--${number}`).textContent >= 50) {
    diceEl.classList.add('hidden');
    document
      .querySelector(`.player--${number}`)
      .classList.add('player--winner');
  }
});
