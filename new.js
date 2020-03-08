function myNew(fn) {
    var res,
        obj;

    res = Object.create(fn.prototype);
    obj = fn.apply(res, Array.prototype.slice.call(arguments, 1));

    return obj instanceof Object ? obj : res; 
}
