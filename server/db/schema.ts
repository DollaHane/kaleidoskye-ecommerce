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

// *** AUTH ***
export const sessions = pgTable("sessions", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .notNull()
    .unique("sessions__sessionToken__idx"),
  sessionToken: varchar("sessionToken", { length: 255 }).notNull(),
  userId: varchar("userId", { length: 255 }).notNull(),
  expires: timestamp("expires").notNull(),
  createdAt: timestamp("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}))

export const accounts = pgTable("accounts", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .notNull()
    .unique("accounts__provider__providerAccountId__idx"),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id),
  type: varchar("type", { length: 255 }).notNull(),
  provider: varchar("provider", { length: 255 }).notNull(),
  providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
  access_token: text("access_token"),
  expires_in: integer("expires_in"),
  id_token: text("id_token"),
  refresh_token: text("refresh_token"),
  refresh_token_expires_in: integer("refresh_token_expires_in"),
  scope: varchar("scope", { length: 255 }),
  token_type: varchar("token_type", { length: 255 }),
  createdAt: timestamp("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

export const verificationTokens = pgTable("verification_tokens", {
  identifier: varchar("identifier", { length: 255 })
    .primaryKey()
    .notNull()
    .unique("verification_tokens__token__idx"),
  token: varchar("token", { length: 255 }).notNull(),
  expires: timestamp("expires").notNull(),
  createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updatedAt").default(sql`CURRENT_TIMESTAMP`),
})

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
  image: varchar("image", { length: 255 }),
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




// *** RELATIONS ***
export const buildingRelations = relations(buildings, ({ many }) => ({
  assets: many(assets),
}))

