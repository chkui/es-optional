'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 *
 * @param value 上一步的返回值
 * @param chain 处理链的所有返回值
 * @constructor
 */
function Fluent(value, chain) {
    this.value = value;
    this.chain = chain ? chain.concat([value]) : [value];
}

Fluent.prototype.then = function (foo) {
    return this.value ? new Fluent(checkFoo(foo) ? foo(this.value, this.chain) : foo, this.chain) : new Fluent(this.value, this.chain);
};
Fluent.prototype.else = function (foo) {
    return this.value ? this.value : foo ? checkFoo(foo) ? foo(this.chain) : foo : false;
};

function checkFoo(foo) {
    return 'function' === typeof foo;
}

/**
 * 快速创建流式函数式处理
 * @param value
 * @returns {Fluent}
 */
function fluent(value) {
    return new Fluent(value);
}

exports.fluent = fluent;
exports.Fluent = Fluent;