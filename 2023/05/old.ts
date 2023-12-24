import path from 'node:path';
import url from 'node:url';
import { readFile } from '../../helpers/common.js';

const exampleMap = readFile(path.dirname(url.fileURLToPath(import.meta.url)), 'example').split('\n\n');
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const inputMap = readFile(path.dirname(url.fileURLToPath(import.meta.url)), 'input').split('\n\n');

const getSeeds = (mapPart?: string): Array<number> => {
  if (!mapPart) {
    return [];
  }
  const removeLabel = mapPart.split(':')[1]?.trim() ?? '';
  const splitByNewLine = removeLabel.split('\n');

  const values = splitByNewLine[0]?.split(' ') ?? [];
  return values.flatMap((value) => (Number.isNaN(Number(value)) ? [] : [Number(value)]));
};

const getSeedRanges = (seeds: Array<number>) => {
  const ranges = [];
  for (let index = 0; index < seeds.length; index += 2) {
    ranges.push({
      start: seeds[index]!,
      end: seeds[index]! + seeds[index + 1]!,
    });
  }
  return ranges;
};

const getSourceByMap = (destination: number, map: Array<readonly [number, number, number]>) => {
  const validMapEntry = map.find(([destinationStart, , rangeLength]) => {
    return destination >= destinationStart && destination <= destinationStart + rangeLength;
  });
  if (!validMapEntry) {
    //console.log('No valid map entry found for destination', destination, map);
    return destination;
  }
  const [destinationStart, sourceStart] = validMapEntry;
  const offset = destination - destinationStart;
  return sourceStart + offset;
};

const isSeedPresent = (seed: number, seedRanges: Array<{ start: number; end: number }>) => {
  return seedRanges.some(({ start, end }) => start <= seed && seed <= end);
};

const getSeedByLocation = (location: number, maps: Array<Array<readonly [number, number, number]>>): number => {
  // eslint-disable-next-line unicorn/no-array-reduce
  return [...maps].reverse().reduce((source, map) => getSourceByMap(source, map), location);
};

const convertMapPartToNumbers = (mapPart?: string): Array<readonly [number, number, number]> => {
  if (!mapPart) {
    return [];
  }
  const removeLabel = mapPart.split(':')[1]?.trim() ?? '';
  const splitByNewLine = removeLabel.split('\n');

  return splitByNewLine.map((line) => {
    const values = line.split(' ');
    return [Number.parseInt(values[0]!), Number.parseInt(values[1]!), Number.parseInt(values[2]!)] as const;
  });
};

const getDestinationValueFromMap = (mapArray: Array<readonly [number, number, number]>, value: number): number => {
  for (const [destination, source, distance] of mapArray) {
    if (value >= source && value <= source + distance) {
      const diff = value - source;
      return destination + diff;
    }
  }

  return value;
};

const solve = (map: Array<string>) => {
  const locationNumbers: Array<number> = [];

  const seeds = getSeeds(map[0]);
  const soilToFertilizer = convertMapPartToNumbers(map[2]);
  const seedToSoil = convertMapPartToNumbers(map[1]);
  const fertilizerToWater = convertMapPartToNumbers(map[3]);
  const waterToLight = convertMapPartToNumbers(map[4]);
  const lightToTemperature = convertMapPartToNumbers(map[5]);
  const temperatureToHumidity = convertMapPartToNumbers(map[6]);
  const humidityToLocation = convertMapPartToNumbers(map[7]);

  //Find location per seed
  for (const seed of seeds) {
    let location = seed;

    location = getDestinationValueFromMap(seedToSoil, location);
    location = getDestinationValueFromMap(soilToFertilizer, location);
    location = getDestinationValueFromMap(fertilizerToWater, location);
    location = getDestinationValueFromMap(waterToLight, location);
    location = getDestinationValueFromMap(lightToTemperature, location);
    location = getDestinationValueFromMap(temperatureToHumidity, location);
    location = getDestinationValueFromMap(humidityToLocation, location);
    locationNumbers.push(location);
  }

  //Find lowest number in locationNumbers
  let lowest = locationNumbers[0] ?? 0;
  for (const number of locationNumbers) {
    if (number < lowest) {
      lowest = number;
    }
  }

  //Find a seed that matches to a location iteration from 0
  const seedRanges = getSeedRanges(seeds);
  let lowestLocation = 0;
  for (let location = 0; lowestLocation === 0 && location < 999_999_999_999; location++) {
    const seed = getSeedByLocation(location, [
      soilToFertilizer,
      seedToSoil,
      fertilizerToWater,
      waterToLight,
      lightToTemperature,
      temperatureToHumidity,
      humidityToLocation,
    ]);

    if (isSeedPresent(seed, seedRanges)) {
      lowestLocation = location;
    }
  }

  console.log('Part 1', lowest);
  console.log('Part 2', lowestLocation);
};

console.log('Solve example:');
solve(exampleMap);
console.log('\nSolve input:');
solve(inputMap);
