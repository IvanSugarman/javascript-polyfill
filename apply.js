Function.prototype.apply = function(context, args) {
    var fn = this,
        i = 0,
        args = [],
        res;

    if (typeof fn !== 'function') {
        throw new TypeError(fn + 'is not a function');
    }

    context = context || window;
    context.fn = fn;

    if (!args || !Array.isArray(args)) {
        res = context.fn();
    } else {
        for (; i < args.length; i++) {
            args.push(args[i]);
        }

        res = eval('context.fn(' + args + ')');
    }

    delete context.fn;
    return res;
}
