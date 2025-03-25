import { BookService } from './services/BookService.js';
import { UserService } from './services/UserService.js';
// import 导入
import { logger } from './utils/logger.js';
// import a from 'a';
// export default a;
// import * as a from "a";
// * 导入所有
// export {a, b, c};
// a.a;
// a.b;
// a.c;


// 创建服务实例
const bookService = new BookService();
const userService = new UserService();

// 示例使用
try {
  // 创建用户
  const user = userService.createUser('张三', 'zhangsan@example.com');
  
  // 添加图书
  const book1 = bookService.addBook('JavaScript高级程序设计', '尼古拉斯·泽卡斯', '9787111376613');
  const book2 = bookService.addBook('你不知道的JavaScript', '凯尔·辛普森', '9787115385734');
  
  // 借书
  bookService.borrowBook(book1.id, user.id);
  
  // 获取用户借阅的图书
  const borrowedBooks = user.getBorrowedBooks();
  logger.info(`用户 ${user.name} 借阅的图书: ${borrowedBooks.join(', ')}`);
  
  // 还书
  bookService.returnBook(book1.id);
  
} catch (error) {
  logger.error(`系统错误: ${error.message}`);
}

// 导出服务实例供其他模块使用
export {
  bookService,
  userService
}; 