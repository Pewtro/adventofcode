# Advent of Code

## Usage

Run `yarn nodemon ./runner.ts YEAR DAY`, e.g. `yarn nodemon ./runner.ts 2021 1` to execute the main.ts file inside 2021/1.

---

### All args:

| Arg # | Default | Explanation                                                                                     |
| ----- | ------- | ----------------------------------------------------------------------------------------------- |
| 1     | N/A     | This represents the year, which is the primary folder the script will look in                   |
| 2     | N/A     | This represents the day of the challenge, which is the secondary folder the script will look in |
| 3     | "main"  | This is the name of the script, assumed to be main                                              |
| 4     | "input" | This is the name of the main input in tests within the [year/day] folder                        |
| 5     | "ts"    | This is the extension of the script to be run, assumed to be .ts                                |
| 6     | "in"    | This is the extension of the test file to be run, assumed to be .in                             |

---
