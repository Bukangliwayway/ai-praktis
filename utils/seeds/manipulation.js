import manipulationData from "./data/manipulation.json";
import { manipulation } from "../schema";

export default async function seed(db) {
  await db.insert(manipulation).values(manipulationData);
}
