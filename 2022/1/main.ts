import { readFileSync } from 'fs';
import { getMaxNthValues } from '../../helpers';

const inputName = 'input';
const input = readFileSync(`${__dirname}/tests/${inputName}.in`).toString();

const amountsCarried = input
  .split('\r\n\r\n')
  .filter((untrimmed) => untrimmed.trim().length > 0)
  .map((val) =>
    val
      .split('\r\n')
      .map((e) => parseInt(e))
      .reduce((a, b) => a + b),
  );
const highestAmount = amountsCarried.reduce((a, b) => {
  if (b > a) {
    return b;
  } else {
    return a;
  }
});

console.log('------------ PART ONE ------------');
console.log('The highest single amount is:', highestAmount);

const threeHighestAmounts = getMaxNthValues(amountsCarried, 3);
const threeHighestSummed = threeHighestAmounts.reduce((a, b) => a + b);
console.log('------------ PART TWO ------------');
console.log('Three highest values:', threeHighestAmounts);
console.log('Summed up:', threeHighestSummed);
