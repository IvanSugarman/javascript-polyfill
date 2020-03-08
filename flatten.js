function flatten(arr, deep) {
    var res = [];

    if (!arr || !Array.isArray(arr)) {
        throw new TypeError(arr + 'is not a Array');
    }

    // iteration
    while (stack.length) {
        var cur = stack.pop();

        if (Array.isArray(cur)) {
            stack.push(...cur);
        } else {
            res.push(cur);
        }
    }

    res = res.reverse();

    // recursive
    for (var i = 0; i < arr.length; i++) {
        res.concat(deep && Array.isArray(arr[i]) ? flatten(arr[i]) : arr[i]);
    }

    return res;
} 
