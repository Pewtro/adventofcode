export const hasDuplicates = (array: Array<string | number | boolean>) => {
  return new Set(array).size !== array.length;
};

export const getMaxNthValues = (array: Array<number>, n: number): Array<number> => {
  if (array.length <= n) {
    return array;
  }
  const max = [array[0] ?? 0, array[1] ?? 0, array[2] ?? 0];

  max.sort((a, b) => (a ?? 0) - (b ?? 0));

  for (let index = n; index < array.length; index++) {
    const currentLowestMax = max.at(0);
    const currentIndex = array.at(index);
    if (!currentIndex || !currentLowestMax) {
      continue;
    }
    if (currentIndex > currentLowestMax) {
      max[0] = currentIndex;
      max.sort((a, b) => a - b);
    }
  }
  return max;
};
