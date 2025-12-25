/**
 * Limitless-Compatible REST API
 *
 * This provides a REST API that mimics the Limitless API format,
 * allowing the frontend to switch between the real Limitless API
 * and our local database seamlessly.
 *
 * Mount at: /api/limitless/v1
 */

import { Router, Request, Response, NextFunction } from "express";
import { getDb } from "../db-multi-tenant";
import {
  lifelogs,
  limitlessContacts,
  limitlessPersons,
  limitlessMeetings,
  limitlessProfiles,
  User,
} from "../../drizzle/schema";
import { eq, and, desc, asc, gte, lte, sql } from "drizzle-orm";
import { sdk } from "../_core/sdk";

// Extend Request to include user
interface AuthenticatedRequest extends Request {
  user: User;
}

// Authentication middleware - uses SDK to verify session
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await sdk.authenticateRequest(req);
    (req as AuthenticatedRequest).user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "API key or authentication required",
    });
  }
};

// Get organizationId from header or query param
const getOrganizationId = (req: Request): number => {
  const orgId = req.headers["x-organization-id"] || req.query.organizationId;
  return orgId ? parseInt(orgId as string, 10) : 1;
};

export const limitlessRestRouter = Router();

/**
 * GET /v1/lifelogs
 * Returns lifelogs in the same format as the Limitless API
 */
