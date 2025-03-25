export class Book {
  constructor(id, title, author, isbn, status = 'available') {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.status = status; // available, borrowed
    this.borrowedBy = null;
    this.borrowDate = null;
    this.returnDate = null;
  }

  borrow(userId) {
    this.status = 'borrowed';
    this.borrowedBy = userId;
    this.borrowDate = new Date();
    this.returnDate = new Date();
    this.returnDate.setDate(this.returnDate.getDate() + 14); // 14天后归还
  }

  return() {
    this.status = 'available';
    this.borrowedBy = null;
    this.borrowDate = null;
    this.returnDate = null;
  }
} 