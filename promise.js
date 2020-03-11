/* Promise.all */
function promiseAll(list) {
    return new Promise(function(resolve, reject) {
        let count = 0;
        const len = list.length;
        const resultArray = new Array(len);

        if (!list || !Array.isArray(list)) {
            throw new TypeError(list + 'is not a array');
        }

        for (let i = 0; i < len; i++) {
            Promise.resolve(list[i]).then(function(data) {
                resultArray[i] = data;
                count++;

                if (count === len) {
                    return resolve(result);
                }
            }, function(err) {
                return reject(err);
            });
        }
    });
}
