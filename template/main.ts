import { readFileSync } from 'fs';

const inputName = 'example';
const input = readFileSync(`${__dirname}/tests/${inputName}.in`).toString();

console.log(input);
