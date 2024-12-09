import path from 'node:path';
import url from 'node:url';
import { readLines } from '../../helpers/common.js';

const exampleMap = readLines(path.dirname(url.fileURLToPath(import.meta.url)), 'example');
const inputMap = readLines(path.dirname(url.fileURLToPath(import.meta.url)), 'input');

const solvePart1 = () => {
  return 0;
};
const solvePart2 = () => {
  return 0;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const solve = (map: Array<string>) => {
  return {
    part1: solvePart1(),
    part2: solvePart2(),
  };
};

console.log('Solve example:');
console.log(solve(exampleMap));
console.log('\nSolve input:');
console.log(solve(inputMap));
