function curry(fn, ...args) {
    if (fn.length <= arguments.length) {
        return fn(...args);
    } else {
        return function(...args1) {
            return curry(fn, ...args, ...args1);
        }
    }
}
