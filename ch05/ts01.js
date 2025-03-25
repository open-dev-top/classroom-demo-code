"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var name1 = "Hi";
var num = 1;
var bool = false;
console.log(name1, num, bool);
// tsc 把 ts 文件编译成 js，然后运行 js
// 使用运行器，类似 tsx 运行 ts 文件
// 类型[]
var arr = ["1", "2"];
// Array<类型>
var arr2 = ["1", "2"];
// 元组
// 元组是固定长度的数组，每个位置的类型可以不同
var tuple = ["1", 1];
// 枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
    Color[Color["Yellow"] = 3] = "Yellow";
})(Color || (Color = {}));
var color = Color.Red;
console.log(color);
// anyscript
var age = null;
age = "123";
// undefined null
// void 表示没有类型
var nul = null;
console.log(nul);
// any void never
function fn() {
    // 没有返回值
}
// never 表示永不存在的值
function fn2() {
    throw new Error("error");
}
function add(a, b) {
    return a + b;
}
console.log(add("1", "null"));
// 可选参数
function fn3(a, b) {
    if (b === void 0) { b = 0; }
    return a + b;
}
console.log(fn3(1));
console.log(fn3(1, 2));
