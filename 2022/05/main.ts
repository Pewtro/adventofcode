import { readFileSync } from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const inputName = 'input';
const input = readFileSync(`${path.dirname(url.fileURLToPath(import.meta.url))}/tests/${inputName}.in`).toString();

const [rawStacks, instructions] = input.split('\n\n');

const getStacks = () => {
  const stacks: Array<Array<string>> = [[]];
  if (!rawStacks) {
    return stacks;
  }
  for (const stack of rawStacks.split('\n')) {
    for (let index = 1; index < stack.length; index += 4) {
      if (stack[index] !== ' ') {
        const temporaryStacksArray = stacks[(index - 1) / 4] ?? [];
        const currentStack = stack[index];
        if (currentStack) {
          temporaryStacksArray.push(currentStack);
        }
        stacks[(index - 1) / 4] = temporaryStacksArray;
      }
    }
  }
  return stacks;
};

const getCratesOnTop = (functionStacks: Array<Array<string>>) => {
  //Loop through functionStacks and return first instance of each inner array
  return functionStacks.map((stack) => stack[0]).join('');
  //  functionStacks.reduce((onTop: string, stack) => onTop.concat(stack[0]), '');
};

const part1Stacks = getStacks();
const part2Stacks = getStacks();

if (instructions) {
  for (const instruction of instructions.split('\n')) {
    const [amount, from, to] = instruction
      .split(/[A-Za-z]+/)
      .flatMap((value) => (value.trim().length > 0 ? [Number.parseInt(value.trim())] : []));

    if (to && from) {
      const moveItemsPart1 = part1Stacks[from - 1]?.splice(0, amount).reverse();
      const previousPart1Stacks = part1Stacks[to - 1];
      if (moveItemsPart1 && previousPart1Stacks) {
        previousPart1Stacks.unshift(...moveItemsPart1);
      }

      const moveItemsPart2 = part2Stacks[from - 1]?.splice(0, amount);
      const previousPart2Stacks = part2Stacks[to - 1];
      if (moveItemsPart2 && previousPart2Stacks) {
        previousPart2Stacks.unshift(...moveItemsPart2);
      }
    }
  }
}
console.log('------------ PART ONE ------------');
console.log('Crates on top', getCratesOnTop(part1Stacks));

console.log('------------ PART TWO ------------');
console.log('Crates on top', getCratesOnTop(part2Stacks));
