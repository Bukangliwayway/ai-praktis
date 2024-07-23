CREATE TABLE IF NOT EXISTS "manipulation" (
	"id" serial NOT NULL,
	"name" varchar NOT NULL,
	"desc" text NOT NULL,
	"image_link" varchar NOT NULL,
	"created_time" timestamp DEFAULT 'now()' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "test" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"scenario_prompt" text NOT NULL,
	"total_score" integer NOT NULL,
	"created_time" timestamp DEFAULT 'now()' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "testItem" (
	"id" serial NOT NULL,
	"test_id" integer NOT NULL,
	"question" text NOT NULL,
	"choices" text NOT NULL,
	"user_answer" text NOT NULL,
	"ai_explanation" text NOT NULL,
	"grade_justification" text NOT NULL,
	"grade" integer NOT NULL,
	"created_time" timestamp DEFAULT 'now()' NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "testItem" ADD CONSTRAINT "testItem_test_id_test_id_fk" FOREIGN KEY ("test_id") REFERENCES "public"."test"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "test_email_index" ON "test" USING btree ("email");