import { readFileSync } from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const input = readFileSync(path.dirname(url.fileURLToPath(import.meta.url)) + '/tests/input.in').toString();

const debugInput = false;
const debugGeneral = false;

const guesses: Array<number> = input
  .split('\n')[0]
  .trim()
  .split(',')
  .map((guess) => Number.parseInt(guess));
debugInput && console.log(guesses);

type Board = Array<Array<number>>;

const boards: Array<Board> = input
  .split('\n')
  .splice(2)
  .join('\n')
  .split('\n\n')
  .map((board) => {
    return board.split('\n').map((row) => {
      return row
        .trim()
        .split(/\s+/)
        .map((value) => Number.parseInt(value));
    });
  });
debugInput && console.log(boards);

const checkColumns = (board: Board) => {
  let hasWinner = false;
  for (let index = 0; index < board[0].length; index++) {
    const columnValues: Array<number> = [];
    for (const row of board) {
      columnValues.push(row[index]);
    }

    if (columnValues.filter((value) => value === -1).length === columnValues.length) {
      hasWinner = true;
    }
  }
  return hasWinner;
};

const calculateScore = (board: Board, guess: number) => {
  const filteredBoard = board.flat().filter((value) => value > -1);
  const boardSum = filteredBoard.reduce((a, b) => a + b);

  return boardSum * guess;
};

const winningBoards: Array<number> = [];
for (const guess of guesses) {
  for (const [boardIndex, board] of boards.entries()) {
    for (const row of board) {
      const valueIndex = row.indexOf(guess);
      if (valueIndex !== -1) {
        row[valueIndex] = -1;
      }
      if ((row.every((x) => x === -1) || checkColumns(board)) && !winningBoards.includes(boardIndex)) {
        debugGeneral && console.log('Winner found in', board);
        winningBoards.push(boardIndex);
        debugGeneral && console.log('score for board', boardIndex, 'is', calculateScore(board, guess));
        if (winningBoards.length === 1) {
          console.log('Part one answer', calculateScore(board, guess));
        } else if (winningBoards.length === boards.length) {
          console.log('Part two answer', calculateScore(board, guess));
        }
      }
    }
  }
}
