import { readFileSync } from 'node:fs';
import { getMaxNthValues } from '../../helpers/array-helpers.js';
import path from 'node:path';
import url from 'node:url';

const inputName = 'input';
const input = readFileSync(`${path.dirname(url.fileURLToPath(import.meta.url))}/tests/${inputName}.in`).toString();

const amountsCarried = input
  .split('\n\n')
  .filter((untrimmed) => untrimmed.trim().length > 0)
  .map((value) =>
    value
      .split('\n')
      .map((amount) => Number.parseInt(amount))
      .reduce((a, b) => a + b),
  );
const highestAmount = Math.max(...amountsCarried);

console.log('------------ PART ONE ------------');
console.log('The highest single amount is:', highestAmount);

const threeHighestAmounts = getMaxNthValues(amountsCarried, 3);
const threeHighestSummed = threeHighestAmounts.reduce((a, b) => a + b);
console.log('------------ PART TWO ------------');
console.log('Three highest values:', threeHighestAmounts);
console.log('Summed up:', threeHighestSummed);
