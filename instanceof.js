function instanceOf(L, R) {
    var left = L.__proto__,
        right = R.prototype;

    while (left !== null) {
        if (left === right) {
            return true;
        }
        left = left.__proto__;
    }

    return false;
}
