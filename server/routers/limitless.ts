import { protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db-multi-tenant";
import {
  lifelogs,
  limitlessContacts,
  limitlessPersons,
  limitlessMeetings,
  limitlessProfiles,
  limitlessSyncStatus,
} from "../../drizzle/schema";
import { eq, and, desc, asc, gte, lte, like, sql } from "drizzle-orm";
import { createLimitlessClient, LimitlessLifelog } from "../services/limitless-client";

export const limitlessRouter = router({
  /**
   * Save or update Limitless API key for user
   */
  saveApiKey: protectedProcedure
    .input(
      z.object({
        organizationId: z.number(),
        apiKey: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new Error("User not authenticated");
      }

      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      // Validate API key
      const client = createLimitlessClient(input.apiKey);
      const isValid = await client.validateApiKey();

      if (!isValid) {
        throw new Error("Invalid Limitless API key");
      }

      // Check if profile exists
      const existing = await db
        .select()
        .from(limitlessProfiles)
        .where(
          and(
            eq(limitlessProfiles.organizationId, input.organizationId),
            eq(limitlessProfiles.userId, ctx.user.id)
          )
        )
        .limit(1);

      if (existing.length > 0) {
        // Update existing
        await db
          .update(limitlessProfiles)
          .set({
            limitlessApiKey: input.apiKey,
            updatedAt: new Date(),
          })
          .where(eq(limitlessProfiles.id, existing[0].id));

        return { success: true, message: "API key updated" };
      } else {
        // Create new
        await db.insert(limitlessProfiles).values({
          organizationId: input.organizationId,
          userId: ctx.user.id,
          limitlessApiKey: input.apiKey,
        });

        return { success: true, message: "API key saved" };
      }
    }),

  /**
   * Get user's Limitless profile
   */
  getProfile: protectedProcedure
    .input(z.object({ organizationId: z.number() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.user) {
        return null;
      }

      const db = await getDb();
      if (!db) {
        return null;
      }

      const profile = await db
        .select()
        .from(limitlessProfiles)
        .where(
          and(
            eq(limitlessProfiles.organizationId, input.organizationId),
            eq(limitlessProfiles.userId, ctx.user.id)
          )
        )
        .limit(1);

      if (profile.length === 0) {
        return null;
      }

      // Don't expose the full API key
      const result = { ...profile[0] };
      if (result.limitlessApiKey) {
        result.limitlessApiKey = `${result.limitlessApiKey.slice(0, 8)}...${result.limitlessApiKey.slice(-4)}`;
      }

      return result;
    }),

  /**
   * Sync lifelogs from Limitless API
   */
  syncLifelogs: protectedProcedure
    .input(
      z.object({
        organizationId: z.number(),
        date: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        limit: z.number().optional(),
        fullSync: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new Error("User not authenticated");
      }

      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      // Get API key
      const profile = await db
        .select()
        .from(limitlessProfiles)
        .where(
          and(
            eq(limitlessProfiles.organizationId, input.organizationId),
            eq(limitlessProfiles.userId, ctx.user.id)
          )
        )
        .limit(1);

      if (profile.length === 0 || !profile[0].limitlessApiKey) {
        throw new Error("Limitless API key not configured");
      }

      // Update sync status
      const syncStatusRecord = await db
        .select()
        .from(limitlessSyncStatus)
        .where(
          and(
            eq(limitlessSyncStatus.organizationId, input.organizationId),
            eq(limitlessSyncStatus.userId, ctx.user.id),
            eq(limitlessSyncStatus.entityType, "lifelogs")
          )
        )
        .limit(1);

      if (syncStatusRecord.length === 0) {
        await db.insert(limitlessSyncStatus).values({
          organizationId: input.organizationId,
          userId: ctx.user.id,
          entityType: "lifelogs",
          status: "syncing",
        });
      } else {
        await db
          .update(limitlessSyncStatus)
          .set({ status: "syncing", errorMessage: null })
          .where(eq(limitlessSyncStatus.id, syncStatusRecord[0].id));
      }

      try {
        const client = createLimitlessClient(profile[0].limitlessApiKey);

        let fetchedLifelogs: LimitlessLifelog[];

        if (input.date) {
          fetchedLifelogs = await client.getLifelogsByDate(input.date);
        } else if (input.startDate && input.endDate) {
          fetchedLifelogs = await client.getLifelogsByRange(input.startDate, input.endDate);
        } else {
          fetchedLifelogs = await client.getRecentLifelogs(input.limit || 100);
        }

        let syncedCount = 0;

        for (const lifelog of fetchedLifelogs) {
          // Check if already exists
          const existing = await db
            .select()
            .from(lifelogs)
            .where(eq(lifelogs.externalId, lifelog.id))
            .limit(1);

          const lifelogData = {
            externalId: lifelog.id,
            organizationId: input.organizationId,
            userId: ctx.user.id,
            title: lifelog.title,
            markdown: lifelog.markdown,
            contents: JSON.stringify(lifelog.contents),
            startTime: lifelog.startTime ? new Date(lifelog.startTime) : null,
            endTime: lifelog.endTime ? new Date(lifelog.endTime) : null,
            isStarred: lifelog.isStarred,
            syncedAt: new Date(),
          };

          if (existing.length > 0) {
            await db
              .update(lifelogs)
              .set(lifelogData)
              .where(eq(lifelogs.id, existing[0].id));
          } else {
            await db.insert(lifelogs).values(lifelogData);
            syncedCount++;
          }
        }

        // Update sync status
        await db
          .update(limitlessSyncStatus)
          .set({
            status: "completed",
            lastSyncedAt: new Date(),
            totalSynced: sql`${limitlessSyncStatus.totalSynced} + ${syncedCount}`,
          })
          .where(
            and(
              eq(limitlessSyncStatus.organizationId, input.organizationId),
              eq(limitlessSyncStatus.userId, ctx.user.id),
              eq(limitlessSyncStatus.entityType, "lifelogs")
            )
          );

        return {
          success: true,
          synced: syncedCount,
          total: fetchedLifelogs.length,
        };
      } catch (error: any) {
        // Update sync status with error
        await db
          .update(limitlessSyncStatus)
          .set({
            status: "error",
            errorMessage: error.message,
          })
          .where(
            and(
              eq(limitlessSyncStatus.organizationId, input.organizationId),
              eq(limitlessSyncStatus.userId, ctx.user.id),
              eq(limitlessSyncStatus.entityType, "lifelogs")
            )
          );

        throw error;
      }
    }),

  /**
   * Get lifelogs from local database
   */
  getLifelogs: protectedProcedure
    .input(
      z.object({
        organizationId: z.number(),
        limit: z.number().default(50),
        offset: z.number().default(0),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        isStarred: z.boolean().optional(),
        search: z.string().optional(),
        sortDirection: z.enum(["asc", "desc"]).default("desc"),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.user) {
        return { lifelogs: [], total: 0 };
      }

      const db = await getDb();
      if (!db) {
        return { lifelogs: [], total: 0 };
      }

      let conditions = [
        eq(lifelogs.organizationId, input.organizationId),
        eq(lifelogs.userId, ctx.user.id),
      ];

      if (input.startDate) {
        conditions.push(gte(lifelogs.startTime, new Date(input.startDate)));
      }

      if (input.endDate) {
        conditions.push(lte(lifelogs.endTime, new Date(input.endDate)));
      }

      if (input.isStarred !== undefined) {
        conditions.push(eq(lifelogs.isStarred, input.isStarred));
      }

      if (input.search) {
        conditions.push(
          sql`(${lifelogs.title} LIKE ${`%${input.search}%`} OR ${lifelogs.markdown} LIKE ${`%${input.search}%`})`
        );
      }

      const whereClause = and(...conditions);

      const results = await db
        .select()
        .from(lifelogs)
        .where(whereClause)
        .orderBy(input.sortDirection === "desc" ? desc(lifelogs.startTime) : asc(lifelogs.startTime))
        .limit(input.limit)
        .offset(input.offset);

      // Get total count
      const countResult = await db
        .select({ count: sql<number>`COUNT(*)` })
        .from(lifelogs)
        .where(whereClause);

      return {
        lifelogs: results.map((r) => ({
          ...r,
          contents: r.contents ? JSON.parse(r.contents) : [],
        })),
        total: countResult[0]?.count || 0,
      };
    }),

  /**
   * Get a single lifelog by ID
   */
  getLifelogById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.user) {
        return null;
      }

      const db = await getDb();
      if (!db) {
        return null;
      }

      const result = await db
        .select()
        .from(lifelogs)
        .where(
          and(
            eq(lifelogs.id, input.id),
            eq(lifelogs.userId, ctx.user.id)
          )
        )
        .limit(1);

      if (result.length === 0) {
        return null;
      }

      return {
        ...result[0],
        contents: result[0].contents ? JSON.parse(result[0].contents) : [],
      };
    }),

  /**
   * Search lifelogs with full-text search
   */
  searchLifelogs: protectedProcedure
    .input(
      z.object({
        organizationId: z.number(),
        query: z.string().min(1),
        limit: z.number().default(20),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.user) {
        return [];
      }

      const db = await getDb();
      if (!db) {
        return [];
      }

      let conditions = [
        eq(lifelogs.organizationId, input.organizationId),
        eq(lifelogs.userId, ctx.user.id),
        sql`(${lifelogs.title} LIKE ${`%${input.query}%`} OR ${lifelogs.markdown} LIKE ${`%${input.query}%`} OR ${lifelogs.contents} LIKE ${`%${input.query}%`})`,
      ];

      if (input.startDate) {
        conditions.push(gte(lifelogs.startTime, new Date(input.startDate)));
      }

      if (input.endDate) {
        conditions.push(lte(lifelogs.endTime, new Date(input.endDate)));
      }

      const results = await db
        .select()
        .from(lifelogs)
        .where(and(...conditions))
        .orderBy(desc(lifelogs.startTime))
        .limit(input.limit);

      return results.map((r) => ({
        ...r,
        contents: r.contents ? JSON.parse(r.contents) : [],
      }));
    }),

  /**
   * Get sync status
   */
  getSyncStatus: protectedProcedure
    .input(z.object({ organizationId: z.number() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.user) {
        return null;
      }

      const db = await getDb();
      if (!db) {
        return null;
      }

      const statuses = await db
        .select()
        .from(limitlessSyncStatus)
        .where(
          and(
            eq(limitlessSyncStatus.organizationId, input.organizationId),
            eq(limitlessSyncStatus.userId, ctx.user.id)
          )
        );

      return statuses;
    }),

  /**
   * Live fetch lifelogs directly from Limitless API (without storing)
   */
  fetchLiveLifelogs: protectedProcedure
    .input(
      z.object({
        organizationId: z.number(),
        date: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        limit: z.number().default(20),
        includeMarkdown: z.boolean().default(true),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new Error("User not authenticated");
      }

      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      // Get API key
      const profile = await db
        .select()
        .from(limitlessProfiles)
        .where(
          and(
            eq(limitlessProfiles.organizationId, input.organizationId),
            eq(limitlessProfiles.userId, ctx.user.id)
          )
        )
        .limit(1);

      if (profile.length === 0 || !profile[0].limitlessApiKey) {
        throw new Error("Limitless API key not configured");
      }

      const client = createLimitlessClient(profile[0].limitlessApiKey);

      if (input.date) {
        return client.getLifelogsByDate(input.date);
      } else if (input.startDate && input.endDate) {
        return client.getLifelogsByRange(input.startDate, input.endDate);
      } else {
        return client.getRecentLifelogs(input.limit);
      }
    }),

  /**
   * Live search lifelogs directly from Limitless API
   */
  searchLiveLifelogs: protectedProcedure
    .input(
      z.object({
        organizationId: z.number(),
        query: z.string().min(1),
        date: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        limit: z.number().default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new Error("User not authenticated");
      }

      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      // Get API key
      const profile = await db
        .select()
        .from(limitlessProfiles)
        .where(
          and(
            eq(limitlessProfiles.organizationId, input.organizationId),
            eq(limitlessProfiles.userId, ctx.user.id)
          )
        )
        .limit(1);

      if (profile.length === 0 || !profile[0].limitlessApiKey) {
        throw new Error("Limitless API key not configured");
      }

      const client = createLimitlessClient(profile[0].limitlessApiKey);

      return client.searchLifelogs(input.query, {
        date: input.date,
        start: input.startDate,
        end: input.endDate,
        limit: input.limit,
      });
    }),

  /**
   * Delete a synced lifelog
   */
  deleteLifelog: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new Error("User not authenticated");
      }

      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      await db
        .delete(lifelogs)
        .where(
          and(
            eq(lifelogs.id, input.id),
            eq(lifelogs.userId, ctx.user.id)
          )
        );

      return { success: true };
    }),

  /**
   * Toggle star on a lifelog
   */
  toggleStar: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new Error("User not authenticated");
      }

      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      const existing = await db
        .select()
        .from(lifelogs)
        .where(
          and(
            eq(lifelogs.id, input.id),
            eq(lifelogs.userId, ctx.user.id)
          )
        )
        .limit(1);

      if (existing.length === 0) {
        throw new Error("Lifelog not found");
      }

      await db
        .update(lifelogs)
        .set({ isStarred: !existing[0].isStarred })
        .where(eq(lifelogs.id, input.id));

      return { success: true, isStarred: !existing[0].isStarred };
    }),

  /**
   * Get statistics
   */
  getStats: protectedProcedure
    .input(z.object({ organizationId: z.number() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.user) {
        return null;
      }

      const db = await getDb();
      if (!db) {
        return null;
      }

      const baseConditions = and(
        eq(lifelogs.organizationId, input.organizationId),
        eq(lifelogs.userId, ctx.user.id)
      );

      // Total lifelogs
      const totalResult = await db
        .select({ count: sql<number>`COUNT(*)` })
        .from(lifelogs)
        .where(baseConditions);

      // Starred lifelogs
      const starredResult = await db
        .select({ count: sql<number>`COUNT(*)` })
        .from(lifelogs)
        .where(and(baseConditions, eq(lifelogs.isStarred, true)));

      // This week
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const weekResult = await db
        .select({ count: sql<number>`COUNT(*)` })
        .from(lifelogs)
        .where(and(baseConditions, gte(lifelogs.startTime, weekAgo)));

      // Today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayResult = await db
        .select({ count: sql<number>`COUNT(*)` })
        .from(lifelogs)
        .where(and(baseConditions, gte(lifelogs.startTime, today)));

      // Get sync status
      const syncStatus = await db
        .select()
        .from(limitlessSyncStatus)
        .where(
          and(
            eq(limitlessSyncStatus.organizationId, input.organizationId),
            eq(limitlessSyncStatus.userId, ctx.user.id),
            eq(limitlessSyncStatus.entityType, "lifelogs")
          )
        )
        .limit(1);

      return {
        totalLifelogs: totalResult[0]?.count || 0,
        starredLifelogs: starredResult[0]?.count || 0,
        thisWeek: weekResult[0]?.count || 0,
        today: todayResult[0]?.count || 0,
        lastSynced: syncStatus[0]?.lastSyncedAt || null,
        syncStatus: syncStatus[0]?.status || "idle",
      };
    }),

  // ============================================
  // IMPORT ENDPOINTS - For uploading Limitless exports
  // ============================================

  /**
   * Import a contact from JSON export
   */
  importContact: protectedProcedure
    .input(
      z.object({
        organizationId: z.number(),
        contact: z.object({
          name: z.string(),
          externalContactId: z.string().optional(),
          primaryEmail: z.string().optional(),
          emails: z.array(z.string()).optional(),
          photoUrl: z.string().nullable().optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) throw new Error("User not authenticated");
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const externalId = input.contact.externalContactId || `imported_${Date.now()}_${Math.random().toString(36).slice(2)}`;

      // Check if exists
      const existing = await db
        .select()
        .from(limitlessContacts)
        .where(eq(limitlessContacts.externalId, externalId))
        .limit(1);

      const contactData = {
        externalId,
        organizationId: input.organizationId,
        userId: ctx.user.id,
        name: input.contact.name,
        primaryEmail: input.contact.primaryEmail || null,
        emails: input.contact.emails ? JSON.stringify(input.contact.emails) : null,
        photoUrl: input.contact.photoUrl || null,
      };

      if (existing.length > 0) {
        await db.update(limitlessContacts).set(contactData).where(eq(limitlessContacts.id, existing[0].id));
        return { success: true, id: existing[0].id, action: "updated" };
      } else {
        const result = await db.insert(limitlessContacts).values(contactData);
        return { success: true, id: result[0].insertId, action: "created" };
      }
    }),

  /**
   * Import a person from JSON export
   */
  importPerson: protectedProcedure
    .input(
      z.object({
        organizationId: z.number(),
        person: z.object({
          name: z.string(),
          email: z.string().optional(),
          photoUrl: z.string().nullable().optional(),
          contactDocId: z.string().optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) throw new Error("User not authenticated");
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const externalId = input.person.contactDocId || `person_${Date.now()}_${Math.random().toString(36).slice(2)}`;

      const existing = await db
        .select()
        .from(limitlessPersons)
        .where(eq(limitlessPersons.externalId, externalId))
        .limit(1);

      const personData = {
        externalId,
        organizationId: input.organizationId,
        userId: ctx.user.id,
        name: input.person.name,
        email: input.person.email || null,
        photoUrl: input.person.photoUrl || null,
        contactDocId: input.person.contactDocId || null,
      };

      if (existing.length > 0) {
        await db.update(limitlessPersons).set(personData).where(eq(limitlessPersons.id, existing[0].id));
        return { success: true, id: existing[0].id, action: "updated" };
      } else {
        const result = await db.insert(limitlessPersons).values(personData);
        return { success: true, id: result[0].insertId, action: "created" };
      }
    }),

  /**
   * Import a meeting from JSON export
   */
  importMeeting: protectedProcedure
    .input(
      z.object({
        organizationId: z.number(),
        meeting: z.object({
          title: z.string(),
          description: z.string().nullable().optional(),
          startTime: z.string(),
          endTime: z.string().nullable().optional(),
          participants: z.array(z.object({
            email: z.string(),
            name: z.string(),
            isSelf: z.boolean().optional(),
            isOrganizer: z.boolean().optional(),
            responseStatus: z.string().optional(),
          })).optional(),
          url: z.string().nullable().optional(),
          conferenceUrl: z.string().nullable().optional(),
        }),
        externalId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) throw new Error("User not authenticated");
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const externalId = input.externalId || `meeting_${Date.now()}_${Math.random().toString(36).slice(2)}`;

      const existing = await db
        .select()
        .from(limitlessMeetings)
        .where(eq(limitlessMeetings.externalId, externalId))
        .limit(1);

      const meetingData = {
        externalId,
        organizationId: input.organizationId,
        userId: ctx.user.id,
        title: input.meeting.title,
        description: input.meeting.description || null,
        startTime: new Date(input.meeting.startTime),
        endTime: input.meeting.endTime ? new Date(input.meeting.endTime) : null,
        participants: input.meeting.participants ? JSON.stringify(input.meeting.participants) : null,
        url: input.meeting.url || null,
        conferenceUrl: input.meeting.conferenceUrl || null,
      };

      if (existing.length > 0) {
        await db.update(limitlessMeetings).set(meetingData).where(eq(limitlessMeetings.id, existing[0].id));
        return { success: true, id: existing[0].id, action: "updated" };
      } else {
        const result = await db.insert(limitlessMeetings).values(meetingData);
        return { success: true, id: result[0].insertId, action: "created" };
      }
    }),

  /**
   * Import a lifelog from markdown or structured data
   */
  importLifelog: protectedProcedure
    .input(
      z.object({
        organizationId: z.number(),
        lifelog: z.object({
          title: z.string(),
          markdown: z.string().optional(),
          contents: z.array(z.any()).optional(),
          startTime: z.string(),
          endTime: z.string().optional(),
          isStarred: z.boolean().optional(),
        }),
        externalId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) throw new Error("User not authenticated");
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const externalId = input.externalId || `lifelog_${Date.now()}_${Math.random().toString(36).slice(2)}`;

      const existing = await db
        .select()
        .from(lifelogs)
        .where(eq(lifelogs.externalId, externalId))
        .limit(1);

      const lifelogData = {
        externalId,
        organizationId: input.organizationId,
        userId: ctx.user.id,
        title: input.lifelog.title,
        markdown: input.lifelog.markdown || null,
        contents: input.lifelog.contents ? JSON.stringify(input.lifelog.contents) : null,
        startTime: new Date(input.lifelog.startTime),
        endTime: input.lifelog.endTime ? new Date(input.lifelog.endTime) : null,
        isStarred: input.lifelog.isStarred || false,
        source: "import",
        syncedAt: new Date(),
      };

      if (existing.length > 0) {
        await db.update(lifelogs).set(lifelogData).where(eq(lifelogs.id, existing[0].id));
        return { success: true, id: existing[0].id, action: "updated" };
      } else {
        const result = await db.insert(lifelogs).values(lifelogData);
        return { success: true, id: result[0].insertId, action: "created" };
      }
    }),

  /**
   * Bulk import from Limitless export structure
   * Accepts the entire export data in one call
   */
  importBulk: protectedProcedure
    .input(
      z.object({
        organizationId: z.number(),
        data: z.object({
          contacts: z.array(z.object({
            name: z.string(),
            externalContactId: z.string().optional(),
            primaryEmail: z.string().optional(),
            emails: z.array(z.string()).optional(),
            photoUrl: z.string().nullable().optional(),
          })).optional(),
          persons: z.array(z.object({
            name: z.string(),
            email: z.string().optional(),
            photoUrl: z.string().nullable().optional(),
            contactDocId: z.string().optional(),
          })).optional(),
          meetings: z.array(z.object({
            title: z.string(),
            description: z.string().nullable().optional(),
            startTime: z.string(),
            endTime: z.string().nullable().optional(),
            participants: z.array(z.any()).optional(),
            url: z.string().nullable().optional(),
            conferenceUrl: z.string().nullable().optional(),
            externalId: z.string().optional(),
          })).optional(),
          lifelogs: z.array(z.object({
            title: z.string(),
            markdown: z.string().optional(),
            contents: z.array(z.any()).optional(),
            startTime: z.string(),
            endTime: z.string().optional(),
            isStarred: z.boolean().optional(),
            externalId: z.string().optional(),
          })).optional(),
          userProfile: z.object({
            displayName: z.string().optional(),
            job: z.string().optional(),
            traits: z.string().optional(),
            customTraits: z.string().optional(),
            additionalInfo: z.string().nullable().optional(),
            languageCode: z.string().optional(),
            verbosity: z.string().optional(),
          }).optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) throw new Error("User not authenticated");
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const results = {
        contacts: { created: 0, updated: 0 },
        persons: { created: 0, updated: 0 },
        meetings: { created: 0, updated: 0 },
        lifelogs: { created: 0, updated: 0 },
        userProfile: false,
      };

      // Import contacts
      if (input.data.contacts) {
        for (const contact of input.data.contacts) {
          const externalId = contact.externalContactId || `imported_${Date.now()}_${Math.random().toString(36).slice(2)}`;
          const existing = await db.select().from(limitlessContacts).where(eq(limitlessContacts.externalId, externalId)).limit(1);

          const contactData = {
            externalId,
            organizationId: input.organizationId,
            userId: ctx.user.id,
            name: contact.name,
            primaryEmail: contact.primaryEmail || null,
            emails: contact.emails ? JSON.stringify(contact.emails) : null,
            photoUrl: contact.photoUrl || null,
          };

          if (existing.length > 0) {
            await db.update(limitlessContacts).set(contactData).where(eq(limitlessContacts.id, existing[0].id));
            results.contacts.updated++;
          } else {
            await db.insert(limitlessContacts).values(contactData);
            results.contacts.created++;
          }
        }
      }

      // Import persons
      if (input.data.persons) {
        for (const person of input.data.persons) {
          const externalId = person.contactDocId || `person_${Date.now()}_${Math.random().toString(36).slice(2)}`;
          const existing = await db.select().from(limitlessPersons).where(eq(limitlessPersons.externalId, externalId)).limit(1);

          const personData = {
            externalId,
            organizationId: input.organizationId,
            userId: ctx.user.id,
            name: person.name,
            email: person.email || null,
            photoUrl: person.photoUrl || null,
            contactDocId: person.contactDocId || null,
          };

          if (existing.length > 0) {
            await db.update(limitlessPersons).set(personData).where(eq(limitlessPersons.id, existing[0].id));
            results.persons.updated++;
          } else {
            await db.insert(limitlessPersons).values(personData);
            results.persons.created++;
          }
        }
      }

      // Import meetings
      if (input.data.meetings) {
        for (const meeting of input.data.meetings) {
          const externalId = meeting.externalId || `meeting_${Date.now()}_${Math.random().toString(36).slice(2)}`;
          const existing = await db.select().from(limitlessMeetings).where(eq(limitlessMeetings.externalId, externalId)).limit(1);

          const meetingData = {
            externalId,
            organizationId: input.organizationId,
            userId: ctx.user.id,
            title: meeting.title,
            description: meeting.description || null,
            startTime: new Date(meeting.startTime),
            endTime: meeting.endTime ? new Date(meeting.endTime) : null,
            participants: meeting.participants ? JSON.stringify(meeting.participants) : null,
            url: meeting.url || null,
            conferenceUrl: meeting.conferenceUrl || null,
          };

          if (existing.length > 0) {
            await db.update(limitlessMeetings).set(meetingData).where(eq(limitlessMeetings.id, existing[0].id));
            results.meetings.updated++;
          } else {
            await db.insert(limitlessMeetings).values(meetingData);
            results.meetings.created++;
          }
        }
      }

      // Import lifelogs
      if (input.data.lifelogs) {
        for (const lifelog of input.data.lifelogs) {
          const externalId = lifelog.externalId || `lifelog_${Date.now()}_${Math.random().toString(36).slice(2)}`;
          const existing = await db.select().from(lifelogs).where(eq(lifelogs.externalId, externalId)).limit(1);

          const lifelogData = {
            externalId,
            organizationId: input.organizationId,
            userId: ctx.user.id,
            title: lifelog.title,
            markdown: lifelog.markdown || null,
            contents: lifelog.contents ? JSON.stringify(lifelog.contents) : null,
            startTime: new Date(lifelog.startTime),
            endTime: lifelog.endTime ? new Date(lifelog.endTime) : null,
            isStarred: lifelog.isStarred || false,
            source: "import",
            syncedAt: new Date(),
          };

          if (existing.length > 0) {
            await db.update(lifelogs).set(lifelogData).where(eq(lifelogs.id, existing[0].id));
            results.lifelogs.updated++;
          } else {
            await db.insert(lifelogs).values(lifelogData);
            results.lifelogs.created++;
          }
        }
      }

      // Update user profile
      if (input.data.userProfile) {
        const profile = await db
          .select()
          .from(limitlessProfiles)
          .where(and(
            eq(limitlessProfiles.organizationId, input.organizationId),
            eq(limitlessProfiles.userId, ctx.user.id)
          ))
          .limit(1);

        const profileData = {
          displayName: input.data.userProfile.displayName || null,
          job: input.data.userProfile.job || null,
          traits: input.data.userProfile.traits || null,
          customTraits: input.data.userProfile.customTraits || null,
          additionalInfo: input.data.userProfile.additionalInfo || null,
          languageCode: input.data.userProfile.languageCode || null,
          verbosity: input.data.userProfile.verbosity || null,
        };

        if (profile.length > 0) {
          await db.update(limitlessProfiles).set(profileData).where(eq(limitlessProfiles.id, profile[0].id));
        } else {
          await db.insert(limitlessProfiles).values({
            organizationId: input.organizationId,
            userId: ctx.user.id,
            ...profileData,
          });
        }
        results.userProfile = true;
      }

      return { success: true, results };
    }),

  /**
   * Get all contacts for current user
   */
  getContacts: protectedProcedure
    .input(z.object({ organizationId: z.number() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.user) return [];
      const db = await getDb();
      if (!db) return [];

      return db
        .select()
        .from(limitlessContacts)
        .where(and(
          eq(limitlessContacts.organizationId, input.organizationId),
          eq(limitlessContacts.userId, ctx.user.id)
        ))
        .orderBy(asc(limitlessContacts.name));
    }),

  /**
   * Get all persons for current user
   */
  getPersons: protectedProcedure
    .input(z.object({ organizationId: z.number() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.user) return [];
      const db = await getDb();
      if (!db) return [];

      return db
        .select()
        .from(limitlessPersons)
        .where(and(
          eq(limitlessPersons.organizationId, input.organizationId),
          eq(limitlessPersons.userId, ctx.user.id)
        ))
        .orderBy(asc(limitlessPersons.name));
    }),

  /**
   * Get all meetings for current user
   */
  getMeetings: protectedProcedure
    .input(z.object({
      organizationId: z.number(),
      limit: z.number().default(50),
      offset: z.number().default(0),
    }))
    .query(async ({ ctx, input }) => {
      if (!ctx.user) return [];
      const db = await getDb();
      if (!db) return [];

      return db
        .select()
        .from(limitlessMeetings)
        .where(and(
          eq(limitlessMeetings.organizationId, input.organizationId),
          eq(limitlessMeetings.userId, ctx.user.id)
        ))
        .orderBy(desc(limitlessMeetings.startTime))
        .limit(input.limit)
        .offset(input.offset);
    }),
});

export type LimitlessRouter = typeof limitlessRouter;
