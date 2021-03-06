function debounce(callback, wait) {
    var timer;

    return function() {
        var context = this;

        clearTimeout(timer);

        timer = setTimeout(function() {
            callback.apply(context, Array.prototype.slice.call(arguments));
        }, wait);
    }
}
