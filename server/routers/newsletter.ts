import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db";
import { newsletterSubscribers } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * Newsletter Router - Handle newsletter subscription operations
 */
export const newsletterRouter = router({
  /**
   * Subscribe to newsletter
   * This is a simplified implementation that validates and accepts email subscriptions
   * In production, integrate with services like Mailchimp, SendGrid, or ConvertKit
   */
  subscribe: publicProcedure
    .input(
      z.object({
        email: z.string().email("Please enter a valid email address"),
        name: z.string().optional(),
        source: z.string().optional().default("landing_page")
      })
    )
    .mutation(async ({ input }) => {
      const { email, name, source } = input;

      try {
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }

        const existing = await db
          .select()
          .from(newsletterSubscribers)
          .where(eq(newsletterSubscribers.email, email))
          .limit(1);

        if (existing.length > 0) {
          if (existing[0].status === "subscribed") {
            return {
              success: true,
              message: "You're already subscribed to our newsletter!",
              email
            };
          } else {
            await db
              .update(newsletterSubscribers)
              .set({
                status: "subscribed",
                subscribedAt: new Date(),
                unsubscribedAt: null,
                source,
              })
              .where(eq(newsletterSubscribers.email, email));


            return {
              success: true,
              message: "Welcome back! You've been re-subscribed to the newsletter!",
              email
            };
          }
        }

        await db.insert(newsletterSubscribers).values({
          email,
          name: name || null,
          status: "subscribed",
          source,
        });


        return {
          success: true,
          message: "Successfully subscribed to the newsletter!",
          email
        };
      } catch (error) {
        throw new Error("Failed to subscribe. Please try again.");
      }
    }),

  /**
   * Unsubscribe from newsletter
   */
  unsubscribe: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        token: z.string().optional()
      })
    )
    .mutation(async ({ input }) => {
      const { email } = input;

      try {
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }

        const existing = await db
          .select()
          .from(newsletterSubscribers)
          .where(eq(newsletterSubscribers.email, email))
          .limit(1);

        if (existing.length === 0) {
          return {
            success: true,
            message: "Email not found in our newsletter list."
          };
        }

        if (existing[0].status === "unsubscribed") {
          return {
            success: true,
            message: "You're already unsubscribed from the newsletter."
          };
        }

        await db
          .update(newsletterSubscribers)
          .set({
            status: "unsubscribed",
            unsubscribedAt: new Date(),
          })
          .where(eq(newsletterSubscribers.email, email));


        return {
          success: true,
          message: "Successfully unsubscribed from the newsletter."
        };
      } catch (error) {
        throw new Error("Failed to unsubscribe. Please try again.");
      }
    })
});
