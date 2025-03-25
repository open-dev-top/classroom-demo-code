## 1

编写一个 Rust 程序，实现一个 `modify_string` 函数，该函数接受一个 **可变引用** 的 `String`，并向其追加 `" Rust!"`。然后，在 `main` 函数中，调用 `modify_string` 并输出修改后的字符串。

### **要求**

1. 使用 **可变引用** (`&mut String`) 传递参数，而不是返回新的 `String`。
2. `modify_string` 不能获取 `String` 的所有权。
3. 不能使用 `clone()` 复制字符串。

## 2

### 

编写一个 Rust 程序，要求用户输入 `"yes"`、`"no"` 或者其他任意字符串，并使用 `match` 语句解析用户输入：

- 如果用户输入 `"yes"`，打印 `"You agreed!"`。
- 如果用户输入 `"no"`，打印 `"You disagreed!"`。
- 对于其他输入，打印 `"Invalid input"`。

### **要求**

1. 使用 `match` 语句处理不同的输入情况。
2. 读取用户输入并去除换行符（使用 `trim()`）。
3. 不能使用 `if-else` 代替 `match`。