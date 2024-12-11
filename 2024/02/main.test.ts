import { describe, expect, it } from 'vitest';
import { isSafe, solvePart1, solvePart2 } from './main.js';

describe('isSafe', () => {
  it('should return true for an increasing sequence within the limit', () => {
    const report = [1, 2, 3, 4];
    expect(isSafe(report)).toBe(true);
  });

  it('should return true for a decreasing sequence within the limit', () => {
    const report = [4, 3, 2, 1];
    expect(isSafe(report)).toBe(true);
  });

  it('should return false for a sequence with equal levels', () => {
    const report = [1, 1, 2, 3];
    expect(isSafe(report)).toBe(false);
  });

  it('should return false for a sequence with a level difference greater than 3', () => {
    const report = [1, 2, 6, 7];
    expect(isSafe(report)).toBe(false);
  });

  it('should return false for an increasing sequence that decreases', () => {
    const report = [1, 2, 3, 2];
    expect(isSafe(report)).toBe(false);
  });

  it('should return false for a decreasing sequence that increases', () => {
    const report = [4, 3, 2, 3];
    expect(isSafe(report)).toBe(false);
  });
});

describe('solvePart1', () => {
  it('should return the number of safe reports', () => {
    const input = ['1 2 3 4', '4 3 2 1', '1 1 2 3', '1 2 6 7'];
    expect(solvePart1(input)).toBe(2);
  });

  it('should return 0 if all reports are unsafe', () => {
    const input = ['1 1 2 3', '1 2 6 7', '1 2 3 2', '4 3 2 3'];
    expect(solvePart1(input)).toBe(0);
  });

  it('should return the total number of reports if all are safe', () => {
    const input = ['1 2 3 4', '4 3 2 1'];
    expect(solvePart1(input)).toBe(2);
  });

  it('should handle an empty input', () => {
    const input: Array<string> = [];
    expect(solvePart1(input)).toBe(0);
  });
});

describe('solvePart2', () => {
  it('should return the number of safe reports considering permutations', () => {
    const input = ['1 2 3 4', '4 3 2 1', '1 1 2 3', '1 2 6 7'];
    expect(solvePart2(input)).toBe(3);
  });

  it('should return 0 if all reports are unsafe considering permutations', () => {
    const input = ['1 1 2 3 7', '1 2 6 7', '1 2 3 2 1', '4 3 2 3 4'];
    expect(solvePart2(input)).toBe(0);
  });

  it('should return the total number of reports if all are safe considering permutations', () => {
    const input = ['1 2 3 4', '4 3 2 1'];
    expect(solvePart2(input)).toBe(2);
  });

  it('should handle an empty input', () => {
    const input: Array<string> = [];
    expect(solvePart2(input)).toBe(0);
  });
});
