function quickSort(arr) {
    if (!arr || !Array.isArray(arr)) {
        throw new TypeError(arr + 'is not a Array');
    }

    if (arr.length < 2) {
        return arr;
    }

    sort(0, arr.length - 1);
    return arr;

    function sort(left, right) {
        if (left >= right) {
            return arr[left];
        }

        var pivot = partition(left, right);

        sort(left, pivot - 1);
        sort(pivot + 1, right);
    }

    function partition(left, right) {
        var currentIndex = left,
            pivot = right,
            i = left;

        for (; i < right; i++) {
            if (arr[i] < arr[pivot]) {
                [arr[i], arr[currentIndex]] = [arr[currentIndex], arr[i]]; 
                currentIndex++;
            }
        } 

        [arr[currentIndex], arr[pivot]] = [arr[pivot], arr[currentIndex]];
        return currentIndex;
    }
}
