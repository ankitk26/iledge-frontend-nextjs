import {
  decimal,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial().primaryKey(),
  description: text().notNull().unique(),
});

export const receivers = pgTable("receivers", {
  id: serial().primaryKey(),
  receiverUpiId: text().unique().notNull(),
  name: text().notNull(),
  categoryId: integer()
    .notNull()
    .default(0)
    .references(() => categories.id, { onDelete: "set default" }),
});

export const transactions = pgTable("transactions", {
  id: serial().primaryKey(),
  senderUpiId: text().notNull(),
  receiverId: integer()
    .notNull()
    .references(() => receivers.id, { onDelete: "no action" }),
  amount: decimal().notNull(),
  transactionDate: timestamp(),
  categoryId: integer()
    .default(0)
    .notNull()
    .references(() => categories.id, { onDelete: "set default" }),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type SelectCategory = typeof categories.$inferSelect;
export type SelectReceiver = typeof receivers.$inferSelect;
export type SelectTransaction = typeof transactions.$inferSelect;
