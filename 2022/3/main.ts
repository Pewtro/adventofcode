import { readFileSync } from 'fs';

const inputName = 'input';
const input = readFileSync(`${__dirname}/tests/${inputName}.in`).toString();

const rucksacks = input.split('\n');

const getCharacterValue = (char: string) => {
  if (char.length !== 1) {
    throw Error(`Expected a single character, got ${char} with length of ${char.length}`);
  }
  if (char === char.toLowerCase()) {
    return char.charCodeAt(0) - 96;
  } else {
    return char.charCodeAt(0) - 38;
  }
};

let summedPriorities = 0;
rucksacks.forEach((rucksack, idx) => {
  const splitPoint = rucksack.length / 2;
  const [compartment1, compartment2] = [rucksack.slice(0, splitPoint), rucksack.slice(splitPoint)];
  const checkedValues = [];
  for (let i = 0; i < compartment1.length; i++) {
    const char = compartment1.charAt(i);
    if (checkedValues.includes(char)) {
      continue;
    }
    if (compartment2.includes(char)) {
      console.log(`Found match for "${char}" in rucksack ${idx + 1}`);
      summedPriorities += getCharacterValue(char);
    }
    checkedValues.push(char);
  }
});

console.log('------------ PART ONE ------------');
console.log(`The sum of the priorities is: ${summedPriorities}`);

let summedPrioritiesBadges = 0;
let groupedRucksacks = [];
rucksacks.forEach((rucksack, idx) => {
  if (idx % 3 === 0) {
    groupedRucksacks = [];
  }
  const checkedValues = [];
  groupedRucksacks.push(rucksack);
  if (groupedRucksacks.length === 3) {
    for (let i = 0; i < rucksack.length; i++) {
      const char = rucksack.charAt(i);
      if (checkedValues.includes(char)) {
        continue;
      }
      if (groupedRucksacks[0].includes(char) && groupedRucksacks[1].includes(char)) {
        summedPrioritiesBadges += getCharacterValue(char);
      }
      checkedValues.push(char);
    }
  }
});
console.log('------------ PART TWO ------------');
console.log(`The sum of the priority badges is: ${summedPrioritiesBadges}`);
