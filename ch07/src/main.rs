mod my_mod;
use my_mod::mod1::mod2::mod3::my_fn as my_fn_in_mod3;// 重命名
use std::collections::{HashMap, HashSet};// 使用模块；推荐
use std::collections::*; // 通配符；不推荐

macro_rules! log {
    ($msg: expr) => {
        println!("[INFO]: {}", $msg);
    };
    // expr - 表达式
    // ident - 标识符
    // path - 路径
    // stmt - 语句
    // block - 块
    // item - 项
    // meta - 元数据
    // lifetime - 生命周期
    // pat - 模式
    // tt - 词法树
    // ty - 类型
    // vis - 可见性
    ($level: expr, $msg: expr) => {
        println!("[{}]: {}", $level, $msg);
    };
}

macro_rules! create_fn {
    ($name: ident) => {
        fn $name() {
            println!("函数 {} 被调用", stringify!($name));
        }
    };
}

macro_rules! calculate_sum {
    ($num: expr) => {
        $num
    };
    // 递归：自己调用自己
    ($first: expr, $($rest: expr),+) => {
        $first + calculate_sum!($($rest),+)
    }
}

macro_rules! create_vec {
    () => {
        Vec::new()
    };
    ($($item: expr), *) => {
        {
            let mut vec = Vec::new();
            $(
                vec.push($item);
            )*
            vec
        }
    }
}

macro_rules! create_var {
    ($name: ident, $type: ty, $value: expr) => {
        let $name: $type = $value;
    };
}

// 求平方
macro_rules! square {
    ($input: expr) => {
        let result = $input * $input;
        result
    };
}

macro_rules! debug_print {
    // 单个变量
    ($var: expr) => {
        println!("{}: {:?}", stringify!($var), $var);
    };
    // 多个变量
    ($($var: expr), *) => {
        $(
            println!("{}: {:?}", stringify!($var), $var);
        )*
    };
}

struct Person {
    name: String,
    age: u8,
    favorites: Vec<String>,
}

// struct Ponint(f64, f64);

// struct Unit;

trait Work {
    fn code(&self) -> String;

    fn fix_bug(&self) -> String;

    fn meeting(&self) -> String;

    // 默认实现
    fn eat(&self) -> String {
        "正在吃饭".to_string()
    }
}

impl Person {
    // this
    fn run(&self) -> String {
        println!("{}", self.name);
        "正在跑步".to_string()
    }
}

// 给人实现工作
impl Work for Person {
    fn code(&self) -> String {
        "正在写代码".to_string()
    }

    fn fix_bug(&self) -> String {
        "正在修复bug".to_string()
    }

    fn meeting(&self) -> String {
        "正在开会".to_string()
    }

    // fn eat(&self) -> String {
    //     "正在吃饭1".to_string()
    // }
}

struct Pair<T> {
    first: T,
    second: T,
}

fn print<T>(value: T)
where
    // 多重约束
    T: std::fmt::Display + std::fmt::Debug,
{
    println!("value: {}", value);
}

struct LengthValidator {
    min: usize,
    max: usize,
}

trait Validate {
    fn validate(&self, value: &str) -> String;
}

impl Validate for LengthValidator {
    fn validate(&self, value: &str) -> String {
        println!(
            "value: {}, len: {}, min: {}, max: {}",
            value,
            value.len(),
            self.min,
            self.max
        );
        // 中文 3 个字节
        if value.len() / 3 < self.min || value.len() / 3 > self.max {
            "fail".to_string()
        } else {
            "pass".to_string()
        }
    }
}

