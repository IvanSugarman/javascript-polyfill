// 组合继承
function extends(sup, sub) {
    // 父类原型的一个副本
    var obj = Object.create(sup.prototype); 
    // 增强 constructor
    obj.constructor = sub;
    // 指定对象
    sub.prototype = obj;
}

function sub(args1, args2) {
    sup.call(this, args1);
    this.args2 = args2;
}

// ES6 继承
function _extends(sup, sub) {
    if (arguments.length < 2 || typeof sub !== 'function' && sup === null) {
        throw new TypeError();
    }

    sub.prototype = Object.create(sup && sup.prototype, {
        // sub.prototype.constructor = sub;
        constructor: {
            value: sub,
            enumerale: false,
            writable: true,
            configurable: true,
        }
    });

    // 静态属性 / 方法 sub.xxx
    if (sup) {
        Object.setPrototypeOf ? Object.setPrototypeOf(sub, sup) : (sub.__proto__ = sup);
    }
}
