import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, index, bigint, decimal, boolean } from "drizzle-orm/mysql-core";

/**
 * Organizations table - represents tenants in the multi-tenant system
 */
export const organizations: any = mysqlTable("organizations", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  logo: varchar("logo", { length: 512 }),
  ownerId: int("ownerId").notNull().references(() => users.id, { onDelete: "cascade" }),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  plan: mysqlEnum("plan", ["free", "pro", "enterprise"]).default("free").notNull(),
  maxUsers: int("maxUsers").default(5).notNull(),
  maxStorage: int("maxStorage").default(1073741824).notNull(), // 1GB default
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  ownerIdIdx: index("org_ownerId_idx").on(table.ownerId),
  slugIdx: index("org_slug_idx").on(table.slug),
}));

export type Organization = typeof organizations.$inferSelect;
export type InsertOrganization = typeof organizations.$inferInsert;

/**
 * Organization members - tracks users in organizations
 */
export const organizationMembers: any = mysqlTable("organizationMembers", {
  id: int("id").autoincrement().primaryKey(),
  organizationId: int("organizationId").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  role: mysqlEnum("role", ["owner", "admin", "member"]).default("member").notNull(),
  joinedAt: timestamp("joinedAt").defaultNow().notNull(),
}, (table) => ({
  orgIdIdx: index("member_orgId_idx").on(table.organizationId),
  userIdIdx: index("member_userId_idx").on(table.userId),
}));

export type OrganizationMember = typeof organizationMembers.$inferSelect;
export type InsertOrganizationMember = typeof organizationMembers.$inferInsert;

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users: any = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  avatar: varchar("avatar", { length: 512 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  currentOrganizationId: int("currentOrganizationId").references(() => organizations.id, { onDelete: "set null" }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Memories/Events table - stores user's memories and events
 */
export const memories: any = mysqlTable("memories", {
  id: int("id").autoincrement().primaryKey(),
  organizationId: int("organizationId").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 512 }).notNull(),
  content: text("content").notNull(),
  tags: text("tags"), // JSON array stored as string
  source: varchar("source", { length: 64 }), // e.g., "web", "mobile", "api"
  metadata: text("metadata"), // JSON metadata
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  orgIdIdx: index("mem_orgId_idx").on(table.organizationId),
  userIdIdx: index("mem_userId_idx").on(table.userId),
  createdAtIdx: index("mem_createdAt_idx").on(table.createdAt),
}));

export type Memory = typeof memories.$inferSelect;
export type InsertMemory = typeof memories.$inferInsert;

/**
 * Subscriptions table for tracking Stripe subscription data
 */
export const subscriptions: any = mysqlTable("subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  organizationId: int("organizationId").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }).notNull(),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }).notNull().unique(),
  stripePriceId: varchar("stripePriceId", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["active", "canceled", "past_due", "trialing", "incomplete", "incomplete_expired", "unpaid"]).notNull(),
  currentPeriodStart: timestamp("currentPeriodStart").notNull(),
  currentPeriodEnd: timestamp("currentPeriodEnd").notNull(),
  cancelAtPeriodEnd: int("cancelAtPeriodEnd").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  orgIdIdx: index("sub_orgId_idx").on(table.organizationId),
  userIdIdx: index("sub_userId_idx").on(table.userId),
  stripeCustomerIdIdx: index("stripeCustomerId_idx").on(table.stripeCustomerId),
}));

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = typeof subscriptions.$inferInsert;

/**
 * Invoices table - stores billing invoices
 */
