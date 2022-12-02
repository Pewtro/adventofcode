import { readFileSync } from 'fs';

const inputName = 'input';
const input = readFileSync(`${__dirname}/tests/${inputName}.in`).toString();

const rounds = input.split('\n') as StrategyGuide[];

type OpponentOptions = 'A' | 'B' | 'C';
type PlayerOptions = 'X' | 'Y' | 'Z';
type StrategyGuide = `${OpponentOptions} ${PlayerOptions}`;

const outcomes: Record<StrategyGuide, number> = {
  'A X': 4, //rock + draw
  'A Y': 8, //paper + win
  'A Z': 3, //scissor + loss
  'B X': 1, //rock + loss
  'B Y': 5, //paper + draw
  'B Z': 9, //scissor + win
  'C X': 7, //rock + win
  'C Y': 2, //paper + loss
  'C Z': 6, //scissor + draw
};

const result = rounds.reduce((a, b: StrategyGuide) => a + outcomes[b], 0);

console.log('------------ PART ONE ------------');
console.log(`Following the strategy guides you gain ${result} points`);

const outcomesPartTwo: Record<StrategyGuide, number> = {
  'A X': 3, //lose ==> scissors
  'A Y': 4, //draw ==> rock
  'A Z': 8, //win ==> paper
  'B X': 1, //lose ==> rock
  'B Y': 5, //draw ==> paper
  'B Z': 9, //win ==> scissors
  'C X': 2, //lose ==> paper
  'C Y': 6, //draw ==> scissors
  'C Z': 7, //win ==> rock
};
const resultPartTwo = rounds.reduce((a, b: StrategyGuide) => a + outcomesPartTwo[b], 0);

console.log('------------ PART TWO ------------');
console.log(`Following the strategy guides you gain ${resultPartTwo} points`);
