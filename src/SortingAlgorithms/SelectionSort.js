// algorithm from https://www.geeksforgeeks.org/selection-sort/

// returns a visualization array
// two types of arrays may be pushed into visualziations:
// 1: a pair of indexes in the array whose values are being compared
// 2: two pairs of values where in each pair:
//  first value: index of bar to be swapped
// second value: new value to be swapped with

export function visualizeSelectionSort(arr) {
  const visualizations = [];
  for (let i = 0; i < arr.length - 1; i++) {
    let min_idx = i;
    for (let j = i + 1; j < arr.length; j++) {
      visualizations.push([min_idx, j]);

      if (arr[j] < arr[min_idx]) {
        min_idx = j;
      }
    }

    visualizations.push([
      [min_idx, arr[i]],
      [i, arr[min_idx]]
    ]);

    let temp = arr[min_idx];
    arr[min_idx] = arr[i];
    arr[i] = temp;
  }
  return visualizations;
}
