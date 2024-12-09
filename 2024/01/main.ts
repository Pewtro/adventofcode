import path from 'node:path';
import url from 'node:url';
import { readLines } from '../../helpers/common.js';

const exampleMap = readLines(path.dirname(url.fileURLToPath(import.meta.url)), 'example');
const inputMap = readLines(path.dirname(url.fileURLToPath(import.meta.url)), 'input');

const solvePart1 = (input: Array<string>) => {
  const left: Array<number> = [];
  const right: Array<number> = [];
  for (const line of input) {
    const [l, r] = line.split('   ');
    if (!l || !r) {
      console.error('Invalid input', line);
      return;
    }
    left.push(Number.parseInt(l));
    right.push(Number.parseInt(r));
  }
  left.sort();
  right.sort();
  return left.reduce((accumulator, value, index) => accumulator + Math.abs(value - right[index]!), 0);
};
const solvePart2 = (input: Array<string>) => {
  const left: Array<number> = [];
  const right: Array<number> = [];
  for (const line of input) {
    const [l, r] = line.split('   ');
    if (!l || !r) {
      console.error('Invalid input', line);
      return;
    }
    left.push(Number.parseInt(l));
    right.push(Number.parseInt(r));
  }
  //Create a map of occurences of each number in the right array
  const rightMap = new Map<number, number>();
  for (const r of right) {
    const occurences = rightMap.get(r) ?? 0;
    rightMap.set(r, occurences + 1);
  }
  //Go through the left array and multiply each value with number of occurences in the right array
  return left.reduce((accumulator, value) => accumulator + value * (rightMap.get(value) ?? 0), 0);
};

const solve = (map: Array<string>) => {
  return {
    part1: solvePart1(map),
    part2: solvePart2(map),
  };
};

console.log('Solve example:');
console.log(solve(exampleMap));
console.log('\nSolve input:');
console.log(solve(inputMap));
