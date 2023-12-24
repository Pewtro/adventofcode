import { readFileSync } from 'node:fs';

export const readFile = (folderPath: string, filename: 'example' | 'input'): string => {
  return readFileSync(`${folderPath}/tests/${filename}.in`).toString();
};

export const readLines = (folderPath: string, filename: 'example' | 'input'): Array<string> => {
  const input = readFileSync(`${folderPath}/tests/${filename}.in`).toString();

  return input.split('\n');
};
