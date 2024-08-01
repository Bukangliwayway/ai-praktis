"use server";
import { db } from "@/utils";

export const getManipulations = async () => {
  try {
    const data = await db.query.manipulation.findMany();
    return { success: data };
  } catch (error) {
    return {
      error: { message: "Error fetching manipulations", status: 500 },
    };
  }
};
