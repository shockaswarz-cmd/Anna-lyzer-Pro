import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Quote request schema
export const quoteRequests = pgTable("quote_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  propertyType: text("property_type").notNull(),
  propertyAddress: text("property_address").notNull(),
  postcode: text("postcode").notNull(),
  currentRent: integer("current_rent"),
  estimatedValue: integer("estimated_value"),
  guaranteedRent: integer("guaranteed_rent"),
  marketRent: integer("market_rent"),
  rentalYield: decimal("rental_yield", { precision: 5, scale: 2 }),
  message: text("message"),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
});

export const insertQuoteRequestSchema = createInsertSchema(quoteRequests).omit({
  id: true,
  createdAt: true,
});

export type InsertQuoteRequest = z.infer<typeof insertQuoteRequestSchema>;
export type QuoteRequest = typeof quoteRequests.$inferSelect;

// Property market data types
export const PropertyDataSchema = z.object({
  postcode: z.string(),
  averagePrice: z.number(),
  averageRent: z.number(),
  rentalYield: z.number(),
  transactionCount: z.number(),
  lastUpdated: z.string(),
  demandIndicators: z.object({
    salesVolume: z.string(),
    priceGrowth: z.string(),
    marketActivity: z.string(),
  }),
  dataLimitations: z.object({
    coverageArea: z.string(),
    rentalDataSource: z.string(),
    fallbackUsed: z.boolean(),
  }).optional(),
});

export type PropertyData = z.infer<typeof PropertyDataSchema>;
