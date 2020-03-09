// console.log('I\'m here');

// Create some html for my buttons, so that the user can choose what to play - DONE

// Need a way to get the value of what the user played e.g. the user played paper - DONE

// Need to randomise the computer play to give me a value - DONE

// Depending on the two plays, calculate the winner - ALMOST DONE

// Display the result - NOT STARTED

var RockPaperScissors = RockPaperScissors || {};

RockPaperScissors.playerChoices = [];

RockPaperScissors.winConditions = {
  scissors: 'paper',
  paper: 'rock',
  rock: 'scissors'
};

RockPaperScissors.checkWinner = function(choiceArray) {
  // console.log('checkWinner  called');       // This works
  console.log(choiceArray);                 // This outputs the choiceArray
  // console.log(choiceArray[0]);              // This outputs nothing
  // console.log(choiceArray[1]);              // This outputs nothing

  if (choiceArray[0] === choiceArray[1]) {
    console.log('Draw');
  } else if (this.winConditions[choiceArray[0]] === choiceArray[1]) {
    console.log('Won');
  } else {
    console.log('Lost');
  }
};
  // switch (choiceArray) {
  //   case choiceArray[0] === choiceArray[1]:
  //     // Draw
  //     console.log('Draw');
  //     break;
  //   case choiceArray[0] === 'paper' &&  choiceArray[1] === 'rock':
  //     // 'You' win
  //     console.log('You win');
  //     break;
  //   case choiceArray[0] === 'paper' &&  choiceArray[1] === 'scissors':
  //     // 'Bot' wins
  //     console.log('Bot wins');
  //     break;
  //   case choiceArray[0] === 'rock' &&  choiceArray[1] === 'paper':
  //     // 'Bot' wins
  //     console.log('Bot wins');
  //     break;
  //   case choiceArray[0] === 'rock' &&  choiceArray[1] === 'scissors':
  //     // 'You' win
  //     console.log('You win');
  //     break;
  //   case choiceArray[0] === 'scissors' &&  choiceArray[1] === 'rock':
  //     // 'Bot' wins
  //     console.log('Bot wins');
  //     break;
  //   case choiceArray[0] === 'scissors' &&  choiceArray[1] === 'paper':
  //     // 'You' win
  //     console.log('You win');
  //     break;
  //   default:
  //     // Something isn't working right...
  //     console.log('No winner selected');
  //     break;
  // }


RockPaperScissors.displayMessage = function(player, buttonClicked) {
  // console.log(player);
  var displayChoice = document.getElementById('choose');

  displayChoice.innerHTML = player + ' played "' + buttonClicked + '"!';
  RockPaperScissors.playerChoices.push(buttonClicked);
  // console.log(RockPaperScissors.playerChoices);

  if (player === 'You') {
    this.botClick();
  } else {
    this.checkWinner(RockPaperScissors.playerChoices);
  }
};

RockPaperScissors.botClick = function() {
  // console.log(this);
  // console.log('botClick called');
  var botChoice = Math.floor(Math.random() * 3);
  // console.log(botChoice);
  var choices = ['rock','paper','scissors'];

  // console.log(choices[botChoice]);
  this.displayMessage('The Bot', choices[botChoice]);

};

RockPaperScissors.userClick = function(e) {
  e.preventDefault();
  this.buttonClicked = e.target.id;
  // console.log(this.buttonClicked);

  this.displayMessage('You', this.buttonClicked);
};

RockPaperScissors.addListeners = function() {
  var buttons = document.getElementsByTagName('button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', this.userClick.bind(this));
    // console.log(buttons[i]);
  }
};

document.addEventListener('DOMContentLoaded', RockPaperScissors.addListeners.bind(RockPaperScissors), false);
