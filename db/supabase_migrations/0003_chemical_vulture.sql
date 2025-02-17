ALTER TABLE "receiver" RENAME TO "receivers";--> statement-breakpoint
ALTER TABLE "receivers" DROP CONSTRAINT "receiver_receiverUpiId_unique";--> statement-breakpoint
ALTER TABLE "receivers" DROP CONSTRAINT "receiver_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_receiver_id_receiver_id_fk";
--> statement-breakpoint
ALTER TABLE "receivers" ADD CONSTRAINT "receivers_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set default ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_receiver_id_receivers_id_fk" FOREIGN KEY ("receiver_id") REFERENCES "public"."receivers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "receivers" ADD CONSTRAINT "receivers_receiverUpiId_unique" UNIQUE("receiver_upi_id");