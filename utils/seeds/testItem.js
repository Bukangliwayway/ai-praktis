import testItemData from "./data/testItem.json";
import { testItem } from "../schema";

export default async function seed(db) {
  await db.insert(testItem).values(testItemData);
}
