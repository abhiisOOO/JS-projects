'use strict';
// selectiong elements.

const scoreEl1 = document.querySelector('#score--0');

const scoreEl2 = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');
diceEl.classList.add('hidden');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const currentEl1 = document.getElementById('current--0');
const currentEl2 = document.getElementById('current--1');
const p1 = document.querySelector('.player--0');
const p2 = document.querySelector('.player--1');
let activePlayer;
let currentScore;
let scores;
let playing;
// function for initialising the program .
function initial() {
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  playing = true;
  scoreEl1.textContent = 0;
  scoreEl2.textContent = 0;
  p1.classList.remove('player--winner');
  p2.classList.remove('player--winner');
  p1.classList.add('player--active');
  currentEl1.textContent = 0;
  currentEl2.textContent = 0;
}

initial();
// function for removing hidden class.
function remove(element) {
  element.classList.remove('hidden');
}
// function for adding hidden class.
function add(element) {
  element.classList.add('hidden');
}
// function for switching player.
function switching() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  p1.classList.toggle('player--active');
  p2.classList.toggle('player--active');
}

// adding event listener for dice roll button.
btnRoll.addEventListener('click', function () {
  if (playing) {
    // generating random dice roll.
    const dice = Math.trunc(Math.random() * 6 + 1);
    console.log(dice);
    // diplaying dice image.
    diceEl.src = `dice-${dice}.png`;
    remove(diceEl);
    if (dice != 1) {
      // adding dice number to current score.
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switching();
    }
  }
});
btnHold.addEventListener('click', function () {
  //adding current score to active players score.
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // checking if player's score is greater than or equal to 100.

    if (scores[activePlayer] >= 100) {
      playing = false;
      add(diceEl);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switching();
    }
  }
});
btnNew.addEventListener('click', function () {
  initial();
});
