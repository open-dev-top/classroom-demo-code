import { validateISBN } from '../utils/validator.js';
import { logger } from '../utils/logger.js';
import { Book } from '../models/Book.js';

export class BookService {
  constructor() {
    this.books = new Map();
  }

  addBook(title, author, isbn) {
    try {
      if (!validateISBN(isbn)) {
        throw new Error('Invalid ISBN');
      }

      const id = this.generateBookId();
      const book = new Book(id, title, author, isbn);
      this.books.set(id, book);
      
      logger.info(`Book added: ${title}`);
      return book;
    } catch (error) {
      logger.error(`Failed to add book: ${error.message}`);
      throw error;
    }
  }

  borrowBook(bookId, userId) {
    const book = this.books.get(bookId);
    if (!book) {
      throw new Error('Book not found');
    }
    if (book.status === 'borrowed') {
      throw new Error('Book is already borrowed');
    }

    book.borrow(userId);
    logger.info(`Book ${bookId} borrowed by user ${userId}`);
    return book;
  }

  returnBook(bookId) {
    const book = this.books.get(bookId);
    if (!book) {
      throw new Error('Book not found');
    }
    
    book.return();
    logger.info(`Book ${bookId} returned`);
    return book;
  }

  generateBookId() {
    return `BOOK_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
} 