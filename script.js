'use strict';

// selecting elements
const player0e1 = document.querySelector('.player--0');
const player1e1 = document.querySelector('.player--1');
const score0el = document.querySelector('#score--0');
const score1el = document.getElementById('score--1');
const current0el = document.getElementById('current--0');
const current1el = document.getElementById('current--1');
const diceel = document.querySelector('.dice');
const btnnew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');

let scores, currentscore, activeplayer, playing;

// starting condition
const init = function () {
    scores = [0, 0];
    currentscore = 0;
    activeplayer = 0;
    playing = true;

    score0el.textContent = 0;
    score1el.textContent = 0;
    current0el.textContent = 0;
    current1el.textContent = 0;

    diceel.classList.add('hidden');
    player0e1.classList.remove('player--winner');
    player1e1.classList.remove('player--winner');
    player0e1.classList.add('player--active');
    player1e1.classList.remove('player--active');
};
init();

const switchPlayer = function () {
    document.getElementById(`current--${activeplayer}`).textContent = 0;
    currentscore = 0;
    activeplayer = activeplayer === 0 ? 1 : 0;
    player0e1.classList.toggle('player--active');
    player1e1.classList.toggle('player--active');
};

// rolling dice functanolity
btnroll.addEventListener('click', function () {
    if (playing) {

        // generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // display dice roll
        diceel.classList.remove('hidden');
        diceel.src = `dice-${dice}.png`;

        // check for rolled 1: if true, switch to next player
        if (dice !== 1) {
            // add dice to current score
            currentscore += dice;
            document.getElementById(`current--${activeplayer}`).textContent = currentscore;
        }
        else {
            // switch to next player 
            switchPlayer();
        }

    }
});

btnhold.addEventListener('click', function () {
    if (playing) {

        // add current score to active players score
        scores[activeplayer] += currentscore;
        document.getElementById(`score--${activeplayer}`).textContent = scores[activeplayer];

        // check if player score is >= 100
        if (scores[activeplayer] >= 100) {
            // finish the game
            playing = false;
            diceel.classList.add('hidden');
            document.querySelector(`.player--${activeplayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activeplayer}`).classList.remove('player--active');
        }
        else {
            // switch to the next player
            switchPlayer();
        }

    }
});

btnnew.addEventListener('click', init);