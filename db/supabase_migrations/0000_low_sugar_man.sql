CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	CONSTRAINT "categories_description_unique" UNIQUE("description")
);
--> statement-breakpoint
CREATE TABLE "receiver" (
	"id" serial PRIMARY KEY NOT NULL,
	"receiver_upi_id" text NOT NULL,
	"receiver_name" text NOT NULL,
	"category_id" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "receiver_receiver_upi_id_unique" UNIQUE("receiver_upi_id")
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"sender_upi_id" text NOT NULL,
	"receiver_id" integer NOT NULL,
	"amount" numeric NOT NULL,
	"transaction_date" timestamp,
	"category_id" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "receiver" ADD CONSTRAINT "receiver_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set default ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_receiver_id_receiver_id_fk" FOREIGN KEY ("receiver_id") REFERENCES "public"."receiver"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set default ON UPDATE no action;