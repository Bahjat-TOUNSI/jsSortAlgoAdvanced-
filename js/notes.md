https://www.guru99.com/quicksort-in-javascript.html

https://stackabuse.com/quicksort-in-javascript/

```js
function partition(arr, start, end){
// Taking the last element as the pivot
const pivotValue = arr[end];
let pivotIndex = start;
for (let i = start; i < end; i++) {
if (arr[i] < pivotValue) {
// Swapping elements
[arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
// Moving to next element
pivotIndex++;
}
}

    // Putting the pivot value in the middle
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]] 
    return pivotIndex;
};
```

```js
function quickSortRecursive(arr, start, end) {
    // Base case or terminating case
    if (start >= end) {
        return;
    }
    
    // Returns pivotIndex
    let index = partition(arr, start, end);
    
    // Recursively apply the same logic to the left and right subarrays
    quickSort(arr, start, index - 1);
    quickSort(arr, index + 1, end);
}
```