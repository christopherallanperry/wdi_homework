// console.log('The JS file is connected');
var calcType = prompt('What type of calculator would you like to use: basic, advanced, mortgage, BMI, or trip?');

if (calcType) {
  switch (calcType) {
    case 'basic':
      var basicOperator = prompt('Which operation would you like to perform? You can choose from "+", "-", "*", or "/"');

      switch (basicOperator) {
        case '+': // Add second number to first number
          var addNum1 = prompt('Enter your first number');
          var addNum2 = prompt('Enter you second number');
          var addResult = parseFloat(addNum1) + parseFloat(addNum2);
          alert(addResult);
          break;
        case '-': // Subtract second number from first number
          var subtractNum1 = prompt('Enter your first number');
          var subtractNum2 = prompt('Enter you second number');
          var subtractResult = parseFloat(subtractNum1) - parseFloat(subtractNum2);
          alert(subtractResult);
          break;
        case '*': // Multiply first number by second number
          var multiplyNum1 = prompt('Enter your first number');
          var multiplyNum2 = prompt('Enter you second number');
          var multiplyResult = parseFloat(multiplyNum1) * parseFloat(multiplyNum2);
          alert(multiplyResult);
          break;
        case '/': // Divide first number by second number
          var divideNum1 = prompt('Enter your first number');
          var divideNum2 = prompt('Enter you second number');
          var divideResult = parseFloat(divideNum1) / parseFloat(divideNum2);
          alert(divideResult);
          break;
        default: // Error on incorrect operator being supplied
          alert('I\'m sorry, but that isn\'t a valid operator');
          break;
      }
      break;

    case 'advanced':
      var advancedOperator = prompt('Which operation would you like to perform? You can choose from "^8" or "sqrt"');
      switch (advancedOperator) {
        case '^8': // Return supplied number to power 8
          var powerNum = prompt('Enter a number');
          var powerResult = parseFloat(Math.pow(powerNum, 8));
          alert(powerResult);
          break;
        case 'sqrt': // Square Root of supplied number
          var rootNum = prompt('Enter a number');
          var rootResult = parseFloat(Math.sqrt(rootNum));
          alert(rootResult);
          break;
        default: // Error on incorrect operator being supplied
          alert('I\'m sorry, but that isn\'t a valid operator');
          break;
      }
      break;

    case 'mortgage':
      // Some calculation goes here
      alert('Work in progress'); // Temp message
      break;

    case 'BMI':
    // Some calculation goes here
      alert('Work in progress'); // Temp message
      break;

    case 'trip':
      // Some calculation goes here
      alert('Work in progress'); // Temp message
      break;

    default: // Error on incorrect calculator being supplied
      alert('I\'m sorry, we don\'t have that calculator available at the moment');
      break;
  }
} else {
  alert('You have not entered a calculator type. Please refresh the page and try again.');
}
