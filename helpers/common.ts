import { readFileSync } from 'node:fs';

export const readLines = (folderPath: string, filename: 'example' | 'input'): Array<string> => {
  const input = readFileSync(`${folderPath}/tests/${filename}.in`).toString();

  return input.split('\n');
};
