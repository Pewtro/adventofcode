export const hasDuplicates = (array: Array<string | number | boolean>) => {
  return new Set(array).size !== array.length;
};

export const getMaxNthValues = (array: Array<number>, n: number): Array<number> => {
  if (array.length <= n) {
    return array;
  }
  const max = [array[0], array[1], array[2]];

  max.sort((a, b) => a - b);

  for (let index = n; index < array.length; index++) {
    if (array[index] > max[0]) {
      max[0] = array[index];
      max.sort((a, b) => a - b);
    }
  }
  return max;
};
