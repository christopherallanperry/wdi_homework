angular
  .module('tictactoeApp')
  .controller('tictactoeCtrl', tictactoeCtrl);

tictactoeCtrl.$inject = [];

function tictactoeCtrl() {

  const vm = this;

  vm.squares = document.getElementsByClassName('square');
  vm.modalParent = document.getElementById('modal');
  vm.modalTarget = document.getElementsByClassName('modal-body')[0];
  // console.log(vm.squares);
  vm.board = [
    {sqrId: 'a1'},
    {sqrId: 'a2'},
    {sqrId: 'a3'},
    {sqrId: 'b1'},
    {sqrId: 'b2'},
    {sqrId: 'b3'},
    {sqrId: 'c1'},
    {sqrId: 'c2'},
    {sqrId: 'c3'}
  ];
  vm.playerO = [];
  vm.playerX = [];
  vm.turn = 'playerX';
  vm.counter = 0;

  vm.solutions = [
    ['a1', 'a2', 'a3'], ['b1', 'b2', 'b3'], ['c1', 'c2', 'c3'], ['a1', 'b1', 'c1'], ['a2', 'b2', 'c2'], ['a3', 'b3', 'c3'], ['a1', 'b2', 'c3'], ['a3', 'b2', 'c1']
  ];

  vm.squareClicked = squareClicked;
  vm.checkWinner = checkWinner;
  vm.clearBoard = clearBoard;
  // vm.declareWinner = declareWinner;
  vm.gameWon = false;
  vm.declareWinner = declareWinner;


  function declareWinner(winner) {
    console.log('declareWinner has been called');

    const modalBody = 'Player ' + winner + ' wins!';
    const modalContent = (
      `
        ${ modalBody }
      `
    );
    vm.modalTarget.innerHTML(modalContent);
    vm.modalParent.setAttribute('display', 'block');
  }

  function clearBoard() {
    console.log('Clear button was clicked');
  // Reset board to empty value
    for (var i = 0; i < vm.squares.length; i++) {
      vm.squares[i].setAttribute('class', 'square'); // Remove playerX and playerO classnames
      vm.squares[i].setAttribute('value', '');
    } // For loop END!
    vm.turn                  = 'playerX';  // Reset turn variable to playerX.
    vm.counter               = 0;          // Reset counter to 0.
    vm.playerX               = [];         // Reset playerX array to an empty state.
    vm.playerO               = [];         // Reset playerO array to an empty state.
    vm.gameWon               = false;      // Reset the gameWon check to false
  }

  function checkWinner() {
    for (var i = 0; i < vm.solutions.length; i++) {
      // console.log(solutions[i]);
      if (vm.playerX.includes(vm.solutions[i][0]) && vm.playerX.includes(vm.solutions[i][1]) && vm.playerX.includes(vm.solutions[i][2])) {
        console.log('Winning array for Player X is ' + vm.solutions[i]);
        vm.gameWon = true;
        console.log(vm.gameWon);
        declareWinner('X');
      } else if (vm.playerO.includes(vm.solutions[i][0]) && vm.playerO.includes(vm.solutions[i][1]) && vm.playerO.includes(vm.solutions[i][2])) {
        console.log('Winning array for Player O is ' + vm.solutions[i]);
        vm.gameWon = true;
        console.log(vm.gameWon);
        declareWinner('O');
      }
    }
  }

  function squareClicked(square, sqVal) {
    if (vm.gameWon === true) {
      return console.log('Game already won');
    }
    // console.log('Square ' + sqVal + ' was clicked: ');
    // console.log('Square ' + square + ' was clicked: ');
    square = document.getElementById(sqVal);
    // console.log('Square ' + square + ' was clicked: ');

    if (!square.getAttribute('value')) {
      if (vm.turn === 'playerX') {
        // console.log('Player X clicked a square');
        // Alter board to reflect choice and increment counter
        square.setAttribute('class', 'square playerX');
        square.setAttribute('value', 'playerX');
        vm.playerX.push(sqVal);
        // square.innerHTML = 'X';
        vm.turn = 'playerO';
        vm.counter += 1;

        // If counter is >= 5, call a function check whether there is a winning combination yet
        if (vm.counter >= 5) {
          vm.checkWinner();
        }
      } else {
        //  console.log('Player O clicked a square');
        // Alter board to reflect choice and increment counter
        square.setAttribute('class', 'square playerO');
        square.setAttribute('value', 'player)');
        vm.playerO.push(sqVal);
        // square.innerHTML = 'O';
        vm.turn = 'playerX';
        vm.counter += 1;

      // If counter is > 5, call a function check whether there is a winning combination yet
        if (vm.counter >= 5) {
          vm.checkWinner();
        }
      }
    }
  }
}
