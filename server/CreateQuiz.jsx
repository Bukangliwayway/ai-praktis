"use server";
import { db } from "@/utils";
import { test, testItem } from "@/utils/schema";
import { v4 } from "uuid";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const createQuiz = async ({ scenario_prompt }) => {
  try {
    const user = await currentUser();
    const data = await db
      .insert(test)
      .values({
        test_uuid: v4(),
        email: user.emailAddresses[0].emailAddress,
        scenario_prompt: scenario_prompt,
      })
      .returning();

    const items = JSON.parse(scenario_prompt);

    items.questions.map(async (item) => {
      await db.insert(testItem).values({
        test_id: data[0].id,
        question: item.scenario,
        choices: item.choices,
        correct_answer: item.correct_answer,
        ai_explanation: item.ai_explanation,
      });
    });

    const result = await db.query.test.findFirst({
      where: eq(test.id, data[0].id),
      with: {
        testItems: true,
      },
    });

    return { success: result };
  } catch (error) {
    return {
      error: { message: "Error fetching manipulations", status: 500 },
    };
  }
};
