import path from 'node:path';
import url from 'node:url';
import { readLines } from '../../helpers/common.js';

const map = readLines(path.dirname(url.fileURLToPath(import.meta.url)), 'input');

const directions = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
] as const;
const isAdjacentTo = (row: number, col: number, regex: RegExp): boolean =>
  directions
    .map(([index, index_]) => map[row + index]?.[col + index_])
    .filter((x) => x !== undefined)
    .some((char) => char && regex.test(char));

let part1 = 0;
const adjacentNumbersToSymbolsLookup: Record<string, { num: number; id: string }> = {};
for (const [row, value] of map.entries()) {
  for (const match of [...value.matchAll(/\d+/g)].filter((x) =>
    [...x[0]].some((_, index) => isAdjacentTo(row, (x.index ?? 0) + index, /[^\d.]/)),
  )) {
    part1 += Number.parseInt(match[0]);

    for (let index = 0; index < match[0].length; index++) {
      adjacentNumbersToSymbolsLookup[`${row};${(match.index ?? 0) + index}`] = {
        num: Number.parseInt(match[0]),
        id: `${row};${match.index}`,
      };
    }
  }
}

let part2 = 0;
for (const [row, value] of map.entries()) {
  for (const match of [...value.matchAll(/\*/g)].filter((m) => isAdjacentTo(row, m.index ?? 0, /\d/))) {
    const adjacentGearNumbers: Array<{ num: number; id: string }> = directions
      .map(([index, index_]) => adjacentNumbersToSymbolsLookup[`${row + index};${(match.index ?? 0) + index_}`])
      .flatMap((x) => (x === undefined ? [] : [x]));

    const gearNumbers = [...new Set(adjacentGearNumbers.map((x) => x?.id))].map((id) => {
      const gearNumber = adjacentGearNumbers.find((x) => x?.id === id);
      return gearNumber?.num ?? 0;
    });

    if (gearNumbers.length === 2) part2 += gearNumbers.reduce((accumulator, x) => accumulator * x, 1);
  }
}

console.log(`Part 1: ${part1}`);
console.log(`Part 2: ${part2}`);
