// algorithm from https://www.geeksforgeeks.org/bubble-sort-algorithms-by-using-javascript/

// returns a visualization array
// two types of arrays may be pushed into visualziations:
// 1: a pair of indexes in the array whose values are being compared
// 2: two pairs of values where in each pair:
//  first value: index of bar to be swapped
// second value: new value to be swapped with

export function visualizeBubbleSort(arr) {
  const visualizations = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      visualizations.push([j, j + 1]);

      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];

        visualizations.push([
          [j, arr[j + 1]],
          [j + 1, arr[j]]
        ]);

        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      } else {
        visualizations.push([
          [j, arr[j]],
          [j + 1, arr[j + 1]]
        ]);
      }
    }
  }
  return visualizations;
}
