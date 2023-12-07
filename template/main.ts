import { readFileSync } from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const solve = (fileName: 'example' | 'input') => {
  const input = readFileSync(`${path.dirname(url.fileURLToPath(import.meta.url))}/tests/${fileName}.in`).toString();

  console.log(input);
};

console.log('Solve example:');
solve('example');
//console.log('\nSolve input:');
//solve('input');
