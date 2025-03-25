// var num

// console.log(num);

// num = 10;

// 全局作用域
// this，作用域上下文
// 根据运行环境来决定 this 是谁
// 浏览器中 this 是 window
// node 中 this 是 global
// console.log(this);

function fn() {
  // 函数作用域
}

{
  // 块级作用域
  // if
  // for
  // while
  // do while
  // switch
  // try catch

}

const person = {
  name: '张三',
  age: 18,
  sayHello: function () {
    console.log(`hello, my name is ${this.name}`);
  }
}

person.name = '里斯';

// bind 的作用是绑定 this
let sayHello = person.sayHello.bind(person);

// this 绑定错误
// 谁调用这个函数，this 就指向谁
// sayHello();

function add(a, b) {
  // 处理参数的类型，如果不是数字，就转换为数字
  const numa = Number(a);
  const numb = Number(b);
  // 如果转换后类型不匹配，就抛出错误
  // isNaN 会自动转换为数字，然后判断是否是 NaN，全局提供的函数
  if (isNaN(numa) || isNaN(numb)) {
    // JS 抛出错误的语法
    throw new Error('参数必须是数字');
  }
  return numa + numb;
}

// 错误处理
// try {
//   console.log(add('一', 2));
// } catch (error) {
//   console.log(error.message);
// } finally {
//   console.log('finally');
// }

// 用 JS 实现 assert
function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

// 断言 assert
// assert(1 === 2, '1 不等于 2');

// 案例：银行转账
// 转账人账户 收款人账户 转账金额
function transfer(from, to, amount) {
  // typeof 判断类型 
  assert(typeof from === 'object', 'from 必须是对象');
  assert(typeof to === 'object', 'to 必须是对象');
  assert(typeof amount === 'number', 'amount 必须是数字');
  assert('balance' in from, 'from 必须有 balance 属性');
  assert('balance' in to, 'to 必须有 balance 属性');
  assert(amount > 0, 'amount 必须是正数');
  assert(from.balance >= amount, '余额不足');

  from.balance -= amount;
  to.balance += amount;
}

const accountAlice = {
  name: 'Alice',
  balance: 1000
}

const accountBob = {
  name: 'Bob',
  balance: 0
}

// transfer(accountAlice, accountBob, -100);
// console.log(`${accountAlice.name} 的余额是 ${accountAlice.balance}`);
// console.log(`${accountBob.name} 的余额是 ${accountBob.balance}`);

// 正则表达式
// 作用：匹配字符串
// 模式：/abc/
const pattern = /abc/;

const target = 'dfjsakf;jsfabcdefg';

// 匹配
const result = pattern.test(target);
// console.log(result);

// 场景1: 验证邮箱
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// ^ 表示开始
// [^\s@]+ 表示一个或多个非空字符或 @
// @ 表示 @
// [^\s@]+ 表示一个或多个非空字符或 @
// \. 表示 .
// [^\s@]+ 表示一个或多个非空字符或 @
// $ 表示结束
// s 表示空格
// d 表示数字
// w 表示字母
// + 表示一个或多个
// * 表示零个或多个
// ? 表示零个或一个
// {n} 表示 n 个
// {n,m} 表示 n 到 m 个
// () 表示分组
// | 表示或 a | b 表示 a 或 b

const email = 'testexampl@e.com';
const isValid = emailPattern.test(email);
// console.log(isValid);

const pat2 = /1$/;
// console.log(pat2.test('21231'));

// 场景2: 验证身份证
// 正则表达式的缺点是：可读性差，性能差
let pattern3 = /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dX]$/;
const id = '11010519491231002X';
// console.log(pattern3.test(id));

// 用 if 来处理，不使用正则表达式
// 前6位：1-9 开头，6位数字
// 中间8位：19或20开头，2位数字，01-12月，2位数字，01-31日，2位数字
// 最后1位：1位数字或X
const id2 = '11010519491231002X';
// if(id2.length === 18) {
//   const prefix = id2.slice(0, 6);
//   const year = id2.slice(6, 10);
//   const month = id2.slice(10, 12);
//   const day = id2.slice(12, 14);
//   const last = id2.slice(14, 18); 
//   console.log(prefix, year, month, day, last);
// }

