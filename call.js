Function.prototype.call = function(context) {
    var fn = this,
        res,
        i = 1,
        args = [];

    context = context || window;
    context.fn = fn;

    if (typeof fn !== 'function') {
        throw new TypeError('args not function');
    }

    for (; i < arguments.length; i++) {
        args.push('argument[' + i + ']');
    }

    res = eval('context.fn(' + args.join(',') + ')');

    delete context.fn;

    return res;
}
