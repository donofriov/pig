/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game


CODING CHALLENGES:
Change the game to follow these rules!

1. A player loses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
    Hint: Always save the previous dice roll in a separate variable
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100.
    Hint: You can read that value with the .value property in JavaScript.
3. Add another dice to the game, so that there are two dices now. The player loses his current score when one of them is a 1.
    Hint: You will need CSS to position the second dice, so take a look at the CSS code for the first one.
4. Update Challenge 1 to reset everything if two 6 are rolled instead.
5. Additional updates: If both dice are 1s you get 25 points, if both dice are the same number you get double the points.
*/

var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';

        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        // 3. Update the round score IF the rolled number was NOT a 1
        if (dice1 === 6 && dice2 === 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        } else if (dice1 === 1 && dice2 === 1) {
            roundScore += 25;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else if (dice1 === dice2) {
            roundScore += (dice1 + dice2) * 2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else if (dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // 2. Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;

        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // 3. Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            hideDice();
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;
        } else {
            // 4. A single 1 was rolled so it is the next players turn and 0 points are awarded
            nextPlayer();
        }
    }
});


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    hideDice();
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    previousScores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    hideDice();

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}

function hideDice() {
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}
