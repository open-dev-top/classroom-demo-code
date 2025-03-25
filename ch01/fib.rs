// 方法1：递归实现
fn fib_recursive(n: u32) -> u32 {
    // 基础情况
    if n <= 1 {
        return n;
    }

    // 递归计算
    fib_recursive(n - 1) + fib_recursive(n - 2)
}

// 方法2：迭代实现
fn fib_iterative(n: u32) -> u32 {
    // 处理基础情况
    if n <= 1 {
        return n;
    }

    let mut prev = 0;
    let mut current = 1;

    // 迭代计算
    for _ in 2..=n {
        let next = prev + current;
        prev = current;
        current = next;
    }

    current
}

fn main() {
    println!("递归方法:");
    for i in 0..10 {
        println!("F({}) = {}", i, fib_recursive(i));
    }

    println!("\n迭代方法:");
    for i in 0..10 {
        println!("F({}) = {}", i, fib_iterative(i));
    }
} 