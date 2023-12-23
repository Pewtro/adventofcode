import path from 'node:path';
import url from 'node:url';
import { readLines } from '../../helpers/common.js';

const exampleMap = readLines(path.dirname(url.fileURLToPath(import.meta.url)), 'example');
const inputMap = readLines(path.dirname(url.fileURLToPath(import.meta.url)), 'input');

const solve = (map: Array<string>) => {
  let sum = 0;
  const scratchCards: Array<number> = [];
  for (const [lineIndex, line] of map.entries()) {
    const [, numbers] = line.split(':');
    const [winningNumbers, myNumbers] = numbers!
      .split('|')
      .map((x) => x.split(' ').flatMap((y) => (Number(y) > 0 ? [Number(y)] : [])));

    const amountOfWinningNumbers = winningNumbers!.filter((x) => myNumbers!.includes(x)).length;

    scratchCards[lineIndex] = (scratchCards[lineIndex] ?? 0) + 1;
    const currentScratchCards = scratchCards[lineIndex]!;
    let cardValue = 0;
    //First winning number is worth 1, every next one doubles the card value
    for (let index = 0; index < amountOfWinningNumbers; index++) {
      cardValue = cardValue === 0 ? 1 : cardValue * 2;

      const futureScratchCardIndex = lineIndex + index + 1;
      if (scratchCards[futureScratchCardIndex] === undefined) {
        scratchCards[futureScratchCardIndex] = currentScratchCards;
      } else {
        scratchCards[futureScratchCardIndex] += currentScratchCards;
      }
    }

    sum += cardValue;
  }
  console.log('Part one', sum);
  console.log(
    'Part two',
    scratchCards.reduce((accumulator, x) => accumulator + (x ?? 1), 0),
  );
};

console.log('Solve example:');
solve(exampleMap);
console.log('\nSolve input:');
solve(inputMap);
