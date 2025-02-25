import {
  decimal,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

const timestamps = {
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true })
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
  receiver_upi_id: text().unique().notNull(),
  name: text().notNull(),
  category_id: integer()
    .notNull()
    .default(0)
    .references(() => categories.id, { onDelete: "set default" }),
  ...timestamps,
});

export const transactions = pgTable("transactions", {
  id: serial().primaryKey(),
  upi_ref_no: text().unique().notNull(),
  sender_upi_id: text().notNull(),
  receiver_id: integer()
    .notNull()
    .references(() => receivers.id, { onDelete: "no action" }),
  amount: decimal().notNull(),
  transaction_date: timestamp(),
  category_id: integer()
    .default(0)
    .notNull()
    .references(() => categories.id, { onDelete: "set default" }),
  ...timestamps,
});

export type InsertCategory = typeof categories.$inferInsert;
export type SelectCategory = typeof categories.$inferSelect;
export type SelectReceiver = typeof receivers.$inferSelect;
export type SelectTransaction = typeof transactions.$inferSelect;
