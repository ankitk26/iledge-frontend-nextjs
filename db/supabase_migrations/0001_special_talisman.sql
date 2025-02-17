ALTER TABLE "receiver" RENAME COLUMN "receiver_upi_id" TO "receiverUpiId";--> statement-breakpoint
ALTER TABLE "receiver" RENAME COLUMN "receiver_name" TO "name";--> statement-breakpoint
ALTER TABLE "receiver" RENAME COLUMN "category_id" TO "categoryId";--> statement-breakpoint
ALTER TABLE "transactions" RENAME COLUMN "sender_upi_id" TO "senderUpiId";--> statement-breakpoint
ALTER TABLE "transactions" RENAME COLUMN "receiver_id" TO "receiverId";--> statement-breakpoint
ALTER TABLE "transactions" RENAME COLUMN "transaction_date" TO "transactionDate";--> statement-breakpoint
ALTER TABLE "transactions" RENAME COLUMN "category_id" TO "categoryId";--> statement-breakpoint
ALTER TABLE "transactions" RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE "transactions" RENAME COLUMN "updated_at" TO "updatedAt";--> statement-breakpoint
ALTER TABLE "receiver" DROP CONSTRAINT "receiver_receiver_upi_id_unique";--> statement-breakpoint
ALTER TABLE "receiver" DROP CONSTRAINT "receiver_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_receiver_id_receiver_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "receiver" ADD CONSTRAINT "receiver_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE set default ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_receiverId_receiver_id_fk" FOREIGN KEY ("receiverId") REFERENCES "public"."receiver"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE set default ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "receiver" ADD CONSTRAINT "receiver_receiverUpiId_unique" UNIQUE("receiverUpiId");