"use server";
import { db } from "@/utils";
import { eq } from "drizzle-orm";
import { test } from "../utils/schema";

export const getTest = async ({ test_uuid }) => {
  try {
    const data = await db.query.test.findFirst({
      where: eq(test.test_uuid, test_uuid),
      with: { testItems: true },
    });

    return { success: data };
  } catch (error) {
    return {
      error: { message: "Error fetching manipulations", status: 500 },
    };
  }
};