fn main() {
    // my_fn();
    my_fn_in_mod3();

    // 直接使用模块
    my_mod::mod1::mod2::mod3::my_fn();

    // let pair: Pair<u8> = Pair {
    //     first: 1,
    //     second: 2,
    // };
    // println!("pair: {:?}", pair.first);

    // 1. 显示类型标注
    // let vec: Vec<u8> = Vec::new();

    // 2. 类型推断
    // let mut vec = Vec::new();
    // vec.push(1);

    // 3. 辅助类型推断
    // Rust 涡轮鱼 :<
    // let vec = Vec::<u8>::new();

    // 4. 方法调用的类型推断
    // let parsed = "5".parse::<i32>().unwrap();
    // println!("parsed: {}", parsed);
    // log!("hello");
    // log!("ERROR", "发生了错误");
    // log!("SUCCESS", "发生了错误");

    // create_fn!(my_fn);

    // my_fn();

    // let result = calculate_sum!(10);
    // println!("result: {}", result);

    // let result2 = calculate_sum!(1, 2, 3, 4, 5);
    // println!("result2: {}", result2);

    // let vec = create_vec![1, 2, 3, 4, 5];
    // println!("vec: {:?}", vec);

    // let x = 10;
    // {
    //     create_var!(x, i32, 20);
    //     println!("x: {}", x);
    // }
    // println!("x: {}", x);

    // let result = 2;
    // square!(10);
    // println!("result: {}", result);

    // 过程宏
    // 独立的 crate
    // 非常复杂
    // 非常强大

    // 声明式宏
    // 功能有限
    // 复杂
    // 强大

    // let name = "张三";
    // let age = 20;
    // let favorites = vec![
    //     "rust",
    //     "python",
    //     "java",
    //     "c++",
    //     "javascript",
    //     "typescript",
    // ];
    // let person = Person {
    //     name: String::from("张三"),
    //     age: 20,
    //     favorites: vec![
    //         String::from("rust"),
    //         String::from("python"),
    //         String::from("java"),
    //     ],
    // };
    // debug_print!(name);
    // debug_print!(name, age, favorites);
    // debug_print!(person.name, person.age, person.favorites);
    // 打印：
    // name: 张三
    // age: 20
    // favorites: ["rust", "python", "java", "c++", "javascript", "typescript"]
    // debug_print!(name);
    // debug_print!(name, age, favorites);

    // println!("{}", person.run());

    // u8 实现了 Display 和 Debug
    // Display 是标准库中的一个 trait，用于格式化输出
    // Debug 是标准库中的一个 trait，用于调试输出
    // print(1);

    // struct & trait 练习
    // let length_validator = LengthValidator {
    //     min: 2,
    //     max: 4,
    // };

    // let result = length_validator.validate("张三");
    // println!("result: {}", result);// pass

    // let result2 = length_validator.validate("张三丰");
    // println!("result2: {}", result2);// pass

    // let result3 = length_validator.validate("张三丰丰");
    // println!("result3: {}", result3);// pass

    // let result4 = length_validator.validate("张三丰丰丰");
    // println!("result4: {}", result4);// fail

    // let result5 = length_validator.validate("张");
    // println!("result5: {}", result5);// fail

    // 可恢复错误
    // 读取文件
    // let result = std::fs::read_to_string("readme.md");
    // Ok
    // Err
    // match result {
    //     Ok(content) => {
    //         println!("读取成功，内容是: {}", content);
    //     }
    //     Err(e) => {
    //         println!("读取失败，错误是: {}", e);
    //     }
    // }
    // println!("不管是否出现错误，仍然继续运行");

    // 不可恢复错误 panic
    // let vec = vec![1, 2, 3];
    // // 越界
    // println!("{}", vec[3]);

    // println!("程序不会继续运行");

    // let numbers: Vec<i32> = vec![1, 2, 3, 4, 5];
    // // let result = numbers[10];
    // let option: Option<&i32> = numbers.get(1); // 可有可无，如果没有，返回 None 如果有，返回 Some(number)
                                               // match option {
                                               //     Some(number) => println!("{}", number),
                                               //     None => println!("越界了"),
                                               // }

    // let result: Result<i32, std::num::ParseIntError> = "20".parse::<i32>();
    // match result {
    //     Ok(number) => println!("成功 {}", number),
    //     Err(e) => println!("失败 {}", e),
    // }

    // map 方法
    // let mapped_opt = option.map(|item| item * 2);
    // let mapped_ret = result.map(|item| item * 2);

    // println!("mapped_opt: {:?}", mapped_opt);
    // println!("mapped_ret: {:?}", mapped_ret);

    // 链式调用
    // let mapped_opt2 = option.map(|item| item * 2).map(|item| item * 2).map(|_item| 0)
    // let mapped_ret2 = result.map(|item| item * 2).map(|item| item * 2);

    // println!("mapped_opt2: {:?}", mapped_opt2);
    // println!("mapped_ret2: {:?}", mapped_ret2);

    // Option 包装了值，所以需要解包
    // unwrap 不安全的
    // println!("{}", option.unwrap_or(&10) * 10);

    // 惰性计算
    // 惰性计算是指在需要时才进行计算，而不是在定义时就进行计算
    // let computed_value = option.unwrap_or_else(|| {
    //     println!("计算中...");
    //     &10
    // });
    // println!("computed_value: {}", computed_value);

    // result 与 option 转换
    // let opt = Some("value");
    // let res = opt.ok_or("错误消息");
    // println!("res: {:?}", res);
    
    // let res2: Result<i32, &str> = Ok(33);
    // let opt2 = res2.ok();
    // println!("opt2: {:?}", opt2);
}

// 伪代码
// #[proc_macro_attribute]
// pub fn trace(attr: TokenStream, input: TokenStream) -> TokenStream {
//     println!("attr: {:?}", attr);
//     println!("input: {:?}", input);
//     input
//     // ...
// }

// #[trace]
// fn my_fn() {
//     // ...
// }

// rust 怎么被编译的
// 1. 词法分析
// 2. 语法分析
// 3. 语义分析
// 4. 生成中间代码
// 5. 生成目标代码
// 6. 链接

// let x = 10;
// 分词 let, x, =, 10, ;
// 分析每个词法单元
// 生成抽象语法树 ast
// 生成中间代码 mir
// 生成目标代码 llvm
// 链接

// 练习：打印宏

// cargo install cargo-expand
// cargo expand

// 私有函数
fn my_fn() {}

// 公有函数
pub fn my_pub_fn() {}

struct A(u8);// 元组结构体

impl A {
    fn my_fn() {}
    
    
}
