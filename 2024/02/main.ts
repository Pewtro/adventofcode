import path from 'node:path';
import url from 'node:url';
import { readLines } from '../../helpers/common.js';

const exampleMap = readLines(path.dirname(url.fileURLToPath(import.meta.url)), 'example');
const inputMap = readLines(path.dirname(url.fileURLToPath(import.meta.url)), 'input');

export const isSafe = (report: Array<number>) => {
  let previousLevel = report[0]!;
  const typeProgression: 'decreasing' | 'increasing' = report[0]! < report[1]! ? 'increasing' : 'decreasing';

  for (let index = 1; index < report.length; index++) {
    const level = report[index]!;
    if (
      (typeProgression === 'increasing' && level <= previousLevel) ||
      (typeProgression === 'decreasing' && level >= previousLevel) ||
      level === previousLevel ||
      Math.abs(level - previousLevel) > 3
    ) {
      return false;
    }
    previousLevel = level;
  }

  return true;
};

export const solvePart1 = (input: Array<string>) => {
  let safeReports = input.length;
  for (const row of input) {
    const levels = row.split(' ').map((level) => Number.parseInt(level));
    if (!isSafe(levels)) {
      safeReports--;
    }
  }
  return safeReports;
};

export const solvePart2 = (input: Array<string>) => {
  let safeReports = input.length;
  for (const row of input) {
    const levels = row.split(' ').map((level) => Number.parseInt(level));
    //Create an array with all the permutations of the levels, where each permutation removes one level
    const levelsPermutations = levels.map((_, index) => levels.filter((__, index_) => index_ !== index));
    if (levelsPermutations.every((levelsPermutation) => !isSafe(levelsPermutation))) {
      safeReports--;
    }
  }
  return safeReports;
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
