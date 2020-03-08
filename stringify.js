function stringify(obj) {
    var type = typeof obj,
        json;

    if (type !== 'object' || obj === null) {
        if (/undefined|function/.test(type)) {
            obj = null;
        } else if (/string/.test(type)) {
            obj = '"' + obj + '"'
        }

        return String(obj);
    } else if (Array.isArray(obj)) {
        return '[' + String(obj.map(val => stringify(val))) + ']';
    } else {
        json = [];

        for (let k in obj) {
            let v = obj[k];
            typeof v !== 'function' && v !== undefined && json.push('"' + k + '":' + stringify(v));
        }

        return '{' + String(json) + '}';
    }
}
