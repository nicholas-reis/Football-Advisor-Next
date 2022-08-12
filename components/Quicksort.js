function swap(items, leftIndex, rightIndex){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}
function partition(items, left, right) {
    var pivot   = items[Math.floor((right + left) / 2)], //middle element
        pivotDate = new Date(pivot.fixture.date),
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        while (new Date(items[i].fixture.date) < pivotDate) {
            i++;
        }
        while (new Date(items[j].fixture.date) > pivotDate) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}

export function Quicksort(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            Quicksort(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            Quicksort(items, index, right);
        }
    }
    return items;
}