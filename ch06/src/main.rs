use std::collections::HashMap;
use std::collections::HashSet;

const MAX_POINTS: u32 = 100000; // 常量会直接编译到代码中，运行时不会占用内存
static MAX_POINTS2: u32 = 200000; // 静态变量会存储在静态存储区，程序运行期间一直存在，会占用内存

// main 函数是程序的入口
fn main() {
    // 打印 Hello, world!
    println!("Hello, world!");

    // 默认情况下，变量是不可变的 immutable
    // 使用 mut 关键字，变量是可变的 mutable
    let mut a = 1;
    a = 2;
    println!("a: {}", a);

    // 常量：全大写，用下划线分隔
    println!("MAX_POINTS: {}", MAX_POINTS);

    // 隐藏：重新声明同名的变量，会隐藏之前的变量
    let x = 5;
    let x = "x";
    println!("x: {}", x);

    // 数据类型
    // Rust 是静态类型语言，编译时必须知道所有变量的类型
    // Rust 是强类型语言，不允许隐式类型转换

    // JS 是动态类型语言，运行时才知道变量的类型
    // JS 是弱类型语言，允许隐式类型转换

    let y: u8 = 1;
    let y: u16 = y as u16; // 类型转换；显式类型转换
    println!("y: {}", y);

    // 隐式类型转换
    // let z = 1;
    // let x = "2";
    // let z = z + x; // rust 报错，类型不匹配，JS 不会报错

    // 基础数据类型
    // 标量/数字类型
    // 整数 u i
    // 8 16 32 64 128
    // u8 0-255
    // i8 -128-127
    // u16 0-65535
    // i16 -32768-32767
    // u32 0-4294967295
    // i32 -2147483648-2147483647
    // u64 0-18446744073709551615
    // i64 -9223372036854775808-9223372036854775807
    // u128 0-340282366920938463463374607431768211455
    // i128 -170141183460469231731687303715884105728-170141183460469231731687303715884105727
    // usize / isize
    // 依赖于 CPU 的位数，32 位 CPU 是 32 位，64 位 CPU 是 64 位
    let num1: u8 = 1;
    let num2 = -2; // 默认是 i32/u32
    let num3: usize = 1;
    println!("num1: {}", num1);
    println!("num2: {}", num2);

    // 浮点
    // f32 f64 float 浮点数
    let f1 = 1.1;
    let f2: f32 = 1.2;
    let f3: f64 = 1.3;
    println!("f1: {}", f1);
    println!("f2: {}", f2);
    println!("f3: {}", f3);

    // 布尔
    let b1 = true;
    let b2 = false;
    println!("b1: {}", b1);

    // 字符 字符串
    // 很多语言：一堆字符=字符串
    let ch = 'A'; // Unicode 字符；4 个字节
    let ch2 = '中';
    println!("ch: {}", ch);
    println!("ch2: {}", ch2);

    // 字符串
    let s1 = "hello"; // 字符串字面量；字符串字面量是不可变的；大小固定
    let s2 = "你好";

    // 可变字符串
    let mut s3 = String::from("hello"); // 可变字符串；字符串是可变的；大小可变
    s3.push_str(" world");
    println!("s3: {}", s3);

    let ch3 = s3.chars().nth(0).unwrap();
    println!("ch3: {}", ch3);

    // 元组
    // 固定大小
    // 元素的数量确定，不可变
    // 元素的类型可以不同，但也确定
    const t1: (i32, i64, bool) = (1, 2, true);

    // 解构
    let (a, b, c) = t1;
    println!("a: {}", a);
    println!("b: {}", b);
    println!("c: {}", c);

    // t1.1

    // 数组
    // 固定大小
    // 元素的数量确定，不可变
    let arr = [1, 2, 3, 4];

    // 数组解构
    let [a, b, c, d] = arr;
    println!("a: {}", a);
    println!("b: {}", b);
    println!("c: {}", c);

    // 通过索引访问元素
    let arr2 = [1, 2, 3, 4, 5];
    println!("arr2[0]: {}", arr2[0]);
    println!("arr2[1]: {}", arr2[1]);
    println!("arr2[2]: {}", arr2[2]);
    println!("arr2[3]: {}", arr2[3]);
    println!("arr2[4]: {}", arr2[4]);

    // Vector 向量
    // 可变大小，动态增大或缩小。
    // 元素的值是相同的。
    let mut v1 = vec![1, 2, 3, 4, 5];

    // 通过索引访问元素
    println!("v1[0]: {}", v1[0]);
    println!("v1[1]: {}", v1[1]);
    println!("v1[2]: {}", v1[2]);

    v1.push(-1);
    v1.push(6);
    println!("v1: {:?}", v1);

    // HashTable 哈希表

    // Hash映射 键值对
    let mut scores = HashMap::new();
    scores.insert("Alice", 100);
    scores.insert("Bob", 90);
    scores.insert("Cathy", 80);
    scores.insert("David", 70);
    scores.insert("Eve", 60);
    println!("scores: {:?}", scores);

    let mut numbers = HashSet::new();
    numbers.insert(1);
    numbers.insert(2);
    numbers.insert(3);
    numbers.insert(4);
    numbers.insert(5);
    numbers.insert(5);
    println!("numbers: {:?}", numbers);

    // Rust 的所有数据都存在 3 个位置：
    // 1. 栈 stack 快 先进后出 大小固定
    // 2. 堆 heap 慢 通过指针访问 大小不固定
    // 3. 静态存储区 static 快

    // 栈是存储变量；堆是存储数据，然后通过指针访问数据
    // 栈的数据是固定大小的；堆的数据是动态大小的
    // 栈的访问速度快；堆的访问速度慢
    // 栈的内存是连续的；堆的内存是不连续的

    // 栈：i8 i16... f32 f64 bool char tuple array
    // 堆：String Vector HashMap HashSet
    // let a = "小积木";
    // let b = "大积木";

    // let result = add(1, 2);
    // let result = add();
    // // () 空元组
    // println!("result: {:?}", result);

    // let op = add;
    // println!("op: {:?}", op(1, 2));

    // 匿名函数
    // 参数和返回值的类型可以忽略，会自动推断
    let multiply = |x, y| x * y;
    // | 参数 | 函数体
    println!("multiply: {:?}", multiply(2, 3));

    // 闭包
    // 闭包是匿名函数，可以捕获变量
    let x = 1;
    let add_x = |y| x + y;
    println!("add_x: {:?}", add_x(2));

    // 高阶函数
    // 函数可以作为参数传递给其他函数
    // 函数可以作为返回值返回给其他函数
    let result = apply_op(1, 2, add);
    println!("result: {:?}", result);

    let result2 = apply_op(1, 2, multiply);
    println!("result2: {:?}", result2);

    let result3 = apply_op(1, 2, subtract);
    println!("result3: {:?}", result3);

    let result4 = apply_op(1, 2, divide);
    println!("result4: {:?}", result4);

    let age = 44;
    if age > 18 {
        println!("成年人");
    } else if age < 18 {
        println!("未成年人");
    } else if age > 60 {
        println!("老年人");
    } else {
        println!("儿童");
    }

    let result5 = if age > 18 {
        "成年人"
    } else if age < 18 {
        "未成年人"
    } else if age > 60 {
        "老年人"
    } else {
        "儿童"
    };

    println!("result5: {:?}", result5);

    // if 适合简单的条件判断
    // match 适合复杂的条件判断
    // if 可以不要 else
    // match 必须有所有的情况
    match result5 {
        "成年人" => println!(">18 <60"),
        "未成年人" => println!("<18"),
        "老年人" => println!(">60"),
        "儿童" => println!("<6"),
        _ => println!("未知"),
    }

    // loop {
    //     println!("loop");
    //     break;
    // }

    let arr2 = [1, 2, 3, 4, 5];
    for item in arr2 {
        println!("item: {}", item);
    }

    // 开始数字 .. 结束数字 （不包含结束数字）
    for i in 0..10 {
        println!("i: {}", i);
    }

    // 开始数字 ..= 结束数字 （包含结束数字）
    for i in 0..=10 {
        println!("i: {}", i);
    }

    // 设置步长和反向遍历
    for i in (0..50).step_by(3).rev()
     {
        println!("i: {}", i);
    }

    // let mut num4 = 0;
    // while num4 < 10 {
    //     println!("num4: {}", num4);
    //     num4 += 1;
    // }

    // 所有权：一个数据同一时间只能有一个所有者
    let s4 = String::from("hello");
    let s5 = s4.clone(); // 复制了一份数据，现在 s4 和 s5 各自拥有一份数据
    println!("s4: {}", s4);
    println!("s5: {}", s5);

    let s6 = '1'; // 固定长度的数据类型，在赋值的时候，会直接复制数据
    let s7 = s6;
    println!("s6: {}", s6);
    println!("s7: {}", s7);

    let s8 = gives_ownership();
    // take_ownership(s8);
    let len = calculate_length(&s8);

    let mut s9 = String::from("hello");
    // 可变引用，同一时间只能有一个可变引用，但同一时间可以有多个不可变引用
    let len2 = calculate_length_mut(&mut s9);
    println!("s9: {}, len2: {}", s9, len2);
}

