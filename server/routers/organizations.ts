import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db";
import { organizations, organizationMembers, users } from "../../drizzle/schema";
import { eq, and } from "drizzle-orm";

export const organizationsRouter = router({
  // 创建新组织
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        slug: z.string().min(1),
        description: z.string().optional(),
        plan: z.enum(["free", "pro", "enterprise"]).default("free"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.insert(organizations).values({
        name: input.name,
        slug: input.slug,
        description: input.description,
        plan: input.plan,
        ownerId: ctx.user.id,
      });

      // 获取刚创建的组织
      const result = await db
        .select()
        .from(organizations)
        .where(eq((organizations as any).slug, input.slug))
        .limit(1);

      const orgId = result[0]?.id;

      // 将创建者添加为所有者
      if (orgId) {
        await db.insert(organizationMembers).values({
          organizationId: orgId,
          userId: ctx.user.id,
          role: "owner",
        });
      }

      return { id: orgId, name: input.name, slug: input.slug };
    }),

  // 获取用户的所有组织
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    const result = await db
      .select()
      .from(organizations)
      .innerJoin(
        organizationMembers as any,
        eq((organizationMembers as any).organizationId, (organizations as any).id)
      )
      .where(eq((organizationMembers as any).userId, ctx.user.id));

    return result.map((r) => (r as any).organizations);
  }),

  // 获取单个组织详情
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) return null;

      const result = await db
        .select()
        .from(organizations)
        .where(eq((organizations as any).id, input.id));

      if (result.length === 0) return null;

      const org = result[0];

      // 检查用户是否是成员
      const member = await db
        .select()
        .from(organizationMembers)
        .where(
          and(
            eq((organizationMembers as any).organizationId, input.id),
            eq((organizationMembers as any).userId, ctx.user.id)
          )
        );

      if (member.length === 0) return null;

      return org;
    }),

  // 更新组织
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        description: z.string().optional(),
        plan: z.enum(["free", "pro", "enterprise"]).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // 检查用户是否是所有者
      const member = await db
        .select()
        .from(organizationMembers)
        .where(
          and(
            eq((organizationMembers as any).organizationId, input.id),
            eq((organizationMembers as any).userId, ctx.user.id),
            eq((organizationMembers as any).role, "owner")
          )
        );

      if (member.length === 0) throw new Error("Not authorized");

      const updateData: any = {};
      if (input.name) updateData.name = input.name;
      if (input.description) updateData.description = input.description;
      if (input.plan) updateData.plan = input.plan;

      await db
        .update(organizations)
        .set(updateData)
        .where(eq((organizations as any).id, input.id));

      return { success: true };
    }),

  // 删除组织
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // 检查用户是否是所有者
      const member = await db
        .select()
        .from(organizationMembers)
        .where(
          and(
            eq((organizationMembers as any).organizationId, input.id),
            eq((organizationMembers as any).userId, ctx.user.id),
            eq((organizationMembers as any).role, "owner")
          )
        );

      if (member.length === 0) throw new Error("Not authorized");

      // 删除所有成员
      await db
        .delete(organizationMembers)
        .where(eq((organizationMembers as any).organizationId, input.id));

      // 删除组织
      await db
        .delete(organizations)
        .where(eq((organizations as any).id, input.id));

      return { success: true };
    }),
});
