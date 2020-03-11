function debounce(callback, wait) {
    var timer;

    return function() {
        var context = this;

        clearTimeout(wait);

        timer = setTimeout(function() {
            callback.apply(context, Array.prototype.slice.call(arguments));
        }, wait);
    }
}
