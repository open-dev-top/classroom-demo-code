package main

import "fmt"

// 方法1：递归实现
func fibRecursive(n int) int {
	// 基础情况
	if n <= 1 {
		return n
	}

	// 递归计算
	return fibRecursive(n-1) + fibRecursive(n-2)
}

// 方法2：迭代实现
func fibIterative(n int) int {
	// 处理基础情况
	if n <= 1 {
		return n
	}

	prev := 0
	current := 1

	// 迭代计算
	for i := 2; i <= n; i++ {
		next := prev + current
		prev = current
		current = next
	}

	return current
}

func main() {
	fmt.Println("递归方法:")
	for i := 0; i < 10; i++ {
		fmt.Printf("F(%d) = %d\n", i, fibRecursive(i))
	}

	fmt.Println("\n迭代方法:")
	for i := 0; i < 10; i++ {
		fmt.Printf("F(%d) = %d\n", i, fibIterative(i))
	}
} 