function isValidIDCard(id) {
  // 检查长度是否为18位
  if (id.length !== 18) return false;

  const prefix = id.slice(0, 6);
  const year = id.slice(6, 10);
  const month = id.slice(10, 12);
  const day = id.slice(12, 14);
  const last = id.slice(14, 18);

  // 检查前6位是否是数字且首位不为0
  if (!/^[1-9]/.test(prefix) || isNaN(prefix)) return false;

  // 检查年份 (1900-2099)
  const yearNum = parseInt(year);
  if (yearNum < 1900 || yearNum > 2099) return false;

  // 检查月份 (01-12)
  const monthNum = parseInt(month);
  if (monthNum < 1 || monthNum > 12) return false;

  // 检查日期 (01-31)
  const dayNum = parseInt(day);
  if (dayNum < 1 || dayNum > 31) return false;

  // 检查最后四位数字，最后一位可以是数字或X
  const lastThree = last.slice(0, 3);
  const lastChar = last.slice(3);
  if (isNaN(lastThree)) return false;
  if (lastChar !== 'X' && isNaN(lastChar)) return false;

  return true;
}

// 测试
// const id2 = '11010519491231002X';
// console.log('身份证号码是否有效：', isValidIDCard(id2));

// 编程范式
// 最主流的两种：面向对象、函数式

function map(arr, callback) {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(callback(arr[i]));
  }
  return newArr;
}

const numbers = [1, 2, 3];
const squaredNumbers = map(numbers, function (num) {
  return num * num;
});
// console.log(squaredNumbers); // 输出 [1, 4, 9]

// 购物车处理系统
const createShoppingCartManager = () => {
  // 私有变量，存储折扣规则
  const discountRules = new Map();

  return {
    // 添加折扣规则的高阶函数
    addDiscountRule: (ruleName, filterFn, discountFn) => {
      discountRules.set(ruleName, { filter: filterFn, discount: discountFn });
    },

    // 处理购物车的主要高阶函数
    processCart: (cart) => {
      return {
        // 计算总价的方法
        calculateTotal: (discountType = '') => {
          const rule = discountRules.get(discountType);
          if (!rule) return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

          const { filter, discount } = rule;
          const eligibleItems = cart.filter(filter);
          const normalItems = cart.filter(item => !filter(item));

          const discountedTotal = eligibleItems.reduce((sum, item) =>
            sum + discount(item.price) * item.quantity, 0);
          const normalTotal = normalItems.reduce((sum, item) =>
            sum + item.price * item.quantity, 0);

          return discountedTotal + normalTotal;
        },

        // 商品分类统计的方法
        groupByCategory: () => {
          return cart.reduce((groups, item) => {
            const category = item.category;
            if (!groups[category]) groups[category] = [];
            groups[category].push(item);
            return groups;
          }, {});
        },

        // 应用转换函数的方法
        transform: (transformFn) => {
          return cart.map(transformFn);
        }
      };
    }
  };
};

// 使用示例
const cartManager = createShoppingCartManager();

// 添加折扣规则
cartManager.addDiscountRule(
  'seasonal',
  item => item.category === '季节性商品',
  price => price * 0.8  // 80% 的价格
);

cartManager.addDiscountRule(
  'clearance',
  item => item.isOnClearance,
  price => price * 0.5  // 50% 的价格
);

// 测试数据
const shoppingCart = [
  { id: 1, name: '夏季T恤', category: '季节性商品', price: 100, quantity: 2, isOnClearance: false },
  { id: 2, name: '牛仔裤', category: '常规商品', price: 200, quantity: 1, isOnClearance: true },
  { id: 3, name: '帽子', category: '配饰', price: 50, quantity: 3, isOnClearance: false }
];

// 使用购物车管理器
const cartProcessor = cartManager.processCart(shoppingCart);

// 计算不同折扣规则下的总价
// console.log('正常总价：', cartProcessor.calculateTotal());
// console.log('季节性商品折扣后总价：', cartProcessor.calculateTotal('seasonal'));
// console.log('清仓折扣后总价：', cartProcessor.calculateTotal('clearance'));

// 按类别分组
// console.log('商品分类：', cartProcessor.groupByCategory());

// 转换商品信息
const transformedCart = cartProcessor.transform(item => ({
  ...item,
  totalPrice: item.price * item.quantity,
  description: `${item.name} (${item.quantity}件)`
}));
// console.log('转换后的购物车：', transformedCart);

function fn() {
  let a = 1;
  return {
    a
  }
}

const obj = fn();
// console.log(obj.a);

