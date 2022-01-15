// algorithm from https://www.geeksforgeeks.org/merge-sort/

// returns a visualization array
// two types of arrays may be pushed into visualziations:
// 1: a pair of indexes in the array whose values are being compared
// 2: a pair of values where:
//  first value: index of bar to be replaced
// second value: new value to be replaced with

export function visualizeMergeSort(arr) {
  const visualizations = [];
  mergeSortHelper(arr, 0, arr.length - 1, arr.slice(), visualizations);
  return visualizations;
}

function mergeSortHelper(arr, l, r, temp, visualizations) {
  if (l === r) {
    return;
  }
  const m = l + parseInt((r - l) / 2);
  mergeSortHelper(temp, l, m, arr, visualizations);
  mergeSortHelper(temp, m + 1, r, arr, visualizations);
  merge(arr, l, m, r, temp, visualizations);
}

function merge(arr, l, m, r, temp, visualizations) {
  let i = l;
  let j = m + 1;
  let k = l;

  while (i <= m && j <= r) {
    visualizations.push([i, j]);
    if (temp[i] <= temp[j]) {
      visualizations.push([[k, temp[i]]]);
      arr[k] = temp[i];
      i++;
    } else {
      visualizations.push([[k, temp[j]]]);
      arr[k] = temp[j];
      j++;
    }
    k++;
  }

  while (i <= m) {
    visualizations.push([i, i]);
    visualizations.push([[k, temp[i]]]);
    arr[k] = temp[i];
    k++;
    i++;
  }

  while (j <= r) {
    visualizations.push([j, j]);
    visualizations.push([[k, temp[j]]]);
    arr[k] = temp[j];
    k++;
    j++;
  }
}
