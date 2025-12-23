import { protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db";
import { organizationMembers, users } from "../../drizzle/schema";
import { eq, and } from "drizzle-orm";

export const membersRouter = router({
  // 获取组织成员
  getByOrganization: protectedProcedure
    .input(z.object({ organizationId: z.number() }))
    .query(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) return [];

      const members = await db
        .select()
        .from(organizationMembers)
        .where(eq((organizationMembers as any).organizationId, input.organizationId));

      // 获取用户信息
      const result = [];
      for (const member of members) {
        const user = await db
          .select()
          .from(users)
          .where(eq((users as any).id, (member as any).userId));

        result.push({
          id: (member as any).id,
          organizationId: (member as any).organizationId,
          userId: (member as any).userId,
          role: (member as any).role,
          createdAt: (member as any).createdAt,
          user: user[0],
        });
      }

      return result;
    }),

  // 添加成员
  add: protectedProcedure
    .input(
      z.object({
        organizationId: z.number(),
        email: z.string().email(),
        role: z.enum(["owner", "admin", "member"]).default("member"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // 检查用户是否是管理员
      const member = await db
        .select()
        .from(organizationMembers)
        .where(
          and(
            eq((organizationMembers as any).organizationId, input.organizationId),
            eq((organizationMembers as any).userId, ctx.user.id)
          )
        );

      if (member.length === 0 || !["owner", "admin"].includes((member[0] as any).role)) {
        throw new Error("Not authorized");
      }

      // 查找用户
      const targetUser = await db
        .select()
        .from(users)
        .where(eq((users as any).email, input.email));

      if (targetUser.length === 0) throw new Error("User not found");

      // 添加成员
      await db.insert(organizationMembers).values({
        organizationId: input.organizationId,
        userId: (targetUser[0] as any).id,
        role: input.role,
      });

      return { success: true };
    }),

  // 更新成员角色
  updateRole: protectedProcedure
    .input(
      z.object({
        organizationId: z.number(),
        memberId: z.number(),
        role: z.enum(["owner", "admin", "member"]),
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
            eq((organizationMembers as any).organizationId, input.organizationId),
            eq((organizationMembers as any).userId, ctx.user.id),
            eq((organizationMembers as any).role, "owner")
          )
        );

      if (member.length === 0) throw new Error("Not authorized");

      // 更新成员角色
      await db
        .update(organizationMembers)
        .set({ role: input.role })
        .where(eq((organizationMembers as any).id, input.memberId));

      return { success: true };
    }),

  // 删除成员
  remove: protectedProcedure
    .input(
      z.object({
        organizationId: z.number(),
        memberId: z.number(),
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
            eq((organizationMembers as any).organizationId, input.organizationId),
            eq((organizationMembers as any).userId, ctx.user.id),
            eq((organizationMembers as any).role, "owner")
          )
        );

      if (member.length === 0) throw new Error("Not authorized");

      // 删除成员
      await db
        .delete(organizationMembers)
        .where(eq((organizationMembers as any).id, input.memberId));

      return { success: true };
    }),
});
