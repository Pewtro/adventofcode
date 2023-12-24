import path from 'node:path';
import url from 'node:url';
import { readFile } from '../../helpers/common.js';

const exampleMap = readFile(path.dirname(url.fileURLToPath(import.meta.url)), 'example');
const inputMap = readFile(path.dirname(url.fileURLToPath(import.meta.url)), 'input');

const exampleSolution = solve(readInput(exampleMap));
const solution = solve(readInput(inputMap));

console.log('example', exampleSolution);
console.log('solution', solution);

interface MapEntry {
  destinationRangeStart: number;
  sourceRangeStart: number;
  rangeLength: number;
}

type GardenMap = Array<MapEntry>;

interface InputData {
  seeds: Array<number>;
  maps: Array<GardenMap>;
}

function readInput(input: string): InputData {
  const inputLines = input.replaceAll('\r\n', '\n').split('\n');
  const [seedsLine, ...otherLines] = inputLines;
  const seeds: Array<number> = parseNumbers(seedsLine?.split(':')[1]);
  const maps: Array<GardenMap> = [];

  for (const line of otherLines) {
    if (line.trim() === '') {
      continue;
    }

    if (line.includes('map')) {
      maps.push([]);
      continue;
    }

    const currentMap = maps.at(-1) ?? [];
    const [destinationRangeStart, sourceRangeStart, rangeLength] = parseNumbers(line);
    currentMap.push({
      destinationRangeStart: destinationRangeStart!,
      sourceRangeStart: sourceRangeStart!,
      rangeLength: rangeLength!,
    });
  }

  return { seeds, maps };
}

function parseNumbers(line?: string) {
  if (!line) return [0];
  return line
    .trim()
    .split(' ')
    .map((x) => Number.parseInt(x, 10));
}

function solve({ seeds, maps }: InputData) {
  return {
    part1: solvePart1({ seeds, maps }),
    part2: solvePart2({ seeds, maps }),
  };
}

function solvePart1({ seeds, maps }: InputData) {
  const locations = seeds.map((seed) => getLocationBySeed(seed, maps));
  return Math.min(...locations);
}

function getLocationBySeed(seed: number, maps: Array<GardenMap>) {
  // eslint-disable-next-line unicorn/no-array-reduce
  return maps.reduce((destination, map) => getDestinationByMap(destination, map), seed);
}

function getDestinationByMap(source: number, map: GardenMap) {
  const mapEntry = map.find(
    ({ sourceRangeStart, rangeLength }) => source >= sourceRangeStart && source <= sourceRangeStart + rangeLength,
  );

  if (!mapEntry) {
    return source;
  }

  const offset = source - mapEntry.sourceRangeStart;
  return mapEntry.destinationRangeStart + offset;
}

function solvePart2({ seeds, maps }: InputData) {
  const seedRanges = getSeedRanges(seeds);
  for (let location = 0; ; location++) {
    const seed = getSeedByLocation(location, maps);

    if (isSeedPresent(seed, seedRanges)) {
      return location;
    }
  }
}

function getSeedRanges(seeds: Array<number>) {
  const ranges = [];
  for (let index = 0; index < seeds.length; index += 2) {
    ranges.push({
      start: seeds[index]!,
      end: seeds[index]! + seeds[index + 1]!,
    });
  }
  return ranges;
}

function isSeedPresent(seed: number, seedRanges: Array<{ start: number; end: number }>) {
  return seedRanges.some(({ start, end }) => start <= seed && seed <= end);
}

function getSeedByLocation(location: number, maps: Array<GardenMap>): number {
  // eslint-disable-next-line unicorn/no-array-reduce
  return [...maps].reverse().reduce((source, map) => getSourceByMap(source, map), location);
}

function getSourceByMap(destination: number, map: GardenMap) {
  const mapEntry = map.find(
    ({ destinationRangeStart, rangeLength }) =>
      destination >= destinationRangeStart && destination <= destinationRangeStart + rangeLength,
  );

  if (!mapEntry) {
    return destination;
  }

  const offset = destination - mapEntry.destinationRangeStart;
  return mapEntry.sourceRangeStart + offset;
}
