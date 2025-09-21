import { type User, type InsertUser, type QuoteRequest, type InsertQuoteRequest } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  insertQuoteRequest(quote: InsertQuoteRequest): Promise<string>;
  getQuoteRequest(id: string): Promise<QuoteRequest | undefined>;
  getAllQuoteRequests(): Promise<QuoteRequest[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private quoteRequests: Map<string, QuoteRequest>;

  constructor() {
    this.users = new Map();
    this.quoteRequests = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async insertQuoteRequest(insertQuote: InsertQuoteRequest): Promise<string> {
    const id = randomUUID();
    const quote: QuoteRequest = {
      ...insertQuote,
      id,
      message: insertQuote.message || null,
      currentRent: insertQuote.currentRent || null,
      estimatedValue: insertQuote.estimatedValue || null,
      guaranteedRent: insertQuote.guaranteedRent || null,
      marketRent: insertQuote.marketRent || null,
      rentalYield: insertQuote.rentalYield || null,
      createdAt: new Date(),
    };
    this.quoteRequests.set(id, quote);
    return id;
  }

  async getQuoteRequest(id: string): Promise<QuoteRequest | undefined> {
    return this.quoteRequests.get(id);
  }

  async getAllQuoteRequests(): Promise<QuoteRequest[]> {
    return Array.from(this.quoteRequests.values());
  }
}

export const storage = new MemStorage();
