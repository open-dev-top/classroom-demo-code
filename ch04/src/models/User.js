export class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.borrowedBooks = new Set();
  }

  borrowBook(bookId) {
    this.borrowedBooks.add(bookId);
  }

  returnBook(bookId) {
    this.borrowedBooks.delete(bookId);
  }

  getBorrowedBooks() {
    return Array.from(this.borrowedBooks);
  }
} 