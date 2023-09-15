import fs from 'node:fs';

const file = fs.readFileSync('input.txt').toString().split('\n\n');

const requiredFields = {
  byr: function checkField(value: number) {
    return value >= 1920 && value <= 2002;
  },
  iyr: function checkField(value: number) {
    return value >= 2010 && value <= 2020;
  },
  eyr: function checkField(value: number) {
    return value >= 2020 && value <= 2030;
  },
  hgt: function checkField(value: string) {
    const lastTwoChars = value.slice(-2);
    if (lastTwoChars === 'cm') {
      const height = Number.parseInt(value.slice(0, 3));
      return height >= 150 && height <= 193;
    } else if (lastTwoChars === 'in') {
      const height = Number.parseInt(value.slice(0, 2));
      return height >= 59 && height <= 76;
    } else {
      return false;
    }
  },
  hcl: function checkField(value: string) {
    if (value.length !== 7) {
      return false;
    }
    if (!value.startsWith('#')) {
      return false;
    }
    const sixCharacters = value.slice(1, 7);
    const regex = /[\dA-Za-z]/g;
    return sixCharacters.match(regex)?.length === 6;
  },
  ecl: function checkField(value: string) {
    const regex = /(amb|blu|brn|gry|grn|hzl|oth)/g;
    return Boolean(regex.test(value));
  },
  pid: function checkField(value: string) {
    if (Number.isNaN(Number.parseInt(value))) {
      return false;
    }
    return !(value.length !== 9);
  },
};
let validPassports = 0;
const passportsPart2 = [];

//region Part 1
for (const possiblePassport of file) {
  let valid = true;
  for (const required of Object.keys(requiredFields)) {
    if (!possiblePassport.includes(required)) {
      valid = false;
    }
  }
  if (valid) {
    validPassports += 1;
    passportsPart2.push(possiblePassport);
  }
}

console.log('Part 1 answer:', validPassports);
//endregion

//region Part 2
//Since node.js doesn't support .replaceAll we make our own variant of it
function replaceAll(string: string, search: string, replace: string) {
  return string.split(search).join(replace);
}

const rulesToValidate = 7;
let validPassportsPart2 = 0;
for (const possiblePassport of passportsPart2) {
  let validatedFields = 0;
  //Some linebreaks still remain within each possible passport
  //this gets rid of those to have clean data
  const splitPass = replaceAll(possiblePassport, '\n', ' ').split(' ');

  for (const field of splitPass) {
    const splitField = field.split(':');
    const fieldName = splitField[0];
    if (fieldName === 'cid') {
      continue;
    }
    const fieldInfo = splitField[1];
    const function_ = requiredFields[fieldName as keyof typeof requiredFields];
    if (function_(fieldInfo as never)) {
      validatedFields += 1;
    }
  }
  if (validatedFields === rulesToValidate) {
    validPassportsPart2 += 1;
  }
}

console.log('Part 2 answer:', validPassportsPart2);
//endregion
