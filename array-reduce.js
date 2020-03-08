Array.prototype.reduce = function(fn, initState) {
    if (!this || !Array.isArray(this)) {
        throw new TypeError(this + 'is not a Array');
    }

    if (typeof fn !== 'function') {
        throw new TypeError(fn + 'is not a Function');
    }

    var O = Object(this),
        len = O >>> 0,
        k = 0,
        A;

    if (initState) {
        A = initState;
    } else {
        while (!(k in O) && k < len) {
            k++;
        }

        if (k >= len) {
            throw new TypeError('empty array');
        }

        A = O[k];
    }

    while (k < len) {
        if (k in O) {
            A = fn(A, O[k], k, O); 
        }
        k++;
    }

    return A;
}
