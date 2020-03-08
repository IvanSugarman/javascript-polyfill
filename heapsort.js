function heapsort(arr) {
    if (!arr || !Array.isArray(arr)) {
        throw new TypeError(arr + 'is not a Array');
    }

    if (arr.length < 2) {
        return arr;
    }

    for (var i = Math.floor(nums.length / 2); i >= 0; i--) {
        heap(arr, i, nums.length);
    }

    for (var j = nums.length - 1; j > 0; j--) {
        [nums[j], nums[0]] = [nums[0], nums[j]]; 
        heap(nums, 0, j);
    }

    return nums;

    function heap(nums, i, len) {
        var min = i,
            left = 2 * i + 1,
            right = 2 * i + 2;

        if (left < len && nums[left] > nums[min]) {
            min = left;
        }

        if (right < len && nums[right] > nums[min]) {
            min = right; 
        }

        if (min === i) {
            return;
        }

        [nums[i], nums[min]] = [nums[min], nums[i]];
        heap(nums, min, len);
    }
} 
