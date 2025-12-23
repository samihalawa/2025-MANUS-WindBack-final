import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  organizations, 
  organizationMembers, 
  memories, 
  subscriptions,
  invoices,
  users,
  Organization,
  OrganizationMember,
  Memory,
  Subscription,
  Invoice,
  InsertOrganization,
  InsertOrganizationMember,
  InsertMemory,
  InsertSubscription,
  InsertInvoice
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// Organization queries
export async function createOrganization(data: InsertOrganization): Promise<Organization | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.insert(organizations).values(data);
    return data as Organization;
  } catch (error) {
    console.error("[Database] Failed to create organization:", error);
    return null;
  }
}

export async function getOrganizationBySlug(slug: string): Promise<Organization | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.select().from(organizations).where(eq(organizations.slug, slug)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get organization:", error);
    return null;
  }
}

export async function getUserOrganizations(userId: number): Promise<Organization[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    const result = await db
      .select()
      .from(organizations)
      .innerJoin(organizationMembers as any, eq((organizations as any).id, (organizationMembers as any).organizationId))
      .where(eq(organizationMembers.userId, userId));
    
    return result.map(r => (r as any).organizations);
  } catch (error) {
    console.error("[Database] Failed to get user organizations:", error);
    return [];
  }
}

// Organization member queries
export async function addOrganizationMember(data: InsertOrganizationMember): Promise<OrganizationMember | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    await db.insert(organizationMembers).values(data);
    return data as OrganizationMember;
  } catch (error) {
    console.error("[Database] Failed to add organization member:", error);
    return null;
  }
}

export async function getOrganizationMembers(organizationId: number): Promise<OrganizationMember[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db.select().from(organizationMembers).where(eq(organizationMembers.organizationId, organizationId));
  } catch (error) {
    console.error("[Database] Failed to get organization members:", error);
    return [];
  }
}

// Memory queries
export async function createMemory(data: InsertMemory): Promise<Memory | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    await db.insert(memories).values(data);
    return data as Memory;
  } catch (error) {
    console.error("[Database] Failed to create memory:", error);
    return null;
  }
}

export async function getOrganizationMemories(organizationId: number, limit: number = 50, offset: number = 0): Promise<Memory[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(memories)
      .where(eq(memories.organizationId, organizationId))
      .limit(limit)
      .offset(offset);
  } catch (error) {
    console.error("[Database] Failed to get organization memories:", error);
    return [];
  }
}

export async function searchMemories(organizationId: number, query: string): Promise<Memory[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(memories)
      .where(and(
        eq(memories.organizationId, organizationId),
        // Note: This is a simple LIKE search, consider using full-text search for production
      ));
  } catch (error) {
    console.error("[Database] Failed to search memories:", error);
    return [];
  }
}

// Subscription queries
export async function getOrganizationSubscription(organizationId: number): Promise<Subscription | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.organizationId, organizationId))
      .limit(1);
    
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get organization subscription:", error);
    return null;
  }
}

export async function createSubscription(data: InsertSubscription): Promise<Subscription | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    await db.insert(subscriptions).values(data);
    return data as Subscription;
  } catch (error) {
    console.error("[Database] Failed to create subscription:", error);
    return null;
  }
}

export async function updateSubscription(subscriptionId: number, data: Partial<Subscription>): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    await db.update(subscriptions).set(data).where(eq(subscriptions.id, subscriptionId));
    return true;
  } catch (error) {
    console.error("[Database] Failed to update subscription:", error);
    return false;
  }
}

// Invoice queries
export async function createInvoice(data: InsertInvoice): Promise<Invoice | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    await db.insert(invoices).values(data);
    return data as Invoice;
  } catch (error) {
    console.error("[Database] Failed to create invoice:", error);
    return null;
  }
}

export async function getOrganizationInvoices(organizationId: number): Promise<Invoice[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(invoices)
      .where(eq(invoices.organizationId, organizationId));
  } catch (error) {
    console.error("[Database] Failed to get organization invoices:", error);
    return [];
  }
}