export const invoices: any = mysqlTable("invoices", {
  id: int("id").autoincrement().primaryKey(),
  organizationId: int("organizationId").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  stripeInvoiceId: varchar("stripeInvoiceId", { length: 255 }).notNull().unique(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("usd").notNull(),
  status: mysqlEnum("status", ["draft", "open", "paid", "void", "uncollectible"]).notNull(),
  pdfUrl: varchar("pdfUrl", { length: 512 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  orgIdIdx: index("inv_orgId_idx").on(table.organizationId),
  stripeInvoiceIdIdx: index("stripeInvoiceId_idx").on(table.stripeInvoiceId),
}));

export type Invoice = typeof invoices.$inferSelect;
export type InsertInvoice = typeof invoices.$inferInsert;

/**
 * Newsletter subscribers table
 */
export const newsletterSubscribers: any = mysqlTable("newsletterSubscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: text("name"),
  status: mysqlEnum("status", ["subscribed", "unsubscribed", "bounced"]).default("subscribed").notNull(),
  subscribedAt: timestamp("subscribedAt").defaultNow().notNull(),
  unsubscribedAt: timestamp("unsubscribedAt"),
  source: varchar("source", { length: 64 }).default("website"),
}, (table) => ({
  emailIdx: index("email_idx").on(table.email),
  statusIdx: index("status_idx").on(table.status),
}));

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;

/**
 * Contact form submissions
 */
export const contactSubmissions: any = mysqlTable("contactSubmissions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "read", "replied", "archived"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  statusIdx: index("status_idx").on(table.status),
  createdAtIdx: index("createdAt_idx").on(table.createdAt),
}));

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

/**
 * Limitless Lifelogs table - stores imported lifelogs from Limitless API
 */
export const lifelogs: any = mysqlTable("lifelogs", {
  id: int("id").autoincrement().primaryKey(),
  externalId: varchar("externalId", { length: 255 }).notNull().unique(),
  organizationId: int("organizationId").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 512 }),
  markdown: text("markdown"),
  contents: text("contents"), // JSON array of ContentNodes
  startTime: timestamp("startTime"),
  endTime: timestamp("endTime"),
  isStarred: boolean("isStarred").default(false),
  source: varchar("source", { length: 64 }).default("limitless"),
  syncedAt: timestamp("syncedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  orgIdIdx: index("lifelog_orgId_idx").on(table.organizationId),
  userIdIdx: index("lifelog_userId_idx").on(table.userId),
  externalIdIdx: index("lifelog_externalId_idx").on(table.externalId),
  startTimeIdx: index("lifelog_startTime_idx").on(table.startTime),
}));

export type Lifelog = typeof lifelogs.$inferSelect;
export type InsertLifelog = typeof lifelogs.$inferInsert;

/**
 * Limitless Contacts table - stores imported contacts
 */
export const limitlessContacts: any = mysqlTable("limitlessContacts", {
  id: int("id").autoincrement().primaryKey(),
  externalId: varchar("externalId", { length: 255 }).notNull().unique(),
  organizationId: int("organizationId").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }),
  primaryEmail: varchar("primaryEmail", { length: 320 }),
  emails: text("emails"), // JSON array
  photoUrl: varchar("photoUrl", { length: 512 }),
  externalContactId: varchar("externalContactId", { length: 255 }),
  syncedAt: timestamp("syncedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  orgIdIdx: index("lcontact_orgId_idx").on(table.organizationId),
  userIdIdx: index("lcontact_userId_idx").on(table.userId),
  externalIdIdx: index("lcontact_externalId_idx").on(table.externalId),
}));

export type LimitlessContact = typeof limitlessContacts.$inferSelect;
export type InsertLimitlessContact = typeof limitlessContacts.$inferInsert;

/**
 * Limitless Persons table - identified speakers
 */
export const limitlessPersons: any = mysqlTable("limitlessPersons", {
  id: int("id").autoincrement().primaryKey(),
  externalId: varchar("externalId", { length: 255 }).notNull().unique(),
  organizationId: int("organizationId").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  photoUrl: varchar("photoUrl", { length: 512 }),
  contactDocId: varchar("contactDocId", { length: 255 }),
  syncedAt: timestamp("syncedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  orgIdIdx: index("lperson_orgId_idx").on(table.organizationId),
  userIdIdx: index("lperson_userId_idx").on(table.userId),
}));

