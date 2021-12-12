import { readFileSync } from "fs";

const input = readFileSync(__dirname + "/tests/input.in").toString();

const debugInput = false;
const debugGeneral = false;

const guesses: number[] = input
  .split("\n")[0]
  .trim()
  .split(",")
  .map((guess) => parseInt(guess));
debugInput && console.log(guesses);

type Board = number[][];

const boards: Board[] = input
  .split("\n")
  .splice(2)
  .join("\n")
  .split("\n\n")
  .map((board) => {
    return board.split("\n").map((row) => {
      return row
        .trim()
        .split(/\s+/)
        .map((value) => parseInt(value));
    });
  });
debugInput && console.log(boards);

const checkColumns = (board: Board) => {
  let hasWinner = false;
  for (let i = 0; i < board[0].length; i++) {
    let columnValues: number[] = [];
    board.forEach((row) => {
      columnValues.push(row[i]);
    });

    if (columnValues.filter((value) => value === -1).length === columnValues.length) {
      hasWinner = true;
    }
  }
  return hasWinner;
};

const calculateScore = (board: Board, guess: number) => {
  const filteredBoard = board.flat().filter((val) => val > -1);
  const boardSum = filteredBoard.reduce((a, b) => a + b);

  return boardSum * guess;
};

let winningBoards: number[] = [];
guesses.forEach((guess) => {
  boards.forEach((board, boardIndex) => {
    board.forEach((row) => {
      const valIdx = row.indexOf(guess);
      if (valIdx !== -1) {
        row[valIdx] = -1;
      }
      if ((row.every((x) => x === -1) || checkColumns(board)) && winningBoards.indexOf(boardIndex) === -1) {
        debugGeneral && console.log("Winner found in ", board);
        winningBoards.push(boardIndex);
        debugGeneral && console.log("score for board", boardIndex, "is", calculateScore(board, guess));
        if (winningBoards.length === 1) {
          console.log("Part one answer", calculateScore(board, guess));
        } else if (winningBoards.length === boards.length) {
          console.log("Part two answer", calculateScore(board, guess));
        }
      }
    });
  });
});
