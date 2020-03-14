function promiseLimit(promises, limit) {
    var queue = promises.reverse(),
        count = 0,
        i = 0,
        data;

    if (!Array.isArray(promises)) {
        throw new TypeError();
    }

    limit = limit || 0;
    data = new Array(queue.length);

    function init(resolve, reject) {
        while (count < limit) {
            run(queue.pop(), i);
            i++;
        }

        function dequeue() {
            if (!queue.length) {
                resolve(data);    
                return;
            }

            if (count < limit) {
                i++;
                run(queue.pop(), i); 
            }
        }

        function run(curr, i) {
            count++;
            curr.then(v => {
                result[i] = v
                count--;
                dequeue();
            }).catch(e => reject(e));
        }
    }

    return new Promise(init);
}

// Blue Bird Promise.map
class Limit {
    constructor(limit) {
        this.limit = limit;
        this.queue = [];
        this.count = 0;
    }

    enqueue(fn) {
        return new Promise(resolve, reject) => {
            this.queue.push({ fn, resolve, reject });
        }); 
    }

    dequeue() {
        if (this.count < this.limit && this.queue.length) {
            const { fn, resolve, reject } = this.queue.shift();
            this.run(fn).then(resolve).catch(reject);
        }
    }

    async run(fn) {
        this.count++;
        const val = await fn();
        this.count--;
        this.dequeue();

        return val;
    }

    build(fn) {
        // 超过阈值放入队列
        if (this.count < this.limit) {
            return this.run(fn);
        } else {
            return this.enqueue(fn);
        } 
    } 
}

Promise.map = function(list, fn, { concurrency }) {
    const limit = new Limit(concurrency);

    return Promise.all(list.map => ((...args) => {
        return limit.build(() => fn(...args));
    }));
}
