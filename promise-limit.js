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
