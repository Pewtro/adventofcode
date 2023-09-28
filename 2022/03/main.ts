import { readFileSync } from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const inputName = 'input';
const input = readFileSync(`${path.dirname(url.fileURLToPath(import.meta.url))}/tests/${inputName}.in`).toString();

const rucksacks = input.split('\n');

const getCharacterValue = (char: string) => {
  if (char.length !== 1) {
    throw new Error(`Expected a single character, got ${char} with length of ${char.length}`);
  }
  return char === char.toLowerCase() ? char.codePointAt(0) ?? 0 - 96 : char.codePointAt(0) ?? 0 - 38;
};

let summedPriorities = 0;
for (const [index, rucksack] of rucksacks.entries()) {
  const splitPoint = rucksack.length / 2;
  const [compartment1, compartment2] = [rucksack.slice(0, splitPoint), rucksack.slice(splitPoint)];
  const checkedValues: Array<string> = [];
  for (let index_ = 0; index_ < compartment1.length; index_++) {
    const char = compartment1.charAt(index_);
    if (checkedValues.includes(char)) {
      continue;
    }
    if (compartment2.includes(char)) {
      console.log(`Found match for "${char}" in rucksack ${index + 1}`);
      summedPriorities += getCharacterValue(char);
    }
    checkedValues.push(char);
  }
}

console.log('------------ PART ONE ------------');
console.log(`The sum of the priorities is: ${summedPriorities}`);

let summedPrioritiesBadges = 0;
let groupedRucksacks = [];
for (const [index, rucksack] of rucksacks.entries()) {
  if (index % 3 === 0) {
    groupedRucksacks = [];
  }
  const checkedValues: Array<string> = [];
  groupedRucksacks.push(rucksack);
  if (groupedRucksacks.length === 3) {
    for (let innerindex = 0; innerindex < rucksack.length; innerindex++) {
      const char = rucksack.charAt(innerindex);
      if (checkedValues.includes(char)) {
        continue;
      }
      if (groupedRucksacks[0].includes(char) && groupedRucksacks[1].includes(char)) {
        summedPrioritiesBadges += getCharacterValue(char);
      }
      checkedValues.push(char);
    }
  }
}
console.log('------------ PART TWO ------------');
console.log(`The sum of the priority badges is: ${summedPrioritiesBadges}`);
