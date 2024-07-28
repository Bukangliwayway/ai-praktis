import { NextResponse } from "next/server";
import { db } from "@/utils";

export async function GET() {
  try {
    const manipulations = await db.query.manipulation.findMany();
    return NextResponse.json(manipulations);
  } catch (error) {
    console.error("Error fetching manipulations:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
