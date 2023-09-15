import { readFileSync } from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const inputName = 'example';
const input = readFileSync(`${path.dirname(url.fileURLToPath(import.meta.url))}/tests/${inputName}.in`).toString();

console.log(input);
