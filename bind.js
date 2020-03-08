Function.prototype.bind = function(context) {
    var fn = this,
        fNop,
        fBound;

    if (typeof fn !== 'function') {
        throw new TypeError(fn + 'is not a function');
    }

    context = context || window;
    args = Array.prototype.slice.call(arguments, 1);

    fBound = function() {
        fn.apply(fn instanceof context ? fNop : context, args.concat(Array.prototype.slice.call(arguments)))
    }

    fNop.prototype = context.prototype;
    fBound.prototype = new fNop();

    return fBound;
}