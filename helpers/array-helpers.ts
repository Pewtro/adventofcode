export const hasDuplicates = (array: (string | number | boolean)[]) => {
  return new Set(array).size !== array.length;
};

export const getMaxNthValues = (arr: number[], n: number): number[] => {
  if (arr.length <= n) {
    return arr;
  }
  const max = [arr[0], arr[1], arr[2]];

  max.sort((a, b) => a - b);

  for (let i = n; i < arr.length; i++) {
    if (arr[i] > max[0]) {
      max[0] = arr[i];
      max.sort((a, b) => a - b);
    }
  }
  return max;
};
