function curry(fn, ...args) {
    if (fn.length <= args.length) {
        return fn(...args);
    } else {
        return function(...args1) {
            return curry(fn, ...args, ...args1);
        }
    }
}

function compose(funcs) {
    if (!funcs || !Array.isArray(funcs) || funcs.some(val => typeof val !== 'function')) {
        throw new TypeError();
    }

    var index = funcs.length - 1;

    return function(...args) {
        var result = funcs[index](...args);

        while (index >= 0) {
            index--;
            result = funcs[index](result);
        }

        return result;
    }
}
