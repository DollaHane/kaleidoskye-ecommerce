import { relations, sql } from "drizzle-orm"
import {
  PgTable,
  boolean,
  index,
  integer,
  json,
  numeric,
  pgEnum,
  pgTable,
  pgTableCreator,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core"

import { siteConfig } from "@/config/site"
import {
  zodCannonEnum,
  zodConfettiColourEnum,
  zodPowderColourEnum,
} from "@/lib/validators/addToCartValidation"
import {
  zodOrderStatusEnum,
  zodPaymentStatus,
} from "@/lib/validators/orderValidation"
import { number } from "zod"

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
  name: varchar("name", { length: 255 }).notNull().unique("user_name"),
  phone: integer(),
  shippingAddress: json(),
  billingAddress: json(),
  firstname: varchar("firstname", { length: 255 }),
  lastname: varchar("lastname", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: varchar("emailVerified", { length: 255 }),
  password: varchar("password", { length: 255 })
    .notNull()
    .default(siteConfig.defaultUserPassword),
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

export const cannonEnum = pgEnum("cannonSize", zodCannonEnum)
export const powderEnum = pgEnum("powderColours", zodPowderColourEnum)
export const confettiEnum = pgEnum("confettiColours", zodConfettiColourEnum)

export const cartItem = pgTable("cartItem", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .notNull()
    .unique("cartItem_id"),
  userId: varchar("userId", { length: 255 })
    .references(() => users.id)
    .notNull(),
  cannonSize: cannonEnum().notNull(),
  powderColours: powderEnum(),
  confettiColours: confettiEnum(),
  noPowder: boolean().default(false),
  noConfetti: boolean().default(false),
  quantity: numeric().notNull(),
  totalPrice: numeric().notNull(),
  cannonPrice: numeric().notNull(),
  powderPrice: numeric().notNull(),
  confettiPrice: numeric().notNull(),
  createdAt: timestamp("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

export const orderStatusEnum = pgEnum("orderStatus", zodOrderStatusEnum)
export const paymentStatusEnum = pgEnum("paymentStatus", zodPaymentStatus)

export const orders = pgTable("orders", {
  id: varchar("id", { length: 255 }).primaryKey().notNull().unique("order_id"),
  userId: varchar("userId", { length: 255 })
    .references(() => users.id)
    .notNull(),
  email: varchar("email", { length: 255 })
    .notNull()
    .references(() => users.email),
  orderDetails: json().notNull(),
  totalPrice: numeric().notNull(),
  shippingAddress: json()
    .notNull()
    .references(() => users.shippingAddress),
  billingAddress: json().notNull(),
  orderStatus: orderStatusEnum(),
  paymentStatus: paymentStatusEnum().notNull(),
  createdAt: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp().default(sql`CURRENT_TIMESTAMP`),
})
