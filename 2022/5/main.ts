import { readFileSync } from 'fs';

const inputName = 'input';
const input = readFileSync(`${__dirname}/tests/${inputName}.in`).toString();

const [rawStacks, instructions] = input.split('\n\n');

const stacks = [[]];

rawStacks.split('\n').forEach((stack) => {
  for (let i = 1; i < stack.length; i += 4) {
    if (stack[i] !== ' ') {
      stacks[(i - 1) / 4] = stacks[(i - 1) / 4] || [];
      stacks[(i - 1) / 4].push(stack[i]);
    }
  }
});

const getCratesOnTop = (fnStacks: string[][]) =>
  fnStacks.reduce((onTop: string, stack) => onTop.concat(stack[0]), '');

const part1Stacks = JSON.parse(JSON.stringify(stacks));
const part2Stacks = JSON.parse(JSON.stringify(stacks));

instructions.split('\n').forEach((instruction) => {
  const [amount, from, to] = instruction
    .split(/[A-Za-z]+/)
    .flatMap((val) => (val.trim().length > 0 ? [parseInt(val.trim())] : []));

  const moveItemsPart1 = part1Stacks[from - 1].splice(0, amount).reverse();
  part1Stacks[to - 1].unshift(...moveItemsPart1);

  const moveItemsPart2 = part2Stacks[from - 1].splice(0, amount);
  part2Stacks[to - 1].unshift(...moveItemsPart2);
});

console.log('------------ PART ONE ------------');
console.log('Crates on top', getCratesOnTop(part1Stacks));

console.log('------------ PART TWO ------------');
console.log('Crates on top', getCratesOnTop(part2Stacks));
