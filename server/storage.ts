import { type QuoteRequest, type InsertQuoteRequest } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  insertQuoteRequest(quote: InsertQuoteRequest): Promise<string>;
  getQuoteRequest(id: string): Promise<QuoteRequest | undefined>;
  getAllQuoteRequests(): Promise<QuoteRequest[]>;
}

export class MemStorage implements IStorage {
  private quoteRequests: Map<string, QuoteRequest> = new Map();

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
