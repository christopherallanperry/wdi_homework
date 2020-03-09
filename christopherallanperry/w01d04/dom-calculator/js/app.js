function calcResult(e) {
  'use strict';
  e.preventDefault();
  // number fields still need to be validated as numbers
  var num1 = parseFloat(document.getElementById('js_firstNum').value);
  var num2 = parseFloat(document.getElementById('js_secondNum').value);
  var opChar = document.getElementById('js_operatorSelect').value;
  var answer;

  switch (opChar) {
    case 'plus':
      answer = num1 + num2;
      break;
    case 'minus':
      answer = num1 - num2;
      break;
    case 'multiply':
      answer = num1 * num2;
      break;
    case 'divide':
      answer = num1 / num2;
      break;
    default:
      document.getElementById('js_result').innerHTML = 'There has been an error: Please click the clear button';
      break;
  }
  document.getElementById('js_result').innerHTML = answer;
}

function resetCalc() {
  'use strict';
  document.getElementById('js_firstNum').value = '';
  document.getElementById('js_secondNum').value = '';
  document.getElementById('js_operatorSelect').value = '+'; // clears  input, but doesn't reset to '+'
  document.getElementById('js_result').innerHTML = '';
}

function init() {
  'use strict';
  document.getElementById('js_calculator').addEventListener('submit', calcResult, false);
  document.getElementById('js_clear').addEventListener('click', resetCalc, false);
}

document.addEventListener('DOMContentLoaded', init, false);
