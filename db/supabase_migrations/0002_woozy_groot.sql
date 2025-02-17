ALTER TABLE "receiver" RENAME COLUMN "receiverUpiId" TO "receiver_upi_id";--> statement-breakpoint
ALTER TABLE "receiver" RENAME COLUMN "categoryId" TO "category_id";--> statement-breakpoint
ALTER TABLE "transactions" RENAME COLUMN "senderUpiId" TO "sender_upi_id";--> statement-breakpoint
ALTER TABLE "transactions" RENAME COLUMN "receiverId" TO "receiver_id";--> statement-breakpoint
ALTER TABLE "transactions" RENAME COLUMN "transactionDate" TO "transaction_date";--> statement-breakpoint
ALTER TABLE "transactions" RENAME COLUMN "categoryId" TO "category_id";--> statement-breakpoint
ALTER TABLE "transactions" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "transactions" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "receiver" DROP CONSTRAINT "receiver_receiverUpiId_unique";--> statement-breakpoint
ALTER TABLE "receiver" DROP CONSTRAINT "receiver_categoryId_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_receiverId_receiver_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_categoryId_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "receiver" ADD CONSTRAINT "receiver_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set default ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_receiver_id_receiver_id_fk" FOREIGN KEY ("receiver_id") REFERENCES "public"."receiver"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set default ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "receiver" ADD CONSTRAINT "receiver_receiverUpiId_unique" UNIQUE("receiver_upi_id");