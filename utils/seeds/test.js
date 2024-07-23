import testData from "./data/test.json";
import { test } from "../schema";

export default async function seed(db) {
  await db.insert(test).values(testData);
}