// 创建在线课程管理系统
function createCourseSystem() {
  // 私有变量
  const courses = new Map();
  const students = new Map();
  let courseIdCounter = 1;
  let studentIdCounter = 1;

  // 私有方法：生成唯一ID
  const generateId = (prefix, counter) => `${prefix}_${counter}`;

  return {
    // 添加课程
    addCourse: (courseName, totalUnits) => {
      const courseId = generateId('COURSE', courseIdCounter++);
      courses.set(courseId, {
        id: courseId,
        name: courseName,
        totalUnits,
        students: new Map(),
        assignments: new Map()
      });
      return courseId;
    },

    // 注册学生
    registerStudent: (name) => {
      const studentId = generateId('STU', studentIdCounter++);
      students.set(studentId, {
        id: studentId,
        name,
        courses: new Map(),
        grades: new Map()
      });
      return studentId;
    },

    // 学生选课
    enrollStudent: (studentId, courseId) => {
      const student = students.get(studentId);
      const course = courses.get(courseId);
      
      if (!student || !course) {
        throw new Error('学生或课程不存在');
      }

      // 在课程中添加学生
      course.students.set(studentId, {
        progress: 0,
        completedUnits: 0,
        assignments: new Map()
      });

      // 在学生记录中添加课程
      student.courses.set(courseId, {
        status: '进行中',
        startDate: new Date()
      });
    },

    // 获取课程管理器
    getCourseManager: (courseId) => {
      const course = courses.get(courseId);
      if (!course) throw new Error('课程不存在');

      return {
        // 添加作业
        addAssignment: (title, maxScore) => {
          const assignmentId = generateId('ASSIGN', course.assignments.size + 1);
          course.assignments.set(assignmentId, {
            title,
            maxScore,
            submissions: new Map()
          });
          return assignmentId;
        },

        // 提交作业
        submitAssignment: (studentId, assignmentId, score) => {
          const student = course.students.get(studentId);
          const assignment = course.assignments.get(assignmentId);
          
          if (!student || !assignment) {
            throw new Error('学生未选课或作业不存在');
          }

          student.assignments.set(assignmentId, {
            score,
            submitDate: new Date()
          });
        },

        // 更新学生进度
        updateProgress: (studentId, completedUnits) => {
          const student = course.students.get(studentId);
          if (!student) throw new Error('学生未选课');

          student.completedUnits = completedUnits;
          student.progress = (completedUnits / course.totalUnits) * 100;

          // 如果完成所有单元，更新状态
          if (student.progress >= 100) {
            students.get(studentId).courses.get(courseId).status = '已完成';
          }
        },

        // 获取课程统计信息
        getStats: () => {
          const totalStudents = course.students.size;
          let totalProgress = 0;
          let completedCount = 0;

          course.students.forEach(student => {
            totalProgress += student.progress;
            if (student.progress >= 100) completedCount++;
          });

          return {
            totalStudents,
            averageProgress: totalProgress / totalStudents,
            completionRate: (completedCount / totalStudents) * 100
          };
        }
      };
    },

    // 获取学生进度报告
    getStudentReport: (studentId) => {
      const student = students.get(studentId);
      if (!student) throw new Error('学生不存在');

      const report = {
        studentName: student.name,
        courses: []
      };

      student.courses.forEach((courseData, courseId) => {
        const course = courses.get(courseId);
        const studentProgress = course.students.get(studentId);

        report.courses.push({
          courseName: course.name,
          status: courseData.status,
          progress: studentProgress.progress,
          completedUnits: studentProgress.completedUnits,
          totalUnits: course.totalUnits
        });
      });

      return report;
    }
  };
}

// 使用示例
const courseSystem = createCourseSystem();

// 创建课程
const pythonCourseId = courseSystem.addCourse('Python编程基础', 10);
const webCourseId = courseSystem.addCourse('Web开发入门', 8);

// 注册学生
const student1Id = courseSystem.registerStudent('张三');
const student2Id = courseSystem.registerStudent('李四');

// 学生选课
courseSystem.enrollStudent(student1Id, pythonCourseId);
courseSystem.enrollStudent(student1Id, webCourseId);
courseSystem.enrollStudent(student2Id, pythonCourseId);

// 获取Python课程管理器
const pythonManager = courseSystem.getCourseManager(pythonCourseId);

// 添加作业
const assignment1Id = pythonManager.addAssignment('Python基础测试', 100);

// 提交作业和更新进度
pythonManager.submitAssignment(student1Id, assignment1Id, 90);
pythonManager.updateProgress(student1Id, 5);

// 获取统计信息
const pythonStats = pythonManager.getStats();
// console.log('Python课程统计：', pythonStats);

// 获取学生报告
const student1Report = courseSystem.getStudentReport(student1Id);
// console.log('学生报告：', student1Report);

