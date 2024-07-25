import { readFileSync } from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const inputName = 'input';
const input = readFileSync(`${path.dirname(url.fileURLToPath(import.meta.url))}/tests/${inputName}.in`).toString();

const splitInput = input.split('\n');

const numbers: Array<number> = [];

for (const line of splitInput) {
  const splitLine = [...line];
  // eslint-disable-next-line unicorn/no-array-callback-reference
  const firstDigit = splitLine.find(Number) ?? 0;
  splitLine.reverse();
  // eslint-disable-next-line unicorn/no-array-callback-reference
  const lastDigit = splitLine.find(Number) ?? 0;
  numbers.push(Number(`${firstDigit}${lastDigit}`));
}

console.log('Part 1');
console.log(numbers.reduce((a, b) => a + b, 0));

const NumberWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'] as const;

const wordToNumberMap: Record<(typeof NumberWords)[number], number> = {
  eight: 8,
  five: 5,
  four: 4,
  nine: 9,
  one: 1,
  seven: 7,
  six: 6,
  three: 3,
  two: 2,
};

const numbersPart2: Array<number> = [];
for (const line of splitInput) {
  const splitLine = [...line];

  // eslint-disable-next-line unicorn/no-array-callback-reference
  const firstDigitIndex = splitLine.findIndex(Number);
  const reverseSplitLine = [...splitLine].reverse();
  // eslint-disable-next-line unicorn/no-array-callback-reference
  const lastDigit = reverseSplitLine.find(Number);
  const lastDigitIndex = lastDigit ? splitLine.lastIndexOf(lastDigit) : 0;

  let firstWordIndex: number = line.length;
  let firstWord = '';
  let lastWordIndex = 0;
  let lastWord = '';

  for (const numberword of NumberWords) {
    const firstIndex = line.indexOf(numberword);
    if (firstIndex <= firstWordIndex && firstIndex >= 0) {
      firstWordIndex = firstIndex;
      firstWord = numberword;
    }

    const lastIndex = line.lastIndexOf(numberword);
    if (lastIndex >= lastWordIndex) {
      lastWordIndex = lastIndex;
      lastWord = numberword;
    }
  }

  const firstDigit =
    firstDigitIndex < firstWordIndex && firstDigitIndex >= 0
      ? splitLine[firstDigitIndex]
      : wordToNumberMap[firstWord as (typeof NumberWords)[number]];
  const secondDigit =
    lastDigitIndex >= lastWordIndex && lastDigitIndex >= 0
      ? splitLine[lastDigitIndex]
      : wordToNumberMap[lastWord as (typeof NumberWords)[number]];

  numbersPart2.push(Number(`${firstDigit}${secondDigit}`));
}

console.log('Part 2');
console.log(numbersPart2.reduce((a, b) => a + b, 0));
