import config from "@/config.json";
// import config2 from '../config.json'
// config.project.name
export { }

const name1: string = "Hi";
const num: number = 1;
const bool: boolean = false;
console.log(name1, num, bool);

// tsc 把 ts 文件编译成 js，然后运行 js
// 使用运行器，类似 tsx 运行 ts 文件

// 类型[]
const arr: string[] = ["1", "2"];
// Array<类型>
const arr2: Array<string> = ["1", "2"];

// 元组
// 元组是固定长度的数组，每个位置的类型可以不同
const tuple: [string, number] = ["1", 1];

// 枚举
enum Color {
  Red,
  Green,
  Blue,
  Yellow,
}

const color: Color = Color.Red;
console.log(color);

// anyscript
let age: any = null;
age = "123";

// undefined null
// void 表示没有类型
let nul = null;
console.log(nul);

// any void never
function fn(): void {
  // 没有返回值
}

// never 表示永不存在的值
function fn2(): never {
  throw new Error("error");
}

// function add(a, b) {
//   return a + b;
// }

// 重载 不能去写函数体
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a, b) {
  return a + b;
}

console.log(add("1", "null"));

// 可选参数 ?
// 默认值 = xxx
function fn3(a: number, b: number = 0) {
  return a + b;
}

// console.log(fn3(1));
// console.log(fn3(1, 2));

// 剩余参数 三个点 ...
function fn4(a: number, ...args: number[]) {
  return a + args.reduce((p, c) => p + c, 0);
}

console.log(fn4(1, 2, 3));

function add2<T>(a: T, b: T) {
  console.log(a, b);
}

// Type -> T
function fn5<T, U>(a: T, b: U): [T, U] {
  return [a, b]
}

add2<number>(1, 2);
add2<string>("1", "2");

// interface
// type

interface Person {
  name: string;// 姓名
  age: number;// 年龄
  // 睡觉
  sleep(
    // 时长
    time: number
  ): void;
}

type Person3 = {
  name: string;
  age: number;
  gender: string;// 性别
  sleep(time: number): void;
}

type IT = [string | number];
const it: IT = ["123"];

type Status = "pending" | "success" | "failed";

type ETHAddress = `0x${string}`;// 模板字符串
const ethAddress: ETHAddress = "0x1234567890123456789012345678901290";

type Date = `${number}-${number}-${number}`;
const date: Date = "2024-01-01";

enum StatusEnum {
  Pending = "pending",
  Success = "success",
  Failed = "failed",
}

// const status: Status = StatusEnum.Pending;
const status: Status = 'pending'

type Student3 = {
  id: number;
  grade: number;
  class: string;
  games?: string[];
} & Person3;

interface Person {
  gender: string;// 性别
}

interface Student extends Person {
  readonly id: number;// 学号
  grade: number;  // 年级
  class: string;  // 班级
  // 可选属性 ?
  games?: string[]; // 游戏
}

const zs: Student3 = {
  id: 1,
  name: "张三",
  age: 18,
  gender: "男",
  grade: 1,
  class: "1班",
  games: ["吃鸡", "王者"],
  sleep(time) {
    console.log(`${this.name}睡了${time}小时`);
  }
}

// 只读属性不能修改
// zs.id = 3;
zs.gender = "女";

const ls: Student = {
  id: 2,
  name: "李四",
  age: 19,
  gender: "女",
  grade: 2,
  class: "2班",
  sleep(time) {
    console.log(`${this.name}睡了${time}小时`);
    // 做噩梦了！！！
    return time;
  }
}

// 上班族
interface Work extends Person {
  company: string; // 公司
  salary: number; // 工资
}

const zl: Work = {
  name: "张立",
  age: 20,
  gender: "男",
  company: "腾讯",
  salary: 10000,
}

// 教师
interface Teacher extends Person {
  subject: string; // 学科
  salary: number; // 工资
}

class Person2 {
  // 可访问性 修饰符
  // public 公共的 在类内部、外部、子类都可以访问
  public name: string;
  // protected 受保护的 在类内部、子类可以访问，外部不能访问
  protected age: number;
  // private 私有的 在类内部可以访问，外部、子类不能访问
  private gender: string;
  sleep(time: number): void {
    this.age = 18;
    this.gender = "男";
    console.log(`${this.name}睡了${time}小时`);
  }
}

class Student2 extends Person2 {
  study() {
    this.age;// 可以访问受保护的属性
    console.log(`${this.name}在学习`);
  }
}

const zs2 = new Person2();
zs2.name = "张三";
zs2.sleep(1);

const ls2 = new Student2();
ls2.name = "李四";

interface Pair<Key, Value> {
  key: Key;
  value: Value;
}

type Pair2 = {
  key: string;
  value: number;
}

const pair: Pair<string, number> = {
  key: "1",
  value: 1,
}

let pair2: Pair<string, number> = {
  key: "1",
  value: 1,
}

pair2.key = "2";

// class 泛型
class Box<T> {
  value: T;
  constructor(value: T) {
    this.value = value;
  }
}

const box = new Box<number>(123);

class Stack<T> {
  private items: T[] = [];
  push(item: T) {
    this.items.push(item);
  }
  pop(): T | undefined {
    return this.items.pop();
  }
}

const stack = new Stack<number>();
stack.push(1);
stack.push(2);
console.log(stack.pop());
console.log(stack.pop());

let num3 = 3;
num3 = 4;

