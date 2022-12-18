import { readFileSync } from 'fs';

const inputName = 'input';
const input = readFileSync(`${__dirname}/tests/${inputName}.in`).toString();

const treeGrid: number[][] = [];
const visibleTrees = new Set<string>();

const lines = input.split('\n');

lines.forEach((line) => treeGrid.push(line.split('').map(Number)));

//Check for visible trees on the x axis
for (let y = 0; y < treeGrid.length; y++) {
  const currentRow = treeGrid[y];
  let max = -1;
  //Check for visible trees from left to right
  for (let x = 0; x < currentRow.length; x++) {
    if (currentRow[x] > max) {
      max = currentRow[x];
      visibleTrees.add(`${x},${y}`);
    }
  }

  //Check for back visible trees from right to left
  max = -1;
  for (let x = currentRow.length - 1; x >= 0; x--) {
    if (currentRow[x] > max) {
      max = currentRow[x];
      visibleTrees.add(`${x},${y}`);
    }
  }
}

//Check for visible trees on the y axis
for (let x = 0; x < treeGrid[0].length; x++) {
  //Check for visible trees from top to bottom
  let max = -1;
  for (let y = 0; y < treeGrid.length; y++) {
    if (treeGrid[y][x] > max) {
      max = treeGrid[y][x];
      visibleTrees.add(`${x},${y}`);
    }
  }

  max = -1;
  //Check for visible trees from bottom to top
  for (let y = treeGrid.length - 1; y >= 0; y--) {
    if (treeGrid[y][x] > max) {
      max = treeGrid[y][x];
      visibleTrees.add(`${x},${y}`);
    }
  }
}

console.log('Visible trees: ', visibleTrees.size);

const calculateTreeViewScore = (x: number, y: number): number => {
  const treeHeight = treeGrid[y][x];

  let treesVisibleTop = 0;
  for (let i = y - 1; i >= 0; i--) {
    if (treeHeight > treeGrid[i][x]) {
      treesVisibleTop++;
    } else {
      treesVisibleTop++;
      break;
    }
  }
  let treesVisibleBottom = 0;
  for (let i = y + 1; i < treeGrid.length; i++) {
    if (treeHeight > treeGrid[i][x]) {
      treesVisibleBottom++;
    } else {
      treesVisibleBottom++;
      break;
    }
  }
  let treesVisibleLeft = 0;
  for (let i = x - 1; i >= 0; i--) {
    if (treeHeight > treeGrid[y][i]) {
      treesVisibleLeft++;
    } else {
      treesVisibleLeft++;
      break;
    }
  }
  let treesVisibleRight = 0;
  for (let i = x + 1; i < treeGrid[y].length; i++) {
    if (treeHeight > treeGrid[y][i]) {
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

for (let y = 0; y < treeGrid.length; y++) {
  for (let x = 0; x < treeGrid[y].length; x++) {
    if (visibleTrees.has(`${x},${y}`)) {
      const score = calculateTreeViewScore(x, y);
      if (score > maxTreeViewScore) {
        maxTreeViewScore = score;
      }
    }
  }
}

console.log('Max tree view score: ', maxTreeViewScore);
