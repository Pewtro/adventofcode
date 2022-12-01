import fs = require('fs');

const file = fs.readFileSync('input.txt').toString().split('\n\n');

//Since node.js doesn't support .replaceAll we make our own variant of it
function replaceAll(string: string, search: string, replace: string) {
  return string.split(search).join(replace);
}

//region Part 1
let sumOfCount = 0;
for (let travelGroup of file) {
  travelGroup = replaceAll(travelGroup, '\n', '');
  const matchedLetters = [];
  for (let i = 0; i < travelGroup.length; i++) {
    if (!matchedLetters.includes(travelGroup[i])) {
      matchedLetters.push(travelGroup[i]);
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
  const letterCount = {};
  for (const idx in peopleInGroup) {
    if (peopleInGroup[idx].length === 0) {
      peopleInGroup.splice(parseInt(idx), 1);
      continue;
    }
    for (let i = 0; i < peopleInGroup[idx].length; i++) {
      if (letterCount[peopleInGroup[idx][i]]) {
        letterCount[peopleInGroup[idx][i]] += 1;
      } else {
        letterCount[peopleInGroup[idx][i]] = 1;
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
