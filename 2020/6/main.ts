import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const inputName = 'input';

const file = fs
  .readFileSync(`${path.dirname(url.fileURLToPath(import.meta.url))}/tests/${inputName}.in`)
  .toString()
  .split('\n\n');

//Since node.js doesn't support .replaceAll we make our own variant of it
function replaceAll(string: string, search: string, replace: string) {
  return string.split(search).join(replace);
}

//region Part 1
let sumOfCount = 0;
for (let travelGroup of file) {
  travelGroup = replaceAll(travelGroup, '\n', '');
  const matchedLetters: Array<string> = [];
  for (const element of travelGroup) {
    if (!matchedLetters.includes(element)) {
      matchedLetters.push(element);
    }
  }
  sumOfCount += matchedLetters.length;
}
console.log(sumOfCount);
//endregion

//region Part 2
let sumOfCount2 = 0;
for (const travelGroup of file) {
  const peopleInGroup = travelGroup.split('\n');
  const letterCount: Record<string, number> = {};
  for (let index = 0; index < peopleInGroup.length; index++) {
    if (peopleInGroup[index]?.length === 0) {
      peopleInGroup.splice(index, 1);
      continue;
    }
    for (const person of peopleInGroup[index]!) {
      if (letterCount[person]) {
        letterCount[person] += 1;
      } else {
        letterCount[person] = 1;
      }
    }
  }
  for (const letter in letterCount) {
    if (letterCount[letter] === peopleInGroup.length) {
      sumOfCount2 += 1;
    }
  }
}
console.log(sumOfCount2);

//endregion
