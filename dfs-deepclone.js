function DFSDeepClone(obj, cache = new WeakMap()) {
    var dst = Array.isArray(obj) ? [] : {};

    if (cache.has(obj)) {
        return obj;
    } 

    if (Array.isArray(obj)) {
        obj.forEach(val => dst.push(DFSDeepClone(val, cache)));
    } else if (Object.prototype.toString.call(obj) === '[object Object]') {
        dst = obj.constructor !== Object ? Object.create(obj.constructor.prototype) : {}; 

        cache.set(obj, obj);
        Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj)).forEach(val => {
            dst[val] = DFSDeepClone(obj[val], cache);
        });
    } else {
        dst = obj;
    }

    return dst;
}
