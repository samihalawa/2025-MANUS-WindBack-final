import { protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db";
import { subscriptions, invoices } from "../../drizzle/schema";
import { eq, and } from "drizzle-orm";

export const subscriptionsRouter = router({
  // 获取组织的订阅
  getByOrganization: protectedProcedure
    .input(z.object({ organizationId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;

      const result = await db
        .select()
        .from(subscriptions)
        .where(eq((subscriptions as any).organizationId, input.organizationId))
        .limit(1);

      return result[0] || null;
    }),

  // 创建订阅
  create: protectedProcedure
    .input(
      z.object({
        organizationId: z.number(),
        stripeCustomerId: z.string(),
        stripeSubscriptionId: z.string(),
        plan: z.enum(["free", "pro", "enterprise"]),
        status: z.enum(["active", "canceled", "past_due"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.insert(subscriptions).values({
        organizationId: input.organizationId,
        userId: ctx.user.id,
        stripeCustomerId: input.stripeCustomerId,
        stripeSubscriptionId: input.stripeSubscriptionId,
        plan: input.plan,
        status: input.status,
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });

      return { success: true };
    }),

  // 更新订阅状态
  updateStatus: protectedProcedure
    .input(
      z.object({
        organizationId: z.number(),
        status: z.enum(["active", "canceled", "past_due"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db
        .update(subscriptions)
        .set({ status: input.status })
        .where(eq((subscriptions as any).organizationId, input.organizationId));

      return { success: true };
    }),

  // 获取发票
  getInvoices: protectedProcedure
    .input(z.object({ organizationId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const result = await db
        .select()
        .from(invoices)
        .where(eq((invoices as any).organizationId, input.organizationId));

      return result;
    }),

  // 创建发票
  createInvoice: protectedProcedure
    .input(
      z.object({
        organizationId: z.number(),
        stripeInvoiceId: z.string(),
        amount: z.string(),
        currency: z.string().default("usd"),
        status: z.enum(["paid", "unpaid", "draft"]).default("unpaid"),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.insert(invoices).values({
        organizationId: input.organizationId,
        stripeInvoiceId: input.stripeInvoiceId,
        amount: input.amount,
        currency: input.currency,
        status: input.status,
        createdAt: new Date(),
      });

      return { success: true };
    }),
});
