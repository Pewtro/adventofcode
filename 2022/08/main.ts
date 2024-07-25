import { readFileSync } from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const inputName = 'input';
const input = readFileSync(`${path.dirname(url.fileURLToPath(import.meta.url))}/tests/${inputName}.in`).toString();

const treeGrid: Array<Array<number>> = [];
const visibleTrees = new Set<string>();

const lines = input.split('\n');

for (const line of lines) treeGrid.push([...line].map(Number));

//Check for visible trees on the x axis
for (const [y, currentRow] of treeGrid.entries()) {
  let max = -1;
  //Check for visible trees from left to right
  for (const [x, element] of currentRow.entries()) {
    if (element > max) {
      max = element;
      visibleTrees.add(`${x},${y}`);
    }
  }

  //Check for back visible trees from right to left
  max = -1;
  for (let x = currentRow.length - 1; x >= 0; x--) {
    if (currentRow[x]! > max) {
      max = currentRow[x]!;
      visibleTrees.add(`${x},${y}`);
    }
  }
}

//Check for visible trees on the y axis
for (let x = 0; x < treeGrid[0]!.length; x++) {
  //Check for visible trees from top to bottom
  let max = -1;
  for (const [y, element] of treeGrid.entries()) {
    if (element[x]! > max) {
      max = element[x]!;
      visibleTrees.add(`${x},${y}`);
    }
  }

  max = -1;
  //Check for visible trees from bottom to top
  for (let y = treeGrid.length - 1; y >= 0; y--) {
    if (treeGrid[y]![x]! > max) {
      max = treeGrid[y]![x]!;
      visibleTrees.add(`${x},${y}`);
    }
  }
}

console.log('Visible trees:', visibleTrees.size);

const calculateTreeViewScore = (x: number, y: number): number => {
  const treeHeight = treeGrid[y]![x]!;

  let treesVisibleTop = 0;
  for (let index = y - 1; index >= 0; index--) {
    if (treeHeight > treeGrid[index]![x]!) {
      treesVisibleTop++;
    } else {
      treesVisibleTop++;
      break;
    }
  }
  let treesVisibleBottom = 0;
  for (let index = y + 1; index < treeGrid.length; index++) {
    if (treeHeight > treeGrid[index]![x]!) {
      treesVisibleBottom++;
    } else {
      treesVisibleBottom++;
      break;
    }
  }
  let treesVisibleLeft = 0;
  for (let index = x - 1; index >= 0; index--) {
    if (treeHeight > treeGrid[y]![index]!) {
      treesVisibleLeft++;
    } else {
      treesVisibleLeft++;
      break;
    }
  }
  let treesVisibleRight = 0;
  for (let index = x + 1; index < treeGrid[y]!.length; index++) {
    if (treeHeight > treeGrid[y]![index]!) {
      treesVisibleRight++;
    } else {
      treesVisibleRight++;
      break;
    }
  }

  return treesVisibleTop * treesVisibleBottom * treesVisibleLeft * treesVisibleRight;
};

//Loop through each tree and calculate their score
let maxTreeViewScore = 0;

for (const [y, element] of treeGrid.entries()) {
  for (let x = 0; x < element.length; x++) {
    if (visibleTrees.has(`${x},${y}`)) {
      const score = calculateTreeViewScore(x, y);
      if (score > maxTreeViewScore) {
        maxTreeViewScore = score;
      }
    }
  }
}

console.log('Max tree view score:', maxTreeViewScore);