limitlessRestRouter.get("/lifelogs", authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const organizationId = getOrganizationId(req);
    const db = await getDb();

    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }

    // Parse query parameters (same as Limitless API)
    const {
      timezone,
      date,
      start,
      end,
      cursor,
      direction = "desc",
      includeMarkdown = "true",
      includeHeadings = "false",
      limit = "50",
      isStarred,
    } = req.query;

    const limitNum = Math.min(parseInt(limit as string, 10) || 50, 100);
    const offset = cursor ? parseInt(cursor as string, 10) : 0;

    let conditions = [
      eq(lifelogs.organizationId, organizationId),
      eq(lifelogs.userId, user.id),
    ];

    // Date filtering
    if (date) {
      const dateStart = new Date(date as string);
      dateStart.setHours(0, 0, 0, 0);
      const dateEnd = new Date(date as string);
      dateEnd.setHours(23, 59, 59, 999);
      conditions.push(gte(lifelogs.startTime, dateStart));
      conditions.push(lte(lifelogs.startTime, dateEnd));
    } else {
      if (start) {
        conditions.push(gte(lifelogs.startTime, new Date(start as string)));
      }
      if (end) {
        conditions.push(lte(lifelogs.endTime, new Date(end as string)));
      }
    }

    // Starred filter
    if (isStarred === "true") {
      conditions.push(eq(lifelogs.isStarred, true));
    }

    const results = await db
      .select()
      .from(lifelogs)
      .where(and(...conditions))
      .orderBy(direction === "asc" ? asc(lifelogs.startTime) : desc(lifelogs.startTime))
      .limit(limitNum + 1) // Fetch one extra to check if there's more
      .offset(offset);

    // Check if there are more results
    const hasMore = results.length > limitNum;
    const lifelogResults = hasMore ? results.slice(0, limitNum) : results;

    // Transform to Limitless API format
    const transformedLifelogs = lifelogResults.map((log) => ({
      id: log.externalId,
      title: log.title,
      markdown: includeMarkdown === "true" ? log.markdown : undefined,
      contents: log.contents ? JSON.parse(log.contents) : [],
      startTime: log.startTime?.toISOString(),
      endTime: log.endTime?.toISOString(),
      isStarred: log.isStarred,
      updatedAt: log.updatedAt?.toISOString(),
    }));

    // Response in Limitless API format
    res.json({
      data: {
        lifelogs: transformedLifelogs,
      },
      meta: {
        lifelogs: {
          nextCursor: hasMore ? String(offset + limitNum) : null,
          count: transformedLifelogs.length,
        },
      },
    });
  } catch (error: any) {
    console.error("Limitless REST API error:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /v1/lifelogs/:id
 * Get a single lifelog by ID
 */
limitlessRestRouter.get("/lifelogs/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const organizationId = getOrganizationId(req);
    const db = await getDb();

    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }

    const { id } = req.params;

    const result = await db
      .select()
      .from(lifelogs)
      .where(
        and(
          eq(lifelogs.externalId, id),
          eq(lifelogs.organizationId, organizationId),
          eq(lifelogs.userId, user.id)
        )
      )
      .limit(1);

    if (result.length === 0) {
      return res.status(404).json({ error: "Lifelog not found" });
    }

    const log = result[0];
    res.json({
      data: {
        lifelog: {
          id: log.externalId,
          title: log.title,
          markdown: log.markdown,
          contents: log.contents ? JSON.parse(log.contents) : [],
          startTime: log.startTime?.toISOString(),
          endTime: log.endTime?.toISOString(),
          isStarred: log.isStarred,
          updatedAt: log.updatedAt?.toISOString(),
        },
      },
    });
  } catch (error: any) {
    console.error("Limitless REST API error:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /v1/contacts
 * List all contacts
 */
limitlessRestRouter.get("/contacts", authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const organizationId = getOrganizationId(req);
    const db = await getDb();

    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }

    const results = await db
      .select()
      .from(limitlessContacts)
      .where(
        and(
          eq(limitlessContacts.organizationId, organizationId),
          eq(limitlessContacts.userId, user.id)
        )
      )
      .orderBy(asc(limitlessContacts.name));

    const transformedContacts = results.map((c) => ({
      name: c.name,
      externalContactId: c.externalId,
      primaryEmail: c.primaryEmail,
      emails: c.emails ? JSON.parse(c.emails) : [],
      photoUrl: c.photoUrl,
    }));

    res.json({
      data: {
        contacts: transformedContacts,
      },
      meta: {
        contacts: {
          count: transformedContacts.length,
        },
      },
    });
  } catch (error: any) {
    console.error("Limitless REST API error:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /v1/persons
 * List all persons
 */
limitlessRestRouter.get("/persons", authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const organizationId = getOrganizationId(req);
    const db = await getDb();

    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }

    const results = await db
      .select()
      .from(limitlessPersons)
      .where(
        and(
          eq(limitlessPersons.organizationId, organizationId),
          eq(limitlessPersons.userId, user.id)
        )
      )
      .orderBy(asc(limitlessPersons.name));

    const transformedPersons = results.map((p) => ({
      name: p.name,
      email: p.email,
      photoUrl: p.photoUrl,
      contactDocId: p.contactDocId,
    }));

    res.json({
      data: {
        persons: transformedPersons,
      },
      meta: {
        persons: {
          count: transformedPersons.length,
        },
      },
    });
  } catch (error: any) {
    console.error("Limitless REST API error:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /v1/meetings
 * List all meetings
 */
limitlessRestRouter.get("/meetings", authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const organizationId = getOrganizationId(req);
    const db = await getDb();

    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }

    const { limit = "50", cursor } = req.query;
    const limitNum = Math.min(parseInt(limit as string, 10) || 50, 100);
    const offset = cursor ? parseInt(cursor as string, 10) : 0;

    const results = await db
      .select()
      .from(limitlessMeetings)
      .where(
        and(
          eq(limitlessMeetings.organizationId, organizationId),
          eq(limitlessMeetings.userId, user.id)
        )
      )
      .orderBy(desc(limitlessMeetings.startTime))
      .limit(limitNum + 1)
      .offset(offset);

    const hasMore = results.length > limitNum;
    const meetingResults = hasMore ? results.slice(0, limitNum) : results;

    const transformedMeetings = meetingResults.map((m) => ({
      title: m.title,
      description: m.description,
      startTime: m.startTime?.toISOString(),
      endTime: m.endTime?.toISOString(),
      participants: m.participants ? JSON.parse(m.participants) : [],
      url: m.url,
      conferenceUrl: m.conferenceUrl,
    }));

    res.json({
      data: {
        meetings: transformedMeetings,
      },
      meta: {
        meetings: {
          nextCursor: hasMore ? String(offset + limitNum) : null,
          count: transformedMeetings.length,
        },
      },
    });
  } catch (error: any) {
    console.error("Limitless REST API error:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /v1/user/profile
 * Get user profile
 */
limitlessRestRouter.get("/user/profile", authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const organizationId = getOrganizationId(req);
    const db = await getDb();

    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }

    const result = await db
      .select()
      .from(limitlessProfiles)
      .where(
        and(
          eq(limitlessProfiles.organizationId, organizationId),
          eq(limitlessProfiles.userId, user.id)
        )
      )
      .limit(1);

    if (result.length === 0) {
      return res.json({
        data: {
          profile: null,
        },
      });
    }

    const p = result[0];
    res.json({
      data: {
        profile: {
          displayName: p.displayName,
          job: p.job,
          traits: p.traits,
          customTraits: p.customTraits,
          additionalInfo: p.additionalInfo,
          languageCode: p.languageCode,
          verbosity: p.verbosity,
        },
      },
    });
  } catch (error: any) {
    console.error("Limitless REST API error:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /v1/search
 * Search lifelogs
 */
limitlessRestRouter.post("/search", authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const organizationId = getOrganizationId(req);
    const db = await getDb();

    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }

    const { query, limit = 20, startDate, endDate } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    let conditions = [
      eq(lifelogs.organizationId, organizationId),
      eq(lifelogs.userId, user.id),
      sql`(${lifelogs.title} LIKE ${`%${query}%`} OR ${lifelogs.markdown} LIKE ${`%${query}%`} OR ${lifelogs.contents} LIKE ${`%${query}%`})`,
    ];

    if (startDate) {
      conditions.push(gte(lifelogs.startTime, new Date(startDate)));
    }
    if (endDate) {
      conditions.push(lte(lifelogs.endTime, new Date(endDate)));
    }

    const results = await db
      .select()
      .from(lifelogs)
      .where(and(...conditions))
      .orderBy(desc(lifelogs.startTime))
      .limit(Math.min(limit, 100));

    const transformedLifelogs = results.map((log) => ({
      id: log.externalId,
      title: log.title,
      markdown: log.markdown,
      contents: log.contents ? JSON.parse(log.contents) : [],
      startTime: log.startTime?.toISOString(),
      endTime: log.endTime?.toISOString(),
      isStarred: log.isStarred,
      updatedAt: log.updatedAt?.toISOString(),
    }));

    res.json({
      data: {
        lifelogs: transformedLifelogs,
      },
      meta: {
        lifelogs: {
          count: transformedLifelogs.length,
        },
      },
    });
  } catch (error: any) {
    console.error("Limitless REST API error:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /v1/import/lifelogs
 * Import lifelogs from Limitless export
 */
limitlessRestRouter.post("/import/lifelogs", authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as AuthenticatedRequest).user;
    const organizationId = getOrganizationId(req);
    const db = await getDb();

    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }

    const { lifelogs: lifelogData } = req.body;
    if (!Array.isArray(lifelogData)) {
      return res.status(400).json({ error: "lifelogs must be an array" });
    }

    const imported: string[] = [];
    for (const log of lifelogData) {
      const externalId = log.id || `imported_${Date.now()}_${Math.random().toString(36).substring(7)}`;

      await db.insert(lifelogs).values({
        organizationId,
        userId: user.id,
        externalId,
        title: log.title || "Untitled",
        markdown: log.markdown || null,
        contents: log.contents ? JSON.stringify(log.contents) : null,
        startTime: log.startTime ? new Date(log.startTime) : new Date(),
        endTime: log.endTime ? new Date(log.endTime) : null,
        isStarred: log.isStarred || false,
      }).onDuplicateKeyUpdate({
        set: {
          title: log.title || "Untitled",
          markdown: log.markdown || null,
          contents: log.contents ? JSON.stringify(log.contents) : null,
          endTime: log.endTime ? new Date(log.endTime) : null,
          isStarred: log.isStarred || false,
          updatedAt: new Date(),
        },
      });

      imported.push(externalId);
    }

    res.json({
      success: true,
      imported: imported.length,
      ids: imported,
    });
  } catch (error: any) {
    console.error("Limitless REST API import error:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /v1/import/contacts
 * Import contacts from Limitless export
 */
limitlessRestRouter.post("/import/contacts", authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as AuthenticatedRequest).user;
    const organizationId = getOrganizationId(req);
    const db = await getDb();

    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }

    const { contacts } = req.body;
    if (!Array.isArray(contacts)) {
      return res.status(400).json({ error: "contacts must be an array" });
    }

    const imported: string[] = [];
    for (const contact of contacts) {
      const externalId = contact.externalContactId || `imported_${Date.now()}_${Math.random().toString(36).substring(7)}`;

      await db.insert(limitlessContacts).values({
        organizationId,
        userId: user.id,
        externalId,
        name: contact.name,
        primaryEmail: contact.primaryEmail || null,
        emails: contact.emails ? JSON.stringify(contact.emails) : null,
        photoUrl: contact.photoUrl || null,
      }).onDuplicateKeyUpdate({
        set: {
          name: contact.name,
          primaryEmail: contact.primaryEmail || null,
          emails: contact.emails ? JSON.stringify(contact.emails) : null,
          photoUrl: contact.photoUrl || null,
          updatedAt: new Date(),
        },
      });

      imported.push(externalId);
    }

    res.json({
      success: true,
      imported: imported.length,
      ids: imported,
    });
  } catch (error: any) {
    console.error("Limitless REST API import error:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /v1/import/persons
 * Import persons from Limitless export
 */
limitlessRestRouter.post("/import/persons", authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as AuthenticatedRequest).user;
    const organizationId = getOrganizationId(req);
    const db = await getDb();

    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }

    const { persons } = req.body;
    if (!Array.isArray(persons)) {
      return res.status(400).json({ error: "persons must be an array" });
    }

    const imported: string[] = [];
    for (const person of persons) {
      const externalId = person.contactDocId || `imported_${Date.now()}_${Math.random().toString(36).substring(7)}`;

      await db.insert(limitlessPersons).values({
        organizationId,
        userId: user.id,
        externalId,
        name: person.name,
        email: person.email || null,
        photoUrl: person.photoUrl || null,
        contactDocId: person.contactDocId || null,
      }).onDuplicateKeyUpdate({
        set: {
          name: person.name,
          email: person.email || null,
          photoUrl: person.photoUrl || null,
          updatedAt: new Date(),
        },
      });

      imported.push(externalId);
    }

    res.json({
      success: true,
      imported: imported.length,
      ids: imported,
    });
  } catch (error: any) {
    console.error("Limitless REST API import error:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /v1/import/meetings
 * Import meetings from Limitless export
 */
limitlessRestRouter.post("/import/meetings", authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as AuthenticatedRequest).user;
    const organizationId = getOrganizationId(req);
    const db = await getDb();

    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }

    const { meetings } = req.body;
    if (!Array.isArray(meetings)) {
      return res.status(400).json({ error: "meetings must be an array" });
    }

    const imported: string[] = [];
    for (const meeting of meetings) {
      const externalId = meeting.id || `imported_${Date.now()}_${Math.random().toString(36).substring(7)}`;

      await db.insert(limitlessMeetings).values({
        organizationId,
        userId: user.id,
        externalId,
        title: meeting.title,
        description: meeting.description || null,
        startTime: meeting.startTime ? new Date(meeting.startTime) : new Date(),
        endTime: meeting.endTime ? new Date(meeting.endTime) : null,
        participants: meeting.participants ? JSON.stringify(meeting.participants) : null,
        url: meeting.url || null,
        conferenceUrl: meeting.conferenceUrl || null,
      }).onDuplicateKeyUpdate({
        set: {
          title: meeting.title,
          description: meeting.description || null,
          endTime: meeting.endTime ? new Date(meeting.endTime) : null,
          participants: meeting.participants ? JSON.stringify(meeting.participants) : null,
          url: meeting.url || null,
          conferenceUrl: meeting.conferenceUrl || null,
          updatedAt: new Date(),
        },
      });

      imported.push(externalId);
    }

    res.json({
      success: true,
      imported: imported.length,
      ids: imported,
    });
  } catch (error: any) {
    console.error("Limitless REST API import error:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /v1/import/profile
 * Import user profile from Limitless export
 */
limitlessRestRouter.post("/import/profile", authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as AuthenticatedRequest).user;
    const organizationId = getOrganizationId(req);
    const db = await getDb();

    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }

    const { profile } = req.body;
    if (!profile) {
      return res.status(400).json({ error: "profile is required" });
    }

    await db.insert(limitlessProfiles).values({
      organizationId,
      userId: user.id,
      displayName: profile.displayName || null,
      job: profile.job || null,
      traits: profile.traits || null,
      customTraits: profile.customTraits || null,
      additionalInfo: profile.additionalInfo || null,
      languageCode: profile.languageCode || "en",
      verbosity: profile.verbosity || "normal",
    }).onDuplicateKeyUpdate({
      set: {
        displayName: profile.displayName || null,
        job: profile.job || null,
        traits: profile.traits || null,
        customTraits: profile.customTraits || null,
        additionalInfo: profile.additionalInfo || null,
        languageCode: profile.languageCode || "en",
        verbosity: profile.verbosity || "normal",
        updatedAt: new Date(),
      },
    });

    res.json({
      success: true,
      message: "Profile imported successfully",
    });
  } catch (error: any) {
    console.error("Limitless REST API import error:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /v1/import/bulk
 * Bulk import all data types from Limitless export
 */
limitlessRestRouter.post("/import/bulk", authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as AuthenticatedRequest).user;
    const organizationId = getOrganizationId(req);
    const db = await getDb();

    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }

    const { contacts, persons, meetings, lifelogs: lifelogData, profile } = req.body;
    const results = {
      contacts: 0,
      persons: 0,
      meetings: 0,
      lifelogs: 0,
      profile: false,
    };

    // Import contacts
    if (Array.isArray(contacts)) {
      for (const contact of contacts) {
        const externalId = contact.externalContactId || `imported_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        await db.insert(limitlessContacts).values({
          organizationId,
          userId: user.id,
          externalId,
          name: contact.name,
          primaryEmail: contact.primaryEmail || null,
          emails: contact.emails ? JSON.stringify(contact.emails) : null,
          photoUrl: contact.photoUrl || null,
        }).onDuplicateKeyUpdate({
          set: {
            name: contact.name,
            primaryEmail: contact.primaryEmail || null,
            emails: contact.emails ? JSON.stringify(contact.emails) : null,
            photoUrl: contact.photoUrl || null,
            updatedAt: new Date(),
          },
        });
        results.contacts++;
      }
    }

    // Import persons
    if (Array.isArray(persons)) {
      for (const person of persons) {
        const externalId = person.contactDocId || `imported_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        await db.insert(limitlessPersons).values({
          organizationId,
          userId: user.id,
          externalId,
          name: person.name,
          email: person.email || null,
          photoUrl: person.photoUrl || null,
          contactDocId: person.contactDocId || null,
        }).onDuplicateKeyUpdate({
          set: {
            name: person.name,
            email: person.email || null,
            photoUrl: person.photoUrl || null,
            updatedAt: new Date(),
          },
        });
        results.persons++;
      }
    }

    // Import meetings
    if (Array.isArray(meetings)) {
      for (const meeting of meetings) {
        const externalId = meeting.id || `imported_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        await db.insert(limitlessMeetings).values({
          organizationId,
          userId: user.id,
          externalId,
          title: meeting.title,
          description: meeting.description || null,
          startTime: meeting.startTime ? new Date(meeting.startTime) : new Date(),
          endTime: meeting.endTime ? new Date(meeting.endTime) : null,
          participants: meeting.participants ? JSON.stringify(meeting.participants) : null,
          url: meeting.url || null,
          conferenceUrl: meeting.conferenceUrl || null,
        }).onDuplicateKeyUpdate({
          set: {
            title: meeting.title,
            description: meeting.description || null,
            endTime: meeting.endTime ? new Date(meeting.endTime) : null,
            participants: meeting.participants ? JSON.stringify(meeting.participants) : null,
            url: meeting.url || null,
            conferenceUrl: meeting.conferenceUrl || null,
            updatedAt: new Date(),
          },
        });
        results.meetings++;
      }
    }

    // Import lifelogs
    if (Array.isArray(lifelogData)) {
      for (const log of lifelogData) {
        const externalId = log.id || `imported_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        await db.insert(lifelogs).values({
          organizationId,
          userId: user.id,
          externalId,
          title: log.title || "Untitled",
          markdown: log.markdown || null,
          contents: log.contents ? JSON.stringify(log.contents) : null,
          startTime: log.startTime ? new Date(log.startTime) : new Date(),
          endTime: log.endTime ? new Date(log.endTime) : null,
          isStarred: log.isStarred || false,
        }).onDuplicateKeyUpdate({
          set: {
            title: log.title || "Untitled",
            markdown: log.markdown || null,
            contents: log.contents ? JSON.stringify(log.contents) : null,
            endTime: log.endTime ? new Date(log.endTime) : null,
            isStarred: log.isStarred || false,
            updatedAt: new Date(),
          },
        });
        results.lifelogs++;
      }
    }

    // Import profile
    if (profile) {
      await db.insert(limitlessProfiles).values({
        organizationId,
        userId: user.id,
        displayName: profile.displayName || null,
        job: profile.job || null,
        traits: profile.traits || null,
        customTraits: profile.customTraits || null,
        additionalInfo: profile.additionalInfo || null,
        languageCode: profile.languageCode || "en",
        verbosity: profile.verbosity || "normal",
      }).onDuplicateKeyUpdate({
        set: {
          displayName: profile.displayName || null,
          job: profile.job || null,
          traits: profile.traits || null,
          customTraits: profile.customTraits || null,
          additionalInfo: profile.additionalInfo || null,
          languageCode: profile.languageCode || "en",
          verbosity: profile.verbosity || "normal",
          updatedAt: new Date(),
        },
      });
      results.profile = true;
    }

    res.json({
      success: true,
      imported: results,
    });
  } catch (error: any) {
    console.error("Limitless REST API bulk import error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default limitlessRestRouter;
