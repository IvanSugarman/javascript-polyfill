function throttle(callback, wait) {
    var last = 0,
        timer;

    return function() {
        var now = Date.now(),
            args = Array.prototype.slice.call(arguments);
            context = this;

        if (last && last + wait < now) {
            clearTimeout(timer);
            timer = setTimeout(function() {
                callback.apply(context, args);
            }, wait);
        } else {
            last = now;
            callback.apply(context, args);
        }
    }
}
