import { readFileSync } from 'fs';

const inputName = 'input';
const input = readFileSync(`${__dirname}/tests/${inputName}.in`).toString();

const pairs = input.split('\n').map((val) => val.split(','));

//part one
let assignmentPairsToReconsider = 0;
//part two
let hasAnyOverlaps = 0;

pairs.forEach((pair) => {
  const [elf1, elf2] = pair;
  const [elf1lower, elf1upper] = elf1.split('-').flatMap((val) => [parseInt(val)]);
  const [elf2lower, elf2upper] = elf2.split('-').flatMap((val) => [parseInt(val)]);

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
});

console.log('------------ PART ONE ------------');
console.log(`Assignment pairs to reconsider: ${assignmentPairsToReconsider}`);

console.log('------------ PART TWO ------------');
console.log(`Amount of pairs with any overlaps: ${hasAnyOverlaps}`);
