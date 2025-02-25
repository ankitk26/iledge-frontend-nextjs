ALTER TABLE "receivers" DROP CONSTRAINT "receivers_receiverUpiId_unique";--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_upiRefNo_unique";--> statement-breakpoint
ALTER TABLE "receivers" ADD CONSTRAINT "receivers_receiver_upi_id_unique" UNIQUE("receiver_upi_id");--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_upi_ref_no_unique" UNIQUE("upi_ref_no");