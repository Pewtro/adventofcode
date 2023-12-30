import path from 'node:path';
import url from 'node:url';
import { readLines } from '../../helpers/common.js';

const exampleMap = readLines(path.dirname(url.fileURLToPath(import.meta.url)), 'example');
const inputMap = readLines(path.dirname(url.fileURLToPath(import.meta.url)), 'input');

type Card = 'A' | 'K' | 'Q' | 'J' | 'T' | number;

type Hand = `${Card}${Card}${Card}${Card}${Card}`;

interface HandWithBet {
  hand: Hand;
  bet: number;
}

interface HandWithBetAndType extends HandWithBet {
  handType: HandTypes;
}

interface RankedHandWithBet extends HandWithBetAndType {
  rank: number;
}

type HandTypes = 'fiveOfAKind' | 'fourOfAKind' | 'fullHouse' | 'threeOfAKind' | 'twoPair' | 'pair' | 'highCard';

const detectHandTypes = (hand: Hand): HandTypes => {
  const cards = [...hand] as Array<Card>;
  // eslint-disable-next-line unicorn/no-array-reduce
  const cardCounts = cards.reduce(
    (accumulator, card) => {
      accumulator[card] = accumulator[card] ? accumulator[card]! + 1 : 1;
      return accumulator;
    },
    {} as Record<Card, number>,
  );

  const cardCountsValues = Object.values(cardCounts);

  if (cardCountsValues.includes(5)) {
    return 'fiveOfAKind';
  }
  if (cardCountsValues.includes(4)) {
    return 'fourOfAKind';
  }
  if (cardCountsValues.includes(3) && cardCountsValues.includes(2)) {
    return 'fullHouse';
  }
  if (cardCountsValues.includes(3)) {
    return 'threeOfAKind';
  }
  if (cardCountsValues.filter((x) => x === 2).length === 2) {
    return 'twoPair';
  }
  if (cardCountsValues.filter((x) => x === 2).length === 1) {
    return 'pair';
  }
  return 'highCard';
};

const letterToNumber = (letter: Card): number => {
  if (letter === 'A') {
    return 14;
  }
  if (letter === 'K') {
    return 13;
  }
  if (letter === 'Q') {
    return 12;
  }
  if (letter === 'J') {
    return 11;
  }
  if (letter === 'T') {
    return 10;
  }
  return letter;
};

const sortHandHistory = (historicalHands: Array<HandWithBetAndType>) => {
  //Sort by the hands value
  return historicalHands.toSorted((a, b) => {
    const aCards = [...a.hand] as Array<Card>;
    const bCards = [...b.hand] as Array<Card>;

    const aCardValues = aCards.map((x) => letterToNumber(x));
    const bCardValues = bCards.map((x) => letterToNumber(x));

    //Loop through the card values and compare them, if first value is larger sort it higher
    for (const [index, aCardValue] of aCardValues.entries()) {
      if (aCardValue === bCardValues[index]) {
        continue;
      }
      return aCardValue - bCardValues[index]!;
    }
    return 0;
  });
};

const parseHandWithBet = (line: string): HandWithBet => {
  const [hand, bet] = line.split(' ');
  return {
    hand: hand as Hand,
    bet: Number.parseInt(bet!, 10),
  };
};

const solvePart1 = (hands: Array<HandWithBet>) => {
  const HandHistory: Record<HandTypes, Array<HandWithBetAndType>> = {
    highCard: [],
    pair: [],
    twoPair: [],
    threeOfAKind: [],
    fullHouse: [],
    fourOfAKind: [],
    fiveOfAKind: [],
  };

  for (const hand of hands) {
    const handType = detectHandTypes(hand.hand);
    HandHistory[handType].push({ ...hand, handType });
  }

  const allHands: Array<HandWithBetAndType> = [];
  for (const historicalHands of Object.values(HandHistory)) {
    const sortedHistorical = sortHandHistory(historicalHands);
    allHands.push(...sortedHistorical);
  }

  const allHandsRanked: Array<RankedHandWithBet> = allHands.map((hand, index) => ({ ...hand, rank: index + 1 }));

  return allHandsRanked.reduce((accumulator, hand) => accumulator + hand.bet * hand.rank, 0);
};
const solvePart2 = () => {
  return 0;
};

const solve = (map: Array<string>) => {
  const hands = map.map((element) => parseHandWithBet(element));
  return {
    part1: solvePart1(hands),
    part2: solvePart2(),
  };
};

console.log('Solve example:');
console.log(solve(exampleMap));
console.log('\nSolve input:');
console.log(solve(inputMap));
