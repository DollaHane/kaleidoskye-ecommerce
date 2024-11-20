import { relations, sql } from "drizzle-orm"
import {
  PgTable,
  boolean,
  index,
  integer,
  pgTable,
  pgTableCreator,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core"

import { Status } from "@/types/status"



// *** TABLES ***
export const users = pgTable("users", {
  id: varchar("id", { length: 255 }).primaryKey().notNull().unique("user_id"),
  admin: boolean("admin").default(false).notNull(),
  firstSignin: boolean("firstSignin").default(true).notNull(),
  name: varchar("name", { length: 255 }).notNull().unique("user_name"),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: varchar("emailVerified", { length: 255 }),
  password: varchar("password", { length: 255 }).notNull().default("changeme"),
  resetPasswordToken: varchar("resetPasswordToken", { length: 255 }),
  resetPasswordTokenExpiry: timestamp("resetPasswordTokenExpiry").default(
    sql`CURRENT_TIMESTAMP`
  ),
  createdAt: timestamp("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

export const buildings = pgTable("building", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .notNull()
    .unique("building_id"),
  name: varchar("name", { length: 255 }).notNull().unique(),
})

export const assets = pgTable("assets", {
  id: varchar("id", { length: 255 }).primaryKey().notNull().unique("asset_id"),
  assetNo: varchar("assetNo", { length: 255 }),
  mfgYr: varchar("mfgYr", { length: 255 }),
  make: varchar("make", { length: 255 }),
  model: varchar("model", { length: 255 }),
  sn: varchar("sn", { length: 255 }),
  description: varchar("description", { length: 255 }),
  location: varchar("location", { length: 255 }).references(
    () => buildings.name
  ),
  inspectionFreq: varchar("inspectionFreq", { length: 255 }),
  serviceProvider: varchar("serviceProvider", { length: 255 }),
  nextService: timestamp("nextService"),
  status: varchar("status", { length: 255 }).default(Status.GREEN).notNull(),
})

export const inspections = pgTable("inspections", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .notNull()
    .unique("inspection_id"),
  assetId: varchar("assetId", { length: 255 })
    .notNull()
    .references(() => assets.id),
  userId: varchar("userId", { length: 255 })
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

export const tasks = pgTable("tasks", {
  id: varchar("id", { length: 255 }).primaryKey().notNull().unique("task_id"),
  title: varchar("title", { length: 255 }).notNull(),
  assetId: varchar("assetId", { length: 255 })
    .references(() => assets.id)
    .notNull()
    .references(() => assets.id),
  inspectionId: varchar("inspectionId", { length: 255 }).references(
    () => inspections.id
  ),
  createdAt: timestamp("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  dueDate: timestamp("dueDate")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  responsible: varchar("responsible", { length: 255 })
    .references(() => users.name)
    .notNull(),
  status: varchar("status", { length: 255 }).default(Status.RED).notNull(),
})

// *** RELATIONS ***
export const userRelations = relations(users, ({ many }) => ({
  tasks: many(tasks),
}))

export const buildingRelations = relations(buildings, ({ many }) => ({
  assets: many(assets),
}))

export const assetRelations = relations(assets, ({ many }) => ({
  tasks: many(tasks),
  inspections: many(inspections),
}))

export const inspectionsRelations = relations(tasks, ({ many }) => ({
  tasks: many(tasks),
}))
