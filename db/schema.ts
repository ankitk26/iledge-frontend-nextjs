import {
  decimal,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const categories = pgTable("categories", {
  id: serial().primaryKey(),
  description: text().notNull().unique(),
  ...timestamps,
});

export const receivers = pgTable("receivers", {
  id: serial().primaryKey(),
  receiverUpiId: text().unique().notNull(),
  name: text().notNull(),
  categoryId: integer()
    .notNull()
    .default(0)
    .references(() => categories.id, { onDelete: "set default" }),
  ...timestamps,
});

export const transactions = pgTable("transactions", {
  id: serial().primaryKey(),
  upiRefNo: text().unique().notNull(),
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
  ...timestamps,
});

export type InsertCategory = typeof categories.$inferInsert;
export type SelectCategory = typeof categories.$inferSelect;
export type SelectReceiver = typeof receivers.$inferSelect;
export type SelectTransaction = typeof transactions.$inferSelect;
