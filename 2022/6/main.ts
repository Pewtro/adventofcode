import { readFileSync } from 'fs';
import { hasDuplicates } from '../../helpers';

const inputName = 'input';
const input = readFileSync(`${__dirname}/tests/${inputName}.in`).toString();

const findFirstUniqueNValues = (str: string, n: number) => {
  const [firstN, remaining] = [str.slice(0, n).split(''), str.slice(n)];

  for (let i = 0; i < remaining.length; i++) {
    if (!hasDuplicates(firstN)) {
      //First marker identified
      return i + n;
    }
    firstN.shift();
    firstN.push(remaining.charAt(i));
  }
};

console.log('------------ PART ONE ------------');
console.log(`First marker found at ${findFirstUniqueNValues(input, 4)}`);

console.log('------------ PART TWO ------------');
console.log(`First marker found at ${findFirstUniqueNValues(input, 14)}`);
