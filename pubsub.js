function pubsub() {
    var callbacks = {};

    function on(type, callback) {
        if (callbacks[type]) {
            callbacks[type].push(callback);
        } else {
            callbacks[type] = [callback];
        }
    }

    function emit(type) {
        if (callbacks[type]) {
            callbacks[type].forEach(val => val());
        } 
    }

    function off(type, callback) {
        if (!callbacks[type]) {
            return false;
        }

        if (typeof callback === 'function') {
            for (var i in callbacks[type]) {
                callbacks[type][i] === callback && callbacks[type].splice(i, 1);    
            }
        } else {
           delete callbacks[type]; 
        } 

        return true;
    }

    return {
        on: on,
        off: off,
        emit: emit,
    };
}
