import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp, integer, boolean, primaryKey } from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const users = pgTable("auction_user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
})
 
export const accounts = pgTable(
  "auction_account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
)
 
export const sessions = pgTable("auction_session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})
 
export const verificationTokens = pgTable(
  "auction_verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
)
 
export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ]
)

export const items = pgTable("auction_item", {
    id: serial("id").primaryKey(),   
    userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    startingPrice: integer("startingPrice").notNull().default(0),
    currentBid: integer("currentBid").notNull(),
    image: text("image"),
    bidInterval: integer("bidInterval").notNull().default(100),
    
});

export const bids = pgTable("auction_bid", {
    id: serial("id").primaryKey(),
    amount: integer("amount").notNull(),
    itemId: serial("itemId").notNull().references(() => items.id, {onDelete: "cascade"}),
    userId: text("userId").notNull().references(() => users.id, {onDelete: "cascade" }),
    timestamp: timestamp("timestamp", { mode: "date" }).notNull(),
});

export const usersRelations = relations(bids, ({ one }) => ({
  user: one(users, {
    fields: [bids.userId],
    references: [users.id],
  }),
}));
