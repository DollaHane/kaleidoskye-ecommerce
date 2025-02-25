import { cartItem, orders, users } from "@/server/db/schema";
import { InferInsertModel } from "drizzle-orm";


export type userType = InferInsertModel<typeof users>
export type cartItemType = InferInsertModel<typeof cartItem>
export type orderType = InferInsertModel<typeof orders>
