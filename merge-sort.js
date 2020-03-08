function mergeSort(arr) {
    if (!arr || !Array.isArray(arr)) {
        throw new TypeError(arr + 'is not a array');
    }

    if (arr.length < 2) {
        return arr;
    }

    return sort(arr);

    function sort(nums) {
        var mid = nums.length / 2;

        if (nums.length === 1) {
            return nums;
        }

        return merge(sort(nums.slice(0, mid)), sort(nums.slice(mid)));
    }

    function merge(left, right) {
        var leftVal = left.shift(), 
            rightVal = right.shift(),
            result = [];

        while (leftVal !== undefined && rightVal !== undefined) {
            if (leftVal > rightVal) {
                result.push(rightVal);
                rightVal = right.shift();
            } else {
                result.push(leftVal);
                leftVal = left.shift();
            }
        }

        return result.concat(leftVal !== undefined ? leftVal : rightVal).concat(left).concat(right);
    }
}
