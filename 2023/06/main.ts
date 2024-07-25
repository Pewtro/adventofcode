import path from 'node:path';
import url from 'node:url';
import { readLines } from '../../helpers/common.js';

const exampleMap = readLines(path.dirname(url.fileURLToPath(import.meta.url)), 'example');
const inputMap = readLines(path.dirname(url.fileURLToPath(import.meta.url)), 'input');

interface Race {
  distance: number;
  time: number;
}

const parseLine = (input: string): Array<number> => {
  return input
    ?.trim()
    ?.split(' ')
    .flatMap((x) => (Number.isNaN(Number.parseInt(x, 10)) ? [] : Number.parseInt(x, 10)));
};

const parseRaces = (input: Array<string>) => {
  const times = parseLine(input[0]!);
  const distances = parseLine(input[1]!);

  const races: Array<Race> = [];
  for (const [index, time] of times.entries()) {
    races.push({
      distance: distances[index]!,
      time: time,
    });
  }

  return races;
};
const solvePart1 = (input: Array<Race>) => {
  const waysToWin: Array<number> = [];
  for (const race of input) {
    const { distance, time } = race;
    let options = 0;
    for (let timeSpentHolding = 0; timeSpentHolding < time; timeSpentHolding++) {
      const timeSpentSailing = time - timeSpentHolding;
      const speed = timeSpentHolding;
      const distanceTravelled = timeSpentSailing * speed;
      if (distanceTravelled > distance) {
        options++;
      }
    }
    waysToWin.push(options);
  }
  return waysToWin.reduce((a, b) => a * b, 1);
};
const solvePart2 = (input: Array<Race>) => {
  const time = Number(input.reduce((a, b) => `${a}` + `${b.time}`, ''));
  const distance = Number(input.reduce((a, b) => `${a}` + `${b.distance}`, ''));
  let options = 0;
  for (let timeSpentHolding = 0; timeSpentHolding < time; timeSpentHolding++) {
    const timeSpentSailing = time - timeSpentHolding;
    const speed = timeSpentHolding;
    const distanceTravelled = timeSpentSailing * speed;
    if (distanceTravelled > distance) {
      options++;
    }
  }
  return options;
};
const solve = (map: Array<string>) => {
  const races = parseRaces(map);
  return {
    part1: solvePart1(races),
    part2: solvePart2(races),
  };
};

console.log('Solve example:');
console.log(solve(exampleMap));
console.log('\nSolve input:');
console.log(solve(inputMap));
