Function.prototype.bind = function(context) {
    var fn = this,
        args,
        fNop,
        fBound;

    if (typeof fn !== 'function') {
        throw new TypeError(fn + 'is not a function');
    }

    context = context || window;
    args = Array.prototype.slice.call(arguments, 1);

    fBound = function() {
        // new.target
        return fn.apply(fn instanceof fNop ? fn : context, args.concat(Array.prototype.slice.call(arguments)));
    }

    fNop.prototype = fn.prototype;
    fBound.prototype = new fNop();

    return fBound;
}
