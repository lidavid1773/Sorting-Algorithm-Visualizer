// algorithm from https://www.guru99.com/quicksort-in-javascript.html

// returns a visualization array
// two types of arrays may be pushed into visualziations:
// 1: a pair of indexes in the array whose values are being compared
// 2: two pairs of values where in each pair:
//  first value: index of bar to be swapped
// second value: new value to be swapped with

export function visualizeQuickSort(arr) {
  const visualizations = [];
  quickSort(arr, 0, arr.length - 1, visualizations);
  return visualizations;
}

function swap(items, leftIndex, rightIndex, visualizations) {
  visualizations.push([
    [leftIndex, items[rightIndex]],
    [rightIndex, items[leftIndex]]
  ]);
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}

function partition(items, left, right, visualizations) {
  let pivotIndex = Math.floor((right + left) / 2);
  var pivot = items[pivotIndex];
  var i = left;
  var j = right;
  visualizations.push([i, j]);
  while (i <= j) {
    visualizations.push([i, j]);
    visualizations.push([i, pivotIndex]);
    while (items[i] < pivot) {
      visualizations.push([i, pivotIndex]);
      i++;
    }
    visualizations.push([j, pivotIndex]);
    while (items[j] > pivot) {
      visualizations.push([j, pivotIndex]);
      j--;
    }
    visualizations.push([i, j]);
    if (i <= j) {
      swap(items, i, j, visualizations);
      i++;
      j--;
    }
  }
  return i;
}

function quickSort(items, left, right, visualizations) {
  var index;
  if (items.length > 1) {
    index = partition(items, left, right, visualizations);
    visualizations.push([left, index - 1]);
    if (left < index - 1) {
      quickSort(items, left, index - 1, visualizations);
    }
    visualizations.push([index, right]);
    if (index < right) {
      quickSort(items, index, right, visualizations);
    }
  }
  return items;
}
