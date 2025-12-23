import { protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import {
  getDb,
  getUserOrganizations,
  getOrganizationMembers,
  getOrganizationMemories,
  getOrganizationSubscription,
  getOrganizationInvoices,
  createOrganization,
  addOrganizationMember,
  createMemory,
} from "../db-multi-tenant";
import { organizations, organizationMembers, users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export const dashboardRouter = router({
  /**
   * Get current user's organizations
   */
  getOrganizations: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      return [];
    }

    return await getUserOrganizations(ctx.user.id);
  }),

  /**
   * Get organization details
   */
  getOrganization: protectedProcedure
    .input(z.object({ organizationId: z.number() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.user) {
        return null;
      }

      try {
        const db = await getDb();
        if (!db) {
          return null;
        }

        const org = await db
          .select()
          .from(organizations)
          .where(eq(organizations.id, input.organizationId))
          .limit(1);

        if (org.length === 0) {
          return null;
        }

        return org[0];
      } catch (error) {
        console.error("[Dashboard] Error fetching organization:", error);
        return null;
      }
    }),

  /**
   * Create new organization
   */
  createOrganization: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(255),
        slug: z.string().min(1).max(255),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new Error("User not authenticated");
      }

      try {
        const org = await createOrganization({
          name: input.name,
          slug: input.slug,
          description: input.description,
          ownerId: ctx.user.id,
          plan: "free",
          maxUsers: 5,
          maxStorage: 1073741824, // 1GB
        });

        if (org) {
          // Add owner as member
          await addOrganizationMember({
            organizationId: org.id!,
            userId: ctx.user.id,
            role: "owner",
          });
        }

        return org;
      } catch (error) {
        console.error("[Dashboard] Error creating organization:", error);
        throw error;
      }
    }),

  /**
   * Get organization members
   */
  getMembers: protectedProcedure
    .input(z.object({ organizationId: z.number() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.user) {
        return [];
      }

      try {
        const db = await getDb();
        if (!db) {
          return [];
        }

        const members = await db
          .select()
          .from(organizationMembers)
          .where(eq(organizationMembers.organizationId, input.organizationId));

        // Fetch user details for each member
        const membersWithDetails = await Promise.all(
          members.map(async (member) => {
            const user = await db
              .select()
              .from(users)
              .where(eq(users.id, member.userId))
              .limit(1);

            return {
              ...member,
              user: user.length > 0 ? user[0] : null,
            };
          })
        );

        return membersWithDetails;
      } catch (error) {
        console.error("[Dashboard] Error fetching members:", error);
        return [];
      }
    }),

  /**
   * Get organization memories
   */
  getMemories: protectedProcedure
    .input(
      z.object({
        organizationId: z.number(),
        limit: z.number().default(50),
        offset: z.number().default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.user) {
        return [];
      }

      return await getOrganizationMemories(
        input.organizationId,
        input.limit,
        input.offset
      );
    }),

  /**
   * Create memory
   */
  createMemory: protectedProcedure
    .input(
      z.object({
        organizationId: z.number(),
        title: z.string().min(1).max(512),
        content: z.string().min(1),
        tags: z.array(z.string()).optional(),
        source: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new Error("User not authenticated");
      }

      try {
        const memory = await createMemory({
          organizationId: input.organizationId,
          userId: ctx.user.id,
          title: input.title,
          content: input.content,
          tags: input.tags ? JSON.stringify(input.tags) : null,
          source: input.source || "web",
        });

        return memory;
      } catch (error) {
        console.error("[Dashboard] Error creating memory:", error);
        throw error;
      }
    }),

  /**
   * Get organization subscription
   */
  getSubscription: protectedProcedure
    .input(z.object({ organizationId: z.number() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.user) {
        return null;
      }

      return await getOrganizationSubscription(input.organizationId);
    }),

  /**
   * Get organization invoices
   */
  getInvoices: protectedProcedure
    .input(z.object({ organizationId: z.number() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.user) {
        return [];
      }

      return await getOrganizationInvoices(input.organizationId);
    }),

  /**
   * Get dashboard stats
   */
  getStats: protectedProcedure
    .input(z.object({ organizationId: z.number() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.user) {
        return null;
      }

      try {
        const db = await getDb();
        if (!db) {
          return null;
        }

        // Get organization info
        const org = await db
          .select()
          .from(organizations)
          .where(eq(organizations.id, input.organizationId))
          .limit(1);

        if (org.length === 0) {
          return null;
        }

        // Get member count
        const members = await getOrganizationMembers(input.organizationId);

        // Get memory count
        const memories = await getOrganizationMemories(input.organizationId, 1000, 0);

        // Get subscription status
        const subscription = await getOrganizationSubscription(input.organizationId);

        return {
          organization: org[0],
          memberCount: members.length,
          memoryCount: memories.length,
          subscription: subscription,
          plan: subscription?.status === "active" ? "Premium" : "Free",
        };
      } catch (error) {
        console.error("[Dashboard] Error fetching stats:", error);
        return null;
      }
    }),
});

export type DashboardRouter = typeof dashboardRouter;
