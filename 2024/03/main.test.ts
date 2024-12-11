import { describe, expect, it } from 'vitest';
import { getMatches, getNumbersFromMatch, solvePart1, solvePart2 } from './main.js';

describe('getMatches', () => {
  it('should return an array of matches for valid input', () => {
    const line = 'mul(2,3) mul(4,5)';
    const result = getMatches(line);
    expect(result).toEqual(['mul(2,3)', 'mul(4,5)']);
  });

  it('should return an empty array for input with no matches', () => {
    const line = 'no matches here';
    const result = getMatches(line);
    expect(result).toEqual([]);
  });
});

describe('getNumbersFromMatch', () => {
  it('should return an array of numbers from a valid match', () => {
    const match = 'mul(2,3)';
    const result = getNumbersFromMatch(match);
    expect(result).toEqual([2, 3]);
  });

  it('should return an empty array for an invalid match', () => {
    const match = 'invalid';
    const result = getNumbersFromMatch(match);
    expect(result).toEqual([]);
  });
});

describe('solvePart1', () => {
  it('should return the correct sum for valid input', () => {
    const input = ['mul(2,3)', 'mul(4,5)'];
    const result = solvePart1(input);
    expect(result).toBe(26);
  });

  it('should return 0 for input with no valid matches', () => {
    const input = ['no matches here'];
    const result = solvePart1(input);
    expect(result).toBe(0);
  });
});

describe('solvePart2', () => {
  it('should return 0 as it is not implemented yet', () => {
    const input = ['any input'];
    const result = solvePart2(input);
    expect(result).toBe(0);
  });
  it('should return 48 for the example', () => {
    const input = ["xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"];
    const result = solvePart2(input);
    expect(result).toBe(48);
  });
});
