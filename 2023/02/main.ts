import { readFileSync } from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const solve = (fileName: 'example' | 'input') => {
  const input = readFileSync(`${path.dirname(url.fileURLToPath(import.meta.url))}/tests/${fileName}.in`).toString();
  const splitInput = input.split('\n');

  const partOneCubesAvailable: Record<string, number> = { red: 12, green: 13, blue: 14 };
  let summedGameIds = 0;
  let summedPowerOfCubes = 0;
  for (const line of splitInput) {
    const [game, draws] = line.split(':');
    const [, gameId] = game!.split(' ');
    const drawsArray = draws!.split(';');

    const partTwoMinimumNeeded: Record<string, number> = { red: 0, green: 0, blue: 0 };

    let gameValid = true;
    for (const draw of drawsArray) {
      const cubes = draw.split(',').map((d) => d.trim());
      for (const cubeDraw of cubes) {
        const [amount, color] = cubeDraw.split(' ');

        const maxAmountOfColor = partOneCubesAvailable[color!]!;
        if (Number(amount) > maxAmountOfColor) {
          gameValid = false;
        }
        const minimumRequired = partTwoMinimumNeeded[color!]!;
        if (Number(amount) > minimumRequired) {
          partTwoMinimumNeeded[color!] = Number(amount);
        }
      }
    }
    if (gameValid) {
      summedGameIds += Number(gameId);
    }
    summedPowerOfCubes += partTwoMinimumNeeded.red! * partTwoMinimumNeeded.green! * partTwoMinimumNeeded.blue!;
  }

  console.log('Part one:', summedGameIds);
  console.log('Part two:', summedPowerOfCubes);
};

console.log('Solve example:');
solve('example');
console.log('\nSolve input:');
solve('input');
