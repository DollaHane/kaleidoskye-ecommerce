import { assets, users, tasks, inspections, buildings } from "@/server/db/schema";
import { InferInsertModel } from "drizzle-orm";

export type buildingType = InferInsertModel<typeof buildings>
export type assetType = InferInsertModel<typeof assets>
export type userType = InferInsertModel<typeof users>
export type taskType = InferInsertModel<typeof tasks>
export type inspectionType = InferInsertModel<typeof inspections>