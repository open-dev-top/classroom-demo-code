// 方法1：递归实现
function fibRecursive(n) {
    // 基础情况
    if (n <= 1) return n;
    
    // 递归计算
    return fibRecursive(n - 1) + fibRecursive(n - 2);
}

// 方法2：迭代实现
function fibIterative(n) {
    // 处理基础情况
    if (n <= 1) return n;
    
    let prev = 0;
    let current = 1;
    
    // 迭代计算
    for (let i = 2; i <= n; i++) {
        const next = prev + current;
        prev = current;
        current = next;
    }
    
    return current;
}

// 测试代码
console.log("递归方法:");
for (let i = 0; i < 10; i++) {
    console.log(`F(${i}) = ${fibRecursive(i)}`);
}

console.log("\n迭代方法:");
for (let i = 0; i < 10; i++) {
    console.log(`F(${i}) = ${fibIterative(i)}`);
}
