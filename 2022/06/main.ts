import { readFileSync } from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import { hasDuplicates } from '../../helpers/array-helpers.js';

const inputName = 'input';
const input = readFileSync(`${path.dirname(url.fileURLToPath(import.meta.url))}/tests/${inputName}.in`).toString();

const findFirstUniqueNValues = (string_: string, n: number) => {
  const firstNCharacters = string_.slice(0, n);
  const firstNSplit = [...firstNCharacters];
  const remaining = string_.slice(n);

  for (let index = 0; index < remaining.length; index++) {
    if (!hasDuplicates(firstNSplit)) {
      //First marker identified
      return index + n;
    }
    firstNSplit.shift();
    firstNSplit.push(remaining.charAt(index));
  }
};

console.log('------------ PART ONE ------------');
console.log(`First marker found at ${findFirstUniqueNValues(input, 4)}`);

console.log('------------ PART TWO ------------');
console.log(`First marker found at ${findFirstUniqueNValues(input, 14)}`);
