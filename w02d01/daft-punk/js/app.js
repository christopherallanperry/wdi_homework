// DAFT PUNK AUDIO
// GA_London WDI 24
// w02d01 homework

// Todo List
// 1. Only show DP helmet image on hover
// 2. Sort out grid spacing
// 3. Get some sleep...

var DaftPunk = DaftPunk || {};

DaftPunk.gridBase = 4;
DaftPunk.sounds = [
  'work_it',
  'make_it',
  'do_it',
  'makes_us',
  'harder',
  'better',
  'faster',
  'stronger',
  'more_than',
  'hour',
  'our',
  'never',
  'ever',
  'after',
  'work_is',
  'over'
];

DaftPunk.playSound = function() {
  var el = document.getElementById(this.getAttribute('id'));
  var sound = this.getAttribute('id');
  var soundSource = `../daft-punk/sounds/${sound}.wav`;
  var audioEl = el.firstChild;
  el.firstChild.setAttribute('src', soundSource);
  audioEl.play();
};

DaftPunk.createGrid = function() {
  var main = document.getElementsByClassName('mainGrid')[0];
  var grid = document.createElement('ul');
  main.appendChild(grid);

  for (var i = 0; i < DaftPunk.gridBase * DaftPunk.gridBase; i++) {
    var square = document.createElement('li');
    square.style.width = DaftPunk.width / DaftPunk.gridBase - 2 + 'px';
    square.style.height = DaftPunk.width / DaftPunk.gridBase - 2 + 'px';
    square.setAttribute('id', DaftPunk.sounds[i]);
    square.addEventListener('mouseover', DaftPunk.playSound, false);
    var audio = document.createElement('audio');
    square.appendChild(audio);
    grid.appendChild(square);
  }
};

DaftPunk.run = function() {
  DaftPunk.createGrid();
};

document.addEventListener('DOMContentLoaded', DaftPunk.run, false);