// rust 锈
// cargo 搬运 货运 包管理工具
// crate 箱子 集装箱 包/库

// 运行 rust 程序的两个 2 个步骤
// 1. 编译/构建
// 2. 运行

// cargo run 可以编译+运行

// 函数的默认返回值是 () 空元组
// fn add()
// fn add(a: i32, b: i32) -> i32 {
//     // let a1 = 1;
//     // let b1 = 2;
//     // // ...
//     a + b
// }

fn apply_op(a: i32, b: i32, op: fn(i32, i32) -> i32) -> i32 {
    op(a, b)
}

// 乘法
fn multiply(a: i32, b: i32) -> i32 {
    a * b
}

// 加法
fn add(a: i32, b: i32) -> i32 {
    a + b
}

// 减法
fn subtract(a: i32, b: i32) -> i32 {
    a - b
}

// 除法
fn divide(a: i32, b: i32) -> i32 {
    a / b
}

// 极简
// function func fn
// integer i
// float f
// boolean bool
// string str
// char ch
// vector vec
// ...

// 匿名函数 |xx|xx

fn take_ownership(s: String) {
    println!("s: {}", s);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}

fn calculate_length_mut(s: &mut String) -> usize {
    s.push_str(" world");
    s.len()
}

fn gives_ownership() -> String {
    let s = String::from("hello");
    s
}


