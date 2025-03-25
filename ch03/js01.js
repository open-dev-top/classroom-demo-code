// 数字类型 number
let num = 1;// 正数 整数
let num1 = 1.1;// 小数
let num2 = -2;// 负数
let num3 = NaN;// Not a Number 不是一个数字
let num4 = Infinity;// 无穷大
let num5 = -Infinity;// 负无穷大

// 字符串类型 string
let str = "张三";
let str1 = "美国德州";
let str2 = "苹果手机";
let str3 = "这是一部苹果手机！";
let str4 = "12345\"67890";
// 模板字符串
let str5 = `这是一段非常长的文字，
需要换行这是一段非常长的文字，
需要换行这是一段非常长的文字，
需要换行这是一段非常长的文字，需要换行`;

// 布尔类型 boolean
let bool = true;// 真
let bool1 = false;// 假

// 空值类型 null
let nullValue = null;

// 未定义类型 undefined
let undefinedValue;

// 运算 + - * /
let a = 2;
let b = 1;
let c = a + b;

let str6 = str + str1;// 隐式转换

// 非严格比较 只比较值 不比较类型
let d = a == b;
// console.log(d);

// 严格比较 比较值和类型
let e = a !== b;
// console.log(e);

// 逻辑运算符 && || !
let g1 = 1;
let g2 = 2;
let f = g1 && g2;
// console.log(f);// 2

// number -> boolean 非0为true 0为false
let g3 = 1;
let g4 = 2;
let f1 = g3 || g4;
// console.log(f1);// 1

let g5 = 1;
// 1 -> true, true -> false
let f2 = !g5;
// console.log(f2);// false

var v1 = 1;
var v2 = 2;
var v1 = 3;
v1 = 4;
v1 = "四";
// console.log(v1);// 3

const c1 = "c";
// 错误
// c1 = "d";

// 声明式函数
function hello(name) {
  // 函数体
  var a = 1;
  var b = 2;
  console.log(name);
}
// 函数表达式
let hello1 = function (name) {
  // 函数体
  var a = 1;
  var b = 2;
  console.log(name);
}
// 箭头函数
let hello2 = (name) => {
  // 函数体
  var a = 1;
  var b = 2;
  console.log(name);
}

// 函数调用
// hello("张三1");

// 英文开头，不能用关键字和保留字
let name1 = '1';

// 小写开头驼峰命名法
let firstName = '1';

let n1 = 1;
let n2 = 2;
// ...

// 基础数据类型：number 数字 string 字符串 boolean 布尔值 null 空 undefined 为定义
// 复合数据类型：object 对象 array 数组 function 函数
// 元素 element
let arr1 = [1, 2, 3, 4, 5, "6", false, null, undefined, () => { }, [[[]]]];
// 通过下标 index 获取数据
// console.log(arr1[7]);

// 修改
arr1[7] = '这不是一个null'
// console.log(arr1[7]);

// 获取数组的长度
let arr1Len = arr1.length;
// console.log(arr1Len);

let arr2 = [1, 2, 3, 4, 5]

// 在数组的末尾添加元素
// arr2.push(6);
// console.log(arr2);

// 从数组的末尾删除元素
// arr2.pop();
// console.log(arr2);

// 从数组的前面添加元素
// arr2.unshift(-1)
// console.log(arr2);

// 从数组的前面删除元素
arr2.shift();
// console.log(arr2);

let obj1 = {
  // 字段/属性/键值对(key: value)
  name: '张三',// 属性名: 属性值
  age: 18,
  gender: '男',
  say: () => {
    console.log('hello');
  }
}

// 函数 方法
// 访问属性
// console.log(obj1.age);
// 访问属性的第二种方式
// console.log(obj1["name"])

// 添加属性 
obj1.address = '美国德州'
// console.log(obj1);

// 修改
obj1.name = '李四'
// console.log(obj1);

// 删除
delete obj1.name
// console.log(obj1);

// 条件判断
let user1 = {
  name: '章三',
  isVIP: false,
}
let user2 = {
  name: '里斯',
  isVIP: true,
}

function check(user) {
  // 条件分支/判断
  if(user.isVIP) {
    console.log(`${user.name}是会员`)
  } else {
    console.log(`${user.name}不是会员`)
  }
}

// check(user1);
// check(user2);

let person1 = {
  name: '章三',
  age: 15
}
let person2 = {
  name: '里斯',
  age: 18
}
let person3 = {
  name: '王五',
  age: 66
}

function checkAge(person) {
  if(person.age < 18) {
    console.log(`${person.name}是未成年人`)
  } else if(person.age >= 18 && person.age <= 60) {
    console.log(`${person.name}是成年人`)
  } else {
    console.log(`${person.name}是老年人`)
  }
}

// checkAge(person1);
// checkAge(person2);
// checkAge(person3);

// 循环
// 1. 初始化
// 2. 条件
// 3. 更新
// for(let i = 0; i < 10; i++) {
//   console.log(i);
// }

// console.log('循环结束')

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 遍历数组
for(let i = 0; i < arr.length; i++) {
  console.log(`${i}号元素是${arr[i]}`);
}
