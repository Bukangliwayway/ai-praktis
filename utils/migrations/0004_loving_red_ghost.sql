ALTER TABLE "test" ALTER COLUMN "total_score" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "testItem" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "testItem" ALTER COLUMN "user_answer" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "testItem" ALTER COLUMN "grade_justification" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "testItem" ADD COLUMN "answer" text;