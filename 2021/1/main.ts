import * as readline from "readline";
import { stdin, stdout } from "process";

//Hack to avoid error #donthate
const rl = readline.createInterface(
  stdin as unknown as NodeJS.ReadableStream,
  stdout as unknown as NodeJS.WritableStream
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

const lineTracker = {
  prevLineVal: null,
  set(newVal: number) {
    this.prevLineVal = newVal;
  },
  lineCount: 0,
  getLineCount() {
    this.incLineCount();
    return this.lineCount;
  },
  incLineCount() {
    this.lineCount += 1;
  },
  prevThreeSumVal: null,
  threeSumArr: [null, null, null],
  calc() {
    debug && console.log("sum", this.sum(), "prevThreeSumVal", this.prevThreeSumVal, this.sum() > this.prevThreeSumVal);
    return this.sum() > this.prevThreeSumVal;
  },
  shift(newVal: number) {
    this.prevThreeSumVal = this.sum();
    this.threeSumArr.shift();
    this.threeSumArr.push(newVal);
  },
  sum() {
    return this.threeSumArr.reduce((a, b) => a + b, 0);
  },
};

//Solver that executes on a line by line basis
rl.on("line", function (line) {
  //Ensure current line is a number
  const lineVal = parseInt(line);

  //Part one
  if (lineTracker.prevLineVal) {
    if (lineVal > lineTracker.prevLineVal) {
      caseTracker.inc();
    }
  }
  lineTracker.set(lineVal);

  //Part two
  lineTracker.shift(lineVal);
  if (lineTracker.getLineCount() >= 4) {
    if (lineTracker.calc()) {
      caseTracker.threeSumInc();
    }
  }
}).on("close", function () {
  //Throw out result
  console.log("Part one increments: ", caseTracker.count);
  console.log("Part two increments: ", caseTracker.threeSumCount);
  //exit with code 0
  process.exit(0);
});
