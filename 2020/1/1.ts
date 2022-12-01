import fs = require('fs');

const goal = 2020;
let printed = false;
let printed2 = false;
const entryArray = fs.readFileSync('./1/1-input.txt').toString().split('\n');

for (const i in entryArray) {
  const firstNumber = parseInt(entryArray[i]);
  if (!firstNumber) {
    break;
  }

  for (const j in entryArray) {
    const secondNumber = parseInt(entryArray[j]);

    if (firstNumber + secondNumber === goal && !printed) {
      //console.log(firstNumber, secondNumber, thirdNumber, (firstNumber + secondNumber + thirdNumber))
      console.log(firstNumber * secondNumber);
      printed = true;
    }

    for (const k in entryArray) {
      const thirdNumber = parseInt(entryArray[k]);
      if (firstNumber + secondNumber + thirdNumber === goal && !printed2) {
        //console.log(firstNumber, secondNumber, thirdNumber, (firstNumber + secondNumber + thirdNumber))
        console.log(firstNumber * secondNumber * thirdNumber);
        printed2 = true;
      }
    }
  }
}
