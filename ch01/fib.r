# 方法1：递归实现
fib_recursive <- function(n) {
  # 基础情况
  if (n <= 1) {
    return(n)
  }
  
  # 递归计算
  return(fib_recursive(n - 1) + fib_recursive(n - 2))
}

# 方法2：迭代实现
fib_iterative <- function(n) {
  # 处理基础情况
  if (n <= 1) {
    return(n)
  }
  
  prev <- 0
  current <- 1
  
  # 迭代计算
  for (i in 2:n) {
    next_val <- prev + current
    prev <- current
    current <- next_val
  }
  
  return(current)
}

# 测试代码
cat("递归方法:\n")
for (i in 0:9) {
  cat(sprintf("F(%d) = %d\n", i, fib_recursive(i)))
}

cat("\n迭代方法:\n")
for (i in 0:9) {
  cat(sprintf("F(%d) = %d\n", i, fib_iterative(i)))
} 