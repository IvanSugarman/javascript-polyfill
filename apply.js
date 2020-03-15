Function.prototype.apply = function(context, arr) {
    var fn = this,
        i = 0,
        args = [],
        res;

    if (typeof fn !== 'function') {
        throw new TypeError(fn + 'is not a function');
    }

    context = context || window;
    context.fn = fn;

    if (!arr || !Array.isArray(arr)) {
        res = context.fn();
    } else {
        for (; i < arr.length; i++) {
            args.push('arr[' + i + ']');
        }

        res = eval('context.fn(' + args.toString() + ')');
    }

    delete context.fn;
    return res;
}
