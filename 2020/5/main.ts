import fs = require('fs');

const file = fs.readFileSync('input.txt').toString().split('\n');

let currentHighestId = 0;
const seatIds = [];

//region Part 1
for (const seats of file) {
  if (seats.length === 0) {
    continue;
  }
  const seatRow = seats.slice(0, 7);

  let lowerRow = 0;
  let upperRow = 127;
  for (const char of seatRow) {
    if (char === 'F') {
      upperRow = upperRow - (upperRow + 1 - lowerRow) / 2;
    } else {
      lowerRow = lowerRow + (upperRow + 1 - lowerRow) / 2;
    }
  }
  const selectedSeatRow = Math.min(upperRow, lowerRow);

  let lowerColumn = 0;
  let upperColumn = 7;
  const seatColumn = seats.slice(7, 10);
  for (const char of seatColumn) {
    if (char === 'L') {
      upperColumn = upperColumn - (upperColumn + 1 - lowerColumn) / 2;
    } else {
      lowerColumn = lowerColumn + (upperColumn + 1 - lowerColumn) / 2;
    }
  }

  const selectedSeatColumn = Math.min(upperColumn, lowerColumn);

  const seatId = selectedSeatRow * 8 + selectedSeatColumn;
  if (seatId > currentHighestId) {
    currentHighestId = seatId;
  }

  seatIds.push(seatId);
}

console.log('The highest seatID is: ', currentHighestId);

//endregion

//region Part 2

function compareNumbers(a: number, b: number) {
  return a - b;
}

seatIds.sort(compareNumbers);

const possibleSeatIds = [];
let lastSeatId = 0;
for (let i = 0; i < seatIds.length; i++) {
  if (seatIds[i] > lastSeatId + 1 && seatIds[i] >= 8) {
    possibleSeatIds.push(lastSeatId, seatIds[i]);
  }
  lastSeatId = seatIds[i];
}
console.log('The only seatIDs with noone between them are: ', possibleSeatIds);
console.log('My seatIDs must be:', (possibleSeatIds[1] + possibleSeatIds[0]) / 2);
//endregion
