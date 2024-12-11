import path from 'node:path';
import url from 'node:url';
import { readLines } from '../../helpers/common.js';

const exampleMap = readLines(path.dirname(url.fileURLToPath(import.meta.url)), 'example');
const inputMap = readLines(path.dirname(url.fileURLToPath(import.meta.url)), 'input');

export const getMatches = (line: string) => {
  const matches = [...line.matchAll(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g)];
  if (matches.length === 0) {
    return [];
  }
  return matches.map((match) => match[0]);
};

export const getNumbersFromMatch = (match: string) => {
  return match.match(/\d+/g)?.map(Number) ?? [];
};

export const solvePart1 = (input: Array<string>) => {
  let sum = 0;
  for (const line of input) {
    const matches = getMatches(line);
    for (const match of matches) {
      const [left, right] = getNumbersFromMatch(match);
      if (!left || !right) {
        continue;
      }
      sum += left * right;
    }
  }
  return sum;
};

export const solvePart2 = (input: Array<string>) => {
  let sum = 0;
  const matches = getMatches(input.join(''));
  let shouldSum = true;
  for (const match of matches) {
    if (match === 'do()') {
      shouldSum = true;
    } else if (match === "don't()") {
      shouldSum = false;
    } else if (shouldSum) {
      const [left, right] = getNumbersFromMatch(match);
      if (!left || !right) {
        continue;
      }
      sum += left * right;
    }
  }
  return sum;
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
