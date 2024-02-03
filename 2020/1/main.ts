import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const goal = 2020;
let printed = false;
let printed2 = false;
const inputName = 'input';

const entryArray = fs
  .readFileSync(`${path.dirname(url.fileURLToPath(import.meta.url))}/tests/${inputName}.in`)
  .toString()
  .split('\n');

for (const index of entryArray) {
  const firstValue = entryArray[Number.parseInt(index)];
  if (!firstValue) {
    break;
  }
  const firstNumber = Number.parseInt(firstValue);
  if (!firstNumber) {
    break;
  }

  for (const innerIndex of entryArray) {
    const secondValue = entryArray[Number.parseInt(innerIndex)];
    if (!secondValue) {
      break;
    }
    const secondNumber = Number.parseInt(secondValue);

    if (firstNumber + secondNumber === goal && !printed) {
      //console.log(firstNumber, secondNumber, thirdNumber, (firstNumber + secondNumber + thirdNumber))
      console.log(firstNumber * secondNumber);
      printed = true;
    }

    for (const k of entryArray) {
      const thirdValue = entryArray[Number.parseInt(k)];
      if (!thirdValue) {
        break;
      }
      const thirdNumber = Number.parseInt(thirdValue);
      if (firstNumber + secondNumber + thirdNumber === goal && !printed2) {
        //console.log(firstNumber, secondNumber, thirdNumber, (firstNumber + secondNumber + thirdNumber))
        console.log(firstNumber * secondNumber * thirdNumber);
        printed2 = true;
      }
    }
  }
}
