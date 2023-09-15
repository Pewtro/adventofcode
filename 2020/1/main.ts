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
  const firstNumber = Number.parseInt(entryArray[Number.parseInt(index)]);
  if (!firstNumber) {
    break;
  }

  for (const innerIndex of entryArray) {
    const secondNumber = Number.parseInt(entryArray[Number.parseInt(innerIndex)]);

    if (firstNumber + secondNumber === goal && !printed) {
      //console.log(firstNumber, secondNumber, thirdNumber, (firstNumber + secondNumber + thirdNumber))
      console.log(firstNumber * secondNumber);
      printed = true;
    }

    for (const k of entryArray) {
      const thirdNumber = Number.parseInt(entryArray[Number.parseInt(k)]);
      if (firstNumber + secondNumber + thirdNumber === goal && !printed2) {
        //console.log(firstNumber, secondNumber, thirdNumber, (firstNumber + secondNumber + thirdNumber))
        console.log(firstNumber * secondNumber * thirdNumber);
        printed2 = true;
      }
    }
  }
}
