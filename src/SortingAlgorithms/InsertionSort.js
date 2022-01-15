// algorithm from https://www.geeksforgeeks.org/insertion-sort/

// returns a visualization array
// two types of arrays may be pushed into visualziations:
// 1: a pair of indexes in the array whose values are being compared
// 2: a pair of values where:
//  first value: index of bar to be replaced
// second value: new value to be replaced with

export function visualizeInsertionSort(arr) {
  const visualizations = [];
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    visualizations.push([i, j]);
    while (j >= 0 && arr[j] > key) {
      visualizations.push([i, j]);
      visualizations.push([[j + 1, arr[j]]]);
      arr[j + 1] = arr[j];
      j = j - 1;
    }

    visualizations.push([[j + 1, key]]);
    arr[j + 1] = key;
  }
  return visualizations;
}
