import path from 'node:path';
import url from 'node:url';
import { readLines } from '../helpers/common.js';

const exampleMap = readLines(path.dirname(url.fileURLToPath(import.meta.url)), 'example');
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const inputMap = readLines(path.dirname(url.fileURLToPath(import.meta.url)), 'input');

const solve = (map: Array<string>) => {
  console.log('map', map);
};

console.log('Solve example:');
solve(exampleMap);
//console.log('\nSolve input:');
//solve(inputMap);
