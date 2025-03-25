import { logger } from '../utils/logger.js';
import { User } from '../models/User.js';

export class UserService {
  constructor() {
    this.users = new Map();
  }

  createUser(name, email) {
    try {
      const id = this.generateUserId();
      const user = new User(id, name, email);
      this.users.set(id, user);
      
      logger.info(`User created: ${name}`);
      return user;
    } catch (error) {
      logger.error(`Failed to create user: ${error.message}`);
      throw error;
    }
  }

  getUser(userId) {
    const user = this.users.get(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  generateUserId() {
    return `USER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
} 