ALTER TABLE "transactions" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "upi_ref_no" text NOT NULL;