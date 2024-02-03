import { readFileSync } from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const inputName = 'input';
const input = readFileSync(`${path.dirname(url.fileURLToPath(import.meta.url))}/tests/${inputName}.in`).toString();

const pairs = input.split('\n').map((value) => value.split(','));

//part one
let assignmentPairsToReconsider = 0;
//part two
let hasAnyOverlaps = 0;

for (const pair of pairs) {
  const [elf1, elf2] = pair;
  if (!elf1 || !elf2) {
    continue;
  }
  const [elf1lower, elf1upper] = elf1.split('-').flatMap((value) => [Number.parseInt(value)]);
  const [elf2lower, elf2upper] = elf2.split('-').flatMap((value) => [Number.parseInt(value)]);

  if (!elf1lower || !elf1upper || !elf2lower || !elf2upper) {
    continue;
  }

  const isElf1ContainedInElf2 = elf1lower >= elf2lower && elf1upper <= elf2upper;
  const isElf2ContainedInElf1 = elf2lower >= elf1lower && elf2upper <= elf1upper;
  if (isElf1ContainedInElf2 || isElf2ContainedInElf1) {
    assignmentPairsToReconsider += 1;
  }

  //part 2
  const Elf1OverlapWithElf2 = elf1lower >= elf2lower && elf1lower <= elf2upper;
  const Elf2OverlapWithElf2 = elf2lower >= elf1lower && elf2lower <= elf1upper;

  if (Elf1OverlapWithElf2 || Elf2OverlapWithElf2) {
    hasAnyOverlaps += 1;
  }
}

console.log('------------ PART ONE ------------');
console.log(`Assignment pairs to reconsider: ${assignmentPairsToReconsider}`);

console.log('------------ PART TWO ------------');
console.log(`Amount of pairs with any overlaps: ${hasAnyOverlaps}`);
