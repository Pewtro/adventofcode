#!/usr/bin/env node
import * as readline from 'node:readline';
import { stdin, stdout } from 'node:process';

//Hack to avoid error #donthate
const rl = readline.createInterface(
  stdin as unknown as NodeJS.ReadableStream,
  stdout as unknown as NodeJS.WritableStream,
);

const debug = false;
//Keep track of the current problem being solved
const caseTracker = {
  count: 0,
  inc() {
    this.count += 1;
  },
  threeSumCount: 0,
  threeSumInc() {
    this.threeSumCount += 1;
  },
};

let lineCount = 0;
let previousLineValue = 0;
let previousThreeSumValue = 0;
const threeSumArray: [number, number, number] = [0, 0, 0];

const lineTracker = {
  set(newValue: number) {
    previousLineValue = newValue;
  },
  getLineCount() {
    this.incLineCount();
    return lineCount;
  },
  incLineCount() {
    lineCount += 1;
  },
  calc() {
    const valueToCheck = previousThreeSumValue ?? 0;
    debug && console.log('sum', this.sum(), 'prevThreeSumVal', previousThreeSumValue, this.sum() > valueToCheck);
    return this.sum() > valueToCheck;
  },
  shift(newValue: number) {
    previousThreeSumValue = this.sum();
    threeSumArray.shift();
    threeSumArray.push(newValue);
  },
  sum(): number {
    return threeSumArray.reduce((total, value) => (total ?? 0) + (value ?? 0), 0);
  },
};

//Solver that executes on a line by line basis
rl.on('line', function (line) {
  //Ensure current line is a number
  const lineValue = Number.parseInt(line);

  //Part one
  if (previousLineValue && lineValue > previousLineValue) {
    caseTracker.inc();
  }
  lineTracker.set(lineValue);

  //Part two
  lineTracker.shift(lineValue);
  if (lineTracker.getLineCount() >= 4 && lineTracker.calc()) {
    caseTracker.threeSumInc();
  }
}).on('close', function () {
  //Throw out result
  console.log('Part one increments:', caseTracker.count);
  console.log('Part two increments:', caseTracker.threeSumCount);
  //exit with code 0
  process.exit(0);
});