// 递归
function factorial(n) {
  console.log(n);
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

// console.log(factorial(5));
// 5: 5 * fn(4)
// 4: 4 * fn(3)
// 3: 3 * fn(2)
// 2: 2 * fn(1)
// 1: 1

// 斐波那契数列

const fs = require('fs');

// 递归遍历文件夹，统计不同类型文件的数量
function scanDirectory(path, stats = {}) {
  const files = fs.readdirSync(path);
  
  files.forEach(file => {
    const fullPath = path + '/' + file;
    const isDirectory = fs.statSync(fullPath).isDirectory();
    
    if (isDirectory) {
      scanDirectory(fullPath, stats);  // 递归遍历子文件夹
    } else {
      const ext = file.split('.').pop() || 'no-ext';
      stats[ext] = (stats[ext] || 0) + 1;  // 统计文件类型数量
    }
  });
  
  return stats;
}

// 使用示例
// const fileStats = scanDirectory('./src');
// console.log('文件统计：', fileStats);

// function Animal(name) {
//   this.name = name;
// }

// Animal.prototype.eat = function() {
//   console.log(`${this.name} 吃东西`);
// }

// class 等于 function，只不过是语法糖
class Animal {
  // 构造函数
  constructor(name) {
    this.name = name;
  }
  
  eat() {
    console.log(`${this.name} 吃东西`);
  }

  sleep() {
    console.log(`${this.name} 睡觉`);
  }
}

// 实例化
const cat = new Animal('小猫');
// cat.eat();
// cat.sleep();

class Cat extends Animal {
  constructor(name) {
    super(name);
  }
}

// js 的面向对象是一个伪面向对象
// 原型链
// 原型链的本质是链表
// 原型链的尽头是 null
// 原型链的继承是单向的
// 原型链的继承是动态的
// 原型链的继承是共享的

const numbers2 = [1, 2, 3, 4, 5];
function isEven(num) {
  return num % 2 === 0;
}
// const evenNumbers = numbers2.filter(isEven);
// console.log(evenNumbers); // 输出 [2, 4]

// map
const numbers3 = [1, 2, 3];
// let square2 = (num)  => num * num;

const squaredNumbers2 = numbers3.map(num => num * num);
// console.log(squaredNumbers2); // 输出 [1, 4, 9]

// reduce
const numbers4 = [1, 2, 3];
// acc 是累加器，num 是当前元素
// 0 是初始值
const sum = numbers4.reduce((acc, num) => acc + num, 0);
// console.log(sum); // 输出 6

const arrObj = [
  { name: '张三', age: 18, favorite: ['足球', '玻璃球'] },
  { name: '李四', age: 20, favorite: ['篮球', '足球', '乒乓球'] },
  { name: '王五', age: 22, favorite: ['足球', '羽毛球'] }
]

// 找出所有喜欢打篮球的人
const basketball = arrObj.filter(obj => obj.favorite.includes('篮球'));
// console.log(basketball);

// 找出所有爱好，合并成一个数组，去重
const favorite = arrObj.flatMap(obj => obj.favorite)
// 去重
.filter((item, index, arr) => arr.indexOf(item) === index)

// console.log(favorite);

// for(let i = 0; i < 1000000000000; i++){
//   console.log(i);
// }

// console.log('xxx');

function fetchData(callback) {
  // 模拟2秒的网络请求耗时
  setTimeout(function() {
    // 需要一个参数，这个参数也需要请求才能获取，这里就会有回调地狱
    // 回调地狱
    fetchData(function(data) {
      console.log(data.message);
      // 需要一个参数，这个参数也需要请求才能获取，这里就会有回调地狱
      // 回调地狱
      fetchData(function(data) {
        console.log(data.message);
        // 回调地狱终止
        callback(data);
      });
    });
  }, 2000);
}

// fetchData(function(data) {
//   console.log(data.message);
// });

// console.log('开始发起请求');

// Promise 是一个对象，表示一个异步操作的最终完成（或失败）及其结果值
// Promise 有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）
// 状态不可逆，只能从 pending 到 fulfilled 或 rejected
// Promise 对象的 then 方法接收两个函数作为参数，分别在异步操作成功和失败时执行
// Promise 对象的 catch 方法接收一个函数作为参数，在异步操作失败时执行
// Promise 对象的 finally 方法接收一个函数作为参数，在异步操作成功或失败时执行

const promise = new Promise(function(resolve, reject) {
  setTimeout(function() {
    const success = true;
    if (success) {
      resolve('操作成功');
    } else {
      reject('操作失败');
    }
  }, 2000);
});

promise.then(function(result) {
  console.log(result);
}).catch(function(error) {
  console.error(error);
}).finally(function() {
  console.log('请求结束');
});

// console.log('开始发起请求');


async function fetchData() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      const data = { message: '这是异步获取的数据' };
      resolve(data);
    }, 2000);
  });
}

async function getData() {
  try {
    const data = await fetchData();
    console.log(data.message);
  } catch (error) {
    console.error('操作出错:', error);
  }
}

getData();