export type LimitlessPerson = typeof limitlessPersons.$inferSelect;
export type InsertLimitlessPerson = typeof limitlessPersons.$inferInsert;

/**
 * Limitless Meetings table - stores meeting data
 */
export const limitlessMeetings: any = mysqlTable("limitlessMeetings", {
  id: int("id").autoincrement().primaryKey(),
  externalId: varchar("externalId", { length: 255 }).notNull().unique(),
  organizationId: int("organizationId").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 512 }),
  description: text("description"),
  startTime: timestamp("startTime"),
  endTime: timestamp("endTime"),
  participants: text("participants"), // JSON array
  url: varchar("url", { length: 512 }),
  conferenceUrl: varchar("conferenceUrl", { length: 512 }),
  summaries: text("summaries"), // JSON array
  notes: text("notes"), // JSON array
  syncedAt: timestamp("syncedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  orgIdIdx: index("lmeeting_orgId_idx").on(table.organizationId),
  userIdIdx: index("lmeeting_userId_idx").on(table.userId),
  startTimeIdx: index("lmeeting_startTime_idx").on(table.startTime),
}));

export type LimitlessMeeting = typeof limitlessMeetings.$inferSelect;
export type InsertLimitlessMeeting = typeof limitlessMeetings.$inferInsert;

/**
 * Limitless User Profile table - stores user profile from Limitless
 */
export const limitlessProfiles: any = mysqlTable("limitlessProfiles", {
  id: int("id").autoincrement().primaryKey(),
  organizationId: int("organizationId").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  displayName: varchar("displayName", { length: 255 }),
  job: varchar("job", { length: 512 }),
  traits: text("traits"),
  customTraits: text("customTraits"),
  additionalInfo: text("additionalInfo"),
  selectedPersonality: varchar("selectedPersonality", { length: 64 }),
  languageCode: varchar("languageCode", { length: 10 }),
  summarizationLanguageCode: varchar("summarizationLanguageCode", { length: 10 }),
  utcOffsetMinutes: int("utcOffsetMinutes"),
  customDictionaryWords: text("customDictionaryWords"),
  customPrompts: text("customPrompts"), // JSON array
  verbosity: varchar("verbosity", { length: 32 }),
  limitlessApiKey: varchar("limitlessApiKey", { length: 255 }),
  syncedAt: timestamp("syncedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  orgIdIdx: index("lprofile_orgId_idx").on(table.organizationId),
  userIdIdx: index("lprofile_userId_idx").on(table.userId),
}));

export type LimitlessProfile = typeof limitlessProfiles.$inferSelect;
export type InsertLimitlessProfile = typeof limitlessProfiles.$inferInsert;

/**
 * Limitless Sync Status table - tracks sync status
 */
export const limitlessSyncStatus: any = mysqlTable("limitlessSyncStatus", {
  id: int("id").autoincrement().primaryKey(),
  organizationId: int("organizationId").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  entityType: varchar("entityType", { length: 64 }).notNull(), // lifelogs, contacts, meetings, etc.
  lastSyncedAt: timestamp("lastSyncedAt"),
  lastCursor: varchar("lastCursor", { length: 255 }),
  totalSynced: int("totalSynced").default(0),
  status: mysqlEnum("status", ["idle", "syncing", "error", "completed"]).default("idle"),
  errorMessage: text("errorMessage"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  orgIdIdx: index("lsync_orgId_idx").on(table.organizationId),
  userIdIdx: index("lsync_userId_idx").on(table.userId),
  entityTypeIdx: index("lsync_entityType_idx").on(table.entityType),
}));

export type LimitlessSyncStatus = typeof limitlessSyncStatus.$inferSelect;
export type InsertLimitlessSyncStatus = typeof limitlessSyncStatus.$inferInsert;
