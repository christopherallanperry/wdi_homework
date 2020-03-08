// TIC TAC TOE GAME
// GA_London WDI 24
// w01d05 homework

// Todo List
// 1. Flag up winner
// 2. Kill additional playing moves once a winner is called - modal?
// 3. Create computer autoplay mode

var squares = document.getElementsByClassName('square');
var playerO = [];
var playerX = [];
var turn = 'playerX';
var counter = 0;
var solutions = [['a1','a2','a3'],['b1','b2','b3'],['c1','c2','c3'],['a1','b1','c1'],['a2','b2','c2'],['a3','b3','c3'],['a1','b2','c3'],['a3','b2','c1']];

function checkWinner() {
  for (var i = 0; i < solutions.length; i++) {
    // console.log(solutions[i]);
    if (playerX.includes(solutions[i][0]) && playerX.includes(solutions[i][1]) && playerX.includes(solutions[i][2])) {
      console.log('Winning array for Player X is ' + solutions[i]);
    } else if (playerO.includes(solutions[i][0]) && playerO.includes(solutions[i][1]) && playerO.includes(solutions[i][2])) {
      console.log('Winning array for Player O is ' + solutions[i]);
    }
  }
}

function squareClicked() {
  if (!this.getAttribute('value')) {
    if (turn === 'playerX') {
      // Alter board to reflect choice and increment counter
      this.setAttribute('class', 'square playerX');
      this.setAttribute('value', 'playerX');
      playerX.push(this.id);
      // this.innerHTML = 'X';
      turn = 'playerO';
      counter += 1;

      // If counter is >= 5, call a function check whether there is a winning combination yet
      if (counter >= 5) {
        checkWinner();
      }
    } else {
      // Alter board to reflect choice and increment counter
      this.setAttribute('class', 'square playerO');
      this.setAttribute('value', 'player)');
      playerO.push(this.id);
      // this.innerHTML = 'O';
      turn = 'playerX';
      counter += 1;

      // If counter is > 5, call a function check whether there is a winning combination yet
      if (counter >= 5) {
        checkWinner();
      }
    }
  }
} // squareClicked END!

function clearBoard() {
  // Reset board to empty value
  for (var i = 0; i < squares.length; i++) {
    squares[i].setAttribute('class', 'square'); // Remove playerX and playerO classnames
    // squares[i].innerHTML  = 'Pick me, pick me!'; // Reset innerHTML to "Pickme, pickme!"
    squares[i].setAttribute('value', '');
  } // For loop END!
  turn                  = 'playerX';  // Reset turn variable to playerX.
  counter               = 0;          // Reset counter to 0.
  playerX               = [];         // Reset playerX array to an empty state.
  playerO               = [];         // Reset playerO array to an empty state.
}

function start() {
  // Find out whether a square has been clicked on
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', squareClicked, false);
  } // For loop END!

  // Clear the Tic Tac Toe board
  document.getElementById('clearButton').addEventListener('click', clearBoard, false);

} // start END!

document.addEventListener('DOMContentLoaded', start, false);
