'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0'); // we use # because that is the selector for id
const score1El = document.getElementById('score--1'); // this is the other way of selecting an id
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // we toggle the class player--active
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const resetGame = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = 0;
  scores[0] = 0;
  scores[1] = 0;
  document.getElementById(`score--0`).textContent = scores[0];
  document.getElementById(`score--1`).textContent = scores[1];
  document.querySelector(`.player--0`).classList.add('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3. Check for rolled 1
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  console.log(currentScore);
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2.Check if player's score is >= 100
    if (scores[activePlayer] >= 20) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  if (!playing) {
    // if game is complete we remove the player-winner class
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--winner');
    // in the reset game function we reset all scores back to 0
    resetGame();
    // we also set playing back to true so the buttons can be pressed
    playing = true;
  } else {
    // we hide the dice again
    diceEl.classList.add('hidden');
    // if the active player before the new game btn was pressed was player 2 we remove thw active class from it
    if (player1El.classList.contains('player--active')) {
      player1El.classList.remove('player--active');
    }
    resetGame();
  }
});
