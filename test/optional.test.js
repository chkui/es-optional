const optional = require('../index')
const fluent = optional.fluent;

test('test optional.fluent null', () => {
    expect(fluent(null).else('null')).toBe('null');
});

test('test optional.fluent process null', () => {
    expect(fluent('value').then(null).else('null')).toBe('null');
});

test('test optional.fluent process value', () => {
    expect(fluent('value').then('value').else('null')).toBe('value');
});

test('test optional.fluent process function', () => {
    expect(fluent('value').then(function (value) {
        return value
    }).else('null')).toBe('value');
});

test('test optional.fluent all error', () => {
    const list = [];
    list.push(fluent('value').then(null).then('value').else('error'));
    list.push(fluent('value').then(false).then('value').else('error'));
    list.push(fluent('value').then(0).then('value').else('error'));
    list.push(fluent('value').then({}.a).then('value').else('error'));

    expect(list).toEqual(['error', 'error', 'error', 'error']);
});


test('test optional.fluent function null', () => {
    expect(fluent('value').then(function (value) {
        return null;
    }).then('value').else('error')).toBe('error');
});

test('test optional.fluent function process', () => {
    expect(fluent('value').then(function (value) {
        return 'modify value1';
    }).then(function (value) {
        return 'modify value2';
    }).else('error')).toBe('modify value2');
});

test('test optional.fluent function process', () => {
    expect(fluent('value0').then(function (value) {
        return 'value1';
    }).then(function (value) {
        return 'value2';
    }).then(function (value, chain) {
        return chain;
    }).else('error')).toEqual(['value0', 'value1', 'value2']);
});