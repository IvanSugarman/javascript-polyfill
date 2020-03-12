const PENDING = Symbol('PENDING');
const FULFILLED = Symbol('FULFILLED');
const REJECTED = Symbol('REJECTED');

function Promise(exec) {
    if (typeof exec !== 'function') {
        throw new TypeError(exec + ' is not a function');
    }

    if (!(this instanceof Promise)) {
        return new Promise(exec);
    }

    var self = this;

    self.status = PENDING;
    self.value = undefined;
    self.onResolveCallbacks = [];
    self.onRejectedCallbacks = [];

    function resolve(value) {
        if (value instanceof Promise) {
            try {
                value.then(resolve, reject);
            } catch (e) {
                reject(e);
            }
        }

        if (self.status === PENDING) {
            setTimeout(function() {
                self.status = FULFILLED;
                self.value = value;
                self.onResolveCallbacks.forEach(cb => cb(self.value));
            });
        }
    }

    function reject(err) {
        if (self.status === PENDING) {
            setTimeout(function() {
                self.status = REJECTED;
                self.errors = err;
                self.onRejectedCallbacks.forEach(cb => cb(self.errors));
            });
        }
    }

    try {
        exec(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    var then,
        thenCalledOrThrow = false;

    if (promise2 === x) {
        return reject(new TypeError());
    }

    if (x instanceof Promise) {
        // 状态不确定，可能被一个 thenable 决定最终值
        // 状态确定，存在正常的值直接读取状态
        if (x.status === PENDING) {
            x.then(v => resolvePromise(promise2, v, resolve, reject), reject);
        } else {
            x.then(resolve, reject);
        }

        return;
    }

    if ((x !== null) && (typeof x === 'object' || typeof x === 'function')) {
        // x.then 可能是 getter，多次读取可能用副作用
        // 三种情况存在一种情况直接返回结果
        try {
            then = x.then;

            if (typeof then === 'function') {
                then.call(x, function rs(y) {
                    if (thenCalledOrThrow) {
                        return;
                    }
                    thenCalledOrThrow = true;

                    return resolvePromise(promise2, y, resolve, reject);
                }, function rj(r) {
                    if (thenCalledOrThrow) {
                        return;
                    }
                    thenCalledOrThrow = true;

                    return reject(r);
                });
            } else {
                resolve(x);
            }
        } catch (e) {
            if (thenCalledOrThrow) {
                return;
            }
            thenCalledOrThrow = true;

            return reject(e);
        }
    } else {
        resolve(x);
    }
}

Promise.prototype.then = function(onResolved, onRejected) {
    var promise2,
        self = this;

    // 默认穿透
    onResolved = typeof onResolved === 'function' ? onResolved : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : e => throw e;

    switch (self.status) {
        case FULFILLED: {
            return promise2 = new Promise(function(resolve, reject) {
                setTimeout(() => handleResolved(promise2, self.value, resolve, reject));
            });
        }
        case REJECTED: {
            return promise2 = new Promise(function(resolve, reject) {
                setTimeout(() => handleRejected(promise2, self.value, resolve, reject));
            });
        }
        case PENDING: {
            return promise2 = new Promise(function(resolve, reject) {
                self.onResolveCallbacks.push(v => handleResolved(promise2, v, resolve, reject));
                self.onRejectedCallbacks.push(e => handleRejected(promise2, e, resolve, reject));
            });
        }
    }

    function handleResolved(promise2, value, resolve, reject) {
        try {
            var x = onResolved(value);
            resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    function handleRejected(promise2, value, resolve, reject) {
        try {
            var x = onRejected(value);
            resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
            reject(e);
        }
    }
}

Promise.resolve = function(value) {
    var promise = new Promise((resolve, reject) => resolvePromise(promise, value, resolve, reject))

    return promise;
}

Promise.reject = function(reason) {
    return new Promise((resolve, reject) => reject(reason));
}

Promise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
}

Promise.prototype.deferred = function() {
    var dfd = {};

    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });

    return dfd;
}

Promise.prototype.finally = function(fn) {
    return this.then(function(v) {
        setTimeout(fn);
        return v;
    }, function(r) {
        setTimeout(fn);
        return r;
    });
}

Promise.prototype.delay = function(duration) {
    return this.then(function(value) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(value);
            }, duration);
        });
    }, function(reason) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                reject(reason);
            }, duration);
        });
    });
}

Promise.done = Promise.stop = function() {
    return new Promise(function() {});
}

Promise.all = function(promises) {
    return new Promise(function(resolve, reject) {
        var counter = 0,
            promiseNum = promises.length,
            resolveValues = new Array(promiseNum);

        for (let i = 0; i < promiseNum; i++) {
            Promise.resolve(promises[i]).then(function(value) {
                counter++;
                resolveValues[i] = value;

                if (counter === promiseNum) {
                    resolve(resolveValues);
                }
            }, function(err) {
                reject(err);
            });
        }
    });
}

Promise.race = function(promises) {
    return new Promise(function(resolve, reject) {
        for (let i = 0; i < promiseNum; i++) {
            Promise.resolve(promises[i]).then(function(value) {
                resolve(resolveValues);
            }, function(err) {
                reject(err);
            });
        }
    });
}

try {
    module.exports = Promise
} catch (e) {}
