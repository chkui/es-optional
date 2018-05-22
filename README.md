# Js-Optional
---
JavaScript实现Java Optional对象相关的方法。用于“非”数据的函数式判断。

---
##使用方法：
安装：
```
npm install js-options --save-dev
```
使用：
```
import {fluent} from 'js-optional'
fluent(null).else('null');
```
说明：
提供类似于Java Optional的函数式null数据异常判断。不过这里除了null还会将JavaScript中定义的非数据——`0`、`false`、`null`、`undefined`判断为错误数据。

---
函数式判断：
```
fluent({key:'value'}). //初始化数据为{key:'value'}
then((obj)=>{
    return obj.key; //提取对象中key的值
}).else('error'); //如果出现非数据，则返回'error'
```

---
函数式处理：
```
fluent({key:{key:'value'}}). //初始化数据为{key:'value'}
then((obj)=>{
    return obj.key;
}).then((obj)=>{
    return obj.key;
}).else('error'); //如果出现非数据，则返回'error'
```

---
在整个处理链条上，任何一个then中出现异常数据则返回else中指定的数据：
```
fluent({key:{key:'value'}}). //初始化数据为{key:'value'}
then((obj)=>{
    return obj.key;
}).then((obj)=>{
    return obj.key1;
}).else('error'); //则返回'error'
```

---
获取处理链条上任何一个认为返回的数据：
```
fluent(0). //初始化数据为{key:'value'}
then((obj)=>{
    return 1;
}).then(2).then(3).then((obj, chain)=>{
    //chain 是一个列表:[0,1,2,3]
    return chain;
}).else('error'); //则返回'error'
